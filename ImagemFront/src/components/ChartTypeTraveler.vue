<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
</template>

<script setup>
import {chartData, popularGrafico} from "../interfaces/GraphicManaged.ts"
import { onMounted } from "vue";





onMounted(async () => {
    popularGrafico('','','');
});





// Função para configurar as opções do gráfico

</script>
