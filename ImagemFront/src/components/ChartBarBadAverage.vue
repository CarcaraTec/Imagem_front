
<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const x = []
const y = []

function formatText(text) {
    const words = text.split(" ");
    const firstName = words[0];
    const lastName = words[words.length - 1];
    let middleNamesAbbreviated = "";
    for (let i = 1; i < words.length - 1; i++) {
        middleNamesAbbreviated += words[i][0] + ". ";
    }
    return `${firstName} ${middleNamesAbbreviated}${lastName}`;
}

onMounted(async () => {
    try {
    const response = await axios.get('http://127.0.0.1:5000/graficos/hoteis/mal-avaliados');
    response.data.map(item => {
        x.push(formatText(item.Hotel_Name))
        y.push(item.Average_Score)
    })
    console.log(x)
}catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }

    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: x,
        datasets: [
            {
                label: 'Hotels',
                data: y,
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
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
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
