import PptxGenJS from 'pptxgenjs'

function parseColor(color) {
  if (!color) return 'FFFFFF'
  // Handle linear-gradient - extract first solid color
  if (color.startsWith('linear-gradient')) {
    const match = color.match(/rgba?\([^)]+\)|#[A-Fa-f0-9]{3,6}|[a-z]+/g)
    const firstColor = match?.find(m => m.startsWith('#') || m.match(/^[a-z]+$/))
    return firstColor ? firstColor.replace('#', '') : '333333'
  }
  return color.replace('#', '')
}

export function exportPPTX(template, slidesData) {
  const pres = new PptxGenJS()
  const theme = template.theme

  pres.layout = 'LAYOUT_WIDE'
  pres.author = 'Doc & PPT Studio'
  pres.title = template.name

  // Process each slide
  slidesData.forEach((slide, slideIndex) => {
    const templateSlide = template.slides[slideIndex] || template.slides[0]
    if (!templateSlide) return

    const pptSlide = pres.addSlide()

    // Set background
    const bg = templateSlide.background || theme.background
    if (bg.startsWith('linear-gradient')) {
      const match = bg.match(/#[A-Fa-f0-9]{6}/g)
      pptSlide.background = { fill: match ? match[0] : 'FFFFFF' }
    } else {
      pptSlide.background = { fill: parseColor(bg) }
    }

    // Add elements
    templateSlide.elements.forEach(el => {
      const content = slide.elements?.[el.content] || el.content

      switch (el.type) {
        case 'text':
          pptSlide.addText(content, {
            x: el.x / 100,
            y: el.y / 100,
            w: el.w / 100,
            h: el.h / 100,
            fontSize: el.fontSize || 16,
            color: el.color || theme.text,
            bold: el.bold || false,
            align: el.align || 'left',
            fontFace: el.fontFamily || 'Microsoft YaHei',
            valign: 'middle',
          })
          break
        case 'shape':
          pptSlide.addShape('rect', {
            x: el.x / 100,
            y: el.y / 100,
            w: el.w / 100,
            h: el.h / 100,
            fill: { color: parseColor(el.color) },
          })
          break
        case 'line':
          pptSlide.addShape('line', {
            x: el.x / 100,
            y: el.y / 100,
            w: el.w / 100,
            h: el.h / 100,
            line: { color: parseColor(el.color), width: 1.5 },
          })
          break
      }
    })

    // Override with user-edited elements
    if (slide.elements) {
      Object.entries(slide.elements).forEach(([key, value]) => {
        // Check if there's already a matching element from template
        const existingEl = templateSlide.elements.find(e => e.content === key)
        if (existingEl && typeof value === 'string' && value !== existingEl.content) {
          // Find and update the text shape
          // PptxGenJS doesn't support editing after adding, so we add overlaid text
          pptSlide.addText(value, {
            x: existingEl.x / 100,
            y: existingEl.y / 100,
            w: existingEl.w / 100,
            h: existingEl.h / 100,
            fontSize: existingEl.fontSize || 16,
            color: existingEl.color || theme.text,
            bold: existingEl.bold || false,
            align: existingEl.align || 'left',
            fontFace: existingEl.fontFamily || 'Microsoft YaHei',
            valign: 'middle',
          })
        }
      })
    }
  })

  // Save
  pres.writeFile({ fileName: `${template.name}.pptx` })
}
