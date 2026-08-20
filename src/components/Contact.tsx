import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import EditableText from './EditableText'

const SERVICE_LIST = [
  'Family Court Consultancy & McKenzie Friend Support',
  'Child Welfare Consultancy',
  'Court Documents & Hearing Preparation',
  'CAFCASS & Family Court Preparation',
  'Child Consultation & Contact Services',
  'Supported & Supervised Contact',
  'Professional Consultancy & Training',
  'Professional Referral',
  'General Enquiry',
]

type FormState = { name: string; email: string; phone: string; service: string; message: string }
type Errors = Partial<Record<keyof FormState, string>>

export default function Contact() {
  const { get } = useContent()
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const phone1 = get('home.contact.phone1_num', '07474 941569')
  const phone2 = get('home.contact.phone2_num', '07432 346731')
  const email  = get('home.contact.email', 'courtwise2026@outlook.com')

  const contactItems = [
    { icon: <PhoneIcon />, labelKey: 'home.contact.phone1_name', labelFb: 'Samantha Petrides', valueKey: 'home.contact.phone1_num', valueFb: '07474 941569', href: `tel:${phone1.replace(/\s/g, '')}` },
    { icon: <PhoneIcon />, labelKey: 'home.contact.phone2_name', labelFb: 'John Marlow',       valueKey: 'home.contact.phone2_num', valueFb: '07432 346731', href: `tel:${phone2.replace(/\s/g, '')}` },
    { icon: <MailIcon />,  labelKey: null,                        labelFb: 'Email',             valueKey: 'home.contact.email',      valueFb: 'courtwise2026@outlook.com', href: `mailto:${email}` },
  ]

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.name.trim())    e.name    = 'Please enter your name'
    if (!form.phone.trim())   e.phone   = 'Please enter your phone number'
    if (!form.message.trim()) e.message = 'Please describe how we can help'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
    } catch {
      setSent(true) // still show thanks even if offline
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem',
    border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--sans)', fontSize: '0.9rem',
    color: 'var(--text)', background: 'var(--white)',
    outline: 'none', transition: 'border-color var(--transition)',
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1fr 1.15fr',
        gap: '5rem', alignItems: 'stretch',
      }}>

        {/* ── Left info ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="eyebrow"><EditableText contentKey="home.contact.tag" fallback="Get in Touch" /></span>
          <h2 className="section-title"><EditableText contentKey="home.contact.title" fallback="We're Here to Help" /></h2>
          <div className="divider" />
          <p className="lead" style={{ marginBottom: '2.25rem' }}>
            <EditableText contentKey="home.contact.subtitle" fallback="Whether you're just starting out or already in proceedings, we're here to guide you. Contact us today for a free, no-obligation 30-minute telephone enquiry." multiline={true} />
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {contactItems.map(item => (
              <a key={item.valueKey} href={item.href} style={{
                display: 'flex', gap: '1rem', alignItems: 'center',
                padding: '1rem 1.25rem',
                background: 'var(--cream)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                transition: 'border-color var(--transition), box-shadow var(--transition)',
                textDecoration: 'none',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--green)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span style={{ color: 'var(--rust)', flexShrink: 0, display: 'flex' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: '0.15rem' }}>
                    {item.labelKey
                      ? <EditableText contentKey={item.labelKey} fallback={item.labelFb} />
                      : item.labelFb}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--rust)' }}>
                    <EditableText contentKey={item.valueKey} fallback={item.valueFb} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{
            marginTop: 'auto',
            padding: '1.5rem', borderLeft: '4px solid var(--gold)',
            background: 'var(--cream)', borderRadius: '0 var(--radius) var(--radius) 0',
          }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--green)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              <EditableText contentKey="home.contact.quote" fallback='"Supporting families through every step of the family justice journey."' />
            </p>
          </div>
        </div>

        {/* ── Right form ── */}
        <div style={{ alignSelf: 'end' }}>
          {sent ? (
            <div style={{
              background: 'var(--green)', color: 'var(--white)',
              padding: '3.5rem 2.5rem', textAlign: 'center',
              borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)',
            }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}><CheckIcon /></div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', marginBottom: '1rem' }}>
                Thank You
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                Your enquiry has been received. We'll be in touch very soon.
                If your matter is urgent, please call us directly.
              </p>
              <a href={`tel:${phone1.replace(/\s/g, '')}`} className="btn btn-gold" style={{ marginTop: '2rem', display: 'inline-block' }}>
                Call Now: {phone1}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{
              background: 'var(--cream)',
              padding: '2.5rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Full Name *" error={errors.name}>
                  <input name="name" value={form.name} required
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name" style={inputStyle}
                    onFocus={ev => (ev.target.style.borderColor = 'var(--green)')}
                    onBlur={ev  => (ev.target.style.borderColor = 'var(--border)')}
                  />
                </Field>
                <Field label="Phone Number *" error={errors.phone}>
                  <input name="phone" value={form.phone} required
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="07xxx xxxxxx" style={inputStyle}
                    onFocus={ev => (ev.target.style.borderColor = 'var(--green)')}
                    onBlur={ev  => (ev.target.style.borderColor = 'var(--border)')}
                  />
                </Field>
              </div>

              <Field label="Email Address" error={errors.email}>
                <input name="email" type="email" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com" style={inputStyle}
                  onFocus={ev => (ev.target.style.borderColor = 'var(--green)')}
                  onBlur={ev  => (ev.target.style.borderColor = 'var(--border)')}
                />
              </Field>

              <Field label="Service Required" error={errors.service}>
                <select value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={ev => (ev.target.style.borderColor = 'var(--green)')}
                  onBlur={ev  => (ev.target.style.borderColor = 'var(--border)')}
                >
                  <option value="">Select a service...</option>
                  {SERVICE_LIST.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Tell Us About Your Situation *" error={errors.message}>
                <textarea name="message" value={form.message} required rows={5}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Please give us a brief overview of your situation and how we can help..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={ev => (ev.target.style.borderColor = 'var(--green)')}
                  onBlur={ev  => (ev.target.style.borderColor = 'var(--border)')}
                />
              </Field>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                By submitting this form, you consent to being contacted by CourtWise Consultants.
                Your information is held securely and never shared with third parties.
              </p>

              <button type="submit" className="btn btn-rust" style={{ fontSize: '0.9rem', padding: '1rem 2rem' }}>
                Send Enquiry →
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #contact .container > div:last-child { align-self: auto !important; }
        }
        @media (max-width: 500px) {
          form > div:first-child { grid-template-columns: 1fr !important; }
          #contact form { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}

function PhoneIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
}
function MailIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}
function CheckIcon() {
  return <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--green)', marginBottom: '0.4rem',
      }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: '0.75rem', color: 'var(--rust)', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  )
}
