import axios from 'axios'
import type { Appointment, ServiceType, TimeSlot, User } from '../types'
import Cookies from 'js-cookie'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// === UTILS ===
function getXsrfHeader() {
  const token = Cookies.get('XSRF-TOKEN')
  return { 'X-XSRF-TOKEN': decodeURIComponent(token || '') }
}

// === AUTH ===
export async function apiLogin(email: string, password: string) {
  try {
    await axios.get(`${API_BASE}/sanctum/csrf-cookie`, {
      withCredentials: true
    })

    await api.post('/api/login', { email, password }, {
      headers: getXsrfHeader()
    })

    const user = await api.get('/api/me')
    return {
      user: user.data,
      token: null
    }
  } catch (error: any) {
    console.error('Login failed:', error.response?.data)
    throw error
  }
}

export async function apiLogout() {
  await api.post('/api/logout', {}, {
    headers: getXsrfHeader()
  })
  return { success: true }
}

// === APPOINTMENTS ===
export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await api.get('/api/appointments' , {    
  })

  return response.data
}

export async function createAppointment(data: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> {
  
  const response = await api.post('/api/appointments', data, {
  })
  console.log('API response:', response.data) // ← Ajoute ceci pour confirmer que `id` est là
  return response.data
}

export async function updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
  const response = await api.put(`/api/appointments/${id}`, data, {
    headers: getXsrfHeader()
  })
  return response.data
}

export async function deleteAppointment(id: string): Promise<void> {
  await api.delete(`/api/appointments/${id}`, {
    headers: getXsrfHeader()
  })
}

// === TIME SLOTS ===
export async function fetchAvailableTimeSlots(date: string, serviceTypeId: string): Promise<TimeSlot[]> {
  const slots: TimeSlot[] = []
  const bookedAppointments = await fetchAppointments()

  const bookedTimes = bookedAppointments
    .filter(a => a.appointment_time.startsWith(date))
    .map(a => new Date(a.appointment_time).getHours())

  for (let hour = 8; hour <= 18; hour++) {
    if (hour !== 12 && hour !== 13) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: !bookedTimes.includes(hour)
      })
    }
  }

  return slots
}

// === SERVICE TYPES ===
export async function fetchServiceTypes(): Promise<ServiceType[]> {
  const response = await api.get('/api/service-types')
  return response.data
}

export async function createServiceType(data: Omit<ServiceType, 'id'>): Promise<ServiceType> {
  const response = await api.post('/api/service-types', data, {
    headers: getXsrfHeader()
  })
  return response.data
}

export async function updateServiceType(id: string, data: Partial<ServiceType>): Promise<ServiceType> {
  const response = await api.put(`/api/service-types/${id}`, data, {
    headers: getXsrfHeader()
  })
  return response.data
}

export async function deleteServiceType(id: string): Promise<void> {
  await api.delete(`/api/service-types/${id}`, {
    headers: getXsrfHeader()
  })
}

// === INTERCEPTORS ===
api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 419) {
      console.warn('419 CSRF error. Retrying after refreshing CSRF cookie...')
    }

    if (error.response?.status === 401) {
      console.warn('401 Unauthorized – handled by caller')
    }

    return Promise.reject(error)
  }
)
