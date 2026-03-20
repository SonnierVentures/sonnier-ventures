'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Load graph client-side only (canvas API)
const EmpireMCPGraph = dynamic(() => import('@/components/EmpireMCPGraph'), { ssr: false })

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
        accentColor: '#00ff9d',
      },
      {
        name: 'x3o.ai',
        category: 'Command Center',
        tagline: 'AI-Powered Business Intelligence Dashboard',
        description: 'Bloomberg Terminal-style SaaS command center. Multi-tenant, real-time, built for operators who want signal not noise. Powered by Rockal.',
        url: '/rockal',
        status: 'live',
        tags: ['SaaS', 'AI Ops', 'Dashboard'],
        accentColor: '#00ff9d',
      },
      {
        name: 'SportIntel',
        category: 'Analytics Platform',
        tagline: 'Real-Time Sports Analytics & Odds Intelligence',
        description: 'Live odds aggregation, arbitrage detection, and steam move alerts across major sportsbooks. Bloomberg Terminal aesthetics for serious bettors.',
        url: '#',
        status: 'building',
        tags: ['Live Odds', 'Arbitrage', 'DFS'],
        accentColor: '#a78bfa',
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
        url: 'https://kelatic.com',
        status: 'deployed',
        tags: ['Booking', 'Twilio', 'Stripe Terminal'],
        accentColor: '#f472b6',
      },
      {
        name: 'ROIzen',
        category: 'Revenue Intelligence',
        tagline: 'AI-Driven ROI Attribution for SMBs',
        description: 'Automated revenue attribution and forecasting for small to mid-size businesses. Surfaces hidden growth levers and consolidates data from disparate tools.',
        url: '#',
        status: 'building',
        tags: ['Revenue Ops', 'Attribution', 'Forecasting'],
        accentColor: '#00ff9d',
      },
      {
        name: 'BookBasePro',
        category: 'Booking Infrastructure',
        tagline: 'Headless Scheduling Infrastructure',
        description: 'API-first booking engine for service businesses. Drop in any vertical — salons, studios, contractors — and launch a fully branded scheduling experience.',
        url: '#',
        status: 'building',
        tags: ['Headless API', 'Scheduling', 'White-label'],
        accentColor: '#60a5fa',
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
        accentColor: '#60a5fa',
      },
      {
        name: 'BeatLogic AI',
        category: 'Music Production AI',
        tagline: 'AI-Native Beat Production & Sample Intelligence',
        description: 'AI-powered production assistant for beatmakers and producers. Sample classification, BPM-aware suggestions, and creative session memory across projects.',
        url: '#',
        status: 'building',
        tags: ['Music AI', 'Sample Library', 'Beat Production'],
        accentColor: '#fbbf24',
      },
    ],
  },
]

const stats = [
  { value: '8+',     label: 'Products in Portfolio' },
  { value: '39',     label: 'MCP Tools in Production' },
  { value: '$500K',  label: 'Prior Revenue Built' },
  { value: 'Level 5',label: 'AI Maturity' },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  live:     { label: 'Live',     color: '#00ff9d' },
  deployed: { label: 'Deployed', color: '#60a5fa' },
  building: { label: 'Building', color: '#fbbf24' },
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
    accentColor: '#f472b6',
  },
]

const dispatchExcerpts = [
  {
    issue: 'Vol. 003',
    date: 'March 2026',
    headline: "Why I'm Building an Identity Layer Before the SaaS",
    excerpt: "Most founders would launch the SaaS and bolt on compliance later. I'm going infrastructure-first because trust is the moat. OpenConductor's ERC-8004 implementation on Base means every agent we deploy has a cryptographically verifiable identity from day one — before we have a single paying customer.",
    tags: ['OpenConductor', 'AI Identity', 'Architecture'],
  },
  {
    issue: 'Vol. 002',
    date: 'February 2026',
    headline: "The $500K Revenue Blueprint — What I'd Do Differently",
    excerpt: "After 15 years in electrical contracting and a decade of self-taught development, the one thing I'd optimize earlier is distribution. The technical depth was always there. The missing leverage was systematic outbound — a story about capability, not just a portfolio.",
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
      <nav className="sv-nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,255,157,0.07)', backdropFilter: 'blur(20px)', background: 'rgba(8,8,16,0.92)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="status-dot-green" />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--green)', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>Sonnier Ventures</span>
        </div>
        <div className="sv-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[
            { label: 'Infrastructure', href: '#infrastructure' },
            { label: 'Portfolio',      href: '#portfolio' },
            { label: 'Case Studies',   href: '#case-studies' },
            { label: 'Audits',         href: '#audits' },
            { label: 'Dispatch',       href: '#dispatch' },
          ].map(item => (
            <a key={item.label} href={item.href}
              style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
              {item.label}
            </a>
          ))}
          <Link href="/rockal"
            style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '9px 18px', textDecoration: 'none', borderRadius: 2, fontWeight: 600, fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────── */}
      <section className="hero-split" style={{ minHeight: '100vh', display: 'grid', alignItems: 'center', padding: '100px 48px 60px', gap: 48, position: 'relative', zIndex: 1 }}>
        {/* Left: Copy */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.35em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="status-dot-green" style={{ width: 5, height: 5 }} />
            Houston, TX · Venture Studio · Est. 2024
          </div>
          <h1 style={{ fontSize: 'clamp(44px,5.5vw,88px)', fontWeight: 300, lineHeight: 0.94, color: 'var(--text)', letterSpacing: '-0.02em', maxWidth: 640, fontFamily: "'Cormorant Garamond', serif" }}>
            We build,<br />
            <span style={{ color: 'var(--green)', fontWeight: 600 }}>incubate,</span><br />
            and scale platforms.
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 28, maxWidth: 480, lineHeight: 1.9, fontFamily: "'DM Mono', monospace" }}>
            Sonnier Ventures is a one-person holding company deploying AI infrastructure, developer tooling, and vertical SaaS across eight active products — all running on Empire MCP.
          </p>

          {/* Rockal CTA — primary */}
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
            <Link href="/rockal" className="rockal-hero-cta">
              <span>⚔️</span>
              <span>Start 30-Day Rockal Trial — Free</span>
              <span style={{ opacity: 0.6 }}>→</span>
            </Link>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>First sign-on gets full Empire MCP access</span>
              <span style={{ fontSize: 9, color: 'var(--green)', opacity: 0.5 }}>·</span>
              <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>No card required</span>
            </div>
          </div>

          {/* Secondary CTAs */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <a href="#portfolio"
              style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid rgba(0,255,157,0.2)', padding: '11px 22px', textDecoration: 'none', borderRadius: 2, transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--green)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,255,157,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,255,157,0.2)' }}>
              View Portfolio
            </a>
            <a href="#audits"
              style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid rgba(255,255,255,0.08)', padding: '11px 22px', textDecoration: 'none', borderRadius: 2, transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)' }}>
              Request Audit
            </a>
          </div>
        </div>

        {/* Right: Graph */}
        <div className="hero-graph">
          <EmpireMCPGraph />
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Stats ─────────────────────────────── */}
      <section style={{ padding: '72px 48px', position: 'relative', zIndex: 1 }}>
        <div className="stats-grid" style={{ display: 'grid', border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '36px 28px', borderRight: i < 3 ? '1px solid rgba(0,255,157,0.1)' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 44, fontWeight: 600, color: 'var(--green)', lineHeight: 1, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Infrastructure / Empire MCP Section ── */}
      <section id="infrastructure" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>Empire MCP · v2</div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              The orchestration<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>layer.</span>
            </h2>
          </div>
          <div style={{ maxWidth: 380, textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.85 }}>
              39 MCP tools across 8 services. Every Sonnier Ventures product runs on the same infrastructure backbone — modular, monitored, and designed to compound.
            </p>
            <Link href="/rockal"
              style={{ display: 'inline-flex', marginTop: 20, fontSize: 9, letterSpacing: '0.2em', color: 'var(--green)', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid rgba(0,255,157,0.3)', paddingBottom: 2 }}>
              Access via Rockal →
            </Link>
          </div>
        </div>

        {/* Rockal trial card */}
        <div className="rockal-empire-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="status-dot-green" />
              <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase' }}>Rockal · Now Open for Trial</span>
            </div>
            <h3 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.1, fontFamily: "'Cormorant Garamond', serif" }}>
              Your first sign-on activates a 30-day trial.
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9, maxWidth: 520 }}>
              Rockal is the x3o.ai Command Center — full Empire MCP access, Trinity AI operators, Schedule AI, and real-time business intelligence. First-time sign-on gets the complete suite free for 30 days.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {['39 MCP Tools', 'Trinity AI', 'Schedule AI', 'Real-time Dashboard', 'No Credit Card'].map(t => (
                <span key={t} className="tag-green">{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 48, borderLeft: '1px solid rgba(0,255,157,0.15)', minWidth: 220 }}>
            <Link href="/rockal" className="rockal-empire-btn">
              ⚔️ Start Free Trial →
            </Link>
            <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>First sign-on only</span>
          </div>
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Portfolio ─────────────────────────── */}
      <section id="portfolio" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
            Venture Portfolio
          </h2>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            {verticals.reduce((acc, v) => acc + v.products.length, 0)} Products
          </span>
        </div>

        {/* Vertical Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(0,255,157,0.12)', marginBottom: 48 }}>
          {verticals.map(v => (
            <button
              key={v.id}
              onClick={() => setActiveVertical(v.id)}
              className={`vertical-tab-green ${activeVertical === v.id ? 'active' : ''}`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 48, letterSpacing: '0.03em', lineHeight: 1.7, maxWidth: 640 }}>
          {currentVertical.tagline}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 1 }}>
          {currentVertical.products.map(p => {
            const sc = statusConfig[p.status]
            return (
              <div key={p.name} className="product-card-green">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{p.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: sc.color, boxShadow: `0 0 6px ${sc.color}` }} />
                    <span style={{ fontSize: 9, letterSpacing: '0.15em', color: sc.color, textTransform: 'uppercase' }}>{sc.label}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 30, fontWeight: 600, color: 'var(--text)', marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>{p.name}</h3>
                <p style={{ fontSize: 10, color: p.accentColor, marginBottom: 16, letterSpacing: '0.05em' }}>{p.tagline}</p>
                <div style={{ height: 1, background: 'rgba(0,255,157,0.08)', marginBottom: 16 }} />
                <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 24 }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.tags.map(t => <span key={t} className="tag-green active">{t}</span>)}
                </div>
                {p.url !== '#' && (
                  <a href={p.url} target={p.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                    style={{ display: 'inline-flex', marginTop: 24, fontSize: 9, letterSpacing: '0.2em', color: p.accentColor, textDecoration: 'none', textTransform: 'uppercase', borderBottom: `1px solid ${p.accentColor}44`, paddingBottom: 2 }}>
                    {p.url === '/rockal' ? 'Start Trial →' : 'Visit →'}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Case Studies ──────────────────────── */}
      <section id="case-studies" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Case Studies</div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              Digital Transformation<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Partnerships</span>
            </h2>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 360, lineHeight: 1.8, textAlign: 'right' }}>
            We take traditional businesses and upgrade their entire operational engine — not a website refresh, a full stack modernization.
          </p>
        </div>

        {caseStudies.map((cs, idx) => (
          <div key={idx} className="case-study-card-green">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: cs.accentColor, textTransform: 'uppercase', marginBottom: 10 }}>
                  {cs.vertical} · {cs.location}
                </div>
                <h3 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em', fontFamily: "'Cormorant Garamond', serif" }}>
                  {cs.client}
                </h3>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 6 }}>
                  {cs.engagement}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 1 }}>
                {cs.results.map((r, i) => (
                  <div key={i} className="result-block-green">
                    <div style={{ fontSize: 34, fontWeight: 600, color: cs.accentColor, lineHeight: 1 }}>{r.metric}</div>
                    <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 8, maxWidth: 100 }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="two-col-grid" style={{ display: 'grid', gap: 48 }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 12 }}>Challenge</div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9 }}>{cs.challenge}</p>
              </div>
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 12 }}>Solution</div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9 }}>{cs.solution}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(0,255,157,0.08)' }}>
              {cs.tags.map(t => <span key={t} className="tag-green active">{t}</span>)}
            </div>
          </div>
        ))}
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Venture Audits ────────────────────── */}
      <section id="audits" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div className="two-col-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Technical Audit</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,60px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 24, fontFamily: "'Cormorant Garamond', serif" }}>
              Sonnier Ventures<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Modernization<br />Roadmap</span>
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: 32 }}>
              Describe your current software stack and the biggest operational bottleneck you&apos;re facing. We&apos;ll return a strategic Modernization Roadmap — not a list of tools, but a precise blueprint showing where custom AI automation will cut costs and drive revenue.
            </p>
            <div style={{ borderLeft: '2px solid rgba(0,255,157,0.2)', paddingLeft: 20 }}>
              {[
                'Stack analysis against current AI capabilities',
                'Identification of automation leverage points',
                'Revenue impact projections per change',
                'Prioritized implementation sequence',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <span style={{ color: 'var(--green)', fontSize: 10, marginTop: 2, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            {auditSubmitted ? (
              <div className="audit-form-green" style={{ textAlign: 'center', padding: '64px 40px' }}>
                <div style={{ fontSize: 32, color: 'var(--green)', marginBottom: 16 }}>⚔️</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Roadmap Request Received</div>
                <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.8 }}>
                  We&apos;ll review your stack and respond within 48 hours with your Modernization Roadmap.
                </p>
              </div>
            ) : (
              <div className="audit-form-green">
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 24 }}>// REQUEST_ROADMAP</div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Current Software Stack</label>
                  <textarea value={auditStack} onChange={e => setAuditStack(e.target.value)} placeholder="e.g. Shopify + spreadsheets for inventory, manual outreach via Gmail..." className="audit-input-green" rows={4} />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Biggest Operational Bottleneck</label>
                  <textarea value={auditProblem} onChange={e => setAuditProblem(e.target.value)} placeholder="e.g. We lose 3 hours/day to manual follow-up and have no visibility into why deals go cold..." className="audit-input-green" rows={4} />
                </div>
                <button
                  onClick={() => { if (auditStack.trim() && auditProblem.trim()) setAuditSubmitted(true) }}
                  className={`audit-submit-green ${auditStack.trim() && auditProblem.trim() ? 'ready' : ''}`}
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

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Founder Dispatch ──────────────────── */}
      <section id="dispatch" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Founder Updates</div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              Sonnier Ventures<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Dispatch</span>
            </h2>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 320, lineHeight: 1.8, textAlign: 'right' }}>
            Bi-weekly. Architectural decisions, LLM integration challenges, and the strategic reasoning behind every product move.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(420px,1fr))', gap: 1, marginBottom: 64 }}>
          {dispatchExcerpts.map((d, i) => (
            <div key={i} className="dispatch-card-green">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--green)', textTransform: 'uppercase' }}>{d.issue}</span>
                <span style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{d.date}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>{d.headline}</h3>
              <div style={{ height: 1, background: 'rgba(0,255,157,0.08)', marginBottom: 16 }} />
              <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: 24 }}>{d.excerpt}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {d.tags.map(t => <span key={t} className="tag-green">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="dispatch-signup-green">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 12 }}>// JOIN_DISPATCH</div>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: 440, margin: '0 auto' }}>
              Infrastructure insights, product architecture breakdowns, and founder strategy — direct from the venture studio.
            </p>
          </div>
          {dispatchJoined ? (
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--green)', textTransform: 'uppercase' }}>◆ You&apos;re on the list</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 0, maxWidth: 480, margin: '0 auto' }}>
              <input type="email" value={dispatchEmail} onChange={e => setDispatchEmail(e.target.value)} placeholder="your@email.com" className="dispatch-input-green" />
              <button onClick={() => { if (dispatchEmail.includes('@')) setDispatchJoined(true) }} className="dispatch-btn-green">Subscribe</button>
            </div>
          )}
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── About ─────────────────────────────── */}
      <section id="about" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div className="two-col-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>About</div>
            <h2 style={{ fontSize: 'clamp(36px,4vw,64px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.05, fontFamily: "'Cormorant Garamond', serif" }}>
              Self-taught.<br />
              Infrastructure-first.<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Always building.</span>
            </h2>
          </div>
          <div style={{ paddingTop: 8 }}>
            {[
              { label: 'Background',  text: '15+ years as an electrical contractor in railroad systems — IGBT inverter specialist. Self-taught developer since 1998. No degree, full stack.' },
              { label: 'Philosophy',  text: "Don't climb the AI maturity ladder — build the ladder. Every product starts from infrastructure and compounds into capability." },
              { label: 'Focus',       text: 'AI agent identity, MCP tooling, developer infrastructure, and vertical SaaS. Targeting $50M ARR across the Sonnier Ventures portfolio.' },
            ].map(item => (
              <div key={item.label} style={{ borderLeft: '1px solid rgba(0,255,157,0.15)', paddingLeft: 24, marginBottom: 32 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Contact ───────────────────────────── */}
      <section style={{ padding: '100px 48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
        <h2 style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 24, fontFamily: "'Cormorant Garamond', serif" }}>
          Let&apos;s build something.
        </h2>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Partnerships, investments, digital transformation contracts, or conversations about the future of AI infrastructure — reach out directly.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:shawn@sonnierventures.com"
            style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '16px 36px', textDecoration: 'none', borderRadius: 2, display: 'inline-block', fontWeight: 600 }}>
            shawn@sonnierventures.com
          </a>
          <Link href="/rockal"
            style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', border: '1px solid rgba(0,255,157,0.3)', padding: '16px 36px', textDecoration: 'none', borderRadius: 2, display: 'inline-block' }}>
            Start Rockal Trial →
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(0,255,157,0.1)', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>© 2026 Sonnier Ventures</span>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/rockal"
            style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--green)', textDecoration: 'none', textTransform: 'uppercase', opacity: 0.7 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
            Rockal ↗
          </Link>
          {allLiveProducts.filter(p => p.url.startsWith('http')).map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
              {p.name}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
