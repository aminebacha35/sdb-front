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
async function refreshCsrfToken() {
  try {
    const response = await axios.get(`${API_BASE}/sanctum/csrf-cookie`, {
      withCredentials: true
    })
    return response
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token CSRF:', error)
    throw error
  }
}

// === INTERCEPTORS ===
api.interceptors.request.use(async (config) => {
  // Rafraîchir le token CSRF avant chaque requête
  await refreshCsrfToken()
  
  // Ajouter le token CSRF à la requête
  const token = Cookies.get('XSRF-TOKEN')
  if (token) {
    config.headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
  }
  
  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 419) {
      console.warn('419 CSRF error. Retrying after refreshing CSRF cookie...')
      await refreshCsrfToken()
      const config = error.config
      const token = Cookies.get('XSRF-TOKEN')
      if (token) {
        config.headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
      }
      return api(config)
    }

    if (error.response?.status === 401) {
      console.warn('401 Unauthorized – handled by caller')
      Object.keys(Cookies.get()).forEach(cookieName => {
        Cookies.remove(cookieName)
      })
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

// === AUTH ===
export async function apiLogin(email: string, password: string) {
  try {
    await refreshCsrfToken()
    const response = await api.post('/api/login', { email, password })
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
  try {
    const response = await api.post('/api/logout', {})
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName)
    })
    console.log('Déconnexion réussie:', response.data)
    return { success: true }
  } catch (error: any) {
    console.error('Erreur lors de la déconnexion:', error.response?.data || error.message)
    if (error.response?.status === 401) {
      return { success: true }
    }
    throw error
  }
}

// === APPOINTMENTS ===
export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await api.get('/api/appointments')
  return response.data
}

export async function createAppointment(data: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> {
  const response = await api.post('/api/appointments', data)
  return response.data
}

export async function updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
  try {
    await refreshCsrfToken() // Rafraîchir le token avant la mise à jour
    const response = await api.put(`/api/appointments/${id}`, data)
    return response.data
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du rendez-vous:', error.response?.data || error.message)
    throw error
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  await api.delete(`/api/appointments/${id}`)
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
  const response = await api.post('/api/service-types', data)
  return response.data
}

export async function updateServiceType(id: string, data: Partial<ServiceType>): Promise<ServiceType> {
  const response = await api.put(`/api/service-types/${id}`, data)
  return response.data
}

export async function deleteServiceType(id: string): Promise<void> {
  await api.delete(`/api/service-types/${id}`)
}
