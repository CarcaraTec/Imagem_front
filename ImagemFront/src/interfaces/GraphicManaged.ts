import { ref } from "vue";
import axios from "axios";

export const chartData = ref();
const chartOptions = ref();

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

const setChartData = (data : any) => {
    const documentStyle = getComputedStyle(document.body);
    console.log('Setting chart data with:', data);

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

export async function popularGrafico(data_ini : any, data_fin: any,cidade: any){
    try {
        const response = await axios.get('http://127.0.0.1:5000/graficos/tipos-viagens?data_inicio='+data_ini+'&data_fim='+data_fin+'&cidade='+cidade);
        chartData.value = setChartData(response.data);
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
}

export default {chartData, popularGrafico};