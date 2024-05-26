<template>
  <SearchFilterBar/>
  <div class="grid">
    <div class="col-12">
      <div class="card p-fluid">
        <h2>Type Hotel Dashboard</h2>
        
        <div class="row">
          <div class="col-6">
            <h3>Top 5 best rated hotels</h3>
            <ChartBarGoodAverage />
          </div>
          
          <div class="col-6">
            <h3>Top 5 worst rated hotels</h3>
            <ChartBarBadAvarage />
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import ChartBarGoodAverage from '../../components/ChartBarGoodAverage.vue';
import ChartBarBadAvarage from '../../components/ChartBarBadAverage.vue';
import SearchFilterBar from '../../components/SearchFilterBar.vue';
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

.row {
  display: flex;
  width: 100%;
}

.col-6 {
  flex: 1;
  padding: 1em;
}
</style>
