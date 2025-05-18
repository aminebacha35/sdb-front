import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Appointment, AppointmentStatus, NewAppointment } from '../types'
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  fetchAvailableTimeSlots
} from '../services/api'
import { format } from 'date-fns'

export const useAppointmentsStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const appointmentsByDate = computed(() => {
    const grouped: Record<string, Appointment[]> = {}

    appointments.value.forEach(appointment => {
      const date = format(new Date(appointment.appointment_time), 'yyyy-MM-dd')
      if (!grouped[date]) grouped[date] = []
      grouped[date].push(appointment)
    })

    return grouped
  })

  const appointmentsForCalendar = computed(() => {
    return appointments.value.map(appointment => ({
      id: appointment.id,
      title: `${appointment.name} - ${appointment.service_type?.name || 'Service'}`,
      start: appointment.appointment_time,
      end: new Date(new Date(appointment.appointment_time).getTime() + 60 * 60 * 1000),
      extendedProps: {
        status: appointment.status,
        email: appointment.email,
        phone: appointment.phone,
        vehicle: appointment.vehicle
      },
      backgroundColor: getStatusColor(appointment.status),
      borderColor: getStatusColor(appointment.status)
    }))
  })

  function getStatusColor(status: AppointmentStatus): string {
    switch (status) {
      case 'pending': return '#F59E0B'
      case 'confirmed': return '#10B981'
      case 'completed': return '#6366F1'
      case 'cancelled': return '#EF4444'
      default: return '#6B7280'
    }
  }

  function sanitizeAppointment(data: any): NewAppointment {
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      vehicle: data.vehicle,
      appointment_time: data.appointment_time,
      service_type_id: data.service_type_id
    }
  }

  async function loadAppointments() {
    isLoading.value = true
    error.value = null
    try {
      appointments.value = await fetchAppointments()
    } catch (err) {
      error.value = 'Échec du chargement des rendez-vous.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function addAppointment(data: NewAppointment) {
    isLoading.value = true
    error.value = null

    try {
      const sanitized = sanitizeAppointment(data)
      const newAppointment = await createAppointment(sanitized)
      appointments.value.push(newAppointment)
      return newAppointment
    } catch (err: any) {
      if (err.response?.status === 422) {
        error.value = 'Erreur de validation.'
        throw err.response.data.errors
      }
      error.value = 'Impossible d’ajouter le rendez-vous.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateAppointmentById(id: string, data: Partial<Appointment>) {
    isLoading.value = true
    error.value = null

    try {
      const updated = await updateAppointment(id, data)
      const index = appointments.value.findIndex(a => a.id === id)
      if (index !== -1) {
        appointments.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = 'Échec de la mise à jour du rendez-vous.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function removeAppointment(id: string) {
    isLoading.value = true
    error.value = null

    try {
      await deleteAppointment(id)
      appointments.value = appointments.value.filter(a => a.id !== id)
    } catch (err) {
      error.value = 'Échec de la suppression du rendez-vous.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function getAvailableTimeSlots(date: string, serviceTypeId: string) {
    isLoading.value = true
    error.value = null

    try {
      return await fetchAvailableTimeSlots(date, serviceTypeId)
    } catch (err) {
      error.value = 'Impossible de charger les créneaux disponibles.'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function getAppointmentById(id: string) {
    return appointments.value.find(a => a.id === id) || null
  }

  function reset() {
    appointments.value = []
    error.value = null
    isLoading.value = false
  }

  return {
    appointments,
    isLoading,
    error,
    appointmentsByDate,
    appointmentsForCalendar,
    loadAppointments,
    addAppointment,
    updateAppointmentById,
    removeAppointment,
    getAvailableTimeSlots,
    getAppointmentById,
    reset
  }
})
