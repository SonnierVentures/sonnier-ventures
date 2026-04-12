/**
 * Forge Starter — default landing page
 * Replace this with your venture's homepage.
 * The Forge stack (Supabase, Stripe, Empire MCP) is pre-wired in /lib.
 */

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 24 }}>
          Forge Starter · Sonnier Ventures
        </div>
        <h1 style={{ fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, color: 'var(--text)', lineHeight: 1, marginBottom: 24 }}>
          Your venture<br />
          <span style={{ color: 'var(--green)', fontWeight: 600 }}>starts here.</span>
        </h1>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.9, marginBottom: 40 }}>
          Supabase, Stripe, Empire MCP, and Trinity AI are wired and ready.
          Set your env vars, rename this page, and ship.
        </p>
        <a
          href="https://sonnierventures.com#forge"
          style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--green)', padding: '13px 28px', textDecoration: 'none', borderRadius: 2, fontWeight: 600 }}
        >
          View Forge Docs →
        </a>
      </div>
    </main>
  )
}
