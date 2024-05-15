<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const chartData = ref(null);
const chartOptions = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/graficos/comparativo-viagens');
        const data = response.data;

        chartData.value = setChartData(data);
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
});

const setChartData = (data) => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Leisure', 'Others', 'Business'],
        datasets: [
            {
                label: 'Negatives',
                backgroundColor: documentStyle.getPropertyValue('--red-500'),
                borderColor: documentStyle.getPropertyValue('--red-500'),
                data: [data.leisure.negativos, data.outros.negativos, data.business.negativos]
            },
            {
                label: 'Neutrals',
                backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                borderColor: documentStyle.getPropertyValue('--gray-500'),
                data: [data.leisure.neutros, data.outros.neutros, data.business.neutros]
            },
            {
                label: 'Positives',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                borderColor: documentStyle.getPropertyValue('--green-500'),
                data: [data.leisure.positivos, data.outros.positivos, data.business.positivos]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
};
</script>

<style scoped>
.card {
    padding: 2rem;
}
</style>
