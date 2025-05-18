<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import ServiceTypeForm from '../../components/ui/ServiceTypeForm.vue'
import type { ServiceType } from '../../types'

const serviceTypesStore = useServiceTypesStore()
const isLoading = ref(true)
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingServiceType = ref<ServiceType | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    await serviceTypesStore.loadServiceTypes()
  } catch (error) {
    console.error('Failed to load service types:', error)
    errorMessage.value = 'Impossible de charger les types de service'
  } finally {
    isLoading.value = false
  }
})

function openAddModal() {
  showAddModal.value = true
}

function closeAddModal() {
  showAddModal.value = false
}

function openEditModal(serviceType: ServiceType) {
  editingServiceType.value = serviceType
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  editingServiceType.value = null
}

async function handleSaveNew(serviceType: ServiceType) {
  try {
    await serviceTypesStore.addServiceType({
      name: serviceType.name,
      description: serviceType.description
    })
    closeAddModal()
  } catch (error) {
    console.error('Failed to add service type:', error)
  }
}

async function handleSaveEdit(serviceType: ServiceType) {
  try {
    await serviceTypesStore.updateServiceTypeById(serviceType.id, serviceType)
    closeEditModal()
  } catch (error) {
    console.error('Failed to update service type:', error)
  }
}

async function handleDelete(id: string) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce type de service?')) {
    try {
      await serviceTypesStore.removeServiceType(id)
    } catch (error: any) {
      alert(error.message || 'Impossible de supprimer ce type de service')
      console.error('Failed to delete service type:', error)
    }
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-xl font-bold">Types de Services</h2>
      <button @click="openAddModal" class="btn">
        Ajouter un service
      </button>
    </div>
    
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des services...</p>
    </div>
    
    <div v-else-if="errorMessage" class="py-8 text-center">
      <div class="bg-error-50 border border-error-500 text-error-700 p-4 rounded">
        {{ errorMessage }}
      </div>
      <button @click="serviceTypesStore.loadServiceTypes(); errorMessage = ''" class="mt-4 btn">
        Réessayer
      </button>
    </div>
    
    <div v-else-if="serviceTypesStore.serviceTypes.length === 0" class="py-8 text-center bg-gray-50 rounded-lg">
      <p class="text-gray-500">Aucun type de service trouvé</p>
      <button @click="openAddModal" class="mt-4 btn">
        Ajouter un service
      </button>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="serviceType in serviceTypesStore.serviceTypes" :key="serviceType.id" class="card p-4 animate-fade-in">
        <h3 class="text-lg font-bold mb-2">{{ serviceType.name }}</h3>
        <p class="text-gray-600 mb-4">{{ serviceType.description }}</p>
        
        <div class="flex justify-end space-x-2">
          <button 
            @click="openEditModal(serviceType)" 
            class="btn btn-secondary text-sm px-3 py-1"
          >
            Modifier
          </button>
          <button 
            @click="handleDelete(serviceType.id)" 
            class="btn btn-error text-sm px-3 py-1"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
    
    <!-- Add modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md mx-4 w-full animate-fade-in">
        <div class="px-6 py-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium">Ajouter un type de service</h3>
          <button @click="closeAddModal" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <ServiceTypeForm
            @saved="handleSaveNew"
            @cancel="closeAddModal"
          />
        </div>
      </div>
    </div>
    
    <!-- Edit modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md mx-4 w-full animate-fade-in">
        <div class="px-6 py-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium">Modifier le type de service</h3>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <ServiceTypeForm
            v-if="editingServiceType"
            :edit-mode="true"
            :service-type="editingServiceType"
            @saved="handleSaveEdit"
            @cancel="closeEditModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>