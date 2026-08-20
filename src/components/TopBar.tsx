import React from 'react'
import { useContent } from '../context/ContentContext'
import EditableText from './EditableText'

export default function TopBar() {
  const { get } = useContent()

  const phone1Num = get('home.contact.phone1_num', '07474 941569')
  const phone2Num = get('home.contact.phone2_num', '07432 346731')
  const email     = get('home.contact.email', 'courtwise2026@outlook.com')

  return (
    <div className="topbar-bar" style={{
      background: '#042a1e',
      height: 'var(--topbar-h)',
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1001,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

          <a href={`tel:${phone1Num.replace(/\s/g, '')}`} style={linkSt}
            onMouseEnter={e => (e.currentTarget.style.color = '#C78A35')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            <PhoneIcon />
            <EditableText contentKey="home.topbar.phone1" fallback="Samantha: 07474 941569" />
          </a>

          <Dot />

          <a href={`tel:${phone2Num.replace(/\s/g, '')}`} style={linkSt}
            onMouseEnter={e => (e.currentTarget.style.color = '#C78A35')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            <PhoneIcon />
            <EditableText contentKey="home.topbar.phone2" fallback="John: 07432 346731" />
          </a>

          <Dot className="hide-sm" />

          <a href={`mailto:${email}`} className="hide-sm" style={linkSt}
            onMouseEnter={e => (e.currentTarget.style.color = '#C78A35')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            <EmailIcon />
            <EditableText contentKey="home.contact.email" fallback="courtwise2026@outlook.com" />
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="hide-md">
          <LocationIcon />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em' }}>
            <EditableText contentKey="home.topbar.location" fallback="England & Wales — Remote & In-Person Court Attendance" />
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .hide-md { display: none !important; } }
        @media (max-width: 600px) { .hide-sm { display: none !important; } }
      `}</style>
    </div>
  )
}

const linkSt: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '0.35rem',
  fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)',
  transition: 'color 0.2s', textDecoration: 'none',
}

function Dot({ className = '' }: { className?: string }) {
  return <span className={className} style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
}

function PhoneIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C78A35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
