#!/bin/bash
# Doc & PPT Studio - 公网访问启动脚本
# 运行此脚本后，网站将通过公网URL在任何设备上访问

SERVER_PORT=9876

echo "========================================="
echo "  Doc & PPT Studio - 启动中..."
echo "========================================="

# 清理旧进程
for pid in $(tasklist //FI "IMAGENAME eq node.exe" 2>/dev/null | grep node | awk '{print $2}'); do
  taskkill //F //PID $pid 2>/dev/null
done
for pid in $(tasklist //FI "IMAGENAME eq ssh.exe" 2>/dev/null | grep ssh | awk '{print $2}'); do
  taskkill //F //PID $pid 2>/dev/null
done
sleep 2

# 启动开发服务器
cd "$(dirname "$0")"
npx vite --host 0.0.0.0 --port $SERVER_PORT &
sleep 3

echo ""
echo "  ✅ 本地访问: http://localhost:$SERVER_PORT"
echo "  ✅ 局域网访问: http://$(ipconfig 2>/dev/null | grep -A10 "以太网\|无线\|WLAN" | grep "IPv4" | head -1 | awk '{print $NF}'):$SERVER_PORT"
echo ""

# 创建公网隧道
echo "  🌐 正在创建公网隧道..."
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=60 -R 80:localhost:$SERVER_PORT serveo.net 2>&1 | while read line; do
  echo "$line"
  if echo "$line" | grep -q "Forwarding HTTP traffic from"; then
    PUBLIC_URL=$(echo "$line" | grep -oP 'https://[^\s]+')
    echo ""
    echo "========================================="
    echo "  🎉 公网访问地址（任何设备均可访问）:"
    echo "  $PUBLIC_URL"
    echo "========================================="
    echo ""
    echo "  将此URL分享给任何人，他们即可通过网络访问网站"
    echo "  按 Ctrl+C 停止服务"
    echo ""
  fi
done
