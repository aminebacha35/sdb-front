<script setup lang="ts">
import { ref } from 'vue'
import type { ServiceType } from '../../types'

const props = defineProps<{
  editMode?: boolean
  serviceType?: ServiceType
}>()

const emit = defineEmits<{
  saved: [serviceType: ServiceType]
  cancel: []
}>()

const form = ref({
  name: props.serviceType?.name || '',
  description: props.serviceType?.description || ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')

function handleSubmit() {
  emit('saved', {
    id: props.serviceType?.id || '',
    name: form.value.name,
    description: form.value.description
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-if="errorMessage" class="bg-error-50 border border-error-500 text-error-700 p-3 rounded">
      {{ errorMessage }}
    </div>
    
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nom du service</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        class="form-input"
        placeholder="Ex: Vidange"
        required
      />
    </div>
    
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        class="form-input"
        placeholder="Description détaillée du service..."
        required
      ></textarea>
    </div>
    
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('cancel')"
      >
        Annuler
      </button>
      <button
        type="submit"
        class="btn"
        :disabled="isSubmitting"
      >
        {{ props.editMode ? 'Mettre à jour' : 'Ajouter' }}
      </button>
    </div>
  </form>
</template>