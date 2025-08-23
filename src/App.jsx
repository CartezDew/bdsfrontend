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
        </Routes>
      </div>
    </ServiceProvider>
  );
}

export default App
