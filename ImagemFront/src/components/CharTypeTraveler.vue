<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import {chartData, popularGrafico1, chartOptions} from "../interfaces/GraphicManagedChartTraveler.ts"

onMounted(async () => {
    await popularGrafico1('','','');
});


</script>

<style scoped>
.card {
    padding: 2rem;
}
</style>
