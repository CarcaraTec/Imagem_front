<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Função para buscar os dados da API ao montar o componente
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/graficos/companhia-viagens');
        console.log('API response:', response.data); // Log para verificar os dados da API
        chartData.value = setChartData(response.data);
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
});

// Declaração das referências para os dados e opções do gráfico
const chartData = ref();
const chartOptions = ref(null);

// Função para configurar os dados do gráfico
const setChartData = (data) => {
    const documentStyle = getComputedStyle(document.body);
    console.log('Setting chart data with:', data); // Log para verificar os valores dos dados

    return {
        labels: ['Casal', 'Família', 'Sozinho'],
        datasets: [
            {
                data: [data.casal, data.familia, data.sozinho],
                backgroundColor: [
                    documentStyle.getPropertyValue('--orange-500'), 
                    documentStyle.getPropertyValue('--blue-500'), 
                    documentStyle.getPropertyValue('--gray-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--orange-400'), 
                    documentStyle.getPropertyValue('--blue-400'), 
                    documentStyle.getPropertyValue('--gray-400')
                ]
            }
        ]
    };
};

// Função para configurar as opções do gráfico
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };
};
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
