<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppointmentsStore } from '../../stores/appointments'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import AppointmentForm from '../../components/ui/AppointmentForm.vue'
import type { Appointment } from '../../types'

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const appointmentsStore = useAppointmentsStore()
const serviceTypesStore = useServiceTypesStore()
const isLoading = ref(true)
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: [],
  locale: 'fr',
  slotMinTime: '08:00:00',
  slotMaxTime: '19:00:00',
  businessHours: {
    daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday to Saturday
    startTime: '08:00',
    endTime: '18:00',
  },
  height: 'auto',
  eventClick: handleEventClick,
  editable: false,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
})

// For event details modal
const showEventModal = ref(false)
const selectedEvent = ref<any>(null)

// For edit appointment modal
const showEditModal = ref(false)
const editingAppointment = ref<Appointment | null>(null)

onMounted(async () => {
  try {
    if (serviceTypesStore.serviceTypes.length === 0) {
      await serviceTypesStore.loadServiceTypes()
    }
    
    await appointmentsStore.loadAppointments()
    updateCalendarEvents()
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    isLoading.value = false
  }
})

function updateCalendarEvents() {
  calendarOptions.value.events = appointmentsStore.appointmentsForCalendar
}

function handleEventClick(info: any) {
  selectedEvent.value = {
    id: info.event.id,
    title: info.event.title,
    start: info.event.start,
    status: info.event.extendedProps.status,
    email: info.event.extendedProps.email,
    phone: info.event.extendedProps.phone,
    vehicle: info.event.extendedProps.vehicle,
  }
  
  showEventModal.value = true
}

function closeEventModal() {
  showEventModal.value = false
  selectedEvent.value = null
}

function openEditModal() {
  if (selectedEvent.value) {
    const appointment = appointmentsStore.appointments.find(a => a.id === selectedEvent.value.id)
    if (appointment) {
      editingAppointment.value = appointment
      showEditModal.value = true
      closeEventModal()
    }
  }
}

function closeEditModal() {
  showEditModal.value = false
  editingAppointment.value = null
}

async function handleSaveEdit(appointment: Appointment) {
  try {
    await appointmentsStore.updateAppointmentById(appointment.id, appointment)
    updateCalendarEvents()
    closeEditModal()
  } catch (error) {
    console.error('Failed to update appointment:', error)
  }
}

async function updateAppointmentStatus(id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') {
  try {
    await appointmentsStore.updateAppointmentById(id, { status })
    updateCalendarEvents()
    closeEventModal()
  } catch (error) {
    console.error(`Failed to update appointment status to ${status}:`, error)
  }
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Calendrier des Rendez-vous</h2>
    
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement du calendrier...</p>
    </div>
    
    <div v-else class="animate-fade-in">
      <FullCalendar :options="calendarOptions" />
      
      <!-- Event details modal -->
      <div v-if="showEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md mx-4 w-full animate-fade-in">
          <div class="px-6 py-4 border-b flex justify-between items-center">
            <h3 class="text-lg font-medium">Détails du rendez-vous</h3>
            <button @click="closeEventModal" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <h4 class="font-bold mb-2">{{ selectedEvent?.title }}</h4>
            
            <p class="mb-2">
              <span class="font-medium">Date:</span> 
              {{ new Date(selectedEvent?.start).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
            </p>
            
            <p class="mb-2">
              <span class="font-medium">Heure:</span> 
              {{ new Date(selectedEvent?.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }}
            </p>
            
            <p class="mb-2">
              <span class="font-medium">Email:</span> {{ selectedEvent?.email }}
            </p>
            
            <p class="mb-2">
              <span class="font-medium">Téléphone:</span> {{ selectedEvent?.phone }}
            </p>
            
            <p class="mb-4">
              <span class="font-medium">Véhicule:</span> {{ selectedEvent?.vehicle }}
            </p>
            
            <div class="pt-4 border-t flex justify-between">
              <div>
                <span 
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full border',
                    {
                      'bg-warning-50 text-warning-700 border-warning-500': selectedEvent?.status === 'pending',
                      'bg-success-50 text-success-700 border-success-500': selectedEvent?.status === 'confirmed',
                      'bg-primary-50 text-primary-700 border-primary-500': selectedEvent?.status === 'completed',
                      'bg-error-50 text-error-700 border-error-500': selectedEvent?.status === 'cancelled',
                    }
                  ]"
                >
                  {{ 
                    selectedEvent?.status === 'pending' ? 'En attente' :
                    selectedEvent?.status === 'confirmed' ? 'Confirmé' :
                    selectedEvent?.status === 'completed' ? 'Terminé' :
                    'Annulé'
                  }}
                </span>
              </div>
              
              <div class="space-x-2">
                <button @click="openEditModal" class="btn btn-secondary text-sm px-3 py-1">
                  Modifier
                </button>
                
                <template v-if="selectedEvent?.status === 'pending'">
                  <button 
                    @click="updateAppointmentStatus(selectedEvent.id, 'confirmed')" 
                    class="btn btn-success text-sm px-3 py-1"
                  >
                    Confirmer
                  </button>
                </template>
                
                <template v-if="selectedEvent?.status === 'confirmed'">
                  <button 
                    @click="updateAppointmentStatus(selectedEvent.id, 'completed')" 
                    class="btn btn-primary text-sm px-3 py-1"
                  >
                    Terminer
                  </button>
                </template>
                
                <template v-if="selectedEvent?.status !== 'cancelled' && selectedEvent?.status !== 'completed'">
                  <button 
                    @click="updateAppointmentStatus(selectedEvent.id, 'cancelled')" 
                    class="btn btn-error text-sm px-3 py-1"
                  >
                    Annuler
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Edit modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-fade-in">
          <div class="px-6 py-4 border-b flex justify-between items-center">
            <h3 class="text-lg font-medium">Modifier le rendez-vous</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <AppointmentForm
              v-if="editingAppointment"
              :edit-mode="true"
              :appointment="editingAppointment"
              @saved="handleSaveEdit"
              @cancel="closeEditModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>