<template>
  <div class="grid">

    <div class="col-12">
      <SearchFilterBar/>
      <div class="card p-fluid">
        <h2 style="font-size: 1.5em; margin-bottom: 20px;">Type Traveler Dashboard</h2>
        
        <!-- Título do gráfico CharTypeTraveler -->
        <h3 style="font-size: 1.2em; margin-bottom: 10px;">Comparative Sentiment Analysis by Travel Type (%)</h3>
        <!-- Gráfico do CharTypeTraveler -->
        <CharTypeTraveler />

        <!-- Título do gráfico ChartTypeTraveler -->
        <h3 style="font-size: 1.2em; margin-top: 30px; margin-bottom: 10px;">Comparative Analysis by Travel Type (%)</h3>
        <!-- Gráfico do ChartTypeTraveler -->
        <ChartTypeTraveler />

      
        <!-- Título do gráfico ChartTypeTraveler -->
        <h3 style="font-size: 1.2em; margin-top: 30px; margin-bottom: 10px;">Comparative Analysis by Type Guest (%)</h3>
        <!-- Gráfico do ChartTypeTraveler -->
        <ChartTypesGuests />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchFilterBar from '../../../components/SearchFilterBar.vue';
import CharTypeTraveler from '@/components/CharTypeTraveler.vue';
import ChartTypeTraveler from '@/components/ChartTypeTraveler.vue';
import ChartTypesGuests from '../../../components/ChartTypesGuests.vue';
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
}

.col-12 {
  width: 100%;
}

.card {
  padding: 2em;
  margin-bottom: 2em;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 1em;
}

h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>
