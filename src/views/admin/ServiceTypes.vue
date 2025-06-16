<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import type { ServiceType } from '../../types'

const serviceTypesStore = useServiceTypesStore()
const isLoading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    await serviceTypesStore.loadServiceTypes()
  } catch (err) {
    error.value = 'Impossible de charger les types de services'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-primary-700">Types de Services</h2>
      <p class="text-gray-600 mt-2">Liste des services disponibles pour les rendez-vous</p>
    </div>
    
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des services...</p>
    </div>
    
    <div v-else-if="error" class="py-8 text-center">
      <div class="bg-error-50 border border-error-500 text-error-700 p-4 rounded">
        {{ error }}
      </div>
    </div>
    
    <div v-else class="grid gap-4">
      <div v-for="service in serviceTypesStore.serviceTypes" :key="service.id" class="bg-white rounded-lg shadow p-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ service.name }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>