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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="card p-6 md:p-8">
      <h1 class="text-2xl font-bold mb-6 text-black ">Prendre rendez-vous</h1>
      
      <div v-if="isLoading" class="py-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
        <p class="mt-4 text-gray-600">Chargement en cours...</p>
      </div>
      
      <div v-else-if="error" class="py-8 text-center">
        <div class="bg-error-50 border border-error-500 text-error-700 p-4 rounded">
          {{ error }}
        </div>
        <button @click="router.go(0)" class="mt-4 btn">
          Réessayer
        </button>
      </div>
      
      <AppointmentFormComponent
        v-else
        @saved="handleSaved"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>