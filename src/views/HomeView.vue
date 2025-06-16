<script setup lang="ts">
import { useRouter } from 'vue-router'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider.vue'

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
            Votre Carrossier de Confiance
          </h1>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            Réparation de carrosserie, peinture et rénovation par des experts qualifiés. 
            Restaurez l'éclat de votre véhicule avec notre savoir-faire.
          </p>
          <button @click="navigateToAppointment" class="btn-link bg-[#C51616] text-white hover:bg-red-400 px-8 py-3 text-lg">
            Prendre rendez-vous
          </button>
        </div>
      </div>
      <!-- Background decoration -->
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gray-50" style="clip-path: polygon(0 100%, 100% 100%, 0 0);"></div>
    </section>

     <!-- Avant / Après Section -->
     <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-black mb-12">Avant / Après</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BeforeAfterSlider before="/avant1.png" after="/apres1.png" />
          <BeforeAfterSlider before="/avant2.png" after="/apres2.png" />
          <BeforeAfterSlider before="/avant3.png" after="/apres3.png" />
          <BeforeAfterSlider before="/avant4.png" after="/apres4.png" />
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-primary-700 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl text-white font-bold mb-4">Pourquoi Nous Choisir</h2>
          <p class="text-gray-100 max-w-2xl mx-auto">
            Notre équipe de carrossiers professionnels s'engage à redonner vie à votre véhicule avec précision et passion.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-primary-700">
            <div class="h-14 w-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="w-10 h-1 bg-primary-700 rounded-full mb-4"></div>
            <h3 class="text-xl font-bold mb-2 text-primary-700">Expertise Carrosserie</h3>
            <p class="text-gray-600">
              Techniciens certifiés spécialisés en réparation et peinture automobile.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-primary-700">
            <div class="h-14 w-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="w-10 h-1 bg-primary-700 rounded-full mb-4"></div>
            <h3 class="text-xl font-bold mb-2 text-primary-700">Travail Soigné</h3>
            <p class="text-gray-600">
              Réparations précises et finitions impeccables pour un résultat parfait.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-primary-700">
            <div class="h-14 w-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div class="w-10 h-1 bg-primary-700 rounded-full mb-4"></div>
            <h3 class="text-xl font-bold mb-2 text-primary-700">Garantie Qualité</h3>
            <p class="text-gray-600">
              Tous nos travaux de carrosserie sont garantis pour votre tranquillité.
            </p>
          </div>
          
          <!-- Feature 4 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-t-4 border-primary-700">
            <div class="h-14 w-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <div class="w-10 h-1 bg-primary-700 rounded-full mb-4"></div>
            <h3 class="text-xl font-bold mb-2 text-primary-700">Devis Gratuit</h3>
            <p class="text-gray-600">
              Estimation précise et gratuite de vos travaux de carrosserie.
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
            <button @click="navigateToAppointment" class="btn-link bg-white text-primary-700 hover:bg-gray-400 px-8 py-3 text-lg">
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Supprimer les styles de beer-slider qui ne sont plus nécessaires */
</style>