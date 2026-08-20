import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

type ContentMap = Record<string, string>

interface ContentCtx {
  get: (key: string, fallback: string) => string
  set: (key: string, value: string) => void
  save: (key: string, value: string, token: string) => Promise<void>
  saveBulk: (entries: { key: string; value: string }[], token: string) => Promise<void>
  loaded: boolean
}

const Ctx = createContext<ContentCtx>({
  get: (_k, f) => f,
  set: () => {},
  save: async () => {},
  saveBulk: async () => {},
  loaded: false,
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<ContentMap>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then((data: ContentMap) => { setMap(data); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  const get = useCallback((key: string, fallback: string) => map[key] ?? fallback, [map])

  const set = useCallback((key: string, value: string) => {
    setMap(prev => ({ ...prev, [key]: value }))
  }, [])

  const save = useCallback(async (key: string, value: string, token: string) => {
    set(key, value)
    await fetch(`/api/content/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ value }),
    })
  }, [set])

  const saveBulk = useCallback(async (entries: { key: string; value: string }[], token: string) => {
    entries.forEach(e => set(e.key, e.value))
    await fetch('/api/content/bulk', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(entries),
    })
  }, [set])

  return <Ctx.Provider value={{ get, set, save, saveBulk, loaded }}>{children}</Ctx.Provider>
}

export const useContent = () => useContext(Ctx)
