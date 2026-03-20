'use client'
import { useEffect, useState } from 'react'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const verticals = [
  {
    id: 'ai-infra',
    label: 'AI & Infrastructure',
    tagline: 'Proprietary enterprise-grade tools powering the next layer of the AI stack.',
    products: [
      {
        name: 'OpenConductor',
        category: 'AI Infrastructure',
        tagline: 'Trust Stack for Autonomous AI Agents',
        description: 'MCP server registry and identity layer. ERC-8004 agent identity on Base, EU AI Act compliance rails, and one-line monetization for AI tooling.',
        url: 'https://openconductor.io',
        status: 'live',
        tags: ['MCP Registry', 'Trust Stack', 'ERC-8004'],
        accentColor: '#00FFB2',
      },
      {
        name: 'x3o.ai',
        category: 'Command Center',
        tagline: 'AI-Powered Business Intelligence Dashboard',
        description: 'Bloomberg Terminal-style SaaS command center. Multi-tenant, real-time, built for operators who want signal not noise.',
        url: '#',
        status: 'building',
        tags: ['SaaS', 'AI Ops', 'Dashboard'],
        accentColor: '#FF9500',
      },
      {
        name: 'SportIntel',
        category: 'Analytics Platform',
        tagline: 'Real-Time Sports Analytics & Odds Intelligence',
        description: 'Live odds aggregation, arbitrage detection, and steam move alerts across major sportsbooks. Bloomberg Terminal aesthetics for serious bettors.',
        url: '#',
        status: 'building',
        tags: ['Live Odds', 'Arbitrage', 'DFS'],
        accentColor: '#A259FF',
      },
    ],
  },
  {
    id: 'vertical-saas',
    label: 'Vertical SaaS',
    tagline: 'Specialized industry solutions built deep — not broad. Purpose-built for operators who need more than generic software.',
    products: [
      {
        name: 'KeLatic Systems',
        category: 'Vertical SaaS',
        tagline: 'Full-Stack Technology for Salons & Studios',
        description: 'End-to-end booking, CRM, SMS marketing, and POS for specialty hair studios. Built for KeLatic Hair Lounge — now a replicable platform.',
        url: '#',
        status: 'deployed',
        tags: ['Booking', 'Twilio', 'Stripe Terminal'],
        accentColor: '#FF6B9D',
      },
      {
        name: 'ROIzen',
        category: 'Revenue Intelligence',
        tagline: 'AI-Driven ROI Attribution for SMBs',
        description: 'Automated revenue attribution and forecasting for small to mid-size businesses. Surfaces hidden growth levers and consolidates data from disparate tools.',
        url: '#',
        status: 'building',
        tags: ['Revenue Ops', 'Attribution', 'Forecasting'],
        accentColor: '#00FFB2',
      },
      {
        name: 'BookBasePro',
        category: 'Booking Infrastructure',
        tagline: 'Headless Scheduling Infrastructure',
        description: 'API-first booking engine for service businesses. Drop in any vertical — salons, studios, contractors — and launch a fully branded scheduling experience.',
        url: '#',
        status: 'building',
        tags: ['Headless API', 'Scheduling', 'White-label'],
        accentColor: '#00C2FF',
      },
    ],
  },
  {
    id: 'creator-tech',
    label: 'Creator Tech',
    tagline: 'Tools for developers, producers, and builders at the intersection of creative work and technical infrastructure.',
    products: [
      {
        name: 'GodotForge',
        category: 'Developer Tooling',
        tagline: 'Managed CI/CD for Godot Engine',
        description: 'Build, test, and deploy Godot games in the cloud. Fills the gap left by the W4 Build shutdown. Built for indie studios and solo devs who ship fast.',
        url: 'https://godotforge.io',
        status: 'live',
        tags: ['CI/CD', 'Godot 4', 'Game Dev'],
        accentColor: '#00C2FF',
      },
      {
        name: 'BeatLogic AI',
        category: 'Music Production AI',
        tagline: 'AI-Native Beat Production & Sample Intelligence',
        description: 'AI-powered production assistant for beatmakers and producers. Sample classification, BPM-aware suggestions, and creative session memory across projects.',
        url: '#',
        status: 'building',
        tags: ['Music AI', 'Sample Library', 'Beat Production'],
        accentColor: '#FF9500',
      },
    ],
  },
]

const stats = [
  { value: '8+',    label: 'Products in Portfolio' },
  { value: '15+',   label: 'Years in Field' },
  { value: '$500K', label: 'Prior Revenue Built' },
  { value: 'Level 5', label: 'AI Maturity' },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  live:     { label: 'Live',     color: '#00FFB2' },
  deployed: { label: 'Deployed', color: '#00C2FF' },
  building: { label: 'Building', color: '#C9A84C' },
}

const caseStudies = [
  {
    client: 'KeLatic Hair Lounge',
    vertical: 'Beauty & Wellness',
    location: 'Houston, TX',
    engagement: 'Digital Transformation Partnership',
    challenge: 'A high-end specialty studio running on manual processes — phone bookings, paper records, no SMS follow-up, zero CRM. A strong brand with no digital engine behind it.',
    solution: 'Deployed the full KeLatic Systems stack: a branded booking portal, automated SMS reminders via Twilio, Stripe Terminal POS, and a client CRM with built-in retention scoring.',
    results: [
      { metric: '312%', label: 'Increase in Online Bookings' },
      { metric: '41%',  label: 'Reduction in No-Shows' },
      { metric: '2.1×', label: 'Revenue Growth — 6 Months' },
    ],
    tags: ['Booking Automation', 'SMS Marketing', 'POS Integration', 'CRM'],
    accentColor: '#FF6B9D',
  },
]

const dispatchExcerpts = [
  {
    issue: 'Vol. 003',
    date: 'March 2026',
    headline: 'Why I\'m Building an Identity Layer Before the SaaS',
    excerpt: 'Most founders would launch the SaaS and bolt on compliance later. I\'m going infrastructure-first because trust is the moat. OpenConductor\'s ERC-8004 implementation on Base means every agent we deploy has a cryptographically verifiable identity from day one — before we have a single paying customer.',
    tags: ['OpenConductor', 'AI Identity', 'Architecture'],
  },
  {
    issue: 'Vol. 002',
    date: 'February 2026',
    headline: 'The $500K Revenue Blueprint — What I\'d Do Differently',
    excerpt: 'After 15 years in electrical contracting and a decade of self-taught development, the one thing I\'d optimize earlier is distribution. The technical depth was always there. The missing leverage was systematic outbound — a story about capability, not just a portfolio.',
    tags: ['Founder Lessons', 'Revenue Strategy', 'Distribution'],
  },
]

const allLiveProducts = verticals.flatMap(v => v.products).filter(p => p.url !== '#')

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeVertical, setActiveVertical] = useState('ai-infra')
  const [auditStack, setAuditStack] = useState('')
  const [auditProblem, setAuditProblem] = useState('')
  const [auditSubmitted, setAuditSubmitted] = useState(false)
  const [dispatchEmail, setDispatchEmail] = useState('')
  const [dispatchJoined, setDispatchJoined] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const currentVertical = verticals.find(v => v.id === activeVertical)!

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="grain-overlay" />
      <div className="grid-bg" />
      <div className="scanline" />

      {/* ── Nav ───────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(201,168,76,0.08)', backdropFilter: 'blur(20px)', background: 'rgba(8,8,16,0.9)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="status-dot" />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>Sonnier Ventures</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {[
            { label: 'Portfolio',  href: '#portfolio' },
            { label: 'Case Studies', href: '#case-studies' },
            { label: 'Audits',    href: '#audits' },
            { label: 'Dispatch',  href: '#dispatch' },
            { label: 'About',     href: '#about' },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>
          Houston, TX · Venture Studio · Est. 2024
        </div>
        <h1 style={{ fontSize: 'clamp(52px,8vw,112px)', fontWeight: 300, lineHeight: 0.92, color: 'var(--text)', letterSpacing: '-0.02em', maxWidth: 960 }}>
          We build,<br />
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>incubate,</span><br />
          and scale platforms.
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 32, maxWidth: 520, lineHeight: 1.9 }}>
          Sonnier Ventures is a one-person holding company deploying AI infrastructure, developer tooling, and vertical SaaS across eight active products. We build scalable platforms for ourselves — which means we can modernize your operations too.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          <a href="#portfolio" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--gold)', padding: '14px 28px', textDecoration: 'none', borderRadius: 1 }}>
            View Portfolio
          </a>
          <a href="#audits" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--gold-dim)', padding: '14px 28px', textDecoration: 'none', borderRadius: 1 }}>
            Request an Audit
          </a>
        </div>
        <div style={{ position: 'absolute', bottom: 48, left: 48, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,transparent,var(--gold))' }} />
          <span style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--text-dim)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── Stats ─────────────────────────────── */}
      <section style={{ padding: '80px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--border)', borderRadius: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '40px 32px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── Portfolio ─────────────────────────── */}
      <section id="portfolio" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Venture Portfolio
          </h2>
          <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            {verticals.reduce((acc, v) => acc + v.products.length, 0)} Products
          </span>
        </div>

        {/* Vertical Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 48 }}>
          {verticals.map(v => (
            <button
              key={v.id}
              onClick={() => setActiveVertical(v.id)}
              className={`vertical-tab ${activeVertical === v.id ? 'active' : ''}`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Vertical Tagline */}
        <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 48, letterSpacing: '0.03em', lineHeight: 1.7, maxWidth: 640 }}>
          {currentVertical.tagline}
        </p>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 1 }}>
          {currentVertical.products.map(p => {
            const sc = statusConfig[p.status]
            return (
              <div key={p.name} className="product-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{p.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: sc.color, boxShadow: `0 0 6px ${sc.color}` }} />
                    <span style={{ fontSize: 9, letterSpacing: '0.15em', color: sc.color, textTransform: 'uppercase' }}>{sc.label}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{p.name}</h3>
                <p style={{ fontSize: 10, color: p.accentColor, marginBottom: 16, letterSpacing: '0.05em' }}>{p.tagline}</p>
                <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
                <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 24 }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.tags.map(t => <span key={t} className="tag active">{t}</span>)}
                </div>
                {p.url !== '#' && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', marginTop: 24, fontSize: 9, letterSpacing: '0.2em', color: p.accentColor, textDecoration: 'none', textTransform: 'uppercase', borderBottom: `1px solid ${p.accentColor}44`, paddingBottom: 2 }}>
                    Visit →
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── Case Studies ──────────────────────── */}
      <section id="case-studies" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
              Case Studies
            </div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Digital Transformation<br />
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Partnerships</span>
            </h2>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 360, lineHeight: 1.8, textAlign: 'right' }}>
            We take traditional businesses and upgrade their entire operational engine. Not a website refresh — a full stack modernization.
          </p>
        </div>

        {caseStudies.map((cs, idx) => (
          <div key={idx} className="case-study-card">
            {/* Header Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: cs.accentColor, textTransform: 'uppercase', marginBottom: 10 }}>
                  {cs.vertical} · {cs.location}
                </div>
                <h3 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                  {cs.client}
                </h3>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 6 }}>
                  {cs.engagement}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {cs.results.map((r, i) => (
                  <div key={i} className="result-block" style={{ '--accent': cs.accentColor } as React.CSSProperties}>
                    <div style={{ fontSize: 36, fontWeight: 600, color: cs.accentColor, lineHeight: 1 }}>{r.metric}</div>
                    <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 8, maxWidth: 100 }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 12 }}>Challenge</div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9 }}>{cs.challenge}</p>
              </div>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 12 }}>Solution</div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9 }}>{cs.solution}</p>
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              {cs.tags.map(t => <span key={t} className="tag active">{t}</span>)}
            </div>
          </div>
        ))}
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── Venture Audits ────────────────────── */}
      <section id="audits" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: Copy */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
              Technical Audit
            </div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,60px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 24 }}>
              Sonnier Ventures<br />
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Modernization<br />Roadmap</span>
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: 32 }}>
              Describe your current software stack and the biggest operational bottleneck you&apos;re facing. We&apos;ll return a strategic Modernization Roadmap — not a list of tools, but a precise blueprint showing where custom AI automation or a streamlined architecture will cut costs and drive revenue.
            </p>
            <div style={{ borderLeft: '2px solid var(--gold-dim)', paddingLeft: 20 }}>
              {[
                'Stack analysis against current AI capabilities',
                'Identification of automation leverage points',
                'Revenue impact projections per change',
                'Prioritized implementation sequence',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 10, marginTop: 2, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {auditSubmitted ? (
              <div className="audit-form" style={{ textAlign: 'center', padding: '64px 40px' }}>
                <div style={{ fontSize: 36, color: 'var(--gold)', marginBottom: 16 }}>◆</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                  Roadmap Request Received
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.8 }}>
                  We&apos;ll review your stack and respond within 48 hours with your Modernization Roadmap.
                </p>
              </div>
            ) : (
              <div className="audit-form">
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>
                  Request Your Roadmap
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Current Software Stack
                  </label>
                  <textarea
                    value={auditStack}
                    onChange={e => setAuditStack(e.target.value)}
                    placeholder="e.g. Shopify + spreadsheets for inventory, manual outreach via Gmail, QuickBooks for accounting..."
                    className="audit-input"
                    rows={4}
                  />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Biggest Operational Bottleneck
                  </label>
                  <textarea
                    value={auditProblem}
                    onChange={e => setAuditProblem(e.target.value)}
                    placeholder="e.g. We lose 3 hours/day to manual follow-up emails and have no visibility into why deals go cold..."
                    className="audit-input"
                    rows={4}
                  />
                </div>
                <button
                  onClick={() => { if (auditStack.trim() && auditProblem.trim()) setAuditSubmitted(true) }}
                  className={`audit-submit ${auditStack.trim() && auditProblem.trim() ? 'ready' : ''}`}
                >
                  Request Modernization Roadmap →
                </button>
                <p style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', marginTop: 16, textAlign: 'center' }}>
                  High-signal requests only. Response within 48 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── Founder Dispatch ──────────────────── */}
      <section id="dispatch" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>
              Founder Updates
            </div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Sonnier Ventures<br />
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Dispatch</span>
            </h2>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 320, lineHeight: 1.8, textAlign: 'right' }}>
            Bi-weekly. Architectural decisions, LLM integration challenges, and the strategic reasoning behind every product move.
          </p>
        </div>

        {/* Excerpt Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(420px,1fr))', gap: 1, marginBottom: 64 }}>
          {dispatchExcerpts.map((d, i) => (
            <div key={i} className="dispatch-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>{d.issue}</span>
                <span style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{d.date}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 16 }}>{d.headline}</h3>
              <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
              <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: 24 }}>{d.excerpt}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="dispatch-signup">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
              Join the Dispatch
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: 440, margin: '0 auto' }}>
              Infrastructure insights, product architecture breakdowns, and founder strategy — direct from the venture studio.
            </p>
          </div>
          {dispatchJoined ? (
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                ◆ You&apos;re on the list
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 0, maxWidth: 480, margin: '0 auto' }}>
              <input
                type="email"
                value={dispatchEmail}
                onChange={e => setDispatchEmail(e.target.value)}
                placeholder="your@email.com"
                className="dispatch-input"
              />
              <button
                onClick={() => { if (dispatchEmail.includes('@')) setDispatchJoined(true) }}
                className="dispatch-btn"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── About ─────────────────────────────── */}
      <section id="about" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>About</div>
            <h2 style={{ fontSize: 'clamp(36px,4vw,64px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Self-taught.<br />
              Infrastructure-first.<br />
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Always building.</span>
            </h2>
          </div>
          <div style={{ paddingTop: 8 }}>
            {[
              { label: 'Background',   text: '15+ years as an electrical contractor in railroad systems — IGBT inverter specialist. Self-taught developer since 1998. No degree, full stack.' },
              { label: 'Philosophy',   text: "Don't climb the AI maturity ladder — build the ladder. Every product starts from infrastructure and compounds into capability." },
              { label: 'Focus',        text: 'AI agent identity, MCP tooling, developer infrastructure, and vertical SaaS. Targeting $50M ARR across the Sonnier Ventures portfolio.' },
            ].map(item => (
              <div key={item.label} style={{ borderLeft: '1px solid var(--border)', paddingLeft: 24, marginBottom: 32 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: '0 48px' }} />

      {/* ── Contact ───────────────────────────── */}
      <section id="contact" style={{ padding: '100px 48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
        <h2 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 24 }}>
          Let&apos;s build something.
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Partnerships, investments, digital transformation contracts, or conversations about the future of AI infrastructure — reach out directly.
        </p>
        <a href="mailto:shawn@sonnierventures.com"
          style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--gold)', padding: '16px 36px', textDecoration: 'none', borderRadius: 1, display: 'inline-block' }}>
          shawn@sonnierventures.com
        </a>
      </section>

      {/* ── Footer ────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>© 2026 Sonnier Ventures</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {allLiveProducts.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
              {p.name}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
