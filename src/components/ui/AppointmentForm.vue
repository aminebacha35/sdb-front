<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import { useAppointmentsStore } from '../../stores/appointments'
import type { TimeSlot, Appointment } from '../../types'
import { format } from 'date-fns'

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

// Initialize form when in edit mode
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

const minDate = computed(() => format(new Date(), 'yyyy-MM-dd'))

const maxDate = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() + 3)
  return format(date, 'yyyy-MM-dd')
})

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

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  isSubmitting.value = true

  try {
    if (!form.value.name || !form.value.email || !form.value.phone || 
        !form.value.vehicle || !form.value.service_type_id || 
        !form.value.appointment_date || !form.value.appointment_time) {
      errorMessage.value = 'Veuillez remplir tous les champs'
      return
    }

    const [hours, minutes] = form.value.appointment_time.split(':')
    const date = new Date(form.value.appointment_date)
    date.setHours(Number(hours), Number(minutes), 0)

    const appointmentTime = format(date, 'yyyy-MM-dd HH:mm:ss')

    if (props.editMode && props.appointment) {
      const appointmentData = {
        id: props.appointment.id,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        vehicle: form.value.vehicle,
        service_type_id: form.value.service_type_id,
        appointment_time: appointmentTime
      }
      await appointmentsStore.updateAppointmentById(
        props.appointment.id,
        appointmentData
      )
      successMessage.value = 'Le rendez-vous a été mis à jour avec succès'
      emit('saved', props.appointment)
    } else {
      await appointmentsStore.addAppointment({
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        vehicle: form.value.vehicle,
        service_type_id: form.value.service_type_id,
        appointment_time: appointmentTime
      })
      successMessage.value = 'Votre rendez-vous a été enregistré avec succès. Un email de confirmation vous sera envoyé.'
      // Réinitialiser le formulaire après un ajout réussi
      form.value = {
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        service_type_id: '',
        appointment_date: format(new Date(), 'yyyy-MM-dd'),
        appointment_time: ''
      }
      timeSlots.value = []
      emit('saved', null)
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire:', error)
    errorMessage.value = 'Une erreur est survenue lors de la sauvegarde'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-if="errorMessage" class="bg-error-50 border border-error-500 text-error-700 p-3 rounded">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="bg-success-50 border border-success-500 text-success-700 p-3 rounded">
      {{ successMessage }}
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
        <input type="text" id="name" v-model="form.name" class="form-input" required />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="form.email" class="form-input" required />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
        <input type="tel" id="phone" v-model="form.phone" class="form-input" required />
      </div>

      <div>
        <label for="vehicle" class="block text-sm font-medium text-gray-700">Véhicule</label>
        <input type="text" id="vehicle" v-model="form.vehicle" class="form-input" required />
      </div>

      <div class="sm:col-span-2">
        <label for="service_type" class="block text-sm font-medium text-gray-700">Type de service</label>
        <select id="service_type" v-model="form.service_type_id" class="form-select" required>
          <option value="" disabled>Sélectionnez un service</option>
          <option v-for="type in serviceTypesStore.serviceTypes" :key="type.id" :value="type.id">
            {{ type.name }} - {{ type.description }}
          </option>
        </select>
      </div>

      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" id="date" v-model="form.appointment_date" class="form-input" :min="minDate" :max="maxDate" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Heure</label>
        <div v-if="isLoadingTimeSlots" class="py-2">Chargement des créneaux disponibles...</div>
        <div v-else-if="timeSlots.length === 0" class="py-2 text-gray-600">
          Veuillez d'abord sélectionner un service et une date.
        </div>
        <div v-else class="grid grid-cols-3 gap-2 mt-1">
          <button
            type="button"
            v-for="slot in timeSlots"
            :key="slot.time"
            :disabled="!slot.available"
            :class="[
              'py-2 px-3 text-sm font-medium rounded-md transition-colors',
              slot.available
                ? form.appointment_time === slot.time
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            ]"
            @click="slot.available && selectTimeSlot(slot.time)"
          >
            {{ slot.time }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button type="button" class="btn btn-secondary" @click="emit('cancel')">Annuler</button>
      <button type="submit" class="btn" :disabled="isSubmitting">
        {{ props.editMode ? 'Mettre à jour' : 'Prendre rendez-vous' }}
      </button>
    </div>
  </form>
</template>
