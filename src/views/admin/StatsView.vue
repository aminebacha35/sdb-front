<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useAppointmentsStore } from '../../stores/appointments'
import { useServiceTypesStore } from '../../stores/serviceTypes'
import { Line } from 'vue-chartjs'
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

const appointmentsStore = useAppointmentsStore()
const serviceTypesStore = useServiceTypesStore()
const isLoading = ref(true)
const error = ref('')

const monthsLabels = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.',
  'août', 'sept.', 'oct.', 'nov.', 'déc.'
]

// Liste des années disponibles
const availableYears = computed(() => {
  const years = new Set<number>()
  appointmentsStore.appointments.forEach(a => {
    if (a.status === 'confirmed') {
      const year = new Date(a.appointment_time).getFullYear()
      if (!isNaN(year)) years.add(year)
    }
  })
  return Array.from(years).sort((a, b) => b - a)
})

// Année sélectionnée
const selectedYear = ref(availableYears.value[0] || new Date().getFullYear())

watch(availableYears, (years) => {
  if (years.length && !years.includes(selectedYear.value)) {
    selectedYear.value = years[0]
  }
})

// Calcul des données mensuelles confirmées
const monthlyData = computed(() => {
  const data = Array(12).fill(0)
  appointmentsStore.appointments
    .filter(a => a.status === 'confirmed')
    .forEach(a => {
      const date = new Date(a.appointment_time)
      const year = date.getFullYear()
      const month = date.getMonth()
      if (!isNaN(date.getTime()) && year === selectedYear.value && month >= 0 && month <= 11) {
        data[month]++
      }
    })
  // Remplace tout null/undefined/NaN par 0
  return data.map(v => (typeof v === 'number' && !isNaN(v) ? v : 0))
})

// Données du graphique
const chartData = computed(() => ({
  labels: monthsLabels,
  datasets: [
    {
      label: `Rendez-vous confirmés (${selectedYear.value})`,
      data: monthlyData.value,
      fill: false,
      borderColor: '#2563eb',
      backgroundColor: '#2563eb',
      tension: 0.3,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#fff',
      pointRadius: 5,
      pointHoverRadius: 7,
      spanGaps: true
    }
  ]
}))

// Options du graphique
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: { color: '#1e293b' }
    },
    title: {
      display: true,
      text: 'Rendez-vous confirmés par mois',
      color: '#1e293b',
      font: { size: 18 }
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context: any) {
          return ` ${context.parsed.y} rendez-vous`
        }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#1e293b' },
      grid: { color: '#e5e7eb' }
    },
    y: {
      beginAtZero: true,
      max: 10,
      ticks: { color: '#1e293b' },
      grid: { color: '#e5e7eb' }
    }
  }
}

// Top 5 services
const topServices = computed(() => {
  const counts: Record<string, number> = {}
  appointmentsStore.appointments
    .filter(a => a.status === 'confirmed')
    .forEach(a => {
      const name = a.service_type?.name || 'Service non spécifié'
      counts[name] = (counts[name] || 0) + 1
    })
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

// Chargement initial
onMounted(async () => {
  try {
    await Promise.all([
      appointmentsStore.loadAppointments(),
      serviceTypesStore.loadServiceTypes()
    ])
  } catch (err) {
    error.value = 'Impossible de charger les données'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="text-gray-800">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Suivi des Rendez-vous</h2>
      <p class="text-gray-600 mt-2">Statistiques et analyses des rendez-vous confirmés</p>
    </div>
    <div v-if="isLoading" class="py-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des statistiques...</p>
    </div>
    <div v-else-if="error" class="py-8 text-center">
      <div class="bg-red-50 border border-red-500 text-red-700 p-4 rounded">
        {{ error }}
      </div>
    </div>
    <div v-else class="grid gap-6">
      <!-- Sélecteur d'année -->
      <div class="mb-4 flex items-center gap-2">
        <label for="year-select" class="text-sm font-medium text-gray-800">Année :</label>
        <select id="year-select" v-model="selectedYear" class="border rounded px-2 py-1 text-gray-800 bg-white">
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <!-- Graphique courbe -->
      <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
        <Line :data="chartData" :options="chartOptions" style="max-width:100%;height:350px;" />
      </div>
      <!-- Top 5 des services -->
      <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Services les plus demandés</h3>
        <div class="space-y-4">
          <div 
            v-for="service in topServices" 
            :key="service.name"
            class="flex items-center"
          >
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-800">{{ service.name }}</div>
              <div class="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
                <div 
                  class="bg-blue-600 h-3 rounded-full border border-blue-700"
                  :style="{ width: `${(service.count / topServices[0].count) * 100}%` }"
                ></div>
              </div>
            </div>
            <div class="ml-4 text-sm font-medium text-gray-800">{{ service.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
