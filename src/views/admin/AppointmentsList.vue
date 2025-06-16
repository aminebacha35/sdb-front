<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAppointmentsStore } from '../../stores/appointments'
import AppointmentCard from '../../components/ui/AppointmentCard.vue'
import AppointmentForm from '../../components/ui/AppointmentForm.vue'
import type { Appointment } from '../../types'

const appointmentsStore = useAppointmentsStore()
const isLoading = ref(true)

// For edit modal
const showEditModal = ref(false)
const editingAppointment = ref<Appointment | null>(null)

// For filters
const statusFilter = ref<string>('all')
const dateFilter = ref('')

const filteredAppointments = computed(() => {
  let filtered = [...appointmentsStore.appointments]
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(a => a.status === statusFilter.value)
  }
  
  // Filter by date
  if (dateFilter.value) {
    filtered = filtered.filter(a => a.appointment_time.startsWith(dateFilter.value))
  }
  
  // Sort by appointment date (most recent first)
  filtered.sort((a, b) => new Date(a.appointment_time).getTime() - new Date(b.appointment_time).getTime())
  
  return filtered
})

onMounted(async () => {
  try {
    await appointmentsStore.loadAppointments()
  } catch (error) {
    console.error('Failed to load appointments:', error)
  } finally {
    isLoading.value = false
  }
})

function openEditModal(appointment: Appointment) {
  editingAppointment.value = appointment
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editingAppointment.value = null
}

async function handleSaveEdit(appointment: Appointment) {
  try {
    await appointmentsStore.updateAppointmentById(appointment.id, appointment)
    closeEditModal()
  } catch (error) {
    console.error('Failed to update appointment:', error)
  }
}

async function updateAppointmentStatus(id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') {
  try {
    await appointmentsStore.updateAppointmentById(id, { status })
  } catch (error) {
    console.error(`Failed to update appointment status to ${status}:`, error)
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-bold mb-4 sm:mb-0 text-primary-700">Gestion des Rendez-vous</h2>
      
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <!-- Status filter -->
        <select 
          v-model="statusFilter"
          class="form-select transition-transform duration-150 hover:scale-105 active:scale-95">
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmés</option>
          <option value="completed">Terminés</option>
          <option value="cancelled">Annulés</option>
        </select>
        
        <!-- Date filter -->
        <input 
          type="date" 
          v-model="dateFilter"
          class="form-input transition-transform duration-150 hover:scale-105 active:scale-95">
        />
      </div>
    </div>
    
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des rendez-vous...</p>
    </div>
    
    <div v-else-if="filteredAppointments.length === 0" class="py-8 text-center bg-gray-50 rounded-lg">
      <p class="text-gray-500">Aucun rendez-vous trouvé</p>
    </div>
    
    <div v-else>
      <AppointmentCard
        v-for="appointment in filteredAppointments"
        :key="appointment.id"
        :appointment="appointment"
        @edit="openEditModal"
        @cancel="updateAppointmentStatus($event, 'cancelled')"
        @complete="updateAppointmentStatus($event, 'completed')"
        @confirm="updateAppointmentStatus($event, 'confirmed')"
      />
    </div>
    
    <!-- Edit modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-fade-in">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-medium">Modifier le rendez-vous</h3>
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
</template>