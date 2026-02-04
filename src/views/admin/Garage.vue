<template>
  <div>
    <h1>Parc garage</h1>
    <p>Gestion du parc automobile du garage</p>
    <!-- Exemple de tableau -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Véhicule</th>
          <th>État</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in vehicles" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.name }}</td>
          <td>{{ car.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Garage',
  data() {
    return {
      vehicles: [
        { id: 1, name: 'Renault Clio', status: 'Disponible' },
        { id: 2, name: 'Peugeot 208', status: 'En maintenance' },
        { id: 3, name: 'Citroën C3', status: 'Disponible' }
      ]
    }
  }
}
</script>
