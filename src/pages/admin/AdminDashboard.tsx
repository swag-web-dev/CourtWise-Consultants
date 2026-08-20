import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import logoSq from '../../assets/logo.jpg'

type Tag = { id: number; name: string; color: string; hidden: number; deleted?: number }
type Submission = {
  id: number; name: string; email: string | null; phone: string
  service: string | null; message: string; is_read: number
  created_at: string; tags: Tag[]
}
type ActiveMode = 'forms' | 'page' | null

const HOME_SECTIONS = [
  { id: 'home-top',      label: 'Home',     url: '/'          },
  { id: 'home-services', label: 'Services', url: '/#services' },
  { id: 'home-about',    label: 'About Us', url: '/#about'    },
  { id: 'home-fees',     label: 'Fees',     url: '/#fees'     },
  { id: 'home-why-us',   label: 'Why Us',   url: '/#why-us'   },
  { id: 'home-contact',  label: 'Contact',  url: '/#contact'  },
]
const SERVICE_PAGES = SERVICES.map(svc => ({
  id: `service-${svc.slug}`,
  label: svc.title.length > 32 ? svc.title.slice(0, 30) + '…' : svc.title,
  url: `/services/${svc.slug}`,
}))
const TAG_COLORS = ['#C78A35','#063E2D','#B84A28','#2563eb','#7c3aed','#db2777','#0891b2','#65a30d']

function buildIframeUrl(url: string) {
  const origin = window.location.origin
  const hi = url.indexOf('#')
  return hi !== -1
    ? `${origin}${url.slice(0, hi)}?admin=true${url.slice(hi)}`
    : `${origin}${url}?admin=true`
}
function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

/* ── Icons ── */
const EditIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const HomeIcon    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const FileIcon    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
const InboxIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
const ExternalIcon= () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const LogoutIcon  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', flexShrink: 0, display: 'block' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

export default function AdminDashboard() {
  const navigate  = useNavigate()
  const token     = localStorage.getItem('cw_admin_token') || ''
  const adminName = localStorage.getItem('cw_admin_name') || 'Admin'
  const initials  = adminName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  const [activeMode,     setActiveMode]     = useState<ActiveMode>(null)
  const [formsOpen,      setFormsOpen]      = useState(false)
  const [pageEditorOpen, setPageEditorOpen] = useState(true)
  const [homeExpanded,   setHomeExpanded]   = useState(false)
  const [activeUrl,      setActiveUrl]      = useState<string | null>(null)
  const [activeLabel,    setActiveLabel]    = useState('')
  const [submissions,    setSubmissions]    = useState<Submission[]>([])
  const [tags,           setTags]           = useState<Tag[]>([])
  const [formsLoading,   setFormsLoading]   = useState(false)
  const [selectedSub,    setSelectedSub]    = useState<Submission | null>(null)
  const [openMenuId,     setOpenMenuId]     = useState<number | null>(null)
  const [showTagManager, setShowTagManager] = useState(false)
  const [managerPanel,   setManagerPanel]   = useState<'none' | 'create' | 'edit'>('none')
  const [editingTagId,   setEditingTagId]   = useState<number | null>(null)
  const [editName,       setEditName]       = useState('')
  const [editColor,      setEditColor]      = useState(TAG_COLORS[0])
  const [editHidden,     setEditHidden]     = useState(false)
  const [confirmDeleteTagId, setConfirmDeleteTagId] = useState<number | null>(null)
  const [filterTagId,    setFilterTagId]    = useState<number | 'unread' | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!token) { navigate('/admin'); return }
    fetch('/api/auth/verify', { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
      .then(r => { if (!r.ok) { localStorage.clear(); navigate('/admin') } })
  }, [token, navigate])

  // Close menu on outside click
  useEffect(() => {
    if (openMenuId === null) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openMenuId])

  function loadForms() {
    setFormsLoading(true)
    Promise.all([
      fetch('/api/submissions', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/tags',        { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([subs, tagList]) => {
      if (Array.isArray(subs))    setSubmissions(subs)
      if (Array.isArray(tagList)) setTags(tagList)
    }).finally(() => setFormsLoading(false))
  }

  function openForms() {
    const opening = !formsOpen
    setFormsOpen(opening)
    if (opening) { setActiveMode('forms'); setActiveUrl(null); setSelectedSub(null); setFilterTagId(null); loadForms() }
    else { setFilterTagId(null) }
  }

  function selectHome() { setHomeExpanded(o => !o); setActiveUrl('/'); setActiveLabel('Home'); setActiveMode('page'); setSelectedSub(null) }
  function selectSection(url: string, label: string) { setActiveUrl(url); setActiveLabel(`Home — ${label}`); setActiveMode('page'); setSelectedSub(null) }
  function selectService(url: string, label: string) { setHomeExpanded(false); setActiveUrl(url); setActiveLabel(label); setActiveMode('page'); setSelectedSub(null) }

  async function openSubmission(sub: Submission) {
    setSelectedSub(sub)
    if (!sub.is_read) {
      await fetch(`/api/submissions/${sub.id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } })
      setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, is_read: 1 } : s))
    }
  }

  async function deleteSubmission(id: number) {
    await fetch(`/api/submissions/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setSubmissions(prev => prev.filter(s => s.id !== id))
    if (selectedSub?.id === id) setSelectedSub(null)
    setOpenMenuId(null)
  }

  async function markUnread(id: number) {
    await fetch(`/api/submissions/${id}/unread`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } })
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, is_read: 0 } : s))
    setOpenMenuId(null)
  }

  async function toggleTag(sub: Submission, tag: Tag) {
    const hasTag = sub.tags.some(t => t.id === tag.id)
    const method = hasTag ? 'DELETE' : 'POST'
    await fetch(`/api/tags/${tag.id}/assign/${sub.id}`, { method, headers: { Authorization: `Bearer ${token}` } })
    setSubmissions(prev => prev.map(s => {
      if (s.id !== sub.id) return s
      return { ...s, tags: hasTag ? s.tags.filter(t => t.id !== tag.id) : [...s.tags, tag] }
    }))
    if (selectedSub?.id === sub.id) {
      setSelectedSub(prev => prev ? { ...prev, tags: hasTag ? prev.tags.filter(t => t.id !== tag.id) : [...prev.tags, tag] } : null)
    }
  }

  async function createTag() {
    if (!editName.trim()) return
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: editName.trim(), color: editColor }),
    })
    const tag = await res.json()
    if (tag.id) {
      setTags(prev => [...prev, { ...tag, hidden: 0 }])
      setEditName(''); setEditColor(TAG_COLORS[0]); setManagerPanel('none')
    }
  }

  async function saveTagEdit() {
    if (!editName.trim() || editingTagId === null) return
    const hidden = editHidden ? 1 : 0
    await fetch(`/api/tags/${editingTagId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: editName.trim(), color: editColor, hidden }),
    })
    const updated = { id: editingTagId, name: editName.trim(), color: editColor, hidden }
    setTags(prev => prev.map(t => t.id === editingTagId ? updated : t))
    setSubmissions(prev => prev.map(s => ({
      ...s,
      tags: s.tags.map(t => t.id === editingTagId ? updated : t),
    })))
    if (selectedSub) setSelectedSub(prev => prev ? { ...prev, tags: prev.tags.map(t => t.id === editingTagId ? updated : t) } : null)
    if (hidden && filterTagId === editingTagId) setFilterTagId(null)
  }

  async function deleteTag(id: number) {
    await fetch(`/api/tags/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setTags(prev => prev.filter(t => t.id !== id))
    // Mark as deleted in submissions so the tag stays visible but is flagged
    setSubmissions(prev => prev.map(s => ({ ...s, tags: s.tags.map(t => t.id === id ? { ...t, deleted: 1 } : t) })))
    if (selectedSub) setSelectedSub(prev => prev ? { ...prev, tags: prev.tags.map(t => t.id === id ? { ...t, deleted: 1 } : t) } : null)
    setManagerPanel('none'); setEditingTagId(null); setConfirmDeleteTagId(null)
    if (filterTagId === id) setFilterTagId(null)
  }

  const iframeSrc         = activeUrl ? buildIframeUrl(activeUrl) : null
  const iframeKey         = activeUrl ? activeUrl.split('#')[0] : 'none'
  const homeIsActive      = activeUrl?.split('#')[0] === '/'
  const unreadCount       = submissions.filter(s => !s.is_read).length
  const visibleSubs     = filterTagId === null    ? submissions
                        : filterTagId === 'unread' ? submissions.filter(s => !s.is_read)
                        : submissions.filter(s => s.tags.some(t => t.id === filterTagId))
  const activeFilterTag = typeof filterTagId === 'number' ? tags.find(t => t.id === filterTagId) : null

  /* ─── Sidebar button styles ─── */
  const sideBtn = (active: boolean): React.CSSProperties => ({
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.88rem 1rem', border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer', background: active ? 'rgba(199,138,53,0.08)' : 'transparent',
    color: '#C78A35', fontSize: '0.67rem', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase' as const, transition: 'background 0.15s',
  })

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <header style={{ height: 62, background: '#0a2d1e', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: '#f2e8d8', overflow: 'hidden', border: '2px solid rgba(199,138,53,0.5)' }}>
            <img src={logoSq} alt="CourtWise" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.12rem', lineHeight: 1.1 }}>
              <span style={{ color: '#fff' }}>Court</span><span style={{ color: '#C78A35' }}>Wise</span>
            </div>
            <div style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.7rem 0.3rem 0.35rem', background: 'rgba(255,255,255,0.06)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ width: 27, height: 27, borderRadius: '50%', background: 'linear-gradient(135deg, #C78A35 0%, #9a6420 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials}</div>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.62)', fontWeight: 500, whiteSpace: 'nowrap' }}>{adminName}</span>
          </div>
          <a href="/" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: '0.38rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.58)', border: '1px solid rgba(255,255,255,0.11)', padding: '0.36rem 0.78rem', borderRadius: 6, textDecoration: 'none', background: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.58)' }}>
            <ExternalIcon /> View site
          </a>
          <button onClick={() => { localStorage.removeItem('cw_admin_token'); localStorage.removeItem('cw_admin_name'); navigate('/admin') }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.38rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.11)', color: 'rgba(255,255,255,0.52)', padding: '0.36rem 0.78rem', borderRadius: 6, cursor: 'pointer', fontSize: '0.72rem', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,74,40,0.18)'; e.currentTarget.style.color = '#f09080' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.52)' }}>
            <LogoutIcon /> Sign out
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Sidebar ── */}
        <aside style={{ width: 242, flexShrink: 0, background: '#0d2318', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem' }}>

            {/* Forms toggle */}
            <button onClick={openForms} style={sideBtn(activeMode === 'forms')}
              onMouseEnter={e => { if (activeMode !== 'forms') e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              onMouseLeave={e => { if (activeMode !== 'forms') e.currentTarget.style.background = 'transparent' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <InboxIcon /> Forms
                {unreadCount > 0 && <span style={{ background: '#B84A28', color: '#fff', fontSize: '0.58rem', fontWeight: 700, padding: '1px 6px', borderRadius: 10, lineHeight: 1.6 }}>{unreadCount}</span>}
              </span>
              <span style={{ color: 'rgba(199,138,53,0.45)', display: 'flex' }}><ChevronIcon open={formsOpen} /></span>
            </button>

            {/* Tags in sidebar when forms open */}
            {formsOpen && tags.filter(t => !t.hidden).length > 0 && (
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.35rem' }}>
                <button
                  onClick={() => { setFilterTagId(null); setActiveMode('forms'); setActiveUrl(null); setSelectedSub(null) }}
                  style={{ width: '100%', textAlign: 'left', padding: '0.45rem 1rem 0.45rem 2.4rem', border: 'none', borderLeft: filterTagId === null && activeMode === 'forms' ? '2px solid #C78A35' : '2px solid transparent', cursor: 'pointer', background: filterTagId === null && activeMode === 'forms' ? 'rgba(199,138,53,0.08)' : 'transparent', color: filterTagId === null && activeMode === 'forms' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)', fontSize: '0.78rem', fontWeight: filterTagId === null && activeMode === 'forms' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (filterTagId !== null || activeMode !== 'forms') { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' } }}
                  onMouseLeave={e => { if (filterTagId !== null || activeMode !== 'forms') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)' } }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: filterTagId === null && activeMode === 'forms' ? '#C78A35' : 'rgba(255,255,255,0.25)' }} />
                  All
                  <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', fontWeight: 600 }}>{submissions.length}</span>
                </button>
                <button
                  onClick={() => { setFilterTagId('unread'); setActiveMode('forms'); setActiveUrl(null); setSelectedSub(null) }}
                  style={{ width: '100%', textAlign: 'left', padding: '0.45rem 1rem 0.45rem 2.4rem', border: 'none', borderLeft: filterTagId === 'unread' ? '2px solid #C78A35' : '2px solid transparent', cursor: 'pointer', background: filterTagId === 'unread' ? 'rgba(199,138,53,0.08)' : 'transparent', color: filterTagId === 'unread' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)', fontSize: '0.78rem', fontWeight: filterTagId === 'unread' ? 600 : 400, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (filterTagId !== 'unread') { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' } }}
                  onMouseLeave={e => { if (filterTagId !== 'unread') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)' } }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: filterTagId === 'unread' ? '#C78A35' : 'rgba(255,255,255,0.25)' }} />
                  Unread
                  {unreadCount > 0 && <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: filterTagId === 'unread' ? 'rgba(255,255,255,0.5)' : '#B84A28', fontWeight: 700 }}>{unreadCount}</span>}
                </button>
                {tags.filter(t => !t.hidden).map(tag => {
                  const isActive = filterTagId === tag.id
                  const count = submissions.filter(s => s.tags.some(t => t.id === tag.id)).length
                  return (
                    <button key={tag.id}
                      onClick={() => { setFilterTagId(tag.id); setActiveMode('forms'); setActiveUrl(null); setSelectedSub(null) }}
                      style={{ width: '100%', textAlign: 'left', padding: '0.45rem 1rem 0.45rem 2.4rem', border: 'none', borderLeft: isActive ? '2px solid #C78A35' : '2px solid transparent', cursor: 'pointer', background: isActive ? 'rgba(199,138,53,0.08)' : 'transparent', color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)', fontSize: '0.78rem', fontWeight: isActive ? 600 : 400, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' } }}
                      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)' } }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: tag.color }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tag.name}</span>
                      {count > 0 && <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', fontWeight: 600, flexShrink: 0 }}>{count}</span>}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Page Editor toggle */}
            <button onClick={() => setPageEditorOpen(o => !o)}
              style={{ ...sideBtn(false), borderTop: formsOpen ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}><EditIcon />Page Editor</span>
              <span style={{ color: 'rgba(199,138,53,0.45)', display: 'flex' }}><ChevronIcon open={pageEditorOpen} /></span>
            </button>

            {pageEditorOpen && (
              <div style={{ paddingTop: '0.3rem' }}>
                <button onClick={selectHome}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 1rem', border: 'none', borderLeft: homeIsActive ? '2.5px solid #C78A35' : '2.5px solid transparent', cursor: 'pointer', background: homeIsActive ? 'rgba(199,138,53,0.1)' : 'transparent', color: homeIsActive ? '#fff' : 'rgba(255,255,255,0.58)', fontSize: '0.84rem', fontWeight: homeIsActive ? 600 : 400, textAlign: 'left', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!homeIsActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' } }}
                  onMouseLeave={e => { if (!homeIsActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.58)' } }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: homeIsActive ? '#C78A35' : 'rgba(255,255,255,0.35)', display: 'flex' }}><HomeIcon /></span> Home
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', display: 'flex' }}><ChevronIcon open={homeExpanded} /></span>
                </button>

                {homeExpanded && HOME_SECTIONS.map(s => {
                  const ia = activeUrl === s.url
                  return (
                    <button key={s.id} onClick={() => selectSection(s.url, s.label)}
                      style={{ width: '100%', textAlign: 'left', padding: '0.48rem 1rem 0.48rem 2.7rem', border: 'none', borderLeft: ia ? '2px solid #C78A35' : '2px solid transparent', cursor: 'pointer', background: ia ? 'rgba(199,138,53,0.08)' : 'transparent', color: ia ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)', fontSize: '0.79rem', fontWeight: ia ? 600 : 400, display: 'flex', alignItems: 'center', gap: '0.55rem', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (!ia) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' } }}
                      onMouseLeave={e => { if (!ia) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)' } }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: ia ? '#C78A35' : 'rgba(255,255,255,0.25)' }} />
                      {s.label}
                    </button>
                  )
                })}

                <div style={{ padding: '1rem 1rem 0.45rem', fontSize: '0.59rem', fontWeight: 700, letterSpacing: '0.17em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '0.4rem' }}>Service Pages</div>

                {SERVICE_PAGES.map(page => {
                  const ia = activeUrl === page.url
                  return (
                    <button key={page.id} onClick={() => selectService(page.url, page.label)}
                      style={{ width: '100%', textAlign: 'left', padding: '0.57rem 1rem', border: 'none', borderLeft: ia ? '2.5px solid #C78A35' : '2.5px solid transparent', cursor: 'pointer', background: ia ? 'rgba(199,138,53,0.1)' : 'transparent', color: ia ? '#fff' : 'rgba(255,255,255,0.52)', fontSize: '0.8rem', fontWeight: ia ? 600 : 400, display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (!ia) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.78)' } }}
                      onMouseLeave={e => { if (!ia) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.52)' } }}>
                      <span style={{ color: ia ? '#C78A35' : 'rgba(255,255,255,0.28)', display: 'flex', flexShrink: 0 }}><FileIcon /></span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{page.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </aside>

        {/* ── Main panel ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* FORMS list */}
          {activeMode === 'forms' && !selectedSub && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f5f2ee' }}>
              {/* Toolbar */}
              <div style={{ background: '#0a2d1e', padding: '0.85rem 1.5rem', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <InboxIcon />
                  {activeFilterTag
                    ? <><span style={{ width: 8, height: 8, borderRadius: '50%', background: activeFilterTag.color, flexShrink: 0, display: 'inline-block' }} />{activeFilterTag.name}</>
                    : filterTagId === 'unread'
                    ? <><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C78A35', flexShrink: 0, display: 'inline-block' }} />Unread</>
                    : 'Form Submissions'}
                  {filterTagId === null && unreadCount > 0 && <span style={{ background: '#B84A28', color: '#fff', fontSize: '0.62rem', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{unreadCount} new</span>}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button onClick={() => { setShowTagManager(true); setManagerPanel('none'); setEditingTagId(null) }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: '#0d2318', background: '#C78A35', border: 'none', borderRadius: 5, cursor: 'pointer', padding: '0.35rem 0.85rem', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#d99a45'}
                    onMouseLeave={e => e.currentTarget.style.background = '#C78A35'}>
                    Manage Tags
                  </button>
                  <button onClick={loadForms}
                    style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, cursor: 'pointer', padding: '0.35rem 0.75rem', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                    ↻ Refresh
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                {formsLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Loading…</span>
                  </div>
                ) : visibleSubs.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.75rem' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#eae5de', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><InboxIcon /></div>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#555', margin: 0 }}>{activeFilterTag ? `No forms tagged "${activeFilterTag.name}"` : filterTagId === 'unread' ? 'No unread forms' : 'No forms yet'}</p>
                    <p style={{ fontSize: '0.82rem', color: '#999', margin: 0 }}>{activeFilterTag ? 'Assign this tag from the ⋮ menu on a form.' : filterTagId === 'unread' ? 'All submissions have been read.' : 'Submissions from the contact form will appear here.'}</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 780, margin: '0 auto' }}>
                    {visibleSubs.map(sub => (
                      <div key={sub.id} style={{ position: 'relative' }}>
                        {/* Card */}
                        <div
                          onClick={() => openSubmission(sub)}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: '#fff', border: `1px solid ${sub.is_read ? '#e5e0d8' : '#c9a84c'}`, borderLeft: `4px solid ${sub.is_read ? '#ddd8d0' : '#C78A35'}`, borderRadius: 8, padding: '1.1rem 3rem 1.1rem 1.25rem', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'}
                          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: sub.is_read ? '#e8e4de' : 'linear-gradient(135deg, #C78A35, #9a6420)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: sub.is_read ? '#999' : '#fff', flexShrink: 0 }}>
                            {sub.name.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <span style={{ fontSize: '0.9rem', fontWeight: sub.is_read ? 500 : 700, color: '#1a1a1a' }}>{sub.name}</span>
                              <span style={{ fontSize: '0.68rem', color: '#aaa', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{formatDate(sub.created_at)}</span>
                            </div>
                            {sub.service && (
                              <span style={{ display: 'inline-block', fontSize: '0.67rem', fontWeight: 600, color: '#063E2D', background: 'rgba(6,62,45,0.07)', padding: '2px 8px', borderRadius: 10, marginBottom: '0.3rem' }}>{sub.service}</span>
                            )}
                            {/* Tags */}
                            {sub.tags.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.3rem' }}>
                                {sub.tags.map(t => (
                                  <span key={t.id} style={{ fontSize: '0.62rem', fontWeight: 600, color: '#fff', background: t.color, padding: '2px 7px', borderRadius: 10 }}>{t.name}</span>
                                ))}
                              </div>
                            )}
                            <p style={{ fontSize: '0.82rem', color: '#666', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub.message}</p>
                          </div>
                          {!sub.is_read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C78A35', flexShrink: 0, marginTop: 6 }} />}
                        </div>

                        {/* 3-dot menu button */}
                        <button
                          onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === sub.id ? null : sub.id) }}
                          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: 28, height: 28, borderRadius: 6, border: '1px solid #e0dbd3', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#888', lineHeight: 1, transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f5f2ee'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                          ⋮
                        </button>

                        {/* Dropdown menu */}
                        {openMenuId === sub.id && (
                          <div ref={menuRef} style={{ position: 'absolute', top: '2.8rem', right: '0.75rem', background: '#fff', border: '1px solid #e0dbd3', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.13)', zIndex: 200, minWidth: 180, overflow: 'hidden' }}>
                            <button onClick={() => markUnread(sub.id)}
                              style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.9rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.82rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#f5f2ee'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <span style={{ fontSize: '0.85rem' }}>○</span> Mark as unread
                            </button>
                            <button onClick={() => deleteSubmission(sub.id)}
                              style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.9rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.82rem', color: '#B84A28', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#fef2f0'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <span style={{ fontSize: '0.85rem' }}>✕</span> Delete
                            </button>
                            {tags.length > 0 && (
                              <>
                                <div style={{ borderTop: '1px solid #f0ece5', padding: '0.4rem 0.9rem 0.2rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa' }}>Add tags</div>
                                {tags.map(tag => {
                                  const active = sub.tags.some(t => t.id === tag.id && !t.deleted)
                                  return (
                                    <button key={tag.id} onClick={() => toggleTag(sub, tag)}
                                      style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.9rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.82rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.55rem' }}
                                      onMouseEnter={e => e.currentTarget.style.background = '#f5f2ee'}
                                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: tag.color, flexShrink: 0 }} />
                                      {tag.name}
                                      {active && <span style={{ marginLeft: 'auto', color: '#063E2D', fontSize: '0.75rem' }}>✓</span>}
                                    </button>
                                  )
                                })}
                              </>
                            )}
                            {sub.tags.filter(t => t.deleted).length > 0 && (
                              <>
                                <div style={{ borderTop: '1px solid #f0ece5', padding: '0.4rem 0.9rem 0.2rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa' }}>Assigned (deleted)</div>
                                {sub.tags.filter(t => t.deleted).map(tag => (
                                  <button key={tag.id} onClick={() => toggleTag(sub, tag)}
                                    style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.9rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.82rem', color: '#aaa', display: 'flex', alignItems: 'center', gap: '0.55rem' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fef2f0'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: tag.color, flexShrink: 0, opacity: 0.5 }} />
                                    <span style={{ flex: 1, textDecoration: 'line-through' }}>{tag.name}</span>
                                    <span style={{ color: '#B84A28', fontSize: '0.7rem', fontWeight: 600 }}>Remove</span>
                                  </button>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUBMISSION DETAIL */}
          {activeMode === 'forms' && selectedSub && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ background: '#0a2d1e', padding: '0.75rem 1.5rem', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <button onClick={() => setSelectedSub(null)} style={{ background: 'none', border: 'none', color: 'rgba(199,138,53,0.8)', cursor: 'pointer', fontSize: '0.72rem', padding: 0, marginBottom: '0.2rem', display: 'block' }}>← Back to forms</button>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{selectedSub.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{formatDate(selectedSub.created_at)}</div>
                </div>
                <button onClick={() => deleteSubmission(selectedSub.id)}
                  style={{ fontSize: '0.72rem', color: 'rgba(255,100,80,0.7)', background: 'rgba(184,74,40,0.12)', border: '1px solid rgba(184,74,40,0.25)', padding: '0.3rem 0.75rem', borderRadius: 5, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,74,40,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(184,74,40,0.12)'}>Delete</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', background: '#f5f2ee', padding: '2rem' }}>
                <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {[
                      { label: 'Phone', value: selectedSub.phone, href: `tel:${selectedSub.phone.replace(/\s/g,'')}` },
                      { label: 'Email', value: selectedSub.email || '—', href: selectedSub.email ? `mailto:${selectedSub.email}` : undefined },
                      { label: 'Service', value: selectedSub.service || 'Not specified', href: undefined },
                    ].map(item => (
                      <div key={item.label} style={{ background: '#fff', border: '1px solid #e0dbd3', borderRadius: 8, padding: '1rem 1.25rem' }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '0.35rem' }}>{item.label}</div>
                        {item.href ? <a href={item.href} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#063E2D', textDecoration: 'none' }}>{item.value}</a>
                          : <span style={{ fontSize: '0.88rem', color: '#444' }}>{item.value}</span>}
                      </div>
                    ))}
                  </div>
                  {selectedSub.tags.length > 0 && (
                    <div style={{ background: '#fff', border: '1px solid #e0dbd3', borderRadius: 8, padding: '1rem 1.25rem' }}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '0.6rem' }}>Tags</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {selectedSub.tags.map(t => (
                          <span key={t.id} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', background: t.color, padding: '3px 10px', borderRadius: 12 }}>{t.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ background: '#fff', border: '1px solid #e0dbd3', borderRadius: 8, padding: '1.5rem 1.25rem' }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '0.85rem' }}>Message</div>
                    <p style={{ fontSize: '0.92rem', color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{selectedSub.message}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a href={`tel:${selectedSub.phone.replace(/\s/g,'')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', background: '#063E2D', color: '#fff', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
                      📞 Call {selectedSub.name.split(' ')[0]}
                    </a>
                    {selectedSub.email && (
                      <a href={`mailto:${selectedSub.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', background: '#fff', color: '#063E2D', border: '1px solid #c0bdb8', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
                        ✉ Email {selectedSub.name.split(' ')[0]}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE view */}
          {activeMode === 'page' && iframeSrc && (
            <>
              <div style={{ background: '#0a2d1e', color: 'rgba(255,255,255,0.55)', padding: '0.42rem 1.25rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: '#C78A35' }}>✎</span>
                  Click any outlined text to edit · Press{' '}
                  <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 3, fontSize: '0.63rem', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.1)' }}>Enter</kbd>
                  {' '}or click away to save
                </span>
                <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.65rem', fontWeight: 500 }}>{activeLabel}</span>
              </div>
              <iframe key={iframeKey} src={iframeSrc} style={{ flex: 1, width: '100%', border: 'none', display: 'block' }} title={`Preview: ${activeLabel}`} />
            </>
          )}

          {/* Empty state */}
          {activeMode === null && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0ece5' }}>
              <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #ddd8d0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2.75rem 2.25rem', maxWidth: 360, width: '90%', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #0d2318, #063E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.4rem', boxShadow: '0 4px 16px rgba(6,62,45,0.2)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(199,138,53,0.9)" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.5rem' }}>Select a section</p>
                <p style={{ fontSize: '0.83rem', color: '#888', lineHeight: 1.7 }}>
                  Open <strong style={{ color: '#063E2D' }}>Forms</strong> to read enquiries, or <strong style={{ color: '#063E2D' }}>Page Editor</strong> to edit site content.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Tag Manager Modal ── */}
      {showTagManager && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setShowTagManager(false) }}>
          <div style={{ background: '#fff', borderRadius: 12, width: 680, maxHeight: '85vh', boxShadow: '0 8px 48px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.5rem', borderBottom: '1px solid #f0ece5', flexShrink: 0 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', color: '#063E2D', margin: 0 }}>Tag Management</h3>
              <button onClick={() => setShowTagManager(false)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#999', padding: '0.1rem 0.3rem', lineHeight: 1 }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

              {/* Left: tag list */}
              <div style={{ width: 210, flexShrink: 0, borderRight: '1px solid #f0ece5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '0.65rem' }}>
                  <button
                    onClick={() => { setManagerPanel('create'); setEditingTagId(null); setEditName(''); setEditColor(TAG_COLORS[0]); setEditHidden(false) }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem 0.85rem', background: managerPanel === 'create' ? '#063E2D' : '#f5f2ee', color: managerPanel === 'create' ? '#fff' : '#444', border: '1px solid', borderColor: managerPanel === 'create' ? '#063E2D' : '#e0dbd3', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'background 0.15s' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span> New Tag
                  </button>
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {tags.length === 0 ? (
                    <p style={{ fontSize: '0.78rem', color: '#bbb', textAlign: 'center', padding: '1rem 0.75rem' }}>No tags yet. Create one!</p>
                  ) : tags.map(tag => {
                    const isSelected = editingTagId === tag.id && managerPanel === 'edit'
                    return (
                      <button key={tag.id}
                        onClick={() => { setManagerPanel('edit'); setEditingTagId(tag.id); setEditName(tag.name); setEditColor(tag.color); setEditHidden(!!tag.hidden) }}
                        style={{ width: '100%', textAlign: 'left', padding: '0.6rem 0.85rem', border: 'none', borderLeft: isSelected ? '3px solid #C78A35' : '3px solid transparent', background: isSelected ? 'rgba(6,62,45,0.06)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.55rem', transition: 'background 0.12s' }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#faf8f5' }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: tag.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '0.84rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{tag.name}</span>
                        {!!tag.hidden && <span style={{ fontSize: '0.6rem', color: '#bbb', fontWeight: 600, flexShrink: 0 }}>hidden</span>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right: edit / create panel */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>

                {managerPanel === 'none' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '0.5rem' }}>
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#d0ccc6" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    <p style={{ fontSize: '0.88rem', color: '#aaa', margin: 0 }}>Select a tag to edit</p>
                    <p style={{ fontSize: '0.75rem', color: '#ccc', margin: 0 }}>or click New Tag to create one</p>
                  </div>
                )}

                {(managerPanel === 'create' || managerPanel === 'edit') && (
                  <>
                    <div style={{ marginBottom: '1.3rem' }}>
                      <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '0.4rem' }}>Tag Name</label>
                      <input
                        autoFocus
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') managerPanel === 'create' ? createTag() : saveTagEdit() }}
                        placeholder="e.g. Urgent, Replied, Follow-up…"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid #d0ccc6', borderRadius: 6, fontSize: '0.9rem', boxSizing: 'border-box', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = '#063E2D'}
                        onBlur={e => e.target.style.borderColor = '#d0ccc6'}
                      />
                    </div>

                    <div style={{ marginBottom: '1.3rem' }}>
                      <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '0.5rem' }}>Colour</label>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {TAG_COLORS.map(c => (
                          <button key={c} onClick={() => setEditColor(c)}
                            style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: editColor === c ? '3px solid #1a1a1a' : '3px solid transparent', cursor: 'pointer', boxSizing: 'border-box', transition: 'border 0.15s' }} />
                        ))}
                      </div>
                      <div style={{ marginTop: '0.65rem' }}>
                        <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, color: '#fff', background: editColor, padding: '3px 10px', borderRadius: 12 }}>{editName || 'Preview'}</span>
                      </div>
                    </div>

                    {managerPanel === 'edit' && (
                      <div style={{ marginBottom: '1.4rem' }}>
                        <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '0.55rem' }}>Show in Sidebar</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <button onClick={() => setEditHidden(h => !h)}
                            style={{ width: 42, height: 24, borderRadius: 12, background: editHidden ? '#ddd' : '#063E2D', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                            <span style={{ position: 'absolute', top: 3, left: editHidden ? 3 : 21, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                          </button>
                          <span style={{ fontSize: '0.82rem', color: '#555' }}>{editHidden ? 'Hidden from sidebar dropdown' : 'Visible in sidebar dropdown'}</span>
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {managerPanel === 'create' ? (
                        <button onClick={createTag} disabled={!editName.trim()}
                          style={{ padding: '0.72rem', background: editName.trim() ? '#063E2D' : '#d0ccc6', border: 'none', borderRadius: 6, cursor: editName.trim() ? 'pointer' : 'not-allowed', fontSize: '0.88rem', fontWeight: 600, color: '#fff', transition: 'background 0.15s' }}
                          onMouseEnter={e => { if (editName.trim()) e.currentTarget.style.background = '#0a5538' }}
                          onMouseLeave={e => { if (editName.trim()) e.currentTarget.style.background = '#063E2D' }}>
                          Create Tag
                        </button>
                      ) : (
                        <>
                          <button onClick={saveTagEdit} disabled={!editName.trim()}
                            style={{ padding: '0.72rem', background: editName.trim() ? '#063E2D' : '#d0ccc6', border: 'none', borderRadius: 6, cursor: editName.trim() ? 'pointer' : 'not-allowed', fontSize: '0.88rem', fontWeight: 600, color: '#fff', transition: 'background 0.15s' }}
                            onMouseEnter={e => { if (editName.trim()) e.currentTarget.style.background = '#0a5538' }}
                            onMouseLeave={e => { if (editName.trim()) e.currentTarget.style.background = '#063E2D' }}>
                            Save Changes
                          </button>
                          <button onClick={() => editingTagId !== null && setConfirmDeleteTagId(editingTagId)}
                            style={{ padding: '0.72rem', background: '#fff', border: '1px solid #f0c0b0', borderRadius: 6, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, color: '#B84A28', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fef2f0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                            Delete Tag
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Tag Confirmation ── */}
      {confirmDeleteTagId !== null && (() => {
        const tag = tags.find(t => t.id === confirmDeleteTagId)
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => { if (e.target === e.currentTarget) setConfirmDeleteTagId(null) }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', width: 360, boxShadow: '0 8px 48px rgba(0,0,0,0.25)', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#fef2f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B84A28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </div>
              <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#1a1a1a', margin: '0 0 0.5rem' }}>Delete "{tag?.name}"?</h4>
              <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
                This tag will be permanently removed and unassigned from all forms. This cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setConfirmDeleteTagId(null)}
                  style={{ flex: 1, padding: '0.7rem', background: '#f5f2ee', border: '1px solid #e0dbd3', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', color: '#555', fontWeight: 500 }}>
                  Cancel
                </button>
                <button onClick={() => deleteTag(confirmDeleteTagId)}
                  style={{ flex: 1, padding: '0.7rem', background: '#B84A28', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#9a3620'}
                  onMouseLeave={e => e.currentTarget.style.background = '#B84A28'}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
