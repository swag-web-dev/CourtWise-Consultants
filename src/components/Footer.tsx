import React from 'react'
import logoImg from '../assets/logo.jpg'

const QUICK_LINKS = [
  { label: 'Home',           href: '#home' },
  { label: 'Services',       href: '#services' },
  { label: 'About Us',       href: '#about' },
  { label: 'Fees',           href: '#fees' },
  { label: 'Why Choose Us',  href: '#why-us' },
  { label: 'Contact',        href: '#contact' },
]

const SERVICES_QUICK = [
  'Family Court Consultancy',
  'Child Welfare Consultancy',
  'Court Documents & Preparation',
  'CAFCASS Preparation',
  'Child Consultation & Contact',
  'Professional Consultancy',
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/courtwiseconsultants',
    icon: <FacebookIcon />,
    colour: '#1877F2',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/courtwiseconsultants',
    icon: <InstagramIcon />,
    colour: '#E1306C',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>

      {/* ── CTA bar ── */}
      <div style={{ background: 'var(--rust)', padding: '1.6rem 0' }}>
        <div className="container footer-cta-bar" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--white)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
              "Because the right support makes all the difference."
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>
              Free 30-minute telephone enquiry — no obligation.
            </p>
          </div>
          <a href="tel:07474941569" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            background: 'var(--white)', color: 'var(--rust)',
            padding: '0.75rem 1.6rem', borderRadius: '4px',
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0,
            transition: 'background 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f0e8e8' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)' }}
          >
            <PhoneCallIcon />
            Call Now: 07474 941569
          </a>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div style={{ background: '#021f17', padding: '4rem 0 2.5rem' }}>
        <div className="container">

          {/* 5-col grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1.15fr 1fr 0.9fr',
            gap: '2.5rem',
            marginBottom: '3rem',
            alignItems: 'start',
          }} className="footer-grid">

            {/* ── Brand column ── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <img src={logoImg} alt="CourtWise logo" width={50} height={50}
                  style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(199,138,53,0.4)' }} />
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontWeight: 700 }}>
                    <span style={{ fontSize: '1.3rem', color: '#fff' }}>Court</span>
                    <span style={{ fontSize: '1.3rem', color: 'var(--gold)' }}>Wise</span>
                  </div>
                  <div style={{ fontSize: '0.57rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Consultants</div>
                </div>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                Expert guidance and practical support for families navigating the family justice system throughout England & Wales.
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['Professional.', 'Compassionate.', 'Trusted.'].map(w => (
                  <span key={w} style={{
                    fontSize: '0.66rem', padding: '0.28rem 0.6rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}>{w}</span>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div>
              <FooterHeading>Quick Links</FooterHeading>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {QUICK_LINKS.map(l => (
                  <li key={l.href}>
                    <a href={l.href} style={{
                      fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)',
                      transition: 'color 0.2s', display: 'flex', gap: '0.5rem', alignItems: 'center',
                      textDecoration: 'none',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      <span style={{ color: 'var(--rust)', fontSize: '0.6rem' }}>›</span>{l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ── */}
            <div>
              <FooterHeading>Our Services</FooterHeading>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {SERVICES_QUICK.map(s => (
                  <li key={s}>
                    <a href="#services" style={{
                      fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)',
                      transition: 'color 0.2s', display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                      textDecoration: 'none',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      <span style={{ color: 'var(--rust)', fontSize: '0.6rem', marginTop: '0.35em', flexShrink: 0 }}>›</span>{s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ── */}
            <div>
              <FooterHeading>Contact Us</FooterHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'Samantha Petrides', val: '07474 941569', href: 'tel:07474941569' },
                  { label: 'John Marlow',       val: '07432 346731', href: 'tel:07432346731' },
                  { label: 'Email',             val: 'courtwise2026@outlook.com', href: 'mailto:courtwise2026@outlook.com' },
                ].map(c => (
                  <div key={c.label}>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(199,138,53,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.2rem' }}>{c.label}</div>
                    <a href={c.href} style={{
                      fontSize: '0.83rem', color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s',
                      textDecoration: 'none', overflowWrap: 'break-word', wordBreak: 'break-word',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                    >{c.val}</a>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(199,138,53,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.2rem' }}>Location</div>
                  <span style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)' }}>England & Wales</span>
                </div>
              </div>
            </div>

            {/* ── Find Us ── */}
            <div>
              <FooterHeading>Find Us</FooterHeading>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                Follow us for updates, advice and family justice news.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.6rem 0.9rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px',
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '0.82rem', fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${s.colour}18`
                      e.currentTarget.style.borderColor = `${s.colour}55`
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                    }}
                  >
                    <span style={{ color: s.colour, display: 'flex' }}>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.75rem' }} />

          {/* Bottom bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
          }}>
            <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.6, maxWidth: 680 }}>
              © {year} CourtWise Consultants. All rights reserved. CourtWise Consultants is a family court consultancy service, not a law firm. The information provided does not constitute legal advice.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms & Conditions', 'Disclaimer'].map(l => (
                <a key={l} href="#" style={{ fontSize: '0.71rem', color: 'rgba(255,255,255,0.28)', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1.4fr 1fr 1fr !important; } }
        @media (max-width: 700px)  { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px)  { .footer-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) {
          .footer-cta-bar { flex-direction: column !important; text-align: center; }
          .footer-cta-bar a { width: 100%; justify-content: center; }
        }
      `}</style>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <h4 style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '0.01em' }}>{children}</h4>
      <div style={{ width: 24, height: 2, background: 'var(--rust)' }} />
    </div>
  )
}

function PhoneCallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}
