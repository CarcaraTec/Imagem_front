<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
</template>

<script setup lang="ts">
import { chartData, popularGrafico8 } from "../interfaces/GraphicManagedTypeAvaliation";
import { onMounted } from "vue";

// Chamando a função popularGrafico8 ao montar o componente com parâmetros vazios
onMounted(async () => {
    await popularGrafico8('', '', '');
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
