import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageTitle from './components/PageTitle'
import Hero from './components/Hero'
import AvoidConfusion from './components/AvoidConfusion'
import Services from './components/Services'
import OfficeHoursLocations from './components/OfficeHoursLocations'
import GetStarted from './components/GetStarted'

function App() {
  return (
    <div className="App">
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

        <Route path="/services" element={<Services />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </div>
  )
}

export default App
