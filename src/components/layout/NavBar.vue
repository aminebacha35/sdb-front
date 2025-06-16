<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'home' })
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-primary-700 shadow-md pt-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-center h-20">
        <div class="absolute left-0 flex items-center">
          <router-link to="/" class="text-white font-bold text-xl">
            <img src="/sdb.auto.centre.png" class="w-40 ml-3" />
          </router-link>
        </div>

        <div class="hidden sm:flex space-x-8">
          <router-link 
            to="/" 
            class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-me text-xl font-medium"
            active-class="text-white font-bold"
          >
            Accueil
          </router-link>
          <router-link 
            to="/nos-services" 
            class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-me text-xl font-medium"
            active-class="text-white font-bold"
          >
            Nos services
          </router-link>
          <router-link 
            to="/appointment" 
            class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-me text-xl font-medium"
            active-class="text-white font-bold"
          >
            Prendre RDV
          </router-link>
        </div>

        <div class="absolute right-0 hidden sm:flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <span class="text-white">{{ authStore.user?.name }}</span>
            <button
              @click="handleLogout"
              class="text-white bg-primary-800 hover:bg-primary-900 px-3 py-2 rounded-md text-me text-xl font-medium"
            >
              Déconnexion
            </button>
          </template>
        </div>

        <div class="absolute right-0 sm:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                v-if="mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1 ml-9">
        <router-link
          to="/"
          class="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          active-class="text-white font-bold"
          @click="mobileMenuOpen = false"
        >
          Accueil
        </router-link>
        <router-link
          to="/nos-services"
          class="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          active-class="text-white font-bold"
          @click="mobileMenuOpen = false"
        >
          Nos services
        </router-link>
        <router-link
          to="/appointment"
          class="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          active-class="text-white font-bold"
          @click="mobileMenuOpen = false"
        >
          Prendre RDV
        </router-link>
        <template v-if="authStore.isAuthenticated">
          <button
            @click="() => { handleLogout(); mobileMenuOpen = false; }"
            class="text-white hover:text-gray-200 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
          >
            Déconnexion
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>