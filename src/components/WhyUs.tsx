const REASONS = [
  { icon: <AwardIcon />,    text: 'Over 40 years\' combined Family Justice experience' },
  { icon: <ScaleIcon />,   text: 'Former CAFCASS Family Court Advisers, Children\'s Guardians and Social Workers' },
  { icon: <HeartIcon />,   text: 'Independent, child-focused and compassionate at every stage' },
  { icon: <ShieldIcon />,  text: 'Clear fixed fees and transparent pricing — no hidden costs' },
  { icon: <MapPinIcon />,  text: 'Services throughout England & Wales — remote and in-person court attendance' },
]

const PILLARS = [
  { label: 'Professional',   desc: 'Expert knowledge built over decades of frontline family justice work.' },
  { label: 'Compassionate',  desc: 'We listen, we understand, and we stand beside you every step.' },
  { label: 'Trusted',        desc: 'Recommended by professionals and families across England & Wales.' },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="section" style={{ background: 'var(--green)', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(197,155,39,0.04) 0%, transparent 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 3.5rem' }}>
          <span className="eyebrow">Our Difference</span>
          <h2 className="section-title section-title-white">Why Choose CourtWise?</h2>
          <div className="divider divider-gold divider-center" />
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.85 }}>
            When your family's future is at stake, experience, integrity and compassion are everything.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }} className="why-grid">

          {/* ── Left: reason list ── */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {REASONS.map((r, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem',
                padding: '1.1rem 1.4rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid rgba(197,155,39,0.5)',
                transition: 'background 0.22s, border-color 0.22s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(197,155,39,0.07)'
                  e.currentTarget.style.borderLeftColor = '#C59B27'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderLeftColor = 'rgba(197,155,39,0.5)'
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(197,155,39,0.1)',
                  border: '1px solid rgba(197,155,39,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C59B27',
                }}>
                  {r.icon}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.93rem', lineHeight: 1.65 }}>
                  {r.text}
                </span>
              </li>
            ))}
          </ul>

          {/* ── Right: quote + pillars + CTA ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Quote block */}
            <div style={{
              position: 'relative',
              padding: '2.25rem 2.25rem 2.25rem 2rem',
              borderLeft: '3px solid #C59B27',
              background: 'rgba(197,155,39,0.06)',
            }}>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: '3rem',
                color: '#C59B27', lineHeight: 0.7, marginBottom: '1rem',
                opacity: 0.7,
              }}>"</div>
              <p style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                color: 'var(--white)', lineHeight: 1.55,
                marginBottom: '1.25rem',
              }}>
                Putting children at the heart of every decision.
              </p>
              <div style={{
                fontSize: '0.68rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#C59B27', fontWeight: 600,
              }}>— CourtWise Consultants</div>
            </div>

            {/* Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PILLARS.map(p => (
                <div key={p.label} style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 3, alignSelf: 'stretch', flexShrink: 0,
                    background: 'var(--rust)', borderRadius: 2, minHeight: 40,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--serif)', fontWeight: 700,
                      color: 'var(--white)', fontSize: '1rem', marginBottom: '0.25rem',
                    }}>{p.label}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="#contact" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.95rem 2rem',
              background: '#B84A28', color: '#fff',
              fontSize: '0.78rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              borderRadius: '4px',
              border: '2px solid #B84A28',
              transition: 'background 0.22s, border-color 0.22s, transform 0.18s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#9a3c21'
                e.currentTarget.style.borderColor = '#9a3c21'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#B84A28'
                e.currentTarget.style.borderColor = '#B84A28'
                e.currentTarget.style.transform = 'none'
              }}
            >
              Book Your Free Enquiry
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 600px) {
          .why-grid ul li { padding: 0.9rem 1rem !important; }
        }
      `}</style>
    </section>
  )
}

/* ── SVG Icons ── */
function AwardIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
}
function ScaleIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M3 9l9-6 9 6"/><path d="M3 9h4l2 6H3L5 9"/><path d="M15 9h4l2 6h-8l2-6"/><path d="M3 21h18"/></svg>
}
function HeartIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}
function ShieldIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
function MapPinIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
}
