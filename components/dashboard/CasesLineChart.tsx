// FILE: components/dashboard/CasesLineChart.tsx
// TYPE: Client Component

'use client'

import { useEffect, useRef, useState } from 'react'
import { LINE_CHART_DATA } from '@/lib/data/dashboard'

export function CasesLineChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgHtml, setSvgHtml] = useState('')
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    function draw() {
      const container = containerRef.current
      if (!container) return

      const { values, labels } = LINE_CHART_DATA
      const W = container.clientWidth || 400
      const H = 130
      const pad = { top: 10, right: 10, bottom: 4, left: 28 }
      const gW = W - pad.left - pad.right
      const gH = H - pad.top - pad.bottom
      const maxVal = Math.max(...values)
      const pts = values.map((v, i) => ({
        x: pad.left + (i / (values.length - 1)) * gW,
        y: pad.top + (1 - v / maxVal) * gH,
      }))
      const pathD = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')
      const areaD =
        `M ${pts[0].x} ${H - pad.bottom} ` +
        pts.map((p) => `L ${p.x} ${p.y}`).join(' ') +
        ` L ${pts[pts.length - 1].x} ${H - pad.bottom} Z`

      let grids = ''
      for (let i = 0; i <= 3; i++) {
        const y = pad.top + (i / 3) * gH
        const val = Math.round(maxVal - (i / 3) * maxVal)
        grids += `<text x="${pad.left - 5}" y="${y + 3}" font-size="9" fill="rgba(245,240,234,0.22)" text-anchor="end">${val}</text>`
        grids += `<line x1="${pad.left}" y1="${y}" x2="${W - pad.right}" y2="${y}" stroke="rgba(255,255,255,0.04)" stroke-dasharray="4 4"/>`
      }

      const dotsHtml = pts
        .map(
          (p, i) =>
            `<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--og)" stroke="var(--card)" stroke-width="2.5" style="opacity:${animate ? 1 : 0};transition:opacity .3s ${i * 0.1}s"><title>${labels[i]}: ${values[i]} cases</title></circle>`
        )
        .join('')

      setSvgHtml(`
        <svg width="100%" height="${H}" viewBox="0 0 ${W} ${H}" class="overflow-visible">
          <defs>
            <linearGradient id="dashLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#D4853A"/>
              <stop offset="100%" stop-color="#E8A44A"/>
            </linearGradient>
            <linearGradient id="dashAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(212,133,58,0.18)"/>
              <stop offset="100%" stop-color="rgba(212,133,58,0)"/>
            </linearGradient>
          </defs>
          ${grids}
          <path d="${areaD}" fill="url(#dashAreaGrad)" opacity="0.7"/>
          <path d="${pathD}" fill="none" stroke="url(#dashLineGrad)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:600;stroke-dashoffset:${animate ? 0 : 600};transition:stroke-dashoffset 1.6s cubic-bezier(.34,1.1,.64,1)"/>
          ${dotsHtml}
        </svg>
      `)
    }

    draw()
    const timer = setTimeout(() => setAnimate(true), 100)
    window.addEventListener('resize', draw)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', draw)
    }
  }, [animate])

  return (
    <div ref={containerRef} className="relative h-40">
      <div dangerouslySetInnerHTML={{ __html: svgHtml }} />
      <div className="flex justify-between pt-1.5 text-[10px] text-[var(--td)]">
        {LINE_CHART_DATA.labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}
