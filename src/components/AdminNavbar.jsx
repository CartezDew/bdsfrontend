import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/admin.css'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const onSignOut = () => {
    // Placeholder sign-out: clear any demo auth state and go home
    try { sessionStorage.removeItem('auth_token') } catch {}
    navigate('/')
  }
  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <img src="/favicon.svg" alt="BDS Talent Group logo" className="admin-logo" />
        <span className="admin-logo-text">Talent Group</span>
      </div>
      <div className="admin-nav-right">
        <button className="admin-signout-btn" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}

export default AdminNavbar


