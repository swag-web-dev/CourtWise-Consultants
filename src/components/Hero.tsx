import React from 'react'
import teamImg from '../assets/team-main2.jpg'

const STATS = [
  { icon: <TrophyIcon />, val: '40+',  label: 'Years Combined', sub: 'Experience' },
  { icon: <StarIcon />,   val: '100%', label: 'Child-Focused',  sub: 'Approach' },
  { icon: <MapIcon />,    val: 'E & W', label: 'England',       sub: '& Wales' },
]

export default function Hero() {
  return (
    <section id="home" style={{
      background: '#063E2D',
      minHeight: '100svh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Content: left text + right image ── */}
      <div className="hero-grid" style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
        alignItems: 'stretch',
      }}>

        {/* ═══════════════════════════
            LEFT — Text column
        ═══════════════════════════ */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'calc(var(--topbar-h) + var(--nav-h) + 2.5rem) 3rem 3rem clamp(2.5rem, 6vw, 7rem)',
        }}>

          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            <div className="hero-eyebrow-line" style={{ width: 28, height: 1.5, background: '#C59B27', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--sans)', fontSize: '0.67rem', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C59B27',
            }}>
              Family Justice · Child-Focused · Safeguarding
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.06,
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
          }}>
            Guidance.<br />
            Support.<br />
            <em style={{ color: '#C59B27', fontStyle: 'italic', fontWeight: 600 }}>
              Better Outcomes.
            </em>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.72)',
            letterSpacing: '0.01em',
            marginBottom: '1rem',
          }}>
            Putting children at the heart of every decision.
          </p>

          {/* Gold divider */}
          <div style={{ width: 60, height: 2, background: '#C59B27', marginBottom: '1.25rem' }} />

          {/* Body */}
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.85,
            maxWidth: 500,
            marginBottom: '0.75rem',
          }}>
            We provide expert support for families navigating the family justice system.
            We don't just support your case — we explain every step of the journey.
          </p>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.88)',
            marginBottom: '2rem',
            fontWeight: 500,
          }}>
            Because the right support makes all the difference.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <HeroBtn href="#contact" primary>Free 30-Min Initial Enquiry</HeroBtn>
            <HeroBtn href="#services" primary={false}>Explore Services →</HeroBtn>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{
            display: 'flex',
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {STATS.map((s, i) => (
              <div key={s.val} className="hero-stat-item" style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                flex: 1,
                paddingRight: i < STATS.length - 1 ? '2rem' : 0,
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                marginRight: i < STATS.length - 1 ? '2rem' : 0,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(197,155,39,0.12)',
                  border: '1px solid rgba(197,155,39,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C59B27', flexShrink: 0, marginTop: '0.1rem',
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--serif)', fontWeight: 700,
                    fontSize: '1.85rem', color: '#C59B27', lineHeight: 1,
                  }}>{s.val}</div>
                  <div style={{
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    lineHeight: 1.5, marginTop: '0.3rem',
                  }}>{s.label}<br />{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════
            RIGHT — Portrait blend
        ═══════════════════════════ */}
        <div className="hero-photo-col" style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={teamImg}
            alt="Samantha Petrides and John Marlow – CourtWise Consultants"
            className="hero-team-img"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              height: '90%',
              width: 'auto',
              maxWidth: 'none',
            }}
          />


          {/* Left-edge blend into green */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #063E2D 0%, rgba(6,62,45,0.9) 3%, rgba(6,62,45,0) 15%)',
          }} />

          {/* Bottom-edge blend into green */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #063E2D 0%, rgba(6,62,45,0.55) 22%, transparent 48%)',
          }} />
        </div>
      </div>


      <style>{`
        /* Tablet (601–900px): text left, small contained photo box right */
        @media (max-width: 900px) and (min-width: 601px) {
          .hero-grid { grid-template-columns: 1fr 180px !important; align-items: start !important; }
          .hero-grid > div:first-child {
            padding: calc(var(--topbar-h) + var(--nav-h) + 2rem) 1rem 2rem 2rem !important;
          }
          /* Photo column: small fixed box, not full height */
          .hero-photo-col {
            width: 180px !important;
            height: 220px !important;
            margin-top: calc(var(--topbar-h) + var(--nav-h) + 2rem) !important;
            margin-right: 1.5rem !important;
            border-radius: 6px !important;
            overflow: hidden !important;
            flex-shrink: 0 !important;
          }
          .hero-team-img {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center 15% !important;
            transform: none !important;
            left: 0 !important;
            max-width: 100% !important;
          }
          /* Hide gradient overlays inside the small box */
          .hero-photo-col > div[aria-hidden] { display: none !important; }
        }
        /* Phone: single column */
        @media (max-width: 600px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:first-child {
            padding: calc(var(--topbar-h) + var(--nav-h) + 2rem) 1.25rem 2rem !important;
            justify-content: flex-start !important;
          }
          .hero-grid > div:last-child { min-height: 300px; }
        }
        @media (max-width: 580px) {
          .hero-grid > div:last-child { display: none !important; }
          .hero-grid > div:first-child { padding-bottom: 3rem !important; }
        }
        @media (max-width: 480px) {
          .hero-eyebrow-line { display: none; }
          .hero-eyebrow span { letter-spacing: 0.1em !important; font-size: 0.62rem !important; }
          .hero-stat-item { padding-right: 0.75rem !important; margin-right: 0.75rem !important; gap: 0.5rem !important; }
          .hero-stat-item > div:first-child { width: 28px !important; height: 28px !important; }
        }
        /* Stack stats 2-up on very narrow phones to prevent text clipping */
        @media (max-width: 400px) {
          .hero-stats { flex-wrap: wrap !important; }
          .hero-stat-item {
            flex: 1 1 calc(50% - 0.5rem) !important;
            border-right: none !important;
            margin-right: 0 !important;
            padding-right: 0 !important;
            padding-bottom: 0.75rem;
            margin-bottom: 0.25rem;
          }
          .hero-stat-item:last-child { padding-bottom: 0; margin-bottom: 0; }
        }
        /* Hero CTA buttons fill width on narrow phones */
        @media (max-width: 480px) {
          .hero-btn { width: 100% !important; min-width: 0 !important; }
        }
      `}</style>
    </section>
  )
}

/* ── Buttons ── */
function HeroBtn({ href, primary, children }: { href: string; primary: boolean; children: React.ReactNode }) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 'min(200px, 100%)', padding: '0.9rem 1.75rem',
    fontSize: '0.77rem', fontWeight: 700,
    letterSpacing: '0.09em', textTransform: 'uppercase',
    borderRadius: '6px',
    border: '2px solid transparent',
    transition: 'background 0.22s, color 0.22s, border-color 0.22s, transform 0.18s, box-shadow 0.18s',
    cursor: 'pointer', textDecoration: 'none',
  }
  const primary_s: React.CSSProperties = { background: '#B84A28', color: '#fff', borderColor: '#B84A28' }
  const outline_s: React.CSSProperties = { background: 'transparent', color: '#fff', borderColor: 'rgba(197,155,39,0.6)' }

  return (
    <a href={href} className="hero-btn"
      style={{ ...base, ...(primary ? primary_s : outline_s) }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.28)'
        if (primary) { e.currentTarget.style.background = '#9a3c21'; e.currentTarget.style.borderColor = '#9a3c21' }
        else { e.currentTarget.style.background = 'rgba(197,155,39,0.12)'; e.currentTarget.style.borderColor = 'rgba(197,155,39,0.9)' }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
        if (primary) { e.currentTarget.style.background = '#B84A28'; e.currentTarget.style.borderColor = '#B84A28'; e.currentTarget.style.color = '#fff' }
        else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(197,155,39,0.6)' }
      }}
    >{children}</a>
  )
}

function TrophyIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
}
function StarIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function MapIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
}
