import React from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import EditableText from './EditableText'

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 3.5rem' }}>
          <span className="eyebrow"><EditableText contentKey="home.services.tag" fallback="What We Offer" /></span>
          <h2 className="section-title"><EditableText contentKey="home.services.title" fallback="Our Services" /></h2>
          <div className="divider divider-center" />
          <p className="lead">
            <EditableText contentKey="home.services.subtitle" fallback="Comprehensive, expert support across every aspect of the family justice system — from the first call to the final hearing." multiline={true} />
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '1.25rem',
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={i}
              icon={ICONS[i]}
              accent={s.accent}
              slug={s.slug}
              fallbackTitle={s.title}
              fallbackDesc={s.shortDesc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, accent, slug, fallbackTitle, fallbackDesc }: {
  icon: React.ReactNode
  accent: string
  slug: string
  fallbackTitle: string
  fallbackDesc: string
}) {
  return (
    <Link
      to={`/services/${slug}`}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${accent}`,
        padding: '1.75rem 1.5rem',
        borderRadius: 'var(--radius)',
        transition: 'transform var(--transition), box-shadow var(--transition)',
        display: 'flex', flexDirection: 'column', gap: '0.85rem',
        textDecoration: 'none', cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
      }}
    >
      <div style={{
        width: 44, height: 44,
        background: `${accent}15`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent, flexShrink: 0,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'var(--serif)', fontWeight: 700,
        fontSize: '1.05rem', color: 'var(--green)', lineHeight: 1.35,
      }}>
        <EditableText contentKey={`service.${slug}.title`} fallback={fallbackTitle} />
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75, flex: 1 }}>
        <EditableText contentKey={`service.${slug}.shortDesc`} fallback={fallbackDesc} multiline={true} />
      </p>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: accent, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
        Learn More →
      </span>
    </Link>
  )
}

const ICONS = [
  <ScalesIcon />,
  <ShieldIcon />,
  <DocumentIcon />,
  <BuildingIcon />,
  <HeartHandsIcon />,
  <UsersIcon />,
  <GraduationIcon />,
  <NetworkIcon />,
]

function ScalesIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
}
function ShieldIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
function DocumentIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
}
function BuildingIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
}
function HeartHandsIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}
function UsersIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function GraduationIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
}
function NetworkIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4M8.5 17.5l-2-4M15.5 17.5l2-4"/></svg>
}
