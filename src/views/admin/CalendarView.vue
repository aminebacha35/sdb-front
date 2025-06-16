<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAppointmentsStore } from '../../stores/appointments'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import AppointmentForm from '../../components/ui/AppointmentForm.vue'
import type { Appointment, AppointmentStatus } from '../../types'

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'

const appointmentsStore = useAppointmentsStore()
const serviceTypesStore = useServiceTypesStore()
const isLoading = ref(true)
const showEventModal = ref(false)
const selectedEvent = ref<any>(null)

const statusColors = {
  pending: '#F59E0B',
  confirmed: '#10B981',
  cancelled: '#EF4444'
} as const

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  locale: frLocale,
  slotMinTime: '08:00:00',
  slotMaxTime: '18:00:00',
  allDaySlot: false,
  slotDuration: '00:30:00',
  height: 'auto',
  events: appointmentsStore.appointmentsForCalendar,
  eventClick: (info: any) => {
    selectedEvent.value = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      email: info.event.extendedProps.email,
      phone: info.event.extendedProps.phone,
      vehicle: info.event.extendedProps.vehicle,
      status: info.event.extendedProps.status
    }
    showEventModal.value = true
  },
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5, 6],
    startTime: '08:00',
    endTime: '18:00'
  },
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true
})

onMounted(async () => {
  try {
    if (serviceTypesStore.serviceTypes.length === 0) {
      await serviceTypesStore.loadServiceTypes()
    }
    
    await appointmentsStore.loadAppointments()
    // Mettre à jour les événements après le chargement
    calendarOptions.value.events = appointmentsStore.appointmentsForCalendar
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    isLoading.value = false
  }
})

function closeEventModal() {
  showEventModal.value = false
  selectedEvent.value = null
}

async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  try {
    await appointmentsStore.updateAppointmentById(id, { status })
    closeEventModal()
  } catch (error) {
    console.error(`Failed to update appointment status to ${status}:`, error)
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-bold mb-4 sm:mb-0 text-primary-700">Calendrier des Rendez-vous</h2>
      
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: statusColors.pending }"></div>
          <span class="text-sm">En attente</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: statusColors.confirmed }"></div>
          <span class="text-sm">Confirmé</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: statusColors.cancelled }"></div>
          <span class="text-sm">Annulé</span>
        </div>
      </div>
    </div>
    
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement du calendrier...</p>
    </div>
    
    <div v-else class="bg-white rounded-lg shadow">
      <FullCalendar :options="calendarOptions" />
    </div>

    <!-- Modal pour les détails du rendez-vous -->
    <div v-if="showEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-gray-900">{{ selectedEvent?.title }}</h3>
          <button @click="closeEventModal" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <span class="font-semibold text-gray-700">Date:</span>
            <p class="text-gray-900">{{ new Date(selectedEvent?.start).toLocaleString('fr-FR') }}</p>
          </div>
          <div>
            <span class="font-semibold text-gray-700">Email:</span>
            <p class="text-gray-900">{{ selectedEvent?.email }}</p>
          </div>
          <div>
            <span class="font-semibold text-gray-700">Téléphone:</span>
            <p class="text-gray-900">{{ selectedEvent?.phone }}</p>
          </div>
          <div>
            <span class="font-semibold text-gray-700">Véhicule:</span>
            <p class="text-gray-900">{{ selectedEvent?.vehicle }}</p>
          </div>
          <div>
            <span class="font-semibold text-gray-700">Statut:</span>
            <p class="text-gray-900">{{ selectedEvent?.status }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <template v-if="selectedEvent?.status === 'pending'">
            <button 
              @click="updateAppointmentStatus(selectedEvent.id, 'confirmed')"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirmer
            </button>
          </template>
          
          <template v-if="selectedEvent?.status !== 'cancelled'">
            <button 
              @click="updateAppointmentStatus(selectedEvent.id, 'cancelled')"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Annuler
            </button>
          </template>
          
          <button 
            @click="closeEventModal"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>