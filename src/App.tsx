import { Navigation } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { BackToTop } from './components/ui/BackToTop'
import { CustomCursor } from './components/ui/CustomCursor'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Expertise } from './sections/Expertise'
import { Projects } from './sections/Projects'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Contact } from './sections/Contact'
import './App.css'
import './components/ui/Button.css'

function App() {
  return (
    <>
      <a href="#home" className="skip-link" data-cursor="link">
        Skip to content
      </a>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
