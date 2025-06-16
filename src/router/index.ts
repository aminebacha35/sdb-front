import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import AppointmentForm from '../views/client/AppointmentForm.vue'
import ConfirmationView from '../views/client/ConfirmationView.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AppointmentsList from '../views/admin/AppointmentsList.vue'
import CalendarView from '../views/admin/CalendarView.vue'
import ServiceTypes from '../views/admin/ServiceTypes.vue'
import NotFound from '../views/NotFound.vue'
import ServiceView from '../views/client/ServiceView.vue'
import StatsView from '../views/admin/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: AppointmentForm
    },
    {
      path: '/confirmation/:id',
      name: 'confirmation',
      component: ConfirmationView,
      props: true
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/nos-services',
      name: 'nos-services',
      component: ServiceView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'appointments' }
        },
        {
          path: 'appointments',
          name: 'appointments',
          component: AppointmentsList
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: CalendarView
        },
        {
          path: 'services',
          name: 'services',
          component: ServiceTypes
        },
        {
          path: 'stats',
          name: 'admin-stats',
          component: StatsView,
          meta: { title: 'Statistiques' }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'admin-login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router