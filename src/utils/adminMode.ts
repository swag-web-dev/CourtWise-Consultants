export function isAdminMode(): boolean {
  if (typeof window === 'undefined') return false
  if (!localStorage.getItem('cw_admin_token')) return false
  if (new URLSearchParams(window.location.search).get('admin') === 'true') {
    sessionStorage.setItem('cw_admin_session', 'true')
    return true
  }
  return sessionStorage.getItem('cw_admin_session') === 'true'
}
