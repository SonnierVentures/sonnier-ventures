'use client'
import { useEffect, useState } from 'react'

const products = [
  { name:'OpenConductor', category:'AI Infrastructure', tagline:'Trust Stack for Autonomous AI Agents', description:'MCP server registry and identity layer. ERC-8004 agent identity on Base, EU AI Act compliance rails, and one-line monetization for AI tooling.', url:'https://openconductor.io', status:'live', tags:['MCP Registry','Trust Stack','ERC-8004'], accentColor:'#00FFB2' },
  { name:'GodotForge', category:'Developer Tooling', tagline:'Managed CI/CD for Godot Engine', description:'Build, test, and deploy Godot games in the cloud. Fills the gap left by the W4 Build shutdown. Built for indie studios and solo devs who ship fast.', url:'https://godotforge.io', status:'live', tags:['CI/CD','Godot 4','Game Dev'], accentColor:'#00C2FF' },
  { name:'SportIntel', category:'Analytics Platform', tagline:'Real-Time Sports Analytics & Odds Intelligence', description:'Live odds aggregation, arbitrage detection, and steam move alerts across major sportsbooks. Bloomberg Terminal aesthetics for serious bettors.', url:'#', status:'building', tags:['Live Odds','Arbitrage','DFS'], accentColor:'#A259FF' },
  { name:'x3o.ai', category:'Command Center', tagline:'AI-Powered Business Intelligence Dashboard', description:'Bloomberg Terminal-style SaaS command center. Multi-tenant, real-time, built for operators who want signal not noise.', url:'#', status:'building', tags:['SaaS','AI Ops','Dashboard'], accentColor:'#FF9500' },
  { name:'KeLatic Systems', category:'Vertical SaaS', tagline:'Full-Stack Technology for Salons & Studios', description:'End-to-end booking, CRM, SMS marketing, and POS for specialty hair studios. Built for KeLatic Hair Lounge — now a replicable platform.', url:'#', status:'deployed', tags:['Booking','Twilio','Stripe Terminal'], accentColor:'#FF6B9D' },
]
const stats = [
  { value:'5+', label:'Products Shipped' },
  { value:'15+', label:'Years in Field' },
  { value:'$500K', label:'Prior Revenue Built' },
  { value:'Level 5', label:'AI Maturity' },
]
const statusConfig: Record<string,{label:string;color:string}> = {
  live:     { label:'Live',     color:'#00FFB2' },
  deployed: { label:'Deployed', color:'#00C2FF' },
  building: { label:'Building', color:'#C9A84C' },
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{position:'relative',minHeight:'100vh'}}>
      <div className="grain-overlay"/>
      <div className="grid-bg"/>
      <div className="scanline"/>

      {/* Nav */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'20px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(201,168,76,0.08)',backdropFilter:'blur(20px)',background:'rgba(8,8,16,0.8)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="status-dot"/>
          <span style={{fontSize:11,letterSpacing:'0.2em',color:'var(--gold)',textTransform:'uppercase'}}>Sonnier Ventures</span>
        </div>
        <div style={{display:'flex',gap:32}}>
          {['Products','About','Contact'].map(item=>(
            <a key={item} href={`#${item.toLowerCase()}`} style={{fontSize:10,letterSpacing:'0.15em',color:'var(--text-dim)',textDecoration:'none',textTransform:'uppercase'}}>{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',padding:'0 48px',position:'relative',zIndex:1}}>
        <div style={{fontSize:10,letterSpacing:'0.3em',color:'var(--gold)',textTransform:'uppercase',marginBottom:24}}>Houston, TX · Est. 2024</div>
        <h1 style={{fontSize:'clamp(52px,8vw,112px)',fontWeight:300,lineHeight:0.92,color:'var(--text)',letterSpacing:'-0.02em',maxWidth:900}}>
          Building the<br/>
          <span style={{color:'var(--gold)',fontWeight:600}}>infrastructure</span><br/>
          layer for AI.
        </h1>
        <p style={{fontSize:13,color:'var(--text-dim)',marginTop:32,maxWidth:480,lineHeight:1.8}}>
          Sonnier Ventures is a one-person holding company building AI infrastructure, developer tooling, and vertical SaaS — from agent identity layers to game dev CI/CD pipelines.
        </p>
        <div style={{display:'flex',gap:16,marginTop:48}}>
          <a href="#products" style={{fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--bg)',background:'var(--gold)',padding:'14px 28px',textDecoration:'none',borderRadius:1}}>View Portfolio</a>
          <a href="#contact" style={{fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',border:'1px solid var(--gold-dim)',padding:'14px 28px',textDecoration:'none',borderRadius:1}}>Get in Touch</a>
        </div>
        <div style={{position:'absolute',bottom:48,left:48,display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:1,height:48,background:'linear-gradient(to bottom,transparent,var(--gold))'}}/>
          <span style={{fontSize:9,letterSpacing:'0.3em',color:'var(--text-dim)',textTransform:'uppercase',writingMode:'vertical-rl'}}>Scroll</span>
        </div>
      </section>

      <div className="divider" style={{margin:'0 48px'}}/>

      {/* Stats */}
      <section style={{padding:'80px 48px',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',border:'1px solid var(--border)',borderRadius:2}}>
          {stats.map((s,i)=>(
            <div key={i} style={{padding:'40px 32px',borderRight:i<3?'1px solid var(--border)':'none',textAlign:'center'}}>
              <div style={{fontSize:48,fontWeight:600,color:'var(--gold)',lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:9,letterSpacing:'0.2em',color:'var(--text-dim)',textTransform:'uppercase',marginTop:10}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{margin:'0 48px'}}/>

      {/* Products */}
      <section id="products" style={{padding:'100px 48px',position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:64}}>
          <h2 style={{fontSize:'clamp(36px,5vw,72px)',fontWeight:300,color:'var(--text)',letterSpacing:'-0.02em'}}>Portfolio</h2>
          <span style={{fontSize:10,letterSpacing:'0.2em',color:'var(--text-dim)',textTransform:'uppercase'}}>{products.length} Products</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:1}}>
          {products.map(p=>{
            const sc=statusConfig[p.status]
            return (
              <div key={p.name} className="product-card">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
                  <span style={{fontSize:9,letterSpacing:'0.2em',color:'var(--text-dim)',textTransform:'uppercase'}}>{p.category}</span>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <div style={{width:5,height:5,borderRadius:'50%',background:sc.color,boxShadow:`0 0 6px ${sc.color}`}}/>
                    <span style={{fontSize:9,letterSpacing:'0.15em',color:sc.color,textTransform:'uppercase'}}>{sc.label}</span>
                  </div>
                </div>
                <h3 style={{fontSize:32,fontWeight:600,color:'var(--text)',marginBottom:6}}>{p.name}</h3>
                <p style={{fontSize:10,color:p.accentColor,marginBottom:16,letterSpacing:'0.05em'}}>{p.tagline}</p>
                <div style={{height:1,background:'var(--border)',marginBottom:16}}/>
                <p style={{fontSize:11,color:'var(--text-dim)',lineHeight:1.8,marginBottom:24}}>{p.description}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {p.tags.map(t=><span key={t} className="tag active">{t}</span>)}
                </div>
                {p.url!=='#'&&<a href={p.url} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',marginTop:24,fontSize:9,letterSpacing:'0.2em',color:p.accentColor,textDecoration:'none',textTransform:'uppercase',borderBottom:`1px solid ${p.accentColor}44`,paddingBottom:2}}>Visit →</a>}
              </div>
            )
          })}
        </div>
      </section>

      <div className="divider" style={{margin:'0 48px'}}/>

      {/* About */}
      <section id="about" style={{padding:'100px 48px',position:'relative',zIndex:1}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
          <div>
            <div style={{fontSize:10,letterSpacing:'0.3em',color:'var(--gold)',textTransform:'uppercase',marginBottom:16}}>About</div>
            <h2 style={{fontSize:'clamp(36px,4vw,64px)',fontWeight:300,color:'var(--text)',letterSpacing:'-0.02em',lineHeight:1.05}}>
              Self-taught.<br/>Infrastructure-first.<br/><span style={{color:'var(--gold)',fontWeight:600}}>Always building.</span>
            </h2>
          </div>
          <div style={{paddingTop:8}}>
            {[
              {label:'Background',text:'15+ years as an electrical contractor in railroad systems — IGBT inverter specialist. Self-taught developer since 1998. No degree, full stack.'},
              {label:'Philosophy',text:"Don't climb the AI maturity ladder — build the ladder. Every product starts from infrastructure and compounds into capability."},
              {label:'Focus',text:'AI agent identity, MCP tooling, developer infrastructure, and vertical SaaS. Targeting $50M ARR across the Sonnier Ventures portfolio.'},
            ].map(item=>(
              <div key={item.label} style={{borderLeft:'1px solid var(--border)',paddingLeft:24,marginBottom:32}}>
                <div style={{fontSize:9,letterSpacing:'0.25em',color:'var(--gold)',textTransform:'uppercase',marginBottom:8}}>{item.label}</div>
                <p style={{fontSize:12,color:'var(--text-dim)',lineHeight:1.8}}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{margin:'0 48px'}}/>

      {/* Contact */}
      <section id="contact" style={{padding:'100px 48px',position:'relative',zIndex:1,textAlign:'center'}}>
        <div style={{fontSize:10,letterSpacing:'0.3em',color:'var(--gold)',textTransform:'uppercase',marginBottom:16}}>Contact</div>
        <h2 style={{fontSize:'clamp(40px,6vw,80px)',fontWeight:300,color:'var(--text)',letterSpacing:'-0.02em',marginBottom:24}}>Let&apos;s build something.</h2>
        <p style={{fontSize:12,color:'var(--text-dim)',maxWidth:480,margin:'0 auto 48px',lineHeight:1.8}}>Partnerships, investments, contracts, or conversations about the future of AI infrastructure — reach out.</p>
        <a href="mailto:shawn@sonnierventures.com" style={{fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--bg)',background:'var(--gold)',padding:'16px 36px',textDecoration:'none',borderRadius:1,display:'inline-block'}}>shawn@sonnierventures.com</a>
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid var(--border)',padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative',zIndex:1}}>
        <span style={{fontSize:9,letterSpacing:'0.2em',color:'var(--text-dim)',textTransform:'uppercase'}}>© 2026 Sonnier Ventures</span>
        <div style={{display:'flex',gap:24}}>
          {['OpenConductor','GodotForge'].map(link=>(
            <a key={link} href="#" style={{fontSize:9,letterSpacing:'0.15em',color:'var(--text-dim)',textDecoration:'none',textTransform:'uppercase'}}>{link}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}