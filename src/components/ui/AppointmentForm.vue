<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import { useAppointmentsStore } from '../../stores/appointments'
import type { TimeSlot, Appointment } from '../../types'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'

const props = defineProps<{
  editMode?: boolean
  appointment?: Appointment
}>()

const emit = defineEmits<{
  saved: [appointment: Appointment | null]
  cancel: []
}>()

const serviceTypesStore = useServiceTypesStore()
const appointmentsStore = useAppointmentsStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  phone: '',
  vehicle: '',
  service_type_id: '',
  appointment_date: '',
  appointment_time: ''
})

const timeSlots = ref<TimeSlot[]>([])
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isLoadingTimeSlots = ref(false)

watch(() => props.appointment, (newVal) => {
  if (newVal && props.editMode) {
    const appointmentDate = new Date(newVal.appointment_time)

    form.value = {
      name: newVal.name,
      email: newVal.email,
      phone: newVal.phone,
      vehicle: newVal.vehicle,
      service_type_id: newVal.service_type_id,
      appointment_date: format(appointmentDate, 'yyyy-MM-dd'),
      appointment_time: format(appointmentDate, 'HH:mm')
    }

    loadTimeSlots()
  }
}, { immediate: true })

onMounted(async () => {
  if (serviceTypesStore.serviceTypes.length === 0) {
    await serviceTypesStore.loadServiceTypes()
  }

  const today = new Date()
  form.value.appointment_date = format(today, 'yyyy-MM-dd')
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const maxDate = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() + 3)
  return date.toISOString().split('T')[0]
})

const isDateInPast = computed(() => {
  if (!form.value.appointment_date) return false
  const selectedDate = new Date(form.value.appointment_date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return selectedDate < today
})

const isTimeInPast = (time: string) => {
  if (!time || !form.value.appointment_date) return false
  
  const selectedDate = new Date(form.value.appointment_date)
  const today = new Date()
  
  if (selectedDate.toDateString() !== today.toDateString()) return false
  
  const [hours, minutes] = time.split(':')
  const selectedTime = new Date(selectedDate)
  selectedTime.setHours(Number(hours), Number(minutes), 0)
  
  return selectedTime < today
}

async function loadTimeSlots() {
  if (!form.value.service_type_id || !form.value.appointment_date) {
    timeSlots.value = []
    return
  }

  isLoadingTimeSlots.value = true
  errorMessage.value = ''

  try {
    timeSlots.value = await appointmentsStore.getAvailableTimeSlots(
      form.value.appointment_date,
      form.value.service_type_id
    )
  } catch (error) {
    errorMessage.value = 'Impossible de charger les créneaux disponibles'
    console.error(error)
  } finally {
    isLoadingTimeSlots.value = false
  }
}

watch([() => form.value.service_type_id, () => form.value.appointment_date], loadTimeSlots)

function selectTimeSlot(time: string) {
  form.value.appointment_time = time
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    errorMessage.value = ''
    successMessage.value = ''

    if (!form.value.name || !form.value.email || !form.value.phone || 
        !form.value.vehicle || !form.value.service_type_id || 
        !form.value.appointment_date || !form.value.appointment_time) {
      errorMessage.value = 'Veuillez remplir tous les champs'
      return
    }

    if (isDateInPast.value || isTimeInPast(form.value.appointment_time)) {
      errorMessage.value = 'Impossible de sélectionner une date ou une heure antérieure'
      return
    }

    const [hours, minutes] = form.value.appointment_time.split(':')
    const date = new Date(form.value.appointment_date)
    date.setHours(Number(hours), Number(minutes), 0)

    const appointmentTime = format(date, 'yyyy-MM-dd HH:mm:ss')

    const appointmentData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      vehicle: form.value.vehicle,
      service_type_id: form.value.service_type_id,
      appointment_time: appointmentTime,
      status: 'pending' as const
    }

    if (props.editMode && props.appointment) {
      await appointmentsStore.updateAppointmentById(
        props.appointment.id,
        appointmentData
      )
      successMessage.value = 'Rendez-vous mis à jour avec succès'
    } else {
      await appointmentsStore.addAppointment(appointmentData)
      successMessage.value = 'Rendez-vous créé avec succès'
    }

    setTimeout(() => {
      emit('saved', null)
      form.value = {
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        service_type_id: '',
        appointment_date: '',
        appointment_time: ''
      }
      successMessage.value = ''
    }, 2000)

  } catch (error: any) {
    errorMessage.value = error.message || 'Une erreur est survenue'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 bg-white p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
    <div v-if="errorMessage" class="bg-error-50 border-l-4 border-error-500 text-error-700 p-4 rounded">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="bg-success-50 border-l-4 border-success-500 text-success-700 p-4 rounded">
      {{ successMessage }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-2">
        <label for="name" class="block text-sm font-semibold text-gray-800">Nom complet</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors" 
          required 
        />
      </div>

      <div class="space-y-2">
        <label for="email" class="block text-sm font-semibold text-gray-800">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors" 
          required 
        />
      </div>

      <div class="space-y-2">
        <label for="phone" class="block text-sm font-semibold text-gray-800">Téléphone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="form.phone" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors" 
          required 
        />
      </div>

      <div class="space-y-2">
        <label for="vehicle" class="block text-sm font-semibold text-gray-800">Véhicule</label>
        <input 
          type="text" 
          id="vehicle" 
          v-model="form.vehicle" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors" 
          required 
        />
      </div>

      <div class="md:col-span-2 space-y-2">
        <label for="service_type" class="block text-sm font-semibold text-gray-800">Type de service</label>
        <select 
          id="service_type" 
          v-model="form.service_type_id" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors" 
          required
        >
          <option value="" disabled>Sélectionnez un service</option>
          <option v-for="type in serviceTypesStore.serviceTypes" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div class="space-y-2">
        <label for="date" class="block text-sm font-semibold text-gray-800">Date</label>
        <input 
          type="date" 
          id="date" 
          v-model="form.appointment_date" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors" 
          :min="minDate" 
          :max="maxDate" 
          required 
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-800">Heure</label>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="slot in timeSlots"
            :key="slot.time"
            type="button"
            :disabled="!slot.available || isDateInPast || isTimeInPast(slot.time)"
            @click="selectTimeSlot(slot.time)"
            :class="[
              'py-2 px-3 text-sm font-medium rounded-lg transition-colors',
              slot.available && !isDateInPast && !isTimeInPast(slot.time)
                ? form.appointment_time === slot.time
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-primary-500'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            ]"
          >
            {{ slot.time }}
          </button>
        </div>
        <p v-if="isDateInPast" class="text-sm text-error-600 mt-2">
          Impossible de sélectionner une date antérieure
        </p>
        <p v-if="isTimeInPast(form.appointment_time)" class="text-sm text-error-600 mt-2">
          Impossible de sélectionner une heure antérieure à l'heure actuelle
        </p>
      </div>
    </div>

    <div class="flex justify-end space-x-4 pt-4">
      <button 
        type="button" 
        class="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors" 
        @click="emit('cancel')"
      >
        Annuler
      </button>
      <button 
        type="submit" 
        class="px-6 py-3 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors" 
        :disabled="isSubmitting || isDateInPast || isTimeInPast(form.appointment_time)"
      >
        {{ props.editMode ? 'Mettre à jour' : 'Prendre rendez-vous' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  @apply cursor-pointer;
}

select {
  @apply appearance-none bg-white text-gray-900;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Style pour le placeholder */
::placeholder {
  @apply text-gray-500;
}

/* Style pour les options du select */
select option {
  @apply text-gray-900 bg-white;
}
</style>
