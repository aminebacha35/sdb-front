<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { RouterView, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const navItems = [
  { name: 'appointments', label: 'Rendez-vous', icon: 'calendar' },
  { name: 'calendar', label: 'Calendrier', icon: 'calendar-days' },
  { name: 'services', label: 'Services', icon: 'wrench' },
]

function getIcon(iconName: string) {
  switch (iconName) {
    case 'calendar':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>`
    case 'calendar-days':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>`
    case 'wrench':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              </svg>`
    default:
      return ''
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold text-gray-900">
          Dashboard Admin
        </h1>
      </div>
    </header>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar -->
        <div class="w-full md:w-64 mb-6 md:mb-0">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="p-4 border-b">
              <div class="font-medium">{{ authStore.user?.name }}</div>
              <div class="text-sm text-gray-500">{{ authStore.user?.email }}</div>
            </div>
            
            <nav class="p-4">
              <ul class="space-y-2">
                <li v-for="item in navItems" :key="item.name">
                  <router-link
                    :to="{ name: item.name }"
                    class="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-primary-50 hover:text-primary-700"
                    :class="{ 'bg-primary-50 text-primary-700 font-medium': $route.name === item.name }"
                  >
                    <span class="mr-3" v-html="getIcon(item.icon)"></span>
                    {{ item.label }}
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <!-- Main content -->
        <div class="md:ml-8 flex-1">
          <div class="bg-white shadow rounded-lg p-6">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>