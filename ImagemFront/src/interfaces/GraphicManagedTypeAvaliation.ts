import { ref } from "vue";
import axios from "axios";

// Referências reativas para os dados e opções do gráfico
export const chartData = ref<any>(null);
export const chartOptions = ref<any>(null);

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

// Função para configurar os dados do gráfico
const setChartData = (data: any) => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Mobile', 'Others'],
        datasets: [
            {
                data: [data.mobile, data.others],
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'),
                    documentStyle.getPropertyValue('--gray-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--blue-400'),
                    documentStyle.getPropertyValue('--gray-400')
                ]
            }
        ]
    };
};

// Função para popular o gráfico com dados da API
export async function popularGrafico8(data_ini: string, data_fin: string, cidade: string) {
    try {
        // Fazendo requisição à API com parâmetros vazios permitidos
        const response = await axios.get(`http://localhost:5000/graficos/mobile`, {
            params: {
                data_inicio: data_ini,
                data_fim: data_fin,
                cidade: cidade
            }
        });
        // Configurando os dados do gráfico
        chartData.value = setChartData(response.data);
        // Configurando as opções do gráfico
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
}

export default { chartData, popularGrafico8 };
