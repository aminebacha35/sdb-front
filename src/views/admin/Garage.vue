<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Vehicle {
  id: number
  name: string
  owner: string
  status: 'Disponible' | 'En maintenance'
}

const vehicles = ref<Vehicle[]>([])
const isLoading = ref(true)
const statusFilter = ref<'all' | 'Disponible' | 'En maintenance'>('all')

// Couleurs pour l'état
const statusColors = {
  Disponible: '#10B981',
  'En maintenance': '#EF4444'
} as const

// Filtrage par état
const filteredVehicles = computed(() => {
  if (statusFilter.value === 'all') return vehicles.value
  return vehicles.value.filter(v => v.status === statusFilter.value)
})

onMounted(() => {
  // Exemple de données
  vehicles.value = [
    { id: 1, name: 'Renault Clio', owner: 'Dupont', status: 'Disponible' },
    { id: 2, name: 'Peugeot 208', owner: 'Martin', status: 'En maintenance' },
    { id: 3, name: 'Citroën C3', owner: 'Leroy', status: 'Disponible' }
  ]
  isLoading.value = false
})
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-bold mb-4 sm:mb-0 text-primary-700">Véhicules présents au garage</h2>
      
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <select v-model="statusFilter" class="form-select bg-white text-gray-900">
          <option value="all">Tous les véhicules</option>
          <option value="Disponible">Disponible</option>
          <option value="En maintenance">En maintenance</option>
        </select>
      </div>
    </div>
    
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des véhicules...</p>
    </div>
    
    <div v-else class="grid gap-4">
      <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ vehicle.name }}</h3>
          <p class="text-gray-700">Propriétaire : {{ vehicle.owner }}</p>
        </div>
        
        <div class="flex flex-col sm:items-end space-y-2 mt-4 sm:mt-0">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: statusColors[vehicle.status] }"></div>
            <span class="text-sm text-gray-700 font-medium">{{ vehicle.status }}</span>
          </div>
          
          <div class="flex space-x-2 mt-2">
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Modifier</button>
            <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-select {
  @apply border border-gray-300 rounded-md shadow-sm;
}
.form-select:focus {
  @apply ring-2 ring-primary-500 border-primary-500;
}
</style>
