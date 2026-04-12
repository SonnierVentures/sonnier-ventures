'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

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
        description: 'Revenue Recovery AI — ghost client revival, conversation recovery, and instant waitlist slot filling. The Ferrari Engine for service businesses.',
        url: 'https://x3o.ai',
        status: 'live',
        tags: ['Revenue Recovery', 'AI Ops', 'Multi-tenant'],
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
  { value: '12 Wk',  label: 'Validation Sprint' },
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

const thesisVerticals = [
  {
    id: 'ai-infra',
    vertical: 'AI & Agent Infrastructure',
    conviction: 'Tier 1',
    thesis: 'The trust layer for autonomous systems is missing. Every enterprise deploying AI agents needs identity, compliance, and monetization rails — and will pay infrastructure-tier margins for them.',
    criteria: ['Agent identity / ERC-8004 alignment', 'MCP-native architecture', 'Enterprise compliance surface', '$1B+ TAM'],
    activeVentures: ['OpenConductor', 'Empire MCP'],
    accentColor: '#00ff9d',
  },
  {
    id: 'vertical-saas',
    vertical: 'Vertical SaaS',
    conviction: 'Tier 1',
    thesis: 'Generic horizontal SaaS is commoditizing. Deep vertical operators pay 3–5× for software built for their workflow — not adapted from someone else\'s.',
    criteria: ['Underserved operator vertical', 'High switching cost post-deployment', 'Recurring revenue + POS potential', '$500M+ TAM'],
    activeVentures: ['KeLatic', 'BookBasePro', 'ROIzen'],
    accentColor: '#f472b6',
  },
  {
    id: 'developer-tooling',
    vertical: 'Developer Tooling',
    conviction: 'Tier 2',
    thesis: 'Developer tools compound through network effects faster than any other category. One critical tool in a dev\'s workflow becomes the entry point to their entire stack.',
    criteria: ['Gap in existing OSS ecosystem', 'CLI / SDK distribution model', 'Freemium → enterprise path', 'Active developer community'],
    activeVentures: ['GodotForge', 'OpenConductor SDK'],
    accentColor: '#60a5fa',
  },
  {
    id: 'revenue-intelligence',
    vertical: 'Revenue Intelligence',
    conviction: 'Tier 2',
    thesis: 'SMBs are drowning in disconnected data. AI-native revenue attribution — surfacing hidden growth levers without a BI team — is a wedge into every operator\'s P&L.',
    criteria: ['SMB or mid-market focus', 'Data-network moat potential', 'AI-native (not bolted-on)', 'Upsell path to enterprise'],
    activeVentures: ['ROIzen', 'x3o.ai'],
    accentColor: '#fbbf24',
  },
]

const sprintStages = [
  {
    week: 'Wk 1–2',
    phase: 'Thesis Fit',
    gate: 'Maps to one of 4 verticals. TAM > $500M. Founder has unfair advantage.',
    deliverable: 'Vertical alignment memo + initial market sizing',
    killSignal: 'Vertical mismatch or insufficient TAM',
  },
  {
    week: 'Wk 3–4',
    phase: 'Problem Validation',
    gate: '20+ customer discovery interviews. Pain is acute, recurring, and budgeted.',
    deliverable: 'Discovery synthesis deck + ICP definition',
    killSignal: 'Pain is vitamin, not painkiller',
  },
  {
    week: 'Wk 5–8',
    phase: 'MVP on Forge Stack',
    gate: 'Working prototype on Empire MCP + Forge infra. No custom boilerplate.',
    deliverable: 'Deployed MVP with instrumented analytics',
    killSignal: 'Technical moat insufficient or team cannot execute',
  },
  {
    week: 'Wk 9–10',
    phase: 'First Signal',
    gate: '10 paying users or 3 signed pilot contracts. Retention > 40% at day 7.',
    deliverable: 'Revenue dashboard + retention cohort report',
    killSignal: 'No willingness to pay after 10 warm intros',
  },
  {
    week: 'Wk 11–12',
    phase: 'Kill or Fund',
    gate: 'Board decision. Series A path clear — or graceful shutdown initiated.',
    deliverable: 'Studio fund allocation or wind-down playbook',
    killSignal: 'Unit economics incompatible with 30–50% studio equity',
  },
]

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
  const [ventureConcept, setVentureConcept] = useState('')
  const [ventureVertical, setVentureVertical] = useState('')
  const [ventureBackground, setVentureBackground] = useState('')
  const [ventureStage, setVentureStage] = useState('')
  const [ventureSubmitted, setVentureSubmitted] = useState(false)

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
            { label: 'Architecture', href: '#architecture' },
            { label: 'Thesis',       href: '#thesis' },
            { label: 'Sprint',       href: '#sprint' },
            { label: 'Portfolio',    href: '#portfolio' },
            { label: 'SDK',          href: '#sdk' },
            { label: 'Apply',        href: '#apply' },
          ].map(item => (
            <a key={item.label} href={item.href}
              style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}>
              {item.label}
            </a>
          ))}
          <a href="#audits"
            style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '9px 18px', textDecoration: 'none', borderRadius: 2, fontWeight: 600, fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>
            Request Audit
          </a>
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
            Sonnier Ventures is a venture studio running a Core-and-Satellite model — Empire MCP infrastructure at the core, with specialized vertical platforms built, validated, and scaled around it.
          </p>

          {/* Primary CTAs */}
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
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

      {/* ── Studio Architecture ───────────────── */}
      <section id="architecture" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Core-and-Satellite Architecture</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              The Studio<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Platform.</span>
            </h2>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 400, lineHeight: 1.85, textAlign: 'right' }}>
              Not a project shop — a repeatable engine. Three interlocking components reduce time-to-launch for every new venture while compounding the studio&apos;s structural advantage.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2 }}>
          {[
            {
              code: '01',
              name: 'The Forge',
              subtitle: 'Shared Services Layer',
              description: 'Legal, HR, tech stack, and growth infrastructure shared across all ventures. Standardized playbooks compress time-to-launch and eliminate redundant overhead for every new satellite.',
              lever: 'Standardized playbooks → faster launches',
              tags: ['Legal', 'Tech Stack', 'Growth Ops', 'Empire MCP'],
            },
            {
              code: '02',
              name: 'The Capital Engine',
              subtitle: 'Funding & Financial Architecture',
              description: 'Internal balance-sheet funding transitioning to a dedicated Venture Studio Fund. 30–50% founding equity in exchange for Forge services. Secondary market liquidity built in parallel with portfolio growth.',
              lever: 'Balance-sheet → dedicated studio fund',
              tags: ['Internal Fund', 'External LPs', 'Secondary Markets'],
            },
            {
              code: '03',
              name: 'The Talent Bench',
              subtitle: 'Operator Pipeline',
              description: 'Entrepreneurs in Residence who take the CEO seat once a concept clears the 12-week validation sprint. The studio scales without the Founder&apos;s Trap — each venture gets a dedicated operator.',
              lever: 'EIR pipeline → decoupled growth',
              tags: ['EIRs', 'Fractional Leadership', 'Operator Network'],
            },
          ].map((component, i) => (
            <div key={i} style={{
              padding: '48px 36px',
              borderRight: i < 2 ? '1px solid rgba(0,255,157,0.1)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(0,255,157,0.3)', fontFamily: "'DM Mono', monospace" }}>{component.code}</span>
                <div className="status-dot-green" style={{ width: 5, height: 5 }} />
              </div>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 600, color: 'var(--text)', marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>{component.name}</h3>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--green)', textTransform: 'uppercase' }}>{component.subtitle}</div>
              </div>
              <div style={{ height: 1, background: 'rgba(0,255,157,0.08)' }} />
              <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.85, flex: 1 }}>{component.description}</p>
              <div style={{ borderLeft: '2px solid rgba(0,255,157,0.2)', paddingLeft: 12 }}>
                <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: "'DM Mono', monospace" }}>{component.lever}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {component.tags.map(t => <span key={t} className="tag-green">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Investment Thesis ─────────────────── */}
      <section id="thesis" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Phase I · Investment Thesis</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              Four verticals.<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Deep conviction.</span>
            </h2>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 400, lineHeight: 1.85, textAlign: 'right' }}>
              We don&apos;t chase trends — we place high-conviction bets in markets where we already hold structural advantage. Every satellite venture must map to one of four thesis areas before entering the sprint.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 1, border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2 }}>
          {thesisVerticals.map((tv, i) => (
            <div key={tv.id} style={{
              padding: '48px 36px',
              borderRight: i < thesisVerticals.length - 1 ? '1px solid rgba(0,255,157,0.1)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 24,
              borderBottom: 'none',
            }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: tv.conviction === 'Tier 1' ? 'var(--green)' : 'var(--text-dim)',
                  border: `1px solid ${tv.conviction === 'Tier 1' ? 'rgba(0,255,157,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  padding: '4px 10px', borderRadius: 2, whiteSpace: 'nowrap',
                }}>
                  {tv.conviction}
                </div>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: tv.accentColor, boxShadow: `0 0 8px ${tv.accentColor}`, flexShrink: 0, marginTop: 4 }} />
              </div>

              {/* Vertical name */}
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2, fontFamily: "'Cormorant Garamond', serif", marginBottom: 6 }}>{tv.vertical}</h3>
              </div>

              <div style={{ height: 1, background: 'rgba(0,255,157,0.08)' }} />

              {/* Thesis */}
              <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.85, flex: 1 }}>{tv.thesis}</p>

              {/* Criteria */}
              <div>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(0,255,157,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>Entry Criteria</div>
                {tv.criteria.map(c => (
                  <div key={c} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: tv.accentColor, fontSize: 9, flexShrink: 0, marginTop: 3 }}>◆</span>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.6 }}>{c}</span>
                  </div>
                ))}
              </div>

              {/* Active ventures */}
              <div style={{ paddingTop: 16, borderTop: '1px solid rgba(0,255,157,0.06)' }}>
                <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(0,255,157,0.4)', textTransform: 'uppercase', marginBottom: 10 }}>Active Satellites</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {tv.activeVentures.map(v => (
                    <span key={v} style={{ fontSize: 9, letterSpacing: '0.1em', color: tv.accentColor, border: `1px solid ${tv.accentColor}33`, padding: '3px 10px', borderRadius: 2 }}>{v}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── 12-Week Validation Sprint ─────────── */}
      <section id="sprint" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Phase I · Validation Sprint</div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              12 weeks.<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Kill or fund.</span>
            </h2>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 400, lineHeight: 1.85, textAlign: 'right' }}>
            Every idea enters the same fixed-duration process. No zombie projects. No indefinite runways. At week 12, the decision is binary — studio capital or graceful shutdown.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 28, left: 28, right: 28, height: 1, background: 'rgba(0,255,157,0.12)', zIndex: 0 }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 1, position: 'relative', zIndex: 1 }}>
            {sprintStages.map((stage, i) => (
              <div key={stage.phase} style={{ background: 'var(--bg)', border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Stage dot + week */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                    background: i === sprintStages.length - 1 ? 'var(--green)' : 'rgba(0,255,157,0.2)',
                    border: '1px solid rgba(0,255,157,0.4)',
                    boxShadow: i === sprintStages.length - 1 ? '0 0 12px rgba(0,255,157,0.6)' : 'none',
                  }} />
                  <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--green)', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>{stage.week}</span>
                </div>

                {/* Phase name */}
                <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.2 }}>{stage.phase}</h3>

                <div style={{ height: 1, background: 'rgba(0,255,157,0.08)' }} />

                {/* Gate */}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(0,255,157,0.5)', textTransform: 'uppercase', marginBottom: 6 }}>Gate</div>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.75 }}>{stage.gate}</p>
                </div>

                {/* Deliverable */}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(0,255,157,0.5)', textTransform: 'uppercase', marginBottom: 6 }}>Deliverable</div>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.75 }}>{stage.deliverable}</p>
                </div>

                {/* Kill signal */}
                <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,100,100,0.08)' }}>
                  <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(255,100,100,0.5)', textTransform: 'uppercase', marginBottom: 6 }}>Kill Signal</div>
                  <p style={{ fontSize: 10, color: 'rgba(255,150,150,0.5)', lineHeight: 1.75 }}>{stage.killSignal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, padding: '32px 36px', border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Ready to enter the sprint?</div>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.7 }}>Applications reviewed on a rolling basis. We respond within 5 business days.</p>
          </div>
          <a href="#apply" style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '13px 28px', textDecoration: 'none', borderRadius: 2, fontWeight: 600, fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>
            Apply to the Studio →
          </a>
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
            <a href="https://openconductor.io" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', marginTop: 20, fontSize: 9, letterSpacing: '0.2em', color: 'var(--green)', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid rgba(0,255,157,0.3)', paddingBottom: 2 }}>
              OpenConductor Registry →
            </a>
          </div>
        </div>

        {/* Local outreach / custom build card */}
        <div className="rockal-empire-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="status-dot-green" />
              <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase' }}>Custom Agentic Platform Builds · Now Accepting Clients</span>
            </div>
            <h3 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.1, fontFamily: "'Cormorant Garamond', serif" }}>
              We build the AI infrastructure.<br />You run the business.
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9, maxWidth: 520 }}>
              KeLatic went from manual operations to a fully autonomous booking, CRM, and revenue engine — powered by Empire MCP. We replicate that architecture for local service businesses ready to operate at a different level.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {['Empire MCP v2', 'Trinity AI', 'Booking Automation', 'SMS & CRM', 'Custom Build'].map(t => (
                <span key={t} className="tag-green">{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 48, borderLeft: '1px solid rgba(0,255,157,0.15)', minWidth: 220 }}>
            <a href="#audits" className="rockal-empire-btn">
              ⚔️ Request an Audit →
            </a>
            <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Response within 48 hours</span>
          </div>
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Studio-in-a-Box SDK ───────────────── */}
      <section id="sdk" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>OpenConductor SDK · 1,200+ Developers</div>
            <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
              Studio-in-a-Box.<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Build on our stack.</span>
            </h2>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', maxWidth: 380, lineHeight: 1.85, textAlign: 'right' }}>
            The same infrastructure powering every Sonnier venture — now available to developers building the next wave of AI agents. No boilerplate. No trust stack from scratch. Just ship.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 1, border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2 }}>
          {/* Feature list */}
          <div style={{ padding: '48px 40px', borderRight: '1px solid rgba(0,255,157,0.1)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 32 }}>// WHAT_YOU_GET</div>
            {[
              { name: 'Empire MCP v2',         desc: '39 production tools across Supabase, Stripe, Vercel, and GitHub — one SDK, zero glue code.' },
              { name: 'ERC-8004 Trust Stack',   desc: 'Cryptographic agent identity on Base. EU AI Act compliance rails included from day one.' },
              { name: 'Trinity AI Suite',       desc: 'Oracle (reasoning), Sentinel (guard rails), and Sage (memory) — wired and production-ready.' },
              { name: 'One-Line Monetization',  desc: 'Stripe-native billing for your AI tools. Metered, subscription, or usage-based — your choice.' },
              { name: 'MCP Registry Access',    desc: 'Publish and discover MCP servers. First-class listing on OpenConductor.io with 1,200+ devs.' },
              { name: 'Schedule AI',            desc: 'Cron-based agent orchestration. Fire agents on a schedule, not just on-demand triggers.' },
            ].map((f, i, arr) => (
              <div key={f.name} style={{ display: 'flex', gap: 16, marginBottom: i < arr.length - 1 ? 24 : 0, paddingBottom: i < arr.length - 1 ? 24 : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(0,255,157,0.06)' : 'none' }}>
                <span style={{ color: 'var(--green)', fontSize: 10, flexShrink: 0, marginTop: 3 }}>◆</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.75 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quickstart + CTA */}
          <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase' }}>// QUICKSTART</div>

            {/* Terminal block */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,255,157,0.12)', borderRadius: 2, padding: '28px 24px', fontFamily: "'DM Mono', monospace", flex: 1 }}>
              <div style={{ color: 'rgba(0,255,157,0.4)', fontSize: 9, letterSpacing: '0.15em', marginBottom: 20 }}>TERMINAL</div>
              <div style={{ fontSize: 11, lineHeight: 2 }}>
                <div><span style={{ color: 'rgba(0,255,157,0.5)' }}>$</span><span style={{ color: '#60a5fa' }}> npm install </span><span style={{ color: 'var(--text-dim)' }}>@openconductor/sdk</span></div>
              </div>
              <div style={{ height: 1, background: 'rgba(0,255,157,0.08)', margin: '20px 0' }} />
              <div style={{ fontSize: 10, lineHeight: 2.1, color: 'var(--text-dim)' }}>
                <div><span style={{ color: '#a78bfa' }}>import</span>{' { EmpireMCP } '}<span style={{ color: '#a78bfa' }}>from</span>{' '}<span style={{ color: '#fbbf24' }}>&apos;@openconductor/sdk&apos;</span></div>
                <div style={{ marginTop: 8 }}><span style={{ color: '#a78bfa' }}>const</span>{' empire = '}<span style={{ color: '#60a5fa' }}>new EmpireMCP</span>{'({'}</div>
                <div style={{ paddingLeft: 20 }}><span style={{ color: '#f472b6' }}>agentId</span>{': '}<span style={{ color: '#fbbf24' }}>&apos;erc8004:your-agent&apos;</span><span style={{ color: 'rgba(0,255,157,0.4)' }}>,  </span><span style={{ color: 'rgba(0,255,157,0.4)', fontSize: 9 }}>// verified identity</span></div>
                <div style={{ paddingLeft: 20 }}><span style={{ color: '#f472b6' }}>tools</span>{': ['}<span style={{ color: '#fbbf24' }}>&apos;stripe&apos;</span>{', '}<span style={{ color: '#fbbf24' }}>&apos;supabase&apos;</span>{', '}<span style={{ color: '#fbbf24' }}>&apos;trinity&apos;</span>{'],'}</div>
                <div>{'}'}</div>
                <div style={{ marginTop: 8 }}><span style={{ color: '#a78bfa' }}>await</span>{' empire.tools.'}<span style={{ color: '#60a5fa' }}>stripe</span>{'.charge({'}</div>
                <div style={{ paddingLeft: 20 }}><span style={{ color: '#f472b6' }}>amount</span>{': '}<span style={{ color: '#fbbf24' }}>2900</span>{', '}<span style={{ color: '#f472b6' }}>currency</span>{': '}<span style={{ color: '#fbbf24' }}>&apos;usd&apos;</span></div>
                <div>{'}) '}<span style={{ color: 'rgba(0,255,157,0.4)', fontSize: 9 }}>// → billed, logged, compliant</span></div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 0, border: '1px solid rgba(0,255,157,0.1)', borderRadius: 2 }}>
              {[
                { value: '1,200+', label: 'Developers' },
                { value: '39',     label: 'MCP Tools' },
                { value: '1-line', label: 'Monetization' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: '20px 16px', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(0,255,157,0.1)' : 'none' }}>
                  <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--green)', fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://openconductor.io" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '13px 24px', textDecoration: 'none', borderRadius: 2, fontWeight: 600, fontFamily: "'DM Mono', monospace", whiteSpace: 'nowrap' }}>
                Get SDK Access →
              </a>
              <a href="https://openconductor.io" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', border: '1px solid rgba(0,255,157,0.2)', padding: '13px 24px', textDecoration: 'none', borderRadius: 2, transition: 'all .2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--green)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,255,157,0.5)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dim)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,255,157,0.2)' }}>
                View Documentation →
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── Portfolio ─────────────────────────── */}
      <section id="portfolio" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
            Satellite Portfolio
          </h2>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            {verticals.reduce((acc, v) => acc + v.products.length, 0)} Ventures
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 48, lineHeight: 1.8, maxWidth: 600 }}>
          Each venture orbits the Empire MCP core — sharing Forge infrastructure, cross-feeding each other&apos;s distribution. Venture A&apos;s data platform becomes Venture B&apos;s first customer. This is the Ecosystem Loop.
        </p>

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
                    {'Visit →'}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider-green" style={{ margin: '0 48px' }} />

      {/* ── The Newman Rule ───────────────────── */}
      <section style={{ padding: '80px 48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(0,255,157,0.4)', textTransform: 'uppercase', marginBottom: 28 }}>The Newman Rule</div>
          <blockquote style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.35, letterSpacing: '-0.01em', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', margin: 0, borderLeft: 'none' }}>
            "Real power isn&apos;t in running one company — it&apos;s in owning the infrastructure that allows{' '}
            <em style={{ color: 'var(--green)', fontWeight: 600, fontStyle: 'normal' }}>dozens of companies</em>{' '}
            to thrive."
          </blockquote>
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

      {/* ── Venture Application ───────────────── */}
      <section id="apply" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div className="two-col-grid" style={{ display: 'grid', gap: 80, alignItems: 'start' }}>
          {/* Left: pitch */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 16 }}>Apply · For Founders & EIRs</div>
            <h2 style={{ fontSize: 'clamp(32px,4vw,60px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 24, fontFamily: "'Cormorant Garamond', serif" }}>
              Enter the<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>12-Week Sprint.</span>
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: 32 }}>
              If your concept maps to one of our four thesis verticals and you&apos;re ready to build on the Forge stack, apply below. We provide capital, shared services, and the operator infrastructure — you bring the domain insight and the will to execute.
            </p>
            <div style={{ borderLeft: '2px solid rgba(0,255,157,0.2)', paddingLeft: 20 }}>
              {[
                'Studio capital for the full 12-week sprint',
                'Forge access — Empire MCP, legal, HR, growth infra',
                'Fractional CMO, CTO, and CFO from day one',
                '30–50% founding equity in exchange for studio resources',
                'Series A graduation path on sprint completion',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <span style={{ color: 'var(--green)', fontSize: 10, marginTop: 2, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {ventureSubmitted ? (
              <div className="audit-form-green" style={{ textAlign: 'center', padding: '64px 40px' }}>
                <div style={{ fontSize: 32, color: 'var(--green)', marginBottom: 16 }}>◆</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Application Received</div>
                <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.8 }}>
                  We review applications on a rolling basis and respond within 5 business days. If your thesis fits, we&apos;ll schedule a 30-minute intro call.
                </p>
              </div>
            ) : (
              <div className="audit-form-green">
                <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 24 }}>// APPLY_TO_STUDIO</div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Venture Concept</label>
                  <textarea
                    value={ventureConcept}
                    onChange={e => setVentureConcept(e.target.value)}
                    placeholder="Describe the problem you're solving, who it's for, and why now..."
                    className="audit-input-green"
                    rows={4}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Target Thesis Vertical</label>
                  <select
                    value={ventureVertical}
                    onChange={e => setVentureVertical(e.target.value)}
                    className="audit-input-green"
                    aria-label="Target thesis vertical"
                    style={{ width: '100%', cursor: 'pointer' }}
                  >
                    <option value="">Select a vertical...</option>
                    {thesisVerticals.map(tv => (
                      <option key={tv.id} value={tv.id}>{tv.vertical} ({tv.conviction})</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Current Stage</label>
                  <select
                    value={ventureStage}
                    onChange={e => setVentureStage(e.target.value)}
                    className="audit-input-green"
                    aria-label="Current venture stage"
                    style={{ width: '100%', cursor: 'pointer' }}
                  >
                    <option value="">Select your stage...</option>
                    <option value="idea">Idea — no code yet</option>
                    <option value="prototype">Prototype — working demo</option>
                    <option value="mvp">MVP — early users or revenue</option>
                    <option value="eir">EIR — looking for the right concept</option>
                  </select>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Your Unfair Advantage</label>
                  <textarea
                    value={ventureBackground}
                    onChange={e => setVentureBackground(e.target.value)}
                    placeholder="Domain expertise, existing network, technical depth, prior traction — what makes you the right person to build this?"
                    className="audit-input-green"
                    rows={3}
                  />
                </div>

                <button
                  onClick={() => {
                    if (ventureConcept.trim() && ventureVertical && ventureStage && ventureBackground.trim())
                      setVentureSubmitted(true)
                  }}
                  className={`audit-submit-green ${ventureConcept.trim() && ventureVertical && ventureStage && ventureBackground.trim() ? 'ready' : ''}`}
                >
                  Submit Application →
                </button>
                <p style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', marginTop: 16, textAlign: 'center' }}>
                  Rolling review. Response within 5 business days.
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
              Platform<br />
              over project.<br />
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Infrastructure first.</span>
            </h2>
          </div>
          <div style={{ paddingTop: 8 }}>
            {[
              { label: 'Background',  text: '15+ years as an electrical contractor in railroad systems — IGBT inverter specialist. Self-taught developer since 1998. No degree, full stack.' },
              { label: 'Philosophy',  text: "The Chairman doesn't do the grinding — he steers. Build the infrastructure once, then own the layer that lets a dozen companies compound above it. Every Sonnier venture inherits the Forge so it can focus entirely on product-market fit." },
              { label: 'Focus',       text: 'AI agent identity, MCP tooling, and vertical SaaS across 3–4 high-conviction verticals. Phase I: institutionalizing the Sonnier Alpha. End state: Ecosystem Loop compounding toward $50M ARR across the satellite portfolio.' },
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
          Custom agentic platform builds, digital transformation contracts, partnerships, or conversations about AI infrastructure — reach out directly.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:shawn@sonnierventures.com"
            style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '16px 36px', textDecoration: 'none', borderRadius: 2, display: 'inline-block', fontWeight: 600 }}>
            shawn@sonnierventures.com
          </a>
          <a href="#audits"
            style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', border: '1px solid rgba(0,255,157,0.3)', padding: '16px 36px', textDecoration: 'none', borderRadius: 2, display: 'inline-block' }}>
            Request an Audit →
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(0,255,157,0.1)', padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>© 2026 Sonnier Ventures</span>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
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
