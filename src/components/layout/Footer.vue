<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between">
        <div class="mb-6 md:mb-0">
          <h2><img src="/sdb.auto.centre.png" class="w-40 ml-32" /></h2>
        </div>
        
        <div class="mb-6 md:mb-0 ml-32 ">
          <h3 class="text-lg font-semibold mb-2">Nous contacter</h3>
          <p class="text-gray-300">51 Avenue de Volvire</p>
          <p class="text-gray-300">35490 Sens-de-bretagne</p>
          <p class="text-gray-300">Tél: 06 85 53 26 22 - 06 83 78 04 53</p>
          <p class="text-gray-300">Email: sdbauto@gmail.com</p>
        </div>
        
        <div class="ml-32">
          <h3 class="text-lg font-semibold mb-2">Horaires d'ouverture</h3>
          <p class="text-gray-300">Lundi - Vendredi: 8h00 - 18h00</p>
          <p class="text-gray-300">Samedi: 9h00 - 16h00</p>
          <p class="text-gray-300">Dimanche: Fermé</p>
        </div>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} SDB Auto. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>