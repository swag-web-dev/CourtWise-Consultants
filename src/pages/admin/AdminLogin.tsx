import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo_transparent.png'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed'); return }
      localStorage.setItem('cw_admin_token', data.token)
      localStorage.setItem('cw_admin_name',  data.name)
      navigate('/admin/dashboard')
    } catch {
      setError('Could not connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f4f1ec',
    }}>
      <div style={{
        background: '#fff', borderRadius: 8,
        boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
        padding: '2.5rem 2.25rem', width: '100%', maxWidth: 400,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: '#f2e8d8', overflow: 'hidden',
            border: '2px solid rgba(199,138,53,0.4)',
          }}>
            <img src={logoImg} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.1rem' }}>
              <span style={{ color: '#063E2D' }}>Court</span>
              <span style={{ color: '#C78A35' }}>Wise</span>
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#888', textTransform: 'uppercase' }}>
              Admin Panel
            </div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.35rem', color: '#063E2D', marginBottom: '1.5rem', fontWeight: 700 }}>
          Sign in
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#444', letterSpacing: '0.05em' }}>USERNAME</span>
            <input
              type="text" value={email} onChange={e => setEmail(e.target.value)}
              required autoComplete="username"
              style={inputStyle}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#444', letterSpacing: '0.05em' }}>PASSWORD</span>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              required autoComplete="current-password"
              style={inputStyle}
            />
          </label>

          {error && (
            <p style={{ fontSize: '0.82rem', color: '#A9340B', background: '#fef2f0', padding: '0.6rem 0.85rem', borderRadius: 4, margin: 0 }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop: '0.5rem',
            padding: '0.85rem',
            background: loading ? '#888' : '#063E2D',
            color: '#fff', border: 'none', borderRadius: 5,
            fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.06em',
            cursor: loading ? 'not-allowed' : 'pointer',
            textTransform: 'uppercase',
          }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '0.65rem 0.85rem',
  border: '1px solid #d0ccc6',
  borderRadius: 5,
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  color: '#1a1a1a',
}
