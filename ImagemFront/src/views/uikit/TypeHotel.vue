<template>
  <div class="grid">
    <div class="col-12">
      <div class="card p-fluid">
        <h2 style="font-size: 1.5em; margin-bottom: 20px;">Type Traveler Dashboard</h2>
        
        <!-- Título do gráfico ChartBarBadAvarage -->
        <h3 style="font-size: 1.2em; margin-bottom: 10px;">Top 5 best rated hotels</h3>
        <!-- Gráfico do ChartBarBadAvarage -->
        <ChartBarBadAvarage />
  
        <!-- Título do gráfico ChartBarGoodAvarage -->
        <h3 style="font-size: 1.2em; margin-top: 30px; margin-bottom: 10px;">Top 5 worst rated hotels</h3>
        <!-- Gráfico do ChartBarGoodAvarage -->
        <ChartBarGoodAverage />
      </div>
    </div>
  </div> 
</template>

<script setup>
import ChartBarGoodAverage from '../../components/ChartBarGoodAverage.vue';
import ChartBarBadAvarage from '../../components/ChartBarBadAverage.vue';
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
