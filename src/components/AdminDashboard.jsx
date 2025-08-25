import React, { useEffect, useMemo, useState } from 'react'
import { seedIfEmpty, getGetStartedSubmissions, getAppointmentSubmissions, clearAdminData } from '../utils/adminData'
import '../styles/admin.css'
import AdminNavbar from './AdminNavbar'
import AdminAppointmentsPanel from './AdminAppointmentsPanel'

const AdminDashboard = () => {
  const [tab, setTab] = useState('workflow')
  const [getStarted, setGetStarted] = useState([])
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    seedIfEmpty()
    setGetStarted(getGetStartedSubmissions())
    setAppointments(getAppointmentSubmissions())
  }, [])

  const totals = useMemo(() => ({
    uploads: getStarted.length,
    appointments: appointments.length
  }), [getStarted.length, appointments.length])

  const upcomingAppointments = useMemo(() => {
    const now = Date.now()
    return [...appointments]
      .filter(a => {
        const t = new Date(a.dateTime || a.createdAt).getTime()
        return (t >= now) && (a.status !== 'Canceled')
      })
      .sort((a,b) => new Date(a.dateTime || a.createdAt) - new Date(b.dateTime || b.createdAt))
      .slice(0, 6)
  }, [appointments])

  const recentClients = useMemo(() => {
    return [...getStarted]
      .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)
  }, [getStarted])

  return (
    <>
      <AdminNavbar />
      <main className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Track Get Started uploads and scheduled appointments.</p>
        <div className="admin-tabs">
          <button className={tab==='workflow'?'active':''} onClick={()=>setTab('workflow')}>Workflow</button>
          <button className={tab==='appts'?'active':''} onClick={()=>setTab('appts')}>Appointments</button>
          <button className="danger" onClick={()=>{ clearAdminData(); seedIfEmpty(); setGetStarted(getGetStartedSubmissions()); setAppointments(getAppointmentSubmissions()); }}>Reset Demo Data</button>
        </div>
      </header>

      {tab==='workflow' && (
        <section className="admin-workflow">
          <div className="workflow-grid">
            <div className="workflow-card">
              <div className="workflow-card-header">
                <h3>Upcoming Appointments</h3>
                <button className="workflow-link" onClick={()=>setTab('appts')}>View all</button>
              </div>
              <table className="workflow-table">
                <thead>
                  <tr>
                    <th>Date/Time</th><th>Client</th><th>Service</th><th>Contact</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.length === 0 ? (
                    <tr><td colSpan="5">No upcoming appointments</td></tr>
                  ) : upcomingAppointments.map(a => {
                    const when = new Date(a.dateTime || a.createdAt)
                    return (
                      <tr key={a.id}>
                        <td>{when.toLocaleString()}</td>
                        <td>{a.name}</td>
                        <td>{a.serviceType}</td>
                        <td>{a.email}{a.phone ? ` / ${a.phone}` : ''}</td>
                        <td>{a.status || 'Scheduled'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="workflow-card">
              <div className="workflow-card-header">
                <h3>Recent Clients</h3>
              </div>
              <table className="workflow-table">
                <thead>
                  <tr>
                    <th>Submitted</th><th>Name</th><th>Service</th><th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {recentClients.length === 0 ? (
                    <tr><td colSpan="4">No recent submissions</td></tr>
                  ) : recentClients.map(c => (
                    <tr key={c.id}>
                      <td>{new Date(c.createdAt).toLocaleString()}</td>
                      <td>{c.name}</td>
                      <td>{c.serviceType}</td>
                      <td>{c.email}{c.phone ? ` / ${c.phone}` : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      

      {tab==='appts' && (
        <AdminAppointmentsPanel />
      )}
      </main>
    </>
  )
}

export default AdminDashboard


