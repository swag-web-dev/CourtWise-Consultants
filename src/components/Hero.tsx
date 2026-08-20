import React from 'react'
import teamImg from '../assets/team-main2.jpg'
import EditableText from './EditableText'

const STATS_DEFAULT = [
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
              <EditableText contentKey="home.hero.badge" fallback="Family Justice · Child-Focused · Safeguarding" />
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-h1" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.06,
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
          }}>
            <EditableText contentKey="home.hero.headline1" fallback="Guidance." /><br />
            <EditableText contentKey="home.hero.headline2" fallback="Support." /><br />
            <em style={{ color: '#C59B27', fontStyle: 'italic', fontWeight: 600 }}>
              <EditableText contentKey="home.hero.headline3" fallback="Better Outcomes." />
            </em>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: 'rgba(255,255,255,0.72)',
            letterSpacing: '0.01em',
            marginBottom: '2rem',
          }}>
            <EditableText contentKey="home.hero.subtitle" fallback="Putting children at the heart of every decision." />
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
            <EditableText contentKey="home.hero.body1" fallback="We provide expert support for families navigating the family justice system. We don't just support your case — we explain every step of the journey." multiline={true} />
          </p>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.88)',
            marginBottom: '2rem',
            fontWeight: 500,
          }}>
            <EditableText contentKey="home.hero.body2" fallback="Because the right support makes all the difference." />
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <HeroBtn href="#contact" primary><EditableText contentKey="home.hero.cta_primary" fallback="Free 30-Min Initial Enquiry" /></HeroBtn>
            <HeroBtn href="#services" primary={false}><EditableText contentKey="home.hero.cta_secondary" fallback="Explore Services →" /></HeroBtn>
          </div>

          {/* Stats row */}
          <div className="hero-stats" style={{
            display: 'flex',
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {STATS_DEFAULT.map((s, i) => (
              <div key={i} className="hero-stat-item" style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                flex: 1,
                paddingRight: i < STATS_DEFAULT.length - 1 ? '2rem' : 0,
                borderRight: i < STATS_DEFAULT.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                marginRight: i < STATS_DEFAULT.length - 1 ? '2rem' : 0,
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
                  }}>
                    <EditableText contentKey={`home.hero.stat${i + 1}_val`} fallback={s.val} />
                  </div>
                  <div style={{
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    lineHeight: 1.5, marginTop: '0.3rem',
                  }}>
                    <EditableText contentKey={`home.hero.stat${i + 1}_label`} fallback={s.label} />
                    <br />
                    <EditableText contentKey={`home.hero.stat${i + 1}_sub`} fallback={s.sub} />
                  </div>
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
        /* ── iPad / Tablet (601–1180px): desktop-style overlay layout ── */
        @media (max-width: 1400px) and (min-width: 601px) {

          /* ┌──────────────────────────────────────────────────┐
             │  TABLET IMAGE SIZE — change this one value        │
             │  Controls image width as % of the viewport        │
             │  80% = default, both people visible               │
             │  100% = full viewport width                       │
             └──────────────────────────────────────────────────┘ */
          :root { --t-img-scale: 80%; }

          /* Single text column; photo is absolutely overlaid on the right */
          .hero-grid {
            grid-template-columns: 1fr !important;
            position: relative !important;
          }

          /* Text column — z-index above the image, right padding keeps text clear */
          .hero-grid > div:first-child {
            position: relative !important;
            z-index: 20 !important;
            justify-content: flex-start !important;
            padding-top:    calc(var(--topbar-h) + var(--nav-h) + 2rem) !important;
            padding-right:  2rem !important;
            padding-bottom: 2.5rem !important;
            padding-left:   clamp(1.5rem, 4vw, 3.5rem) !important;
          }

          /* Photo column — absolute, full height, right-anchored */
          .hero-photo-col {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 10 !important;
            overflow: hidden !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }

          .hero-team-img {
            position: absolute !important;
            top: calc(var(--topbar-h) + var(--nav-h)) !important;
            bottom: auto !important;
            right: -15% !important;
            left: auto !important;
            transform: none !important;
            width: var(--t-img-scale) !important;
            height: auto !important;
            max-width: none !important;
          }

          /* Restore gradient overlays */
          .hero-photo-col > div[aria-hidden] { display: block !important; }

          /* Top + left green fades */
          .hero-photo-col::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              linear-gradient(to bottom, rgba(6,62,45,0.85) 0%, transparent 28%),
              linear-gradient(to right,  rgba(6,62,45,0.65) 0%, transparent 18%);
            z-index: 16;
            pointer-events: none;
          }

          /* Reduce empty green below content */
          #home { min-height: auto !important; }

          /* Bottom green gradient — covers empty space below image and fades into it */
          .hero-photo-col::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 45%;
            background: linear-gradient(to top, #063E2D 0%, #063E2D 55%, rgba(6,62,45,0.6) 75%, rgba(6,62,45,0) 100%);
            z-index: 15;
            pointer-events: none;
          }
        }

        /* iPad mini portrait (744×1133) — stronger gradient */
        @media (min-width: 740px) and (max-width: 750px) {
          .hero-photo-col::after {
            background: linear-gradient(to top, #063E2D 0%, #063E2D 65%, rgba(6,62,45,0.75) 85%, rgba(6,62,45,0) 100%) !important;
          }
        }

        /* Galaxy Tab S9 / S9+ range (~820–870px) — stronger gradient */
        @media (min-width: 818px) and (max-width: 872px) {
          .hero-photo-col::after {
            background: linear-gradient(to top, #063E2D 0%, #063E2D 65%, rgba(6,62,45,0.75) 85%, rgba(6,62,45,0) 100%) !important;
          }
        }

        /* Galaxy Tab S9 Ultra (~1028–1070px) — stronger gradient */
        @media (min-width: 1028px) and (max-width: 1070px) {
          .hero-photo-col::after {
            background: linear-gradient(to top, #063E2D 0%, #063E2D 65%, rgba(6,62,45,0.75) 85%, rgba(6,62,45,0) 100%) !important;
          }
        }

        /* iPad Pro 12.9" portrait (1024×1366) — softer + shorter gradient */
        @media (min-width: 1020px) and (max-width: 1030px) and (min-height: 1350px) {
          .hero-photo-col::after {
            height: 28% !important;
            background: linear-gradient(to top, #063E2D 0%, #063E2D 40%, rgba(6,62,45,0.35) 65%, rgba(6,62,45,0) 100%) !important;
          }
        }

        .tablet-br { display: none; }

        /* Tablet/iPad H1 scaling + line breaks + section height */
        @media (max-width: 1400px) and (min-width: 601px) {
          .hero-h1 { font-size: clamp(2.4rem, 4vw, 3.6rem) !important; }
          .tablet-br { display: block; }
          #home { padding-bottom: 3rem !important; }
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
