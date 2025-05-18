import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import { apiLogin, apiLogout } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  // Restore session from localStorage (minimal data only)
  try {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      user.value = {
        id: parsed.id,
        name: parsed.name,
        email: parsed.email,
      }
    }
  } catch {
    localStorage.removeItem('user') // corrupt data
  }

  const isAuthenticated = computed(() => !!user.value)

  async function login(email: string, password: string) {
    const response = await apiLogin(email, password)

    user.value = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
    }

    localStorage.setItem('user', JSON.stringify(user.value))

    return true
  }

  async function logout() {
    await apiLogout()
    user.value = null
    localStorage.removeItem('user')
    return true
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
