<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const services = [
  {
    title: 'Carrosserie',
    icon: '/service1.png',
    description: 'Nous intervenons sur tous les types de dommages liés à la carrosserie : démontage, réparation ou remplacement des éléments abîmés. Grâce au travail de redressage, votre véhicule retrouve son apparence d\'origine.'
  },
  {
    title: 'Protection longue durée',
    icon: '/service2.png',
    description: 'Nous mettons un point d\'honneur à proposer des réparations durables. Pour cela, nous appliquons des traitements spécifiques afin de prolonger la protection de votre carrosserie contre les agressions extérieures.'
  },
  {
    title: 'Simonizage',
    icon: '/service3.png',
    description: 'Pour redonner à votre carrosserie tout son éclat, nous utilisons la méthode du simonizage. Cette technique avancée complète les réparations classiques de peinture et permet un résultat bluffant, même sur des véhicules anciens.'
  },
  {
    title: 'Polish',
    icon: '/service4.png',
    description: 'Dans les zones urbaines, les carrosseries sont fréquemment exposées aux rayures. Grâce à notre service de polish, nous estompons ces imperfections sans passer par un remplacement des éléments, pour un résultat rapide et efficace.'
  },
  {
    title: 'Lustrage',
    icon: '/service5.png',
    description: 'Un véhicule brillant attire toujours l\'œil. C\'est pourquoi nous proposons un service de lustrage professionnel pour raviver la brillance naturelle de votre carrosserie.'
  },
  {
    title: 'Rénovation de jantes',
    icon: '/service6.png',
    description: 'Que ce soit sur route ou en milieu urbain, vos jantes sont constamment exposées aux chocs et à l\'usure. Nous les remettons à neuf à travers un nettoyage en profondeur, suivi d\'un ponçage et d\'une rénovation complète.'
  },
  {
    title: 'Rénovation d\'optique',
    icon: '/service7.png',
    description: 'Des phares ternis peuvent nuire à votre sécurité. Plutôt que de les remplacer systématiquement, nous les rénovons pour restaurer leur transparence et leur efficacité d\'origine.'
  },
  {
    title: 'Car and Protect',
    icon: '/service8.png',
    description: 'Nous proposons une solution de protection supplémentaire pour votre carrosserie. Grâce à notre traitement "Car and Protect", la peinture et les surfaces extérieures sont mieux protégées contre les agressions du quotidien.'
  },
  {
    title: 'Vitres teintées',
    icon: '/service9.png',
    description: 'Envie de discrétion ou de protection solaire ? Nos films teintés s\'adaptent à tous les véhicules pour améliorer votre confort tout en rehaussant l\'esthétique de votre voiture.'
  },
  {
    title: 'Film anti-effraction',
    icon: '/service10.png',
    description: 'Pour renforcer la sécurité de votre véhicule, nous posons des films spécifiques sur les vitres afin de les rendre plus résistantes face aux tentatives d\'effraction.'
  },
  {
    title: 'Covering',
    icon: '/service11.png',
    description: 'Grâce à la technique du covering, vous pouvez entièrement personnaliser votre voiture. Choisissez parmi une large gamme de films pour donner un nouveau style à votre carrosserie, sans la repeindre.'
  },
  {
    title: 'Restauration de véhicule',
    icon: '/service12.png',
    description: 'Vous possédez un véhicule ancien ou de collection ? Notre service de restauration complète vous permet de lui redonner son allure d\'antan, tout en prolongeant sa durée de vie.'
  }
]

function navigateToAppointment() {
  router.push({ name: 'appointment' })
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-primary-700 text-white py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-primary-700 to-primary-800 opacity-90"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">
            Nos Services de Carrosserie
          </h1>
          <p class="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            Des solutions professionnelles pour redonner vie à votre véhicule
          </p>
        </div>
      </div>
      <!-- Wave decoration -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-20 text-gray-50" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-gray-50 mb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center font-bold text-black mb-12">
          <p class="text-gray-600 max-w-2xl mx-auto">
            Nous proposons une gamme complète de services pour l'entretien et la réparation de votre véhicule.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Service Cards -->
          <div v-for="(service, index) in services" :key="index" 
               class="card bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="p-6">
              <div class="h-16 w-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
                <img :src="service.icon" :alt="service.title" class="w-8 h-8">
              </div>
              <h3 class="text-xl font-bold mb-2 text-primary-700">{{ service.title }}</h3>
              <p class="text-gray-600 mb-4">
                {{ service.description }}
              </p>
              <button @click="navigateToAppointment" 
                      class="text-primary-700 font-medium hover:text-primary-800 transform transition-transform duration-300 hover:translate-x-2">
                Prendre rendez-vous →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-primary-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Besoin d'un Devis ?</h2>
          <p class="text-xl text-gray-100 mb-8">
            Contactez-nous pour une estimation gratuite de vos travaux
          </p>
          <button @click="navigateToAppointment" 
                  class="btn-link bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 text-lg rounded-lg transform transition-transform duration-300 hover:scale-105">
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </section>
  </div>    
</template>

<style>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
