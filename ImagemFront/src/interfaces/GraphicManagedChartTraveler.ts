import { ref } from "vue";
import axios from "axios";

export const chartData = ref();
export const chartOptions = ref();

const setChartData = (data : any) => {
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

export async function popularGrafico1(data_ini : any, data_fin: any,cidade: any){
    try {
        const response = await axios.get('http://127.0.0.1:5000/graficos/comparativo-viagens?data_inicio='+data_ini+'&data_fim='+data_fin+'&cidade='+cidade);
        const data = response.data;

        chartData.value = setChartData(data);
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
}

export default {chartData, popularGrafico1, chartOptions};