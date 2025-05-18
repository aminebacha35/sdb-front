import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ServiceType } from '../types'
import { 
  fetchServiceTypes, 
  createServiceType, 
  updateServiceType, 
  deleteServiceType 
} from '../services/api'

export const useServiceTypesStore = defineStore('serviceTypes', () => {
  const serviceTypes = ref<ServiceType[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  async function loadServiceTypes() {
    isLoading.value = true
    error.value = null
    
    try {
      serviceTypes.value = await fetchServiceTypes()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to load service types. Please check if the backend server is running.'
      console.error('Error loading service types:', err)
      if (err.response) {
        console.error('Response status:', err.response.status)
        console.error('Response data:', err.response.data)
      }
    } finally {
      isLoading.value = false
    }
  }
  
  async function addServiceType(data: Omit<ServiceType, 'id'>) {
    isLoading.value = true
    error.value = null
    
    try {
      const newServiceType = await createServiceType(data)
      serviceTypes.value.push(newServiceType)
      return newServiceType
    } catch (err) {
      error.value = 'Failed to create service type'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  async function updateServiceTypeById(id: string, data: Partial<ServiceType>) {
    isLoading.value = true
    error.value = null
    
    try {
      const updated = await updateServiceType(id, data)
      
      const index = serviceTypes.value.findIndex(st => st.id === id)
      if (index !== -1) {
        serviceTypes.value[index] = updated
      }
      
      return updated
    } catch (err) {
      error.value = 'Failed to update service type'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  async function removeServiceType(id: string) {
    isLoading.value = true
    error.value = null
    
    try {
      await deleteServiceType(id)
      serviceTypes.value = serviceTypes.value.filter(st => st.id !== id)
    } catch (err) {
      error.value = 'Failed to delete service type'
      console.error(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    serviceTypes,
    isLoading,
    error,
    loadServiceTypes,
    addServiceType,
    updateServiceTypeById,
    removeServiceType
  }
})