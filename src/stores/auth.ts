import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import { apiLogin, apiLogout } from '../services/api'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

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
    try {
      const response = await apiLogin(email, password)

      user.value = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
      }

      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      user.value = null
      localStorage.removeItem('user')
      throw error
    }
  }

  async function logout() {
    try {
      await apiLogout()
      user.value = null
      localStorage.removeItem('user')
      // Nettoyer tous les cookies
      Object.keys(Cookies.get()).forEach(cookieName => {
        Cookies.remove(cookieName)
      })
      return true
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      user.value = null
      localStorage.removeItem('user')
      Object.keys(Cookies.get()).forEach(cookieName => {
        Cookies.remove(cookieName)
      })
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
