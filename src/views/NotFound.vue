<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-700">404</h1>
      <h2 class="text-3xl font-semibold mt-4 mb-6">Page non trouvée</h2>
      <p class="text-gray-600 mb-8">
        La page que vous recherchez est introuvable ou a été déplacée.
      </p>
      <button @click="goBack" class="btn">
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>