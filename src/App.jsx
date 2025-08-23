import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ServiceProvider } from './context/ServiceContext'
import Navbar from './components/Navbar'
import PageTitle from './components/PageTitle'
import Hero from './components/Hero'
import AvoidConfusion from './components/AvoidConfusion'
import Services from './components/Services'
import OfficeHoursLocations from './components/OfficeHoursLocations'
import GetStarted from './components/GetStarted'
import ServicesPage from './components/ServicesPage'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [showNavbar, setShowNavbar] = useState(!isHomePage)
  const navbarStateRef = useRef(showNavbar)
  
  // Update ref when state changes
  useEffect(() => {
    navbarStateRef.current = showNavbar
  }, [showNavbar])
  
  // Show navbar when scrolling past hero section on home page
  useEffect(() => {
    if (!isHomePage) {
      setShowNavbar(true)
      return
    }
    
    // For home page, start with navbar hidden
    setShowNavbar(false)
    
    const handleScroll = () => {
      // Look for the avoid confusion section by its class name
      const avoidConfusionSection = document.querySelector('.avoid-confusion-section')
      
      if (avoidConfusionSection) {
        const rect = avoidConfusionSection.getBoundingClientRect()
        // Show navbar when avoid confusion section is fully in view (top of viewport)
        // This means hero section is completely out of view
        const shouldShowNavbar = rect.top <= 0
        
        if (shouldShowNavbar !== navbarStateRef.current) {
          setShowNavbar(shouldShowNavbar)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage, location.pathname])

  // If we land on home route with a hash (e.g., /#services), perform precise scroll
  useEffect(() => {
    if (!isHomePage) return
    const hash = window.location.hash
    if (!hash) return
    const targetId = hash.replace('#', '')
    const computeScrollTop = () => {
      // Fallback lookup if element lacks id
      let el = document.getElementById(targetId)
      if (!el && targetId === 'avoid-confusion') {
        el = document.querySelector('.avoid-confusion-section')
      }
      if (!el) return null
      const navbarEl = document.querySelector('.navbar')
      const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0
      const rectTop = el.getBoundingClientRect().top + window.scrollY
      const styles = window.getComputedStyle(el)
      const marginTop = parseFloat(styles.marginTop) || 0
      const borderTop = parseFloat(styles.borderTopWidth) || 0
      // Special case: align the very top of AvoidConfusion to viewport top
      if (targetId === 'avoid-confusion') {
        return rectTop - marginTop - borderTop
      }
      // Special case: Meet the CEO (why-us) — scroll to bottom of social-proof so
      // the top of why-us (next section) is fully visible
      if (targetId === 'why-us') {
        const socialProofEl = document.getElementById('social-proof')
        if (socialProofEl) {
          const socialProofTop = socialProofEl.getBoundingClientRect().top + window.scrollY
          const socialProofBottom = socialProofTop + socialProofEl.offsetHeight
          return socialProofBottom - navbarHeight
        }
        // Fallback to bottom of why-us section itself
        const sectionHeight = el.offsetHeight
        return rectTop + sectionHeight - navbarHeight
      }
      // Special case: Business Entity Selector — scroll to bottom of
      // meet-the-owner so the widget starts visible
      if (targetId === 'entity-selector') {
        const entityEl = document.getElementById('entity-selector')
        if (entityEl) {
          const eTop = entityEl.getBoundingClientRect().top + window.scrollY
          const eStyles = window.getComputedStyle(entityEl)
          const eMarginTop = parseFloat(eStyles.marginTop) || 0
          const eBorderTop = parseFloat(eStyles.borderTopWidth) || 0
          return eTop - navbarHeight - eMarginTop - eBorderTop
        }
        // Fallback to bottom of meet-the-owner
        const meetEl = document.getElementById('meet-the-owner')
        if (meetEl) {
          const meetTop = meetEl.getBoundingClientRect().top + window.scrollY
          const meetBottom = meetTop + meetEl.offsetHeight
          return meetBottom - navbarHeight
        }
      }
      if (targetId === 'appointment-scheduler') {
        const schedulerEl = document.querySelector('.appointment-scheduler')
        if (schedulerEl) {
          const sTop = schedulerEl.getBoundingClientRect().top + window.scrollY
          const sStyles = window.getComputedStyle(schedulerEl)
          const sMarginTop = parseFloat(sStyles.marginTop) || 0
          const sBorderTop = parseFloat(sStyles.borderTopWidth) || 0
          return sTop - navbarHeight - sMarginTop - sBorderTop
        }
        const officeEl = document.getElementById('contact')
        if (officeEl) {
          const oTop = officeEl.getBoundingClientRect().top + window.scrollY
          const oBottom = oTop + officeEl.offsetHeight
          return oBottom - navbarHeight
        }
      }
      // Special case: Services — align to bottom of previous section (hero)
      if (targetId === 'services') {
        const sEl = document.getElementById('services')
        if (sEl) {
          const prev = sEl.previousElementSibling
          if (prev) {
            const prevTop = prev.getBoundingClientRect().top + window.scrollY
            const prevBottom = prevTop + prev.offsetHeight
            return Math.max(0, prevBottom - navbarHeight)
          }
        }
      }
      // Special case: Testimonials (social-proof) — same pattern as meet-the-owner
      if (targetId === 'social-proof') {
        const servicesEl = document.getElementById('services')
        if (servicesEl) {
          const servicesTop = servicesEl.getBoundingClientRect().top + window.scrollY
          const servicesBottom = servicesTop + servicesEl.offsetHeight
          return servicesBottom - navbarHeight
        }
      }
      return rectTop - navbarHeight - marginTop - borderTop
    }

    // defer to allow DOM render then do initial smooth scroll
    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'smooth' })
    }, 50)

    // post-adjust like hero controls (in case navbar size changes during scroll)
    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'auto' })
    }, 350)
    setTimeout(() => {
      const pos = computeScrollTop()
      if (pos == null) return
      window.scrollTo({ top: pos, behavior: 'auto' })
    }, 700)
  }, [isHomePage, location.key])
  
  return (
    <ServiceProvider>
      <div className="App">
        {/* Show navbar on non-home pages OR when scrolling past hero on home page */}
        {showNavbar && <Navbar />}
        <Routes>
        <Route path="/" element={
          <>
            <PageTitle />
            <Hero />
            <AvoidConfusion />
            <Services />
            <OfficeHoursLocations />
          </>
        } />

        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </div>
    </ServiceProvider>
  );
}

export default App
