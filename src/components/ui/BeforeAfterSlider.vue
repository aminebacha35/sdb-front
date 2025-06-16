<template>
    <div class="relative overflow-hidden" ref="container">
      <img :src="before" class="absolute top-0 left-0 w-full h-full object-cover" alt="Avant" />
      
      <div
        class="absolute top-0 left-0 h-full w-full"
        :style="{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }"
      >
        <img :src="after" class="absolute top-0 left-0 w-full h-full object-cover" alt="Après" />
      </div>

      <div
        class="absolute top-0 h-full w-1 bg-white cursor-col-resize z-10"
        :style="{ left: `${sliderPosition}%` }"
        @mousedown.prevent="startDragging"
      >
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div class="w-4 h-4 bg-primary-700 rounded-full"></div>
        </div>
      </div>

      <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">Avant</div>
      <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">Après</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps<{
    before: string
    after: string
  }>()
  
  const container = ref<HTMLElement | null>(null)
  const sliderPosition = ref(50)
  const isDragging = ref(false)
  
  const startDragging = () => {
    isDragging.value = true
  }
  
  const stopDragging = () => {
    isDragging.value = false
  }
  
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !container.value) return
    const rect = container.value.getBoundingClientRect()
    const position = ((e.clientX - rect.left) / rect.width) * 100
    sliderPosition.value = Math.max(0, Math.min(100, position))
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDragging)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', stopDragging)
  })
  </script>
  
  <style scoped>
  .relative {
    width: 100%;
    height: 400px;
    position: relative;
  }

  .cursor-col-resize {
    cursor: col-resize;
  }

  .cursor-col-resize:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  </style>
  