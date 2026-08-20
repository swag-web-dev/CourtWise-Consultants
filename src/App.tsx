import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import { isAdminMode } from './utils/adminMode'
import ScrollToTop    from './components/ScrollToTop'
import TopBar         from './components/TopBar'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import Services       from './components/Services'
import About          from './components/About'
import Fees           from './components/Fees'
import WhyUs          from './components/WhyUs'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import ServiceDetail  from './pages/ServiceDetail'
import AdminLogin     from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

// Blocks all link navigation in admin mode so clicking around the preview doesn't navigate away.
// Clicks on [data-edit-text] elements (EditableText spans/inputs) are allowed through.
function AdminLinkBlocker() {
  useEffect(() => {
    if (!isAdminMode()) return
    const block = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest('[data-edit-text]')) return
      if (e.target.closest('a')) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }
    document.addEventListener('click', block, true)
    return () => document.removeEventListener('click', block, true)
  }, [])
  return null
}

function MainPage() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <About />
        <Fees />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function PublicLayout() {
  return (
    <>
      <AdminLinkBlocker />
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin"           element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/*"               element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  )
}
