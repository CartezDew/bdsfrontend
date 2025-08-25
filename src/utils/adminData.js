// Simple localStorage-backed admin data helpers with seed data

const GET_STARTED_KEY = 'admin_get_started_submissions'
const APPOINTMENTS_KEY = 'admin_appointment_submissions'
const AVAILABILITY_KEY = 'admin_availability_by_day' // {0:{start:'09:00',end:'17:00'},...}
const BLOCKED_DATES_KEY = 'admin_blocked_dates' // [ '2025-03-14' ] ISO yyyy-mm-dd

function safeParse(json, fallback) {
  try { return JSON.parse(json) } catch { return fallback }
}

export function seedIfEmpty() {
  const gsRaw = localStorage.getItem(GET_STARTED_KEY)
  const apRaw = localStorage.getItem(APPOINTMENTS_KEY)
  if (!gsRaw) {
    const seed = [
      {
        id: 'gs_' + Date.now(),
        createdAt: new Date().toISOString(),
        type: 'Upload',
        serviceType: 'Personal Tax Return',
        referralSource: 'Google Search',
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '555-123-4567',
        files: 2,
        note: 'Has prior year return ready.'
      }
    ]
    localStorage.setItem(GET_STARTED_KEY, JSON.stringify(seed))
  }
  if (!apRaw) {
    const seed = [
      {
        id: 'ap_' + (Date.now() - 86400),
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        type: 'Appointment',
        serviceType: 'Bookkeeping',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '404-555-8899',
        dateTime: new Date(Date.now() + 86400000).toISOString(),
        status: 'Scheduled'
      }
    ]
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(seed))
  }
  const availRaw = localStorage.getItem(AVAILABILITY_KEY)
  if (!availRaw) {
    const def = {0:{start:'09:00',end:'17:00'},1:{start:'09:00',end:'17:00'},2:{start:'09:00',end:'17:00'},3:{start:'09:00',end:'17:00'},4:{start:'09:00',end:'17:00'},5:{start:'10:00',end:'14:00'},6:{start:'00:00',end:'00:00'}}
    localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(def))
  }
  const blockedRaw = localStorage.getItem(BLOCKED_DATES_KEY)
  if (!blockedRaw) {
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify([]))
  }
}

export function getGetStartedSubmissions() {
  const raw = localStorage.getItem(GET_STARTED_KEY)
  return safeParse(raw, [])
}

export function getAppointmentSubmissions() {
  const raw = localStorage.getItem(APPOINTMENTS_KEY)
  return safeParse(raw, [])
}

export function addGetStartedSubmission(entry) {
  const list = getGetStartedSubmissions()
  list.unshift(entry)
  localStorage.setItem(GET_STARTED_KEY, JSON.stringify(list))
}

export function addAppointmentSubmission(entry) {
  const list = getAppointmentSubmissions()
  list.unshift(entry)
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list))
}

export function clearAdminData() {
  localStorage.removeItem(GET_STARTED_KEY)
  localStorage.removeItem(APPOINTMENTS_KEY)
  localStorage.removeItem(AVAILABILITY_KEY)
  localStorage.removeItem(BLOCKED_DATES_KEY)
}

// Availability & blocking
export function getAvailability() {
  return safeParse(localStorage.getItem(AVAILABILITY_KEY), {})
}

export function setAvailabilityForDay(dayIndex, start, end) {
  const a = getAvailability()
  a[dayIndex] = { start, end }
  localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(a))
  return a
}

export function getBlockedDates() {
  return safeParse(localStorage.getItem(BLOCKED_DATES_KEY), [])
}

export function blockDate(dateISO) {
  const list = getBlockedDates()
  if (!list.includes(dateISO)) list.push(dateISO)
  localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(list))
  return list
}

export function unblockDate(dateISO) {
  const list = getBlockedDates().filter(d => d !== dateISO)
  localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(list))
  return list
}

// Appointment actions
export function cancelAppointment(id) {
  const list = getAppointmentSubmissions().map(r => r.id === id ? { ...r, status: 'Canceled' } : r)
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list))
  return list
}

export function rescheduleAppointment(id, newISO) {
  const list = getAppointmentSubmissions().map(r => r.id === id ? { ...r, dateTime: newISO, status: 'Rescheduled' } : r)
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list))
  return list
}


