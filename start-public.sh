#!/bin/bash
# Doc & PPT Studio - 公网访问启动脚本（固定域名 + 自动重连 + 智能端口检测）
# 运行此脚本后，网站将通过固定公网URL在任何设备上访问

SERVER_PORT=9876
RETRY_DELAY=5
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VITE_LOG="$SCRIPT_DIR/.vite-output.log"

# 固定子域名（改这里可以换域名）
# serveo.net 格式：<subdomain>.serveo.net 或 serveo.net 随机分配
CUSTOM_SUBDOMAIN=""  # 留空使用随机域名；填子域名需先在 serveo.net 注册 SSH 公钥
SSH_KEY="$HOME/.ssh/id_ed25519_serveo"  # SSH 密钥路径

cleanup() {
  echo ""
  echo "  正在停止服务..."
  kill $VITE_PID 2>/dev/null
  rm -f "$VITE_LOG"
  echo "  服务已停止"
  exit 0
}
trap cleanup SIGINT SIGTERM

echo "========================================="
echo "  Doc & PPT Studio - 启动中..."
echo "========================================="

# 1. 清理所有 node/ssh 进程
echo "  正在清理旧进程..."
for pid in $(/c/Windows/System32/tasklist.exe //FI "IMAGENAME eq node.exe" 2>/dev/null | grep node | awk '{print $2}'); do
  /c/Windows/System32/taskkill.exe //F //PID $pid 2>/dev/null
done
for pid in $(/c/Windows/System32/tasklist.exe //FI "IMAGENAME eq ssh.exe" 2>/dev/null | grep ssh | awk '{print $2}'); do
  /c/Windows/System32/taskkill.exe //F //PID $pid 2>/dev/null
done
sleep 1

# 2. 释放端口
echo "  正在释放端口 $SERVER_PORT ..."
PORT_PID=$(/c/Windows/System32/netstat.exe -ano 2>/dev/null | grep -E "LISTENING.*:${SERVER_PORT}\b" | awk '{print $NF}' | head -1)
if [ -n "$PORT_PID" ] && [ "$PORT_PID" != "0" ]; then
  /c/Windows/System32/taskkill.exe //F //PID $PORT_PID 2>/dev/null
  sleep 1
fi

# 3. 等待端口释放
ATTEMPTS=0
while /c/Windows/System32/netstat.exe -ano 2>/dev/null | grep -qE "LISTENING.*:${SERVER_PORT}\b"; do
  sleep 1
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ $ATTEMPTS -ge 10 ]; then
    echo "  ⚠️ 端口 $SERVER_PORT 被占用超时"
    break
  fi
done
echo "  ✅ 端口 $SERVER_PORT 已就绪"

# 4. 构建并启动生产预览（纯静态文件，无需 WebSocket，隧道友好）
cd "$SCRIPT_DIR"
echo "  正在构建项目..."
npm run build >>"$VITE_LOG" 2>&1
echo "  正在启动生产预览..."
npx vite preview --host 0.0.0.0 --port $SERVER_PORT >"$VITE_LOG" 2>&1 &
VITE_PID=$!

# 5. 解析 Vite 实际端口
sleep 2
ACTUAL_PORT=""
for i in $(seq 1 10); do
  ACTUAL_PORT=$(sed $'s/\033\[[0-9;]*m//g' "$VITE_LOG" 2>/dev/null | grep 'Local:' | sed 's/.*localhost:\([0-9]*\).*/\1/' | head -1)
  if [ -n "$ACTUAL_PORT" ]; then
    break
  fi
  sleep 1
done

if [ -z "$ACTUAL_PORT" ]; then
  echo "  ❌ Vite 启动失败，日志："
  cat "$VITE_LOG"
  exit 1
fi

# 显示启动信息
cat "$VITE_LOG"

LAN_IP=$(ipconfig 2>/dev/null | grep -A10 "以太网\|无线\|WLAN" | grep "IPv4" | head -1 | awk '{print $NF}')

echo ""
echo "========================================="
echo "  ✅ 本地访问: http://localhost:$ACTUAL_PORT"
if [ -n "$LAN_IP" ]; then
  echo "  ✅ 局域网访问: http://$LAN_IP:$ACTUAL_PORT"
fi

# 固定域名信息
if [ -n "$CUSTOM_SUBDOMAIN" ]; then
  echo "  🔗 固定公网域名: https://${CUSTOM_SUBDOMAIN}.serveo.net"
else
  echo "  🔗 公网域名: 每次随机分配"
fi
echo "========================================="
echo ""

# 6. 公网隧道 - 自动重连（支持固定子域名）
echo "  🌐 正在创建公网隧道（断线自动重连）..."
echo ""

# 构建 SSH 转发参数
if [ -n "$CUSTOM_SUBDOMAIN" ]; then
  SSH_FORWARD="${CUSTOM_SUBDOMAIN}:80:localhost:${ACTUAL_PORT}"
else
  SSH_FORWARD="80:localhost:${ACTUAL_PORT}"
fi

while true; do
  echo "  [$(date '+%H:%M:%S')] 正在连接公网隧道（端口 $ACTUAL_PORT）..."

  ssh -o StrictHostKeyChecking=no \
      -o ServerAliveInterval=30 \
      -o ServerAliveCountMax=3 \
      -o ConnectTimeout=10 \
      -o ExitOnForwardFailure=yes \
      -i "$SSH_KEY" \
      -R "$SSH_FORWARD" serveo.net 2>&1 | while read line; do
    echo "$line"

    # 尝试从输出中提取实际分配的 URL
    CLEAN_LINE=$(echo "$line" | sed $'s/\033\[[0-9;]*m//g')

    if echo "$CLEAN_LINE" | grep -q "Forwarding HTTP traffic from"; then
      PUBLIC_URL=$(echo "$CLEAN_LINE" | sed 's/.*\(https:\/\/[^ ]*\).*/\1/')
      # 保存 URL 到文件
      echo "$PUBLIC_URL" > "$SCRIPT_DIR/public-url.txt"
      echo "  [$(date '+%m-%d %H:%M')] $PUBLIC_URL" >> "$SCRIPT_DIR/url-history.log"
      echo ""
      echo "========================================="
      echo "  🎉 公网访问地址（任何设备均可访问）:"
      echo "  $PUBLIC_URL"
      echo "========================================="
      echo ""
      echo "  将此URL分享给任何人，他们即可通过网络访问网站"
      echo "  隧道断开后会自动重连（无需手动操作）"
      echo ""
    fi

    # 子域名被占用时的提示
    if echo "$CLEAN_LINE" | grep -qi "Warning: remote port forwarding failed\|already in use\|Could not request"; then
      echo "  ⚠️  子域名 ${CUSTOM_SUBDOMAIN} 可能被占用，尝试使用随机域名..."
    fi
  done

  echo ""
  echo "  ⚠️  [$(date '+%H:%M:%S')] 隧道已断开，${RETRY_DELAY}秒后自动重连..."
  sleep $RETRY_DELAY
done
