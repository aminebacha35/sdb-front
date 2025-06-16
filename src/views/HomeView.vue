<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToAppointment() {
  router.push({ name: 'appointment' })
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-primary-700 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4">
            Votre Garage de Confiance
          </h1>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            Entretien, réparation et diagnostic par des professionnels qualifiés. 
            Prenez rendez-vous en ligne en quelques clics.
          </p>
          <button @click="navigateToAppointment" class="btn-link bg-white text-primary-700 hover:bg-gray-400 px-8 py-3 text-lgtransition-transform duration-150 hover:scale-105 active:scale-95">
            Prendre rendez-vous
          </button>
        </div>
      </div>
      <!-- Background decoration -->
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-white" style="clip-path: polygon(0 100%, 100% 100%, 0 0);"></div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white ">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl text-black font-bold mb-4 ">Nos Services</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Nous proposons une gamme complète de services pour l'entretien et la réparation de votre véhicule.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-black">Entretien régulier</h3>
            <p class="text-gray-600 mb-4">
              Maintenez votre véhicule en parfait état avec nos services d'entretien régulier, incluant vidanges, filtres, et contrôles essentiels.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800 transition-transform duration-150 hover:scale-105 active:scale-95">
              Prendre rendez-vous →
            </button>
          </div>
          
          <!-- Service 2 -->
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-black">Diagnostic & Réparation</h3>
            <p class="text-gray-600 mb-4">
              Des équipements de diagnostic de pointe pour identifier et résoudre rapidement tout problème sur votre véhicule.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800 transition-transform duration-150 hover:scale-105 active:scale-95">
              Prendre rendez-vous →
            </button>
          </div>
          
          <!-- Service 3 -->
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2 text-black">Pneumatiques</h3>
            <p class="text-gray-600 mb-4">
              Remplacement, équilibrage et permutation de pneus pour une sécurité et des performances optimales.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800 transition-transform duration-150 hover:scale-105 active:scale-95">
              Prendre rendez-vous →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl text-black font-bold mb-4">Pourquoi Nous Choisir</h2>
          <p class="text-gray-600 max-w-2xl mx-auto ">
            Notre équipe de professionnels s'engage à vous offrir un service d'excellence pour votre véhicule.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="card text-center">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg text-black font-bold mb-2">Expertise Certifiée</h3>
            <p class="text-gray-600 transition-transform duration-150 hover:scale-105 active:scale-95">
              Techniciens certifiés avec des années d'expérience dans l'industrie automobile.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class=" card text-center">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg text-black font-bold mb-2">Service Rapide</h3>
            <p class="text-gray-600">
              Diagnostic rapide et réparations efficaces pour minimiser votre temps d'attente.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="card text-center">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 class="text-lg text-black font-bold mb-2">Garantie de Service</h3>
            <p class="text-gray-600">
              Tous nos travaux sont garantis pour votre tranquillité d'esprit.
            </p>
          </div>
          
          <!-- Feature 4 -->
          <div class=" card text-center">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <h3 class="text-lg text-black font-bold mb-2">Prix Transparents</h3>
            <p class="text-gray-600">
              Devis clairs et prix compétitifs sans frais cachés.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-primary-700 rounded-lg shadow-xl overflow-hidden">
          <div class="px-6 py-12 md:py-20 md:px-12 text-center text-white">
            <h2 class="text-3xl font-bold mb-4">Prêt à prendre rendez-vous?</h2>
            <p class="text-lg mb-8 max-w-3xl mx-auto">
              Notre système de réservation en ligne vous permet de choisir le jour et l'heure qui vous conviennent le mieux.
            </p>
            <button @click="navigateToAppointment" class="btn-link bg-white text-primary-700 hover:bg-gray-400 px-8 py-3 text-lgtransition-transform duration-150 hover:scale-105 active:scale-95">
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>