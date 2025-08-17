import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageTitle from './components/PageTitle'
import Hero from './components/Hero'
import Services from './components/Services'
import OfficeHoursLocations from './components/OfficeHoursLocations'
import AboutUs from './components/AboutUs'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <PageTitle />
            <Hero />
            <Services />
            <OfficeHoursLocations />
          </>
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  )
}

export default App
