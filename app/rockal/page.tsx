'use client'
import { useState } from 'react'
import Link from 'next/link'

const FEATURES = [
  { icon: '⚔️', label: 'Empire MCP',       desc: '39 tools across 8 services in one orchestration layer' },
  { icon: '🔮', label: 'Trinity Oracle',   desc: 'AI analysis, prediction, and decision support' },
  { icon: '🛡', label: 'Sentinel Guard',   desc: 'Continuous monitoring and proactive alerts' },
  { icon: '📖', label: 'Sage Intelligence',desc: 'Cross-project context aggregation and learning' },
  { icon: '📅', label: 'Schedule AI',      desc: 'Intelligent scheduling with Notion & Google Cal sync' },
  { icon: '💡', label: 'Command Center',   desc: 'Bloomberg Terminal-style business intelligence dashboard' },
]

const TRIAL_ITEMS = [
  'Full Empire MCP access — all 39 tools',
  'Trinity AI suite (Oracle, Sentinel, Sage)',
  'Schedule AI with calendar integrations',
  'Supabase + Stripe infrastructure layer',
  'Unlimited AI Operator chat sessions',
  'Dedicated onboarding session',
]

type Step = 'form' | 'confirm'

export default function RockalTrialPage() {
  const [step, setStep]       = useState<Step>('form')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [company, setCompany] = useState('')
  const [useCase, setUseCase] = useState('')
  const [plan, setPlan]       = useState<'solo' | 'team'>('solo')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = name.trim() && email.includes('@') && useCase.trim()

  const handleSubmit = async () => {
    if (!isValid) { setError('Please fill in all required fields.'); return }
    setLoading(true)
    setError('')
    // Simulate API call — wire to your auth/signup endpoint
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setStep('confirm')
  }

  if (step === 'confirm') {
    return (
      <div className="rockal-page">
        <div className="grain-overlay" />
        <div className="grid-bg-green" />

        <nav className="rockal-nav">
          <Link href="/" className="rockal-nav-logo">Sonnier Ventures</Link>
          <span className="rockal-badge">Rockal · Beta</span>
        </nav>

        <div className="rockal-confirm-wrap">
          <div className="rockal-confirm-card">
            <div style={{ fontSize: 48, marginBottom: 20 }}>⚔️</div>
            <div className="rockal-confirm-status">// ACCESS_GRANTED</div>
            <h2 className="rockal-confirm-heading">You&apos;re in.</h2>
            <p className="rockal-confirm-sub">
              Your 30-day Rockal trial has been activated. Check <strong>{email}</strong> for onboarding instructions within the next 10 minutes.
            </p>
            <div className="rockal-confirm-details">
              <div className="rockal-detail-row">
                <span>Plan</span>
                <span style={{ color: '#00ff9d' }}>{plan === 'solo' ? 'Solo Operator' : 'Team'} — 30-Day Trial</span>
              </div>
              <div className="rockal-detail-row">
                <span>Trial Ends</span>
                <span style={{ color: '#00ff9d' }}>
                  {new Date(Date.now() + 30*864e5).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="rockal-detail-row">
                <span>Access Level</span>
                <span style={{ color: '#00ff9d' }}>Full Empire MCP Suite</span>
              </div>
            </div>
            <a href="mailto:shawn@sonnierventures.com" className="rockal-submit-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 24 }}>
              Contact Onboarding →
            </a>
            <Link href="/" className="rockal-back-link">← Back to Sonnier Ventures</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rockal-page">
      <div className="grain-overlay" />
      <div className="grid-bg-green" />
      <div className="scanline-green" />

      {/* Nav */}
      <nav className="rockal-nav">
        <Link href="/" className="rockal-nav-logo">Sonnier Ventures</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="rockal-badge">Rockal · Beta</span>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(0,255,157,0.5)', textTransform: 'uppercase' }}>
            30-Day Free Trial
          </span>
        </div>
      </nav>

      <div className="rockal-layout">
        {/* ── Left: Value Prop ── */}
        <div className="rockal-left">
          <div className="rockal-eyebrow">// ROCKAL · AI COMMAND CENTER</div>
          <h1 className="rockal-heading">
            The operator&apos;s<br />
            <span className="rockal-heading-accent">command layer.</span>
          </h1>
          <p className="rockal-desc">
            Rockal is the x3o.ai Command Center — a Bloomberg Terminal-style interface backed by Empire MCP. 39 tools, 6 AI operators, real-time intelligence. Built for founders and operators who want signal, not noise.
          </p>

          {/* Feature List */}
          <div className="rockal-features">
            {FEATURES.map(f => (
              <div key={f.label} className="rockal-feature-row">
                <span className="rockal-feature-icon">{f.icon}</span>
                <div>
                  <div className="rockal-feature-label">{f.label}</div>
                  <div className="rockal-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trial Includes */}
          <div className="rockal-trial-box">
            <div className="rockal-trial-header">// 30-DAY TRIAL INCLUDES</div>
            {TRIAL_ITEMS.map(item => (
              <div key={item} className="rockal-trial-item">
                <span style={{ color: '#00ff9d', marginRight: 10 }}>◆</span>
                {item}
              </div>
            ))}
            <div className="rockal-trial-note">No credit card required. Cancel anytime.</div>
          </div>
        </div>

        {/* ── Right: Sign-up Form ── */}
        <div className="rockal-right">
          <div className="rockal-form-card">
            <div className="rockal-form-header">
              <div className="rockal-form-eyebrow">// INITIATE_TRIAL</div>
              <h2 className="rockal-form-heading">Start Your 30-Day Trial</h2>
              <p className="rockal-form-sub">Full access. No credit card. Cancel any time.</p>
            </div>

            {/* Plan Select */}
            <div className="rockal-plan-toggle">
              {(['solo', 'team'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`rockal-plan-btn ${plan === p ? 'active' : ''}`}
                >
                  {p === 'solo' ? 'Solo Operator' : 'Team (2–10)'}
                </button>
              ))}
            </div>

            <div className="rockal-form-fields">
              <div className="rockal-field">
                <label className="rockal-label">Full Name <span style={{ color: '#00ff9d' }}>*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Shawn Sonnier"
                  className="rockal-input"
                />
              </div>
              <div className="rockal-field">
                <label className="rockal-label">Email Address <span style={{ color: '#00ff9d' }}>*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@yourcompany.com"
                  className="rockal-input"
                />
              </div>
              <div className="rockal-field">
                <label className="rockal-label">Company / Project</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Optional — helps us onboard faster"
                  className="rockal-input"
                />
              </div>
              <div className="rockal-field">
                <label className="rockal-label">Primary Use Case <span style={{ color: '#00ff9d' }}>*</span></label>
                <textarea
                  value={useCase}
                  onChange={e => setUseCase(e.target.value)}
                  placeholder="e.g. I want to automate my business intelligence pipeline and connect AI tools to my Supabase backend..."
                  className="rockal-input rockal-textarea"
                  rows={3}
                />
              </div>
            </div>

            {error && (
              <div className="rockal-error">{error}</div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className={`rockal-submit-btn ${isValid ? 'ready' : ''}`}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="rockal-spinner" />
                  Activating Trial...
                </span>
              ) : (
                '⚔️  Activate 30-Day Rockal Trial →'
              )}
            </button>

            <p className="rockal-form-legal">
              By starting your trial you agree to be contacted by the Sonnier Ventures team for onboarding. No spam. No credit card.
            </p>

            {/* Social proof */}
            <div className="rockal-social-proof">
              <div className="rockal-proof-row">
                <span className="rockal-proof-dot" />
                <span>x3o.ai command center — live infrastructure</span>
              </div>
              <div className="rockal-proof-row">
                <span className="rockal-proof-dot" />
                <span>KeLatic Hair Lounge — deployed & scaling</span>
              </div>
              <div className="rockal-proof-row">
                <span className="rockal-proof-dot" />
                <span>Empire MCP v2 — 39 tools in production</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
