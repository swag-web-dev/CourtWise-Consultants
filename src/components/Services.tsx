const SERVICES = [
  {
    icon: <ScalesIcon />,
    title: 'Family Court Consultancy & McKenzie Friend Support',
    desc: 'Practical support and guidance throughout family court proceedings, including case strategy, preparation, statement drafting, court attendance and hearing preparation.',
    accent: 'var(--rust)',
  },
  {
    icon: <ShieldIcon />,
    title: 'Child Welfare Consultancy',
    desc: 'Independent, child-focused advice on child welfare issues for families, professionals and organisations.',
    accent: 'var(--green)',
  },
  {
    icon: <DocumentIcon />,
    title: 'Court Documents & Hearing Preparation',
    desc: 'Position Statements, Witness Statements, Chronologies, Scott Schedules, Bundles and legal argument support.',
    accent: 'var(--gold)',
  },
  {
    icon: <BuildingIcon />,
    title: 'CAFCASS & Family Court Preparation',
    desc: 'Safeguarding interviews, Section 7 reports preparation, final hearing preparation, case analysis and strategy.',
    accent: 'var(--rust)',
  },
  {
    icon: <HeartHandsIcon />,
    title: 'Child Consultation & Contact Services',
    desc: 'Wishes & Feelings Consultations, Supported Contact, Supervised Contact, Contact Observation Reports and Contact Summary Reports.',
    accent: 'var(--green)',
  },
  {
    icon: <UsersIcon />,
    title: 'Supported & Supervised Contact',
    desc: 'Safe, professionally managed contact sessions with Contact Observation Reports and Contact Summary Reports.',
    accent: 'var(--gold)',
  },
  {
    icon: <GraduationIcon />,
    title: 'Professional Consultancy & Training',
    desc: 'Reflective supervision, safeguarding consultancy, training, professional development and policy advice for professionals and organisations.',
    accent: 'var(--rust)',
  },
  {
    icon: <NetworkIcon />,
    title: 'Professional Referral Network',
    desc: 'A trusted network of professionals to support the best outcomes for children and families.',
    accent: 'var(--green)',
  },
]

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 3.5rem' }}>
          <span className="eyebrow">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
          <div className="divider divider-center" />
          <p className="lead">
            Comprehensive, expert support across every aspect of the family justice system — from the first call to the final hearing.
          </p>
        </div>

        {/* fluid auto-fit grid: 4-col desktop → 2-col tablet → 1-col mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '1.25rem',
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, title, desc, accent }: { icon: React.ReactNode; title: string; desc: string; accent: string }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${accent}`,
        padding: '1.75rem 1.5rem',
        borderRadius: 'var(--radius)',
        transition: 'transform var(--transition), box-shadow var(--transition)',
        display: 'flex', flexDirection: 'column', gap: '0.85rem',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = 'var(--shadow-md)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
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
      }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75, flex: 1 }}>{desc}</p>
    </div>
  )
}

import React from 'react'

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
