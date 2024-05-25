import { ref } from "vue";
import axios from "axios";

export const chartData = ref();
export const chartOptions = ref();

const setChartData = (data : any) => {
    const documentStyle = getComputedStyle(document.body);
    console.log('Setting chart data with:', data);

    return {
        labels: ['Couple', 'Family', 'Solo'],
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

export async function popularGrafico2(data_ini : any, data_fin: any,cidade: any){
    try {
        const response = await axios.get('http://localhost:5000/graficos/companhia-viagens?data_inicio='+data_ini+'&data_fim='+data_fin+'&cidade='+cidade);
        const data = response.data;

        chartData.value = setChartData(data);
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
}

export default {chartData, popularGrafico2, chartOptions};