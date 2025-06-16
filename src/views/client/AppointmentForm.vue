<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import { useAppointmentsStore } from '../../stores/appointments'
import AppointmentFormComponent from '../../components/ui/AppointmentForm.vue'
import type { Appointment } from '../../types'

const router = useRouter()
const serviceTypesStore = useServiceTypesStore()
const appointmentsStore = useAppointmentsStore()
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    await serviceTypesStore.loadServiceTypes()
  } catch (err) {
    error.value = 'Impossible de charger les types de service'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

async function handleSaved(appointment: Appointment | null) {
  if (!appointment) return
  router.push({ 
    name: 'confirmation',
    params: { id: appointment.id }
  })
}

function handleCancel() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-primary-700 text-white py-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-primary-700 to-primary-800 opacity-90"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4">
            Prendre Rendez-vous
          </h1>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            Réservez votre créneau pour un service de qualité
          </p>
        </div>
      </div>
      <!-- Wave decoration -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-20 text-gray-50" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Form Section -->
    <section class=" bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white p-6 md:p-8">
          <div v-if="isLoading" class="py-12 text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-700 mx-auto"></div>
            <p class="mt-6 text-gray-600 text-lg">Chargement en cours...</p>
          </div>
          
          <div v-else-if="error" class="py-12 text-center">
            <div class="bg-error-50 border border-error-500 text-error-700 p-6 rounded-lg">
              <svg class="w-12 h-12 mx-auto mb-4 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <p class="text-lg font-medium">{{ error }}</p>
              <button @click="router.go(0)" 
                      class="mt-6 btn bg-primary-700 text-white hover:bg-primary-800 px-6 py-3 rounded-lg">
                Réessayer
              </button>
            </div>
          </div>
          
          <AppointmentFormComponent
            v-else
            @saved="handleSaved"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Suppression des styles de carte */
</style>