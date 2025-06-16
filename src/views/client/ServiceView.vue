<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToAppointment() {
  router.push({ name: 'appointment' })
}
</script>

<template>
  <div>
   <!-- Services Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl text-black font-bold mb-4">Nos services de carrosserie</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Nous proposons une gamme complète de services pour l'entretien et la réparation de votre véhicule.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Service 1 -->
          <div class="card p-6 hover:shadow-lg transition-shadow ">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service1.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Carrosserie</h3>
            <p class="text-gray-600 mb-4">
              Nous intervenons sur tous les types de dommages liés à la carrosserie : démontage, réparation ou remplacement des éléments abîmés. Grâce au travail de redressage, votre véhicule retrouve son apparence d’origine. Nos ateliers sont équipés de carrossiers peintres pour assurer une remise en peinture complète si nécessaire.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          
          <!-- Service 2 -->
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service2.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Protection longue durée</h3>
            <p class="text-gray-600 mb-4">
              Nous mettons un point d'honneur à proposer des réparations durables. Pour cela, nous appliquons des traitements spécifiques afin de prolonger la protection de votre carrosserie contre les agressions extérieures.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          
          <!-- Service 3 -->
          <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service3.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Simonizage</h3>
            <p class="text-gray-600 mb-4">
              Pour redonner à votre carrosserie tout son éclat, nous utilisons la méthode du simonizage. Cette technique avancée complète les réparations classiques de peinture et permet un résultat bluffant, même sur des véhicules anciens.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>

          <!-- Service 4 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service4.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Polish</h3>
            <p class="text-gray-600 mb-4">
              Dans les zones urbaines, les carrosseries sont fréquemment exposées aux rayures. Grâce à notre service de polish, nous estompons ces imperfections sans passer par un remplacement des éléments, pour un résultat rapide et efficace.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>

          <!-- Service 5 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service5.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Lustrage</h3>
            <p class="text-gray-600 mb-4">
              Un véhicule brillant attire toujours l'œil. C’est pourquoi nous proposons un service de lustrage professionnel pour raviver la brillance naturelle de votre carrosserie.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 6 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service6.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Rénovation de jantes</h3>
            <p class="text-gray-600 mb-4">
              Que ce soit sur route ou en milieu urbain, vos jantes sont constamment exposées aux chocs et à l'usure. Nous les remettons à neuf à travers un nettoyage en profondeur, suivi d’un ponçage et d’une rénovation complète.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 7 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
             <img src="/service7.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Rénovation d’optique</h3>
            <p class="text-gray-600 mb-4">
              Des phares ternis peuvent nuire à votre sécurité. Plutôt que de les remplacer systématiquement, nous les rénovons pour restaurer leur transparence et leur efficacité d’origine.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 8 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service8.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Car and Protect</h3>
            <p class="text-gray-600 mb-4">
              Nous proposons une solution de protection supplémentaire pour votre carrosserie. Grâce à notre traitement "Car and Protect", la peinture et les surfaces extérieures sont mieux protégées contre les agressions du quotidien.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 9 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service9.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Vitres teintées</h3>
            <p class="text-gray-600 mb-4">
              Envie de discrétion ou de protection solaire ? Nos films teintés s’adaptent à tous les véhicules pour améliorer votre confort tout en rehaussant l’esthétique de votre voiture.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 10 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service10.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Film anti-effraction</h3>
            <p class="text-gray-600 mb-4">
              Pour renforcer la sécurité de votre véhicule, nous posons des films spécifiques sur les vitres afin de les rendre plus résistantes face aux tentatives d’effraction.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 11 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/service11.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Covering</h3>
            <p class="text-gray-600 mb-4">
              Grâce à la technique du covering, vous pouvez entièrement personnaliser votre voiture. Choisissez parmi une large gamme de films pour donner un nouveau style à votre carrosserie, sans la repeindre.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
          <!-- Service 12 -->
            <div class="card p-6 hover:shadow-lg transition-shadow">
            <div class="h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
              <img src="/services12.png" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" />
            </div>
            <h3 class="text-xl font-bold mb-2">Restauration de véhicule</h3>
            <p class="text-gray-600 mb-4">
              Vous possédez un véhicule ancien ou de collection ? Notre service de restauration complète vous permet de lui redonner son allure d’antan, tout en prolongeant sa durée de vie.
            </p>
            <button @click="navigateToAppointment" class="text-primary-700 font-medium hover:text-primary-800">
              Prendre rendez-vous →
            </button>
          </div>
        </div>
      </div>
    </section>
   </div>    
</template>
