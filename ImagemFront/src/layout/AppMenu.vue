<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

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
        items: [{label:'Type Traveler', icon: 'pi pi-fw pi-home', to: '/uikit/menu/TypeTraveler'},
                {label:'Type Hotel', icon: 'pi pi-fw pi-home', to: '/uikit/TypeHotel'}

        ]
    },

    
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
