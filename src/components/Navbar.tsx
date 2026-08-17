import { useState, useEffect } from 'react'
import logoImg from '../assets/logo.jpg'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Fees',     href: '#fees' },
  { label: 'Why Us',   href: '#why-us' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 'var(--topbar-h)',
        left: 0, right: 0,
        zIndex: 1000,
        height: 'var(--nav-h)',
        background: scrolled ? 'rgba(4,42,30,0.98)' : 'rgba(6,62,45,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(199,138,53,0.12)',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
      }}>
        <div className="container" style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <a href="#home" onClick={close} aria-label="CourtWise Consultants – Home" style={{
            display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, textDecoration: 'none',
          }}>
            <div style={{ position: 'relative' }}>
              <img
                src={logoImg}
                alt="CourtWise Consultants logo"
                width={54} height={54}
                style={{
                  borderRadius: '50%', objectFit: 'cover',
                  border: '2px solid rgba(199,138,53,0.55)',
                  display: 'block',
                }}
              />
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: 'var(--serif)', fontWeight: 700 }}>
                <span style={{ fontSize: '1.45rem', color: '#fff', letterSpacing: '-0.01em' }}>Court</span>
                <span style={{ fontSize: '1.45rem', color: '#C78A35', letterSpacing: '-0.01em' }}>Wise</span>
              </div>
              <div style={{
                fontSize: '0.58rem', letterSpacing: '0.26em',
                color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginTop: '3px',
              }}>Consultants</div>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            {NAV_LINKS.map(link => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#C78A35' : 'rgba(255,255,255,0.78)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    position: 'relative',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.78)' }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: -1, left: '1.1rem', right: '1.1rem',
                      height: 2, background: '#C78A35', borderRadius: 1,
                    }} />
                  )}
                </a>
              )
            })}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
            {/* Gold-bordered elegant CTA */}
            <a href="#contact" onClick={close} className="desktop-nav" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.4rem',
              fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#C78A35',
              border: '1.5px solid rgba(199,138,53,0.65)',
              borderRadius: '4px',
              background: 'transparent',
              transition: 'background 0.22s, color 0.22s, border-color 0.22s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#C78A35'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = '#C78A35'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#C78A35'
                e.currentTarget.style.borderColor = 'rgba(199,138,53,0.65)'
              }}
            >
              <PhoneIcon />
              Book Free Consultation
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="hamburger"
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px', cursor: 'pointer',
                width: 42, height: 42,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '5px',
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 20, height: 1.5,
                  background: 'rgba(255,255,255,0.85)',
                  transition: 'transform 0.25s, opacity 0.25s',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translateY(6.5px)'
                    : i === 2 ? 'rotate(-45deg) translateY(-6.5px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed',
        top: `calc(var(--topbar-h) + var(--nav-h))`,
        left: 0, right: 0, bottom: 0,
        background: '#042a1e',
        zIndex: 999,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflowY: 'auto',
        padding: '2.5rem 2rem',
        display: 'flex', flexDirection: 'column', gap: '0',
      }}>
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} onClick={close} style={{
            fontFamily: 'var(--serif)', fontSize: '1.7rem', fontWeight: 600,
            color: '#fff', padding: '1rem 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            letterSpacing: '-0.01em',
          }}>{link.label}</a>
        ))}
        <a href="#contact" onClick={close} style={{
          marginTop: '2rem',
          display: 'block', textAlign: 'center',
          padding: '1rem 2rem',
          background: '#A9340B', color: '#fff',
          borderRadius: '4px',
          fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Book Free Consultation
        </a>
      </div>

      <style>{`
        .hamburger { display: none !important; }
        @media (max-width: 980px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
    </svg>
  )
}
