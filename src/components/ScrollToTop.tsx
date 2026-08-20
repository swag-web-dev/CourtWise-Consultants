import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          const style = getComputedStyle(document.documentElement)
          const topbarH = parseFloat(style.getPropertyValue('--topbar-h')) || 36
          const navH    = parseFloat(style.getPropertyValue('--nav-h'))    || 68
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - topbarH - navH,
            behavior: 'smooth',
          })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}
