import { useParams, Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { useContent } from '../context/ContentContext'
import EditableText from '../components/EditableText'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { get } = useContent()
  const service = SERVICES.find(s => s.slug === slug)

  if (!service || !slug) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: 'var(--cream)' }}>
        <h2 style={{ fontFamily: 'var(--serif)', color: 'var(--green)' }}>Service not found</h2>
        <Link to="/#services" style={{ color: 'var(--rust)', fontWeight: 600 }}>← Back to Services</Link>
      </div>
    )
  }

  const phone1 = get('home.contact.phone1_num', '07474 941569')
  const phone2 = get('home.contact.phone2_num', '07432 346731')

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── Hero bar ── */}
      <div style={{ background: 'var(--green)', paddingTop: 'calc(var(--topbar-h) + var(--nav-h) + 2.5rem)', paddingBottom: '3rem' }}>
        <div className="container">
          <Link to="/#services" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.75rem', fontWeight: 500,
            color: 'rgba(199,138,53,0.85)',
            textDecoration: 'none', marginBottom: '1.25rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(199,138,53,0.85)')}
          >
            ← Our Services
          </Link>

          <h1 style={{
            fontFamily: 'var(--serif)', fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
            color: '#fff', lineHeight: 1.18, maxWidth: 780,
          }}>
            <EditableText contentKey={`service.${slug}.title`} fallback={service.title} />
          </h1>
        </div>
      </div>

      {/* Accent bar */}
      <div style={{ height: 5, background: 'var(--rust)' }} />

      {/* ── Body ── */}
      <div className="container svc-body">

        {/* Left: content */}
        <div className="svc-main">

          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: '1.1rem', color: 'var(--green)', lineHeight: 1.8,
            borderLeft: '4px solid var(--rust)',
            paddingLeft: '1.25rem', marginBottom: '2rem',
          }}>
            <EditableText contentKey={`service.${slug}.shortDesc`} fallback={service.shortDesc} multiline={true} />
          </p>

          <p style={{ fontSize: '0.975rem', color: 'var(--text)', lineHeight: 1.9, marginBottom: '2.5rem' }}>
            <EditableText contentKey={`service.${slug}.intro`} fallback={service.intro} multiline={true} />
          </p>

          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: '1.5rem',
            color: 'var(--green)', fontWeight: 700, marginBottom: '1.1rem',
          }}>
            What's Included
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}>
            {service.includes.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--rust)', flexShrink: 0, marginTop: '0.15em', fontSize: '1rem', fontWeight: 700 }}>✓</span>
                <EditableText contentKey={`service.${slug}.includes.${i}`} fallback={item} />
              </li>
            ))}
          </ul>

          <div style={{
            background: '#e8eeea', border: '1px solid rgba(6,62,45,0.14)',
            borderRadius: 'var(--radius)', padding: '1.35rem 1.6rem',
          }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.45rem' }}>
              Who Is This For?
            </p>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-mid)', lineHeight: 1.75 }}>
              <EditableText contentKey={`service.${slug}.whoFor`} fallback={service.whoFor} multiline={true} />
            </p>
          </div>
        </div>

        {/* Right: sticky CTA card */}
        <div className="svc-sidebar">
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderTop: '4px solid var(--rust)',
            borderRadius: 'var(--radius)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--serif)', fontSize: '1.3rem',
              color: 'var(--green)', fontWeight: 700, marginBottom: '0.6rem',
            }}>
              Need Immediate Support?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.35rem' }}>
              Call us today or fill out the form to discuss how our services can help you navigate your family court proceedings with confidence.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[
                { label: get('home.contact.phone1_name', 'Samantha Petrides'), val: phone1, href: `tel:${phone1.replace(/\s/g, '')}` },
                { label: get('home.contact.phone2_name', 'John Marlow'),       val: phone2, href: `tel:${phone2.replace(/\s/g, '')}` },
              ].map(c => (
                <a key={c.href} href={c.href} style={{
                  display: 'block', textAlign: 'center',
                  padding: '0.7rem 1rem',
                  background: 'var(--cream)', border: '1px solid rgba(6,62,45,0.18)',
                  borderRadius: 'var(--radius)', textDecoration: 'none',
                  fontSize: '0.85rem', color: 'var(--green)', fontWeight: 600,
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--green)'
                    e.currentTarget.style.background = '#ede3d8'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(6,62,45,0.18)'
                    e.currentTarget.style.background = 'var(--cream)'
                  }}
                >
                  {c.label}: {c.val}
                </a>
              ))}
            </div>

            <Link to="/#contact" style={{
              display: 'block', textAlign: 'center',
              padding: '0.875rem 1.5rem',
              background: 'var(--rust)', color: '#fff',
              borderRadius: 'var(--radius)', textDecoration: 'none',
              fontSize: '0.82rem', fontWeight: 700,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#8a2809')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--rust)')}
            >
              Send an Enquiry →
            </Link>
          </div>

          <p style={{
            fontSize: '0.78rem', color: 'var(--text-muted)',
            lineHeight: 1.7, padding: '0 0.25rem',
          }}>
            All enquiries are handled with complete confidentiality. We understand the sensitivity of family court matters and treat every case with the discretion it deserves.
          </p>
        </div>
      </div>

      <style>{`
        .svc-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
          align-items: start;
          padding-top: 3.5rem;
          padding-bottom: 5rem;
        }
        .svc-sidebar {
          position: sticky;
          top: calc(var(--topbar-h) + var(--nav-h) + 2rem);
        }
        @media (max-width: 900px) {
          .svc-body {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .svc-sidebar { position: static !important; }
        }
      `}</style>
    </div>
  )
}
