import './styles/sections.css'

import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Principal from './components/Principal'
import Academics from './components/Academics'
import Campus from './components/Campus'
import Faculty from './components/Faculty'
import Gallery from './components/Gallery'
import Events from './components/Events'
import Testimonials from './components/Testimonials'
import Admissions from './components/Admissions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      {/* Ambient background */}
      <div className="aurora" aria-hidden="true">
        <span className="aurora__blob aurora__blob--a" />
        <span className="aurora__blob aurora__blob--b" />
        <span className="aurora__blob aurora__blob--c" />
      </div>
      <div className="grain" aria-hidden="true" />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Principal />
        <Academics />
        <Campus />
        <Faculty />
        <Gallery />
        <Events />
        <Testimonials />
        <Admissions />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
