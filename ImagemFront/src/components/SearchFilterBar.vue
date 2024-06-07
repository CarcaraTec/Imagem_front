<template>
    <p>Você está na rota: {{ route.name }}</p>

    <Calendar v-model="dates" selectionMode="range" :manualInput="false" />
    <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" />
    <Button @click="mandarData()" label="Submit" />
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

import { ref } from 'vue';
import {popularGrafico} from "../interfaces/GraphicManaged.ts"
import { popularGrafico1 } from '../interfaces/GraphicManagedChartTraveler';
import { popularGrafico2 } from '../interfaces/GraphicManagedGuests';
import { popularGrafico3 } from '../interfaces/GraphicManagedChartBarGoodAverage';
import { popularGrafico4 } from '../interfaces/GraphicManagedChartBarBadAverage';
import { fetchNightStayData } from '../interfaces/GraphicManagedHotelNight';
const dates = ref();
const selectedCity = ref();

const cities = ref([
    { name: 'Paris', code: 'Paris' },
    { name: 'Vienna ', code: 'Vienna' },
    { name: 'Milan', code: 'Milan' },
    { name: 'Barcelona', code: 'Barcelona' },
    { name: 'London', code: 'London' },
    { name: 'Amsterdam', code: 'Amsterdam Netherlands' }
]);

function mandarData(){
    let options = { month: '2-digit', year: 'numeric' };
    let date_time1 = new Intl.DateTimeFormat('pt-BR', options).format(dates.value[0]);
    let date_time2 = new Intl.DateTimeFormat('pt-BR', options).format(dates.value[1])
    if(route.name=='type-traveler'){
        popularGrafico(date_time1,date_time2,selectedCity.value.code)
        popularGrafico1(date_time1,date_time2,selectedCity.value.code)
        popularGrafico2(date_time1,date_time2,selectedCity.value.code)
    }else if(route.name=='type-hotel'){
        popularGrafico3(date_time1,date_time2,selectedCity.value.code)
        popularGrafico4(date_time1,date_time2,selectedCity.value.code)
        fetchNightStayData(date_time1,date_time2,selectedCity.value.code)

    }
}
</script>