import React, { useEffect, useMemo, useState } from 'react'
import { 
  getAppointmentSubmissions,
  getAvailability,
  setAvailabilityForDay,
  getBlockedDates,
  blockDate,
  unblockDate,
  cancelAppointment,
  rescheduleAppointment
} from '../utils/adminData'

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const AdminAppointmentsPanel = () => {
  const [appts, setAppts] = useState([])
  const [availability, setAvailability] = useState({})
  const [blocked, setBlocked] = useState([])
  const [rescheduleInfo, setRescheduleInfo] = useState({}) // {id:'ap_..', date:'YYYY-MM-DD', time:'HH:mm'}

  useEffect(() => {
    setAppts(getAppointmentSubmissions())
    setAvailability(getAvailability())
    setBlocked(getBlockedDates())
  }, [])

  const onSaveDay = (idx, start, end) => {
    const a = setAvailabilityForDay(idx, start, end)
    setAvailability(a)
  }

  const toggleBlock = (dateISO) => {
    const isBlocked = blocked.includes(dateISO)
    const list = isBlocked ? unblockDate(dateISO) : blockDate(dateISO)
    setBlocked(list)
  }

  const onCancel = (id) => {
    setAppts(cancelAppointment(id))
  }

  const onReschedule = (id) => {
    const ri = rescheduleInfo[id]
    if (!ri || !ri.date || !ri.time) return
    const iso = new Date(`${ri.date}T${ri.time}:00`).toISOString()
    setAppts(rescheduleAppointment(id, iso))
    setRescheduleInfo(prev => ({ ...prev, [id]: {} }))
  }

  const todayISO = useMemo(() => new Date().toISOString().slice(0,10), [])

  return (
    <div className="admin-appts">
      <div className="admin-scheduler-controls">
        <h3>Weekly Availability</h3>
        <div className="admin-week-grid">
          {days.map((d, idx) => {
            const def = availability[idx] || { start: '00:00', end: '00:00' }
            return (
              <div key={idx} className="admin-day">
                <div className="admin-day-title">{d}</div>
                <div className="admin-day-row">
                  <label>Start</label>
                  <input type="time" defaultValue={def.start} onChange={(e)=>onSaveDay(idx, e.target.value, def.end)} />
                </div>
                <div className="admin-day-row">
                  <label>End</label>
                  <input type="time" defaultValue={def.end} onChange={(e)=>onSaveDay(idx, def.start, e.target.value)} />
                </div>
              </div>
            )
          })}
        </div>

        <h3 style={{marginTop: '1rem'}}>Block Specific Dates</h3>
        <div className="admin-blocker">
          <input type="date" defaultValue={todayISO} id="admin-block-date" />
          <button onClick={()=>{
            const input = document.getElementById('admin-block-date')
            if (!input) return
            toggleBlock(input.value)
          }}>Toggle Block</button>
          <div className="admin-blocked-list">
            {blocked.length === 0 ? <span>No blocked dates</span> : blocked.map(d => (
              <button key={d} className="pill" onClick={()=>toggleBlock(d)} title="Unblock">{d} ×</button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-table" style={{marginTop: '1rem'}}>
        <h2>Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Date/Time</th><th>Name</th><th>Service</th><th>Contact</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appts.map(r => {
              const iso = r.dateTime || r.createdAt
              const when = new Date(iso)
              const id = r.id
              const ri = rescheduleInfo[id] || {}
              return (
                <tr key={id}>
                  <td>{when.toLocaleString()}</td>
                  <td>{r.name}</td>
                  <td>{r.serviceType}</td>
                  <td>{r.email} / {r.phone}</td>
                  <td>{r.status || 'Scheduled'}</td>
                  <td>
                    <button onClick={()=>onCancel(id)}>Cancel</button>
                    <span style={{margin:'0 .5rem'}}></span>
                    <input type="date" value={ri.date || ''} onChange={(e)=>setRescheduleInfo(p=>({...p,[id]:{...p[id], date:e.target.value}}))} />
                    <input type="time" value={ri.time || ''} onChange={(e)=>setRescheduleInfo(p=>({...p,[id]:{...p[id], time:e.target.value}}))} />
                    <button onClick={()=>onReschedule(id)}>Reschedule</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminAppointmentsPanel


