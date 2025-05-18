<script setup lang="ts">
import { computed } from 'vue'
import type { Appointment } from '../../types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const props = defineProps<{
  appointment: Appointment
}>()

const emit = defineEmits<{
  edit: [appointment: Appointment]
  cancel: [id: string]
  complete: [id: string]
  confirm: [id: string]
}>()

const formattedDate = computed(() => {
  return format(new Date(props.appointment.appointment_time), 'EEEE d MMMM yyyy', { locale: fr })
})

const formattedTime = computed(() => {
  return format(new Date(props.appointment.appointment_time), 'HH:mm')
})

const statusClass = computed(() => {
  switch(props.appointment.status) {
    case 'pending': return 'bg-warning-50 text-warning-700 border-warning-500'
    case 'confirmed': return 'bg-success-50 text-success-700 border-success-500'
    case 'completed': return 'bg-primary-50 text-primary-700 border-primary-500'
    case 'cancelled': return 'bg-error-50 text-error-700 border-error-500'
    default: return 'bg-gray-50 text-gray-700 border-gray-500'
  }
})

const statusText = computed(() => {
  switch(props.appointment.status) {
    case 'pending': return 'En attente'
    case 'confirmed': return 'Confirmé'
    case 'completed': return 'Terminé'
    case 'cancelled': return 'Annulé'
    default: return 'Inconnu'
  }
})
</script>

<template>
  <div class="card border rounded-lg p-4 mb-4 animate-fade-in">
    <div class="flex flex-col md:flex-row justify-between">
      <div>
        <h3 class="text-lg font-semibold">{{ appointment.name }}</h3>
        <p class="text-sm text-gray-600">{{ appointment.email }} | {{ appointment.phone }}</p>
        <p class="mt-2">
          <span class="font-medium">Véhicule:</span> {{ appointment.vehicle }}
        </p>
        <p>
          <span class="font-medium">Service:</span> {{ appointment.service_type.name }}
        </p>
        <p>
          <span class="font-medium">Date:</span> {{ formattedDate }}
        </p>
        <p>
          <span class="font-medium">Heure:</span> {{ formattedTime }}
        </p>
      </div>
      
      <div class="mt-4 md:mt-0 md:ml-4 flex flex-col items-start">
        <span :class="['px-2 py-1 text-xs font-semibold rounded-full border', statusClass]">
          {{ statusText }}
        </span>
        
        <div class="mt-4 space-y-2">
          <button 
            @click="emit('edit', appointment)" 
            class="btn btn-secondary text-sm px-3 py-1 w-full"
          >
            Modifier
          </button>
          
          <template v-if="appointment.status === 'pending'">
            <button 
              @click="emit('confirm', appointment.id)" 
              class="btn btn-success text-sm px-3 py-1 w-full"
            >
              Confirmer
            </button>
          </template>
          
          <template v-if="appointment.status === 'confirmed'">
            <button 
              @click="emit('complete', appointment.id)" 
              class="btn btn-primary text-sm px-3 py-1 w-full"
            >
              Marquer terminé
            </button>
          </template>
          
          <template v-if="appointment.status !== 'cancelled' && appointment.status !== 'completed'">
            <button 
              @click="emit('cancel', appointment.id)" 
              class="btn btn-error text-sm px-3 py-1 w-full"
            >
              Annuler
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>