import { useState, useCallback } from 'react'
import { useContent } from '../context/ContentContext'
import { isAdminMode } from '../utils/adminMode'

interface Props {
  contentKey: string
  fallback: string
  multiline?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function EditableText({ contentKey, fallback, multiline = false, style, className }: Props) {
  const { get, save } = useContent()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const adminMode = isAdminMode()
  const token = adminMode ? (localStorage.getItem('cw_admin_token') || '') : ''
  const current = get(contentKey, fallback)

  const startEdit = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDraft(current)
    setEditing(true)
  }, [current])

  const commit = useCallback(async () => {
    setEditing(false)
    if (draft !== current) {
      await save(contentKey, draft, token)
    }
  }, [draft, current, contentKey, save, token])

  if (!adminMode) return <>{current}</>

  const baseSt: React.CSSProperties = {
    fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit',
    color: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit',
    fontStyle: 'normal',
    background: 'rgba(197,155,39,0.15)',
    border: '2px solid #C59B27',
    borderRadius: 3,
    padding: '1px 5px',
    outline: 'none',
    boxSizing: 'border-box',
    ...style,
  }

  if (editing) {
    if (multiline) {
      return (
        <textarea
          data-edit-text
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === 'Escape') setEditing(false) }}
          rows={3}
          style={{ ...baseSt, resize: 'vertical', display: 'block', width: '100%' }}
          className={className}
        />
      )
    }
    return (
      <input
        data-edit-text
        autoFocus
        type="text"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
          if (e.key === 'Escape') setEditing(false)
        }}
        style={{ ...baseSt, display: 'inline-block', minWidth: '4em', width: 'auto' }}
        className={className}
      />
    )
  }

  return (
    <span
      data-edit-text
      onClick={startEdit}
      title="Click to edit"
      style={{
        cursor: 'text',
        outline: '1.5px dashed rgba(197,155,39,0.55)',
        outlineOffset: 2,
        borderRadius: 2,
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.outlineColor = '#C59B27'
        e.currentTarget.style.background = 'rgba(197,155,39,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.outlineColor = 'rgba(197,155,39,0.55)'
        e.currentTarget.style.background = 'transparent'
      }}
      className={className}
    >
      {current}
    </span>
  )
}
