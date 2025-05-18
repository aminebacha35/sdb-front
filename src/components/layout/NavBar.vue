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
  <nav class="bg-primary-700 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-white font-bold text-xl">
              GarageRDV
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              to="/" 
              class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-white font-bold"
            >
              Accueil
            </router-link>
            <router-link 
              to="/appointment" 
              class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-white font-bold"
            >
              Prendre RDV
            </router-link>
            <template v-if="authStore.isAuthenticated">
              <router-link 
                to="/admin/appointments" 
                class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                active-class="text-white font-bold"
              >
                Dashboard
              </router-link>
            </template>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <template v-if="authStore.isAuthenticated">
            <span class="text-white mr-4">{{ authStore.user?.name }}</span>
            <button
              @click="handleLogout"
              class="text-white bg-primary-800 hover:bg-primary-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </button>
          </template>
          <template v-else>
            <router-link
              to="/admin/login"
              class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              Admin
            </router-link>
          </template>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
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
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          active-class="text-white font-bold"
          @click="mobileMenuOpen = false"
        >
          Accueil
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
          <router-link
            to="/admin/appointments"
            class="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            active-class="text-white font-bold"
            @click="mobileMenuOpen = false"
          >
            Dashboard
          </router-link>
          <button
            @click="() => { handleLogout(); mobileMenuOpen = false; }"
            class="text-white hover:text-gray-200 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
          >
            Déconnexion
          </button>
        </template>
        <template v-else>
          <router-link
            to="/admin/login"
            class="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            @click="mobileMenuOpen = false"
          >
            Admin
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>