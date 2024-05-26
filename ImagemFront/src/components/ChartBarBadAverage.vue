<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import {onMounted} from "vue";
import {chartData, popularGrafico4, chartOptions} from "../interfaces/GraphicManagedChartBarBadAverage.ts"



onMounted(async () => {
    popularGrafico4('','','');
});
</script>
