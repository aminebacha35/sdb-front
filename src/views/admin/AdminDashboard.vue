<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()

const navItems = [
  { name: 'appointments', label: 'Rendez-vous', icon: 'calendar' },
  { name: 'calendar', label: 'Calendrier', icon: 'calendar-alt' },
  { name: 'services', label: 'Services', icon: 'tools' },
  { name: 'admin-stats', label: 'Statistiques', icon: 'chart-bar' }
]

const getIcon = (icon: string) => {
  const icons: { [key: string]: string } = {
    calendar: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    'calendar-alt': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    tools: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
    'chart-bar': '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
  }
  return icons[icon] || ''
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <header class="bg-gray-300 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-300">
        <h1 class="text-2xl font-bold text-gray-700">
          Dashboard Admin
        </h1>
      </div>
    </header>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar -->
        <div class="w-full md:w-64 mb-6 md:mb-0">
          <div class="bg-gray-300 shadow rounded-lg overflow-hidden">
            <div class="p-4 border-b">
              <div class="font-medium text-primary-800">{{ authStore.user?.name }}</div>
              <div class="text-sm text-gray-700">{{ authStore.user?.email }}</div>
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
          <div class="bg-gray-300 shadow rounded-lg p-6">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>