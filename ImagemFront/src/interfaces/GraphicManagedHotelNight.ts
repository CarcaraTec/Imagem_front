// nightStayChartData.ts
import { ref } from "vue";
import axios from "axios";

export const chartData = ref({});
export const chartOptions = ref({});
    
// Função para buscar os dados da URL e configurar o gráfico
export const fetchNightStayData = async (data_ini : any, data_fin: any,cidade: any) => {
    try {
        const response = await axios.get('http://localhost:5000/graficos/media-noites?data_inicio='+data_ini+'&data_fim='+data_fin+'&cidade='+cidade);
        const data = response.data;

        // Mapeia e traduz os dados para inglês
        const translatedData = translateDataToEnglish(data);

        chartData.value = setChartData(translatedData);
        chartOptions.value = setChartOptions();
    } catch (error) {
        console.error('Erro ao obter dados:', error);
    }
};

// Função para traduzir os dados para inglês
const translateDataToEnglish = (data) => {
    return {
        "2 or fewer nights": data["2 ou menos noites"],
        "3 to 4 nights": data["3 a 4 noites"],
        "more than 4 nights": data["mais de 4 noites"]
    };
};

// Função para configurar os dados do gráfico
const setChartData = (data) => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: Object.keys(data), // Usa as chaves traduzidas do objeto como labels
        datasets: [
            {
                label: 'Number of stays',
                backgroundColor: [
                    documentStyle.getPropertyValue('--cyan-500'),
                    documentStyle.getPropertyValue('--gray-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                borderColor: [
                    documentStyle.getPropertyValue('--cyan-500'),
                    documentStyle.getPropertyValue('--gray-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                data: Object.values(data) // Usa os valores do objeto como data
            }
        ]
    };
};

// Função para configurar as opções do gráfico
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y', // Configura o eixo x para exibir na horizontal
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
