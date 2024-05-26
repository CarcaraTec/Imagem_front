
<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import {onMounted} from "vue";
import {chartData, popularGrafico3, chartOptions} from "../interfaces/GraphicManagedChartBarGoodAverage.ts"



onMounted(async () => {
    popularGrafico3('','','');
});
</script>
