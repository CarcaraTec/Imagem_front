<script setup>

import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';

import ChartBarGoodAverage from '../components/ChartBarGoodAverage.vue';
import ChartBarBadAverage from '../components/ChartBarBadAverage.vue';
import CharTypeTraveler from '../components/CharTypeTraveler.vue';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useLayout } from '@/layout/composables/layout';
 
const { isDarkTheme } = useLayout();

const products = ref(null);
const positives = ref(null);
const negatives = ref(null);
const neutrals = ref(null);
const satisfactionIndex = ref(null);


const usuario = localStorage.getItem('usuario');


const graph = ref({
    Negative: [],
    Neutral: [],
    Positive: []
});
const lineOptions = ref(null);
var hotels = [
    {
        "hotel": "Hotel Arena",
        "problem": "room",
        "recurrence": 872,
        "solution": ""
    },
    {
        "hotel": "K K Hotel George",
        "problem": "hotel",
        "recurrence": 445,
        "solution": ""
    },
    {
        "hotel": "Apex Temple Court Hotel",
        "problem": "small",
        "recurrence": 211,
        "solution": ""
    },
    {
        "hotel": "The Park Grand London Paddington",
        "problem": "staff",
        "recurrence": 195,
        "solution": ""
    },
    {
        "hotel": "The Principal London",
        "problem": "bed",
        "recurrence": 177,
        "solution": ""
    }
]
onMounted(async () => {
    try {
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
        const response = await axios.get('http://127.0.0.1:5000/calculos/cards');
        const response2 = await axios.get('http://127.0.0.1:5000/graficos/');
        // const response3 = await axios.get('http://127.0.0.1:5000/graficos/comentarios');


        console.log(graph.value.Neutral.map(value => Number(value)));
        products.value = response.data;
        positives.value = response.data.Positive;
        negatives.value = response.data.Negative;
        neutrals.value = response.data.Neutral;
        satisfactionIndex.value = response.data.SatisfactionIndex.toFixed(1);
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
});

const chartData = ref();
const chartOptions = ref();

const data = [28, 48, 40, 50, 86, 27, 100]
console.log(data)
const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Save',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
const setChartData = () => {

    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Positives',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [7, 6, 5, 4, 6, 7, 9, 8, 6, 2, 7, 4]
            },
            {
                label: 'Negatives',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--red-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [1, 1, 0, 1, 0, 0, 0, 2, 1, 0, 1, 3]
            },
            {
                label: 'Neultras',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--yellow-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [6, 4, 2, 0, 3, 2, 2, 0, 3, 0, 3, 3]
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
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
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
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
}

const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};


watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
const openModal = (rowData) => {
    selectedHotel.value = rowData;
    showModal.value = true;
};
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Positives</span>
                        <div class="text-900 font-medium text-x1" style="font-size: 30px;">{{ positives }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Negatives</span>
                        <div class="text-900 font-medium text-x1" style="font-size: 30px;">{{ negatives }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-red-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Neutrals</span>
                        <div class="text-900 font-medium text-x1" style="font-size: 30px;">{{ neutrals }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-yellow-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Satisfaction Index</span>
                        <div class="text-900 font-medium text-x1" style="font-size: 30px;">{{ satisfactionIndex }}%
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                        style="width: 2.5rem; height: 2.5rem">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Top 5 Recent Insights</h5>
                <DataTable :value="hotels" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column field="hotel" header="Hotel" :sortable="true" style="width: 25%"></Column>
                    <Column field="problem" header="Problem" :sortable="true" style="width: 25%"></Column>
                    <Column field="recurrence" header="Recurrence" :sortable="true" style="width: 25%"></Column>
                    <Column style="width: 15%">
                        <template #header> Solution </template>
                        <template #body="{ rowData }">
                            <Button icon="pi pi-search" type="button" class="p-button-text"
                                @click="openModal(rowData)"></Button>
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model="showModal" modal header="Solution Modal" :style="{ width: '50vw' }">
                    <!-- Conteúdo do modal aqui -->
                    <p>Modal content goes here</p>
                </Dialog>
            </div>

        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Progression of assessments over time</h5>
                <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Top 5 best rated hotels</h5>
                <ChartBarGoodAverage />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Top 5 worst rated hotels</h5>
                <ChartBarBadAverage />
            </div>
        </div>
        <div class="col-12 xl:col-6 mx-auto">
          <div class="card">
               <h5 class="text-center">Comparative Sentiment Analysis by Travel Type (%)</h5>
               <CharTypeTraveler/>
         </div>
       </div>
    </div>
</template>
