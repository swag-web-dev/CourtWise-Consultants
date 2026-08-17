import TopBar  from './components/TopBar'
import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import Services from './components/Services'
import About   from './components/About'
import Fees    from './components/Fees'
import WhyUs   from './components/WhyUs'
import Contact from './components/Contact'
import Footer  from './components/Footer'

export default function App() {
  return (
    <>
      <TopBar />
      <Navbar />
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
