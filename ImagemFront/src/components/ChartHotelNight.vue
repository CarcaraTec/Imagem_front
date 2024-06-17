
<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { chartData, chartOptions, fetchNightStayData } from "../interfaces/GraphicManagedHotelNight.ts";

onMounted(async () => {
    await fetchNightStayData('','','');
});
</script>

<style scoped>
.card {
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.h-30rem {
    height: 30rem;
}
</style>
