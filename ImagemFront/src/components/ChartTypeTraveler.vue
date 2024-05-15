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
        const response = await axios.get('http://127.0.0.1:5000/graficos/tipos-viagens');
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
        labels: ['Business', 'Leisure', 'Others'],
        datasets: [
            {
                data: [data.business, data.leisure, data.outros],
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
