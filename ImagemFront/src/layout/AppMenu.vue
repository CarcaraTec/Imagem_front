<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

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

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Geographical View',
        items: [
            { label: 'Heat Map', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Exact location map', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' }
        ]
    },
    {
        label: 'Type Graphics',
        items: [{ label: 'Type Traveler', icon: 'pi pi-fw pi-home', to: '/uikit/menu/TypeTraveler' },
        { label: 'Type Hotel', icon: 'pi pi-fw pi-home', to: '/uikit/TypeHotel' }

        ]
    },


    

]);
</script>

<template>
    <div class="container">
        <ul class="layout-menu">
            <template v-for="(item, i) in model" :key="item">
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </ul>
        <div class="table-container">
            <h5>Top 5 Recent Insights</h5>
            <DataTable :value="hotels" :rows="5" :paginator="false" responsiveLayout="scroll">
                <Column field="hotel" header="Hotel" :sortable="true" style="width: 25%"></Column>
                <Column field="problem" header="Problem" :sortable="true" style="width: 25%"></Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;

}

.layout-menu {
    flex: 1;
    overflow-y: auto;
}

.table-container {
    flex-shrink: 0;
    margin-top: 100px;
}
</style>
