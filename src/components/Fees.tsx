import EditableText from './EditableText'

const FEES_DEFAULT = [
  { service: 'Free Initial Telephone Enquiry (30 mins)', price: 'FREE',         free: true,  highlight: false },
  { service: 'Initial Consultation (60 mins)',           price: '£95',          free: false, highlight: false },
  { service: 'Family Court Consultancy',                 price: 'From £95/hr',  free: false, highlight: false },
  { service: 'Court Document Preparation',               price: 'From £195',    free: false, highlight: false },
  { service: 'CAFCASS Preparation',                      price: 'From £150',    free: false, highlight: false },
  { service: 'Supported & Supervised Contact',           price: 'From £55/hr',  free: false, highlight: false },
  { service: 'Professional Consultancy & Training',      price: 'From £125/hr', free: false, highlight: false },
  { service: 'Fixed Fee Court Packages',                 price: 'From £495',    free: false, highlight: true  },
]

export default function Fees() {
  return (
    <section id="fees" className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
          <span className="eyebrow"><EditableText contentKey="home.fees.tag" fallback="Transparent Pricing" /></span>
          <h2 className="section-title"><EditableText contentKey="home.fees.title" fallback="Services & Fees" /></h2>
          <div className="divider divider-center" />
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--green)', letterSpacing: '0.02em' }}>
            <EditableText contentKey="home.fees.subtitle" fallback="Simple. Transparent. Affordable." />
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }} className="fees-grid">

          {/* ── Fee table ── */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              background: 'var(--green)',
              padding: '1.1rem 1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Service</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>Fee</span>
            </div>

            {FEES_DEFAULT.map((f, i) => (
              <div key={i} className="fees-table-row" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 1.5rem',
                background: f.highlight ? 'rgba(169,52,11,0.04)' : i % 2 === 0 ? 'var(--white)' : 'rgba(244,234,223,0.5)',
                borderBottom: i < FEES_DEFAULT.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{
                  fontSize: '0.88rem', color: 'var(--text)', flex: 1,
                  paddingRight: '1rem', lineHeight: 1.4,
                  fontWeight: f.highlight ? 600 : 400,
                }}>
                  <EditableText contentKey={`home.fees.row${i}_service`} fallback={f.service} />
                  {f.highlight && (
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400, marginTop: '0.2rem' }}>
                      <EditableText contentKey="home.fees.highlight_note" fallback="Tailored support packages available" />
                    </span>
                  )}
                </span>
                <span className="fees-table-price" style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: f.free ? 'var(--green)' : 'var(--rust)',
                  whiteSpace: 'nowrap',
                }}>
                  <EditableText contentKey={`home.fees.row${i}_price`} fallback={f.price} />
                </span>
              </div>
            ))}

            <div style={{
              padding: '1rem 1.5rem',
              background: 'rgba(199,138,53,0.07)',
              borderTop: '2px solid var(--gold)',
            }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                <EditableText contentKey="home.fees.note" fallback="All fees are clearly agreed in advance. No hidden costs, ever." />
              </p>
            </div>
          </div>

          {/* ── CTA panels ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Free call */}
            <div className="fees-cta-panel" style={{
              background: 'var(--green)', padding: '2.25rem',
              borderRadius: 'var(--radius)', color: 'var(--white)',
            }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: 'var(--white)', marginBottom: '0.75rem' }}>
                <EditableText contentKey="home.fees.cta_title" fallback="Start With a Free Call" />
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                <EditableText contentKey="home.fees.cta_body" fallback="Not sure where to begin? Call us for a free 30-minute telephone enquiry — no obligation, just clarity and compassionate guidance." multiline={true} />
              </p>
              <a href="tel:07474941569" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <FeesPhoneIcon /> <EditableText contentKey="home.fees.cta_phone1" fallback="Samantha – 07474 941569" />
              </a>
              <a href="tel:07432346731" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <FeesPhoneIcon /> <EditableText contentKey="home.fees.cta_phone2" fallback="John – 07432 346731" />
              </a>
            </div>

            {/* Fixed package */}
            <div className="fees-cta-panel" style={{
              background: 'var(--white)', padding: '2rem',
              border: '1px solid var(--border)',
              borderTop: '3px solid var(--rust)',
              borderRadius: 'var(--radius)',
            }}>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: 'var(--green)', marginBottom: '0.6rem' }}>
                <EditableText contentKey="home.fees.pkg_title" fallback="Fixed Fee Court Packages" />
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                <EditableText contentKey="home.fees.pkg_body" fallback="Comprehensive packages from £495 covering preparation through to hearing attendance — fixed cost, no surprises." multiline={true} />
              </p>
              <a href="#contact" className="btn btn-rust" style={{ display: 'block', textAlign: 'center' }}>
                <EditableText contentKey="home.fees.pkg_cta" fallback="Request a Package Quote" />
              </a>
            </div>

            {/* Email */}
            <a href="mailto:courtwise2026@outlook.com" style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '1rem 1.25rem',
              background: 'var(--cream-dark)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text)',
              transition: 'background var(--transition)',
              textDecoration: 'none',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--cream-dark)')}
            >
              <span style={{ color: 'var(--rust)', display: 'flex' }}><FeesMailIcon /></span>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: '0.15rem' }}>Email us</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--rust)', fontWeight: 600 }}>
                  <EditableText contentKey="home.contact.email" fallback="courtwise2026@outlook.com" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .fees-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) {
          .fees-cta-panel { padding: 1.5rem !important; }
          .fees-table-row { flex-direction: column !important; gap: 0.25rem !important; }
          .fees-table-price { align-self: flex-start; }
        }
      `}</style>
    </section>
  )
}

function FeesPhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
}
function FeesMailIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}
