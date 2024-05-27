<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import {chartData, popularGrafico2, chartOptions} from "../interfaces/GraphicManagedGuests.ts"

onMounted(async () => {
    popularGrafico2('','','');
});


</script>

<style scoped>
.card {
    padding: 2em;
    margin-bottom: 2em;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.w-full {
    width: 100%;
}

.md\:w-30rem {
    width: 30rem;
}
</style>
