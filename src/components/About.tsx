import teamImg from '../assets/team-branded.jpg'
import { useContent } from '../context/ContentContext'
import EditableText from './EditableText'

export default function About() {
  const { get } = useContent()

  const team = [
    {
      nameKey: 'home.about.team1_name', nameFb: 'Samantha Petrides',
      roleKey: 'home.about.team1_role', roleFb: 'Lead Consultant',
      phoneKey: 'home.about.team1_phone', phoneFb: '07474 941569',
    },
    {
      nameKey: 'home.about.team2_name', nameFb: 'John Marlow',
      roleKey: 'home.about.team2_role', roleFb: 'Lead Consultant',
      phoneKey: 'home.about.team2_phone', phoneFb: '07432 346731',
    },
  ]

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
          <span className="eyebrow"><EditableText contentKey="home.about.tag" fallback="Our Story" /></span>
          <h2 className="section-title"><EditableText contentKey="home.about.title" fallback="About CourtWise Consultants" /></h2>
          <div className="divider" />

          <p className="lead" style={{ marginBottom: '1.25rem' }}>
            <EditableText contentKey="home.about.body1" fallback="CourtWise Consultants was founded by Samantha Petrides and John Marlow — both former CAFCASS Family Court Advisers, Children's Guardians and Social Workers, with over 40 years of combined experience in the family justice system." multiline={true} />
          </p>
          <p className="lead" style={{ marginBottom: '1.25rem' }}>
            <EditableText contentKey="home.about.body2" fallback="We understand the overwhelming nature of family court proceedings. Our mission is simple: provide families with expert, independent, and compassionate guidance so that no child's voice goes unheard." multiline={true} />
          </p>
          <p className="lead" style={{ marginBottom: '2.5rem' }}>
            <EditableText contentKey="home.about.body3" fallback="We offer both remote support and in-person court attendance across England & Wales, with clear fixed fees, no hidden costs, and total transparency at every step." multiline={true} />
          </p>

          <blockquote style={{
            borderLeft: '4px solid var(--gold)',
            paddingLeft: '1.25rem',
            marginBottom: '2.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: '1.2rem', color: 'var(--green)', lineHeight: 1.55,
            }}>
              <EditableText contentKey="home.about.quote" fallback='"Every family deserves to feel heard, supported and understood."' />
            </p>
          </blockquote>

          <div className="about-team-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {team.map(p => {
              const phone = get(p.phoneKey, p.phoneFb)
              return (
                <div key={p.nameKey} style={{
                  padding: '1.25rem', background: 'var(--cream)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--green)',
                  borderRadius: 'var(--radius)',
                }}>
                  <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--green)', marginBottom: '0.2rem' }}>
                    <EditableText contentKey={p.nameKey} fallback={p.nameFb} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem', fontWeight: 600 }}>
                    <EditableText contentKey={p.roleKey} fallback={p.roleFb} />
                  </div>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ fontSize: '0.875rem', color: 'var(--rust)', fontWeight: 700 }}>
                    <EditableText contentKey={p.phoneKey} fallback={p.phoneFb} />
                  </a>
                </div>
              )
            })}
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
