export interface User {
  id: string
  name: string
  email: string
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type NewAppointment = Omit<Appointment, 'id' | 'status' | 'service_type' | 'created_at' | 'updated_at'>


export interface ServiceType {
  id: string
  name: string
  description: string
}

export interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  vehicle: string
  appointment_time: string
  status: AppointmentStatus
  service_type_id: string
  service_type?: ServiceType
  created_at?: string
  updated_at?: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface ApiResponse<T> {
  data: T
  message?: string
}