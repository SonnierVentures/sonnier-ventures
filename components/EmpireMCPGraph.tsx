'use client'
/**
 * EmpireMCPGraph.tsx
 * SonnierVentures.com — Interactive Infrastructure Map
 * Animated canvas node graph showing the full Empire MCP toolchain.
 */
import { useEffect, useRef, useState, useCallback } from 'react'

const NODES = [
  { id: 'core',     label: 'Empire MCP',    sub: '39 tools · v2',    icon: '⚔️', r: 0,    angle: 0,   layer: 0, color: '#00ff9d', size: 80 },
  { id: 'oracle',   label: 'Oracle',        sub: 'Analyze',          icon: '🔮', r: 0.28, angle: 270, layer: 1, color: '#a78bfa', size: 58 },
  { id: 'sentinel', label: 'Sentinel',      sub: 'Guard',            icon: '🛡', r: 0.28, angle: 210, layer: 1, color: '#a78bfa', size: 58 },
  { id: 'sage',     label: 'Sage',          sub: 'Learn',            icon: '📖', r: 0.28, angle: 330, layer: 1, color: '#a78bfa', size: 58 },
  { id: 'sched',    label: 'Schedule AI',   sub: '8 new tools',      icon: '📅', r: 0.30, angle: 90,  layer: 1, color: '#34d399', size: 58, isNew: true },
  { id: 'gcal',     label: 'Google Cal',    sub: 'gcal_link',        icon: '🗓', r: 0.42, angle: 60,  layer: 2, color: '#34d399', size: 46 },
  { id: 'ics',      label: 'ICS Export',    sub: 'RFC 5545',         icon: '📤', r: 0.42, angle: 118, layer: 2, color: '#34d399', size: 46 },
  { id: 'notion',   label: 'Notion',        sub: 'Schedule sync',    icon: '📋', r: 0.42, angle: 138, layer: 2, color: '#34d399', size: 46 },
  { id: 'supa',     label: 'Supabase',      sub: 'Database',         icon: '🗄', r: 0.30, angle: 180, layer: 1, color: '#60a5fa', size: 58 },
  { id: 'stripe',   label: 'Stripe',        sub: 'Billing',          icon: '💳', r: 0.30, angle: 0,   layer: 1, color: '#60a5fa', size: 58 },
  { id: 'vercel',   label: 'Vercel',        sub: 'Deploy',           icon: '▲',  r: 0.42, angle: 225, layer: 2, color: '#60a5fa', size: 46 },
  { id: 'github',   label: 'GitHub',        sub: 'CI',               icon: '🐙', r: 0.42, angle: 315, layer: 2, color: '#60a5fa', size: 46 },
  { id: 'godot',    label: 'GodotForge',    sub: 'CI/CD',            icon: '🎮', r: 0.42, angle: 240, layer: 2, color: '#fbbf24', size: 46 },
  { id: 'oc',       label: 'OpenConductor', sub: 'Registry',         icon: '🔌', r: 0.30, angle: 150, layer: 1, color: '#fbbf24', size: 58 },
  { id: 'x3o',      label: 'x3o.ai',        sub: 'Command Ctr',      icon: '💡', r: 0.42, angle: 195, layer: 2, color: '#fbbf24', size: 46 },
  { id: 'kelatic',  label: 'KeLatic',       sub: 'Salon Tech',       icon: '💈', r: 0.42, angle: 345, layer: 2, color: '#fbbf24', size: 46 },
  { id: 'trust',    label: 'Trust Stack',   sub: 'ERC-8004',         icon: '⛓', r: 0.42, angle: 285, layer: 2, color: '#f472b6', size: 46 },
]

const EDGES: [string, string][] = [
  ['core','oracle'],['core','sentinel'],['core','sage'],
  ['core','sched'],['core','supa'],['core','stripe'],['core','oc'],
  ['sched','gcal'],['sched','ics'],['sched','notion'],
  ['sched','oracle'],['sched','sentinel'],
  ['oracle','notion'],['sentinel','oracle'],
  ['supa','oc'],['supa','x3o'],['supa','kelatic'],
  ['stripe','kelatic'],['stripe','x3o'],
  ['vercel','godot'],['vercel','x3o'],
  ['github','godot'],['github','oc'],
  ['core','vercel'],['core','github'],
  ['trust','oc'],['trust','supa'],
]

const INFO: Record<string, string> = {
  oracle:   'Analyzes schedule gaps & generates strategic event plans. Powers schedule_analyze, schedule_generate, schedule_weekly_brief.',
  sentinel: 'Monitors hard dates & fires proactive alerts. Powers schedule_sentinel_alert, schedule_get_hard_dates.',
  sage:     'Aggregates project context across the empire. Powers schedule_get_project_context.',
  sched:    '8 new tools: full AI schedule lifecycle — analysis → generation → Notion sync → calendar export.',
  gcal:     'schedule_gcal_link: generates Google Calendar add links for every event.',
  ics:      'schedule_export_ics: RFC 5545 .ics export for bulk calendar import.',
  notion:   'schedule_notion_sync: writes events directly to Notion GTC Launch Schedule database.',
  supa:     'Shared data layer across all products: projects, tenants, agents, billing.',
  stripe:   'requirePayment() middleware + credits checkout. Shared across x3o.ai, OpenConductor, KeLatic.',
  vercel:   'Deploy triggers + env management for x3o.ai, GodotForge, OpenConductor.',
  github:   'GodotForge build triggers + OpenConductor CI pipeline.',
  godot:    'CI/CD for Godot Engine. Build triggers, artifact download, webhooks.',
  oc:       'MCP server registry. 3,000+/wk npm downloads. SDK v1.4. The plumbing layer.',
  x3o:      'Command Center. User-facing value layer. Powered by Empire MCP + Trinity AI.',
  kelatic:  'Salon tech. Bookings, lead reactivation, TCPA campaigns.',
  trust:    'ERC-8004 on Base Sepolia. Agent identity + governance. The enterprise moat.',
  core:     'Empire MCP v2 — 39 tools across 8 services. The central orchestration layer.',
}

const CATEGORIES = [
  { label: 'Trinity AI',     color: '#a78bfa' },
  { label: 'Schedule (new)', color: '#34d399' },
  { label: 'Infra',          color: '#60a5fa' },
  { label: 'Products',       color: '#fbbf24' },
  { label: 'Trust Stack',    color: '#f472b6' },
]

function hex2rgb(h: string) {
  const r = parseInt(h.slice(1,3),16)
  const g = parseInt(h.slice(3,5),16)
  const b = parseInt(h.slice(5,7),16)
  return `${r},${g},${b}`
}

export default function EmpireMCPGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string|null>(null)
  const [dims, setDims] = useState({ w: 800, h: 560 })
  const rafRef = useRef<number>(0)

  const getPos = useCallback((node: typeof NODES[0], w: number, h: number) => {
    if (node.r === 0) return { x: w/2, y: h/2 }
    const rad = ((node.angle - 90) * Math.PI) / 180
    const rx = w * node.r * 0.95
    const ry = h * node.r * 0.85
    return { x: w/2 + rx * Math.cos(rad), y: h/2 + ry * Math.sin(rad) }
  }, [])

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect
      setDims({ w: width, h: Math.max(400, width * 0.62) })
    })
    if (wrapRef.current) obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    cv.width  = dims.w * dpr
    cv.height = dims.h * dpr
    ctx.scale(dpr, dpr)
    const { w, h } = dims
    const positions: Record<string, {x:number,y:number}> = {}
    NODES.forEach(n => { positions[n.id] = getPos(n, w, h) })

    const connectedTo = selected
      ? EDGES.filter(e => e.includes(selected)).flatMap(e => e).filter(id => id !== selected)
      : []

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const t = Date.now() / 1000

      // Edges
      EDGES.forEach(([a, b]) => {
        const pa = positions[a], pb = positions[b]
        const nodeA = NODES.find(n => n.id === a)!
        const nodeB = NODES.find(n => n.id === b)!
        const isActive = selected && (a === selected || b === selected)
        const alpha = selected ? (isActive ? 0.65 : 0.04) : a === 'core' ? 0.18 : 0.10
        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y)
        grad.addColorStop(0, `rgba(${hex2rgb(nodeA.color)},${alpha * 0.5})`)
        grad.addColorStop(1, `rgba(${hex2rgb(nodeB.color)},${alpha})`)
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = isActive ? 1.5 : 0.6
        ctx.setLineDash(isActive ? [] : [3, 5])
        ctx.stroke()
        ctx.setLineDash([])
        if (isActive) {
          const ph = (t * 0.5 + (a === selected ? 0 : 0.5)) % 1
          ctx.beginPath()
          ctx.arc(pa.x + (pb.x-pa.x)*ph, pa.y + (pb.y-pa.y)*ph, 2, 0, Math.PI*2)
          ctx.fillStyle = `rgba(${hex2rgb(nodeA.color)},0.9)`
          ctx.fill()
        }
      })

      // Nodes
      NODES.forEach(node => {
        const p = positions[node.id]
        const isCore     = node.id === 'core'
        const isSelected = selected === node.id
        const isConn     = connectedTo.includes(node.id)
        const dimmed     = !!selected && !isSelected && !isConn && node.id !== 'core'
        const radius     = node.size / 2
        const alpha      = dimmed ? 0.2 : 1

        if (isSelected || isCore) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius + 8, 0, Math.PI*2)
          ctx.fillStyle = `rgba(${hex2rgb(node.color)},0.10)`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI*2)
        ctx.fillStyle = `rgba(8,8,16,${alpha})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${hex2rgb(node.color)},${isSelected ? 0.9 : dimmed ? 0.15 : isConn ? 0.7 : 0.4})`
        ctx.lineWidth = isSelected ? 1.5 : isCore ? 1.5 : 0.8
        ctx.stroke()

        ctx.globalAlpha = alpha
        ctx.font = `${isCore ? 20 : 13}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.icon, p.x, p.y - (node.sub ? 7 : 3))

        ctx.font = `500 ${isCore ? 10 : 9}px "Courier New", monospace`
        ctx.fillStyle = isSelected
          ? node.color
          : dimmed ? 'rgba(255,255,255,0.2)' : 'rgba(230,237,243,0.85)'
        ctx.fillText(node.label, p.x, p.y + (node.sub ? 5 : 9))

        if (node.sub && !dimmed) {
          ctx.font = '8px "Courier New", monospace'
          ctx.fillStyle = isSelected
            ? `rgba(${hex2rgb(node.color)},0.7)`
            : 'rgba(139,148,158,0.7)'
          ctx.fillText(node.sub, p.x, p.y + 15)
        }

        if ((node as typeof NODES[0] & { isNew?: boolean }).isNew) {
          ctx.fillStyle = 'rgba(52,211,153,0.15)'
          ctx.fillRect(p.x - 14, p.y + 19, 28, 10)
          ctx.font = "500 7px 'Courier New', monospace"
          ctx.fillStyle = '#34d399'
          ctx.fillText('NEW', p.x, p.y + 24)
        }
        ctx.globalAlpha = 1
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [dims, selected, getPos])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    for (const node of NODES) {
      const p = getPos(node, dims.w, dims.h)
      if (Math.hypot(cx - p.x, cy - p.y) < node.size/2 + 4) {
        setSelected(prev => prev === node.id ? null : node.id)
        return
      }
    }
    setSelected(null)
  }, [dims, getPos])

  const sel = NODES.find(n => n.id === selected)

  return (
    <div style={{ background: 'transparent', fontFamily: "'Courier New', monospace" }}>
      {/* Graph Canvas */}
      <div ref={wrapRef} style={{ position: 'relative', width: '100%', cursor: 'crosshair' }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: dims.h, display: 'block' }}
          onClick={handleClick}
        />
      </div>

      {/* Info Panel */}
      <div style={{
        margin: '12px 0 0',
        padding: '10px 16px',
        background: 'rgba(0,255,157,0.04)',
        border: `1px solid ${sel ? sel.color + '44' : 'rgba(0,255,157,0.1)'}`,
        borderLeft: `3px solid ${sel ? sel.color : '#00ff9d'}`,
        borderRadius: 4,
        fontSize: 11,
        color: 'rgba(230,237,243,0.6)',
        lineHeight: 1.7,
        transition: 'border-color 0.2s',
        minHeight: 40,
        fontFamily: "'DM Mono', 'Courier New', monospace",
      }}>
        {sel ? (
          <><span style={{ color: sel.color, fontWeight: 600 }}>{sel.label}</span>{' — '}{INFO[sel.id]}</>
        ) : (
          '⬡ Click any node to explore Empire MCP integrations'
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'center' }}>
        {CATEGORIES.map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, color: 'rgba(240,237,230,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, boxShadow: `0 0 6px ${c.color}55` }} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}
