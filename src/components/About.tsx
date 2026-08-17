import teamImg from '../assets/team-branded.jpg'

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
      }}>
        {/* ── Photo side ── */}
        <div className="about-photo" style={{ position: 'relative' }}>
          {/* Decorative background block */}
          <div style={{
            position: 'absolute',
            top: '-1.5rem', right: '-1.5rem', bottom: '2rem', left: '1.5rem',
            background: 'var(--cream)',
            borderRadius: '2px',
            zIndex: 0,
          }} />

          <img
            src={teamImg}
            alt="Samantha Petrides and John Marlow – CourtWise Consultants"
            width={680}
            height={453}
            style={{
              width: '100%',
              aspectRatio: '3/2',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              borderRadius: '2px',
              position: 'relative',
              zIndex: 1,
              boxShadow: 'var(--shadow-lg)',
            }}
          />


          {/* Experience badge */}
          <div className="about-badge" style={{
            position: 'absolute',
            zIndex: 3,
            bottom: '-1.5rem', right: '-1.5rem',
            background: 'var(--rust)',
            color: 'var(--white)',
            padding: '1.25rem 1.5rem',
            textAlign: 'center',
            borderRadius: '2px',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1 }}>40+</div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.9, marginTop: '0.3rem', lineHeight: 1.5 }}>
              Years Combined<br />Experience
            </div>
          </div>
        </div>

        {/* ── Text side ── */}
        <div>
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title">About CourtWise Consultants</h2>
          <div className="divider" />

          <p className="lead" style={{ marginBottom: '1.25rem' }}>
            CourtWise Consultants was founded by <strong style={{ color: 'var(--green)' }}>Samantha Petrides</strong> and{' '}
            <strong style={{ color: 'var(--green)' }}>John Marlow</strong> — both former CAFCASS Family Court Advisers,
            Children's Guardians and Social Workers, with over 40 years of combined experience in the family justice system.
          </p>
          <p className="lead" style={{ marginBottom: '1.25rem' }}>
            We understand the overwhelming nature of family court proceedings. Our mission is simple: provide families
            with expert, independent, and compassionate guidance so that no child's voice goes unheard.
          </p>
          <p className="lead" style={{ marginBottom: '2.5rem' }}>
            We offer both remote support and in-person court attendance across England & Wales, with clear fixed fees,
            no hidden costs, and total transparency at every step.
          </p>

          {/* Quote */}
          <blockquote style={{
            borderLeft: '4px solid var(--gold)',
            paddingLeft: '1.25rem',
            marginBottom: '2.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: '1.2rem', color: 'var(--green)', lineHeight: 1.55,
            }}>
              "Every family deserves to feel heard, supported and understood."
            </p>
          </blockquote>

          {/* Team cards */}
          <div className="about-team-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { name: 'Samantha Petrides', role: 'Lead Consultant', phone: '07474 941569' },
              { name: 'John Marlow',       role: 'Lead Consultant', phone: '07432 346731' },
            ].map(p => (
              <div key={p.name} style={{
                padding: '1.25rem', background: 'var(--cream)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--green)',
                borderRadius: 'var(--radius)',
              }}>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--green)', marginBottom: '0.2rem' }}>{p.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem', fontWeight: 600 }}>{p.role}</div>
                <a href={`tel:${p.phone.replace(/\s/g, '')}`} style={{ fontSize: '0.875rem', color: 'var(--rust)', fontWeight: 700 }}>{p.phone}</a>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-rust">Get in Touch</a>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--olive)', fontSize: '1rem' }}>Because family matters.</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
          #about .container > div:first-child { max-width: 560px; margin: 0 auto; }
          .about-photo { overflow: hidden; }
          .about-badge { bottom: 0 !important; right: 0 !important; padding: 0.65rem 0.85rem !important; }
          .about-badge > div:first-child { font-size: 1.5rem !important; }
          .about-badge > div:last-child  { font-size: 0.55rem !important; margin-top: 0.2rem !important; }
        }
        @media (max-width: 600px) {
          .about-photo > div:first-child { display: none; }
          #about .container > div:last-child > div:last-child { flex-direction: column; }
        }
        @media (max-width: 480px) {
          .about-team-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
