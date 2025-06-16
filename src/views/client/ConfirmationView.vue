<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentsStore } from '../../stores/appointments'

const route = useRoute()
const router = useRouter()
const appointmentsStore = useAppointmentsStore()

const appointmentId = route.params.id as string
const appointment = ref(appointmentsStore.appointments.find(a => a.id === appointmentId))
const isLoading = ref(!appointment.value)
const error = ref('')

const formattedDate = computed(() => {
  if (!appointment.value?.appointment_time) return ''
  try {
    return new Date(appointment.value.appointment_time).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return ''
  }
})

const formattedTime = computed(() => {
  if (!appointment.value?.appointment_time) return ''
  try {
    return new Date(appointment.value.appointment_time).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return ''
  }
})

onMounted(async () => {
  if (!appointment.value) {
    try {
      await appointmentsStore.loadAppointments()
      appointment.value = appointmentsStore.appointments.find(a => a.id === appointmentId)
      
      if (!appointment.value) {
        error.value = 'Rendez-vous non trouvé'
      }
    } catch (err) {
      error.value = 'Impossible de charger les informations du rendez-vous'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="card p-6 md:p-8">
      <div v-if="isLoading" class="py-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
        <p class="mt-4 text-gray-600">Chargement en cours...</p>
      </div>
      
      <div v-else-if="error" class="py-8 text-center">
        <div class="bg-error-50 border border-error-500 text-error-700 p-4 rounded">
          {{ error }}
        </div>
        <button @click="router.push({ name: 'home' })" class="mt-4 btn">
          Retour à l'accueil
        </button>
      </div>
      
      <div v-else class="text-center py-8 animate-fade-in">
        <div class="h-20 w-20 bg-success-50 text-success-500 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 class="text-2xl font-bold mb-4">Rendez-vous confirmé!</h1>
        
        <p class="text-gray-600 mb-8">
          Votre rendez-vous a bien été enregistré. Un e-mail de confirmation vous a été envoyé.
        </p>
        
        <div class="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8">
          <h2 class="text-lg font-semibold mb-4">Détails du rendez-vous</h2>
          
          <div class="text-left">
            <p class="mb-2"><span class="font-medium">Nom:</span> {{ appointment?.name }}</p>
            <p class="mb-2"><span class="font-medium">Email:</span> {{ appointment?.email }}</p>
            <p class="mb-2"><span class="font-medium">Téléphone:</span> {{ appointment?.phone }}</p>
            <p class="mb-2"><span class="font-medium">Véhicule:</span> {{ appointment?.vehicle }}</p>
            <p class="mb-2"><span class="font-medium">Service:</span> {{ appointment?.service_type?.name || 'Service non spécifié' }}</p>
            <p class="mb-2"><span class="font-medium">Date:</span> {{ formattedDate }}</p>
            <p><span class="font-medium">Heure:</span> {{ formattedTime }}</p>
          </div>
        </div>
        
        <button @click="router.push({ name: 'home' })" class="btn">
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>