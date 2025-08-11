import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import PageTitle from './components/PageTitle'

function App() {
  return (
    <div className="App">
      <PageTitle />
      <Navbar />
      <Home />
    </div>
  )
}

export default App
