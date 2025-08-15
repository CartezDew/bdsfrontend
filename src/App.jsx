import React from 'react'
// import Home from './components/Home'
import PageTitle from './components/PageTitle'
import Hero from './components/Hero'
import Services from './components/Services'
import OfficeHoursLocations from './components/OfficeHoursLocations'

function App() {
  return (
    <div className="App">
      <PageTitle />
      <Hero />
      <Services />
      <OfficeHoursLocations />
    </div>
  )
}

export default App
