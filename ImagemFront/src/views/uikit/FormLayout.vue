<script setup>
import { ref } from 'vue';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownItem = ref(null);
</script>

<template>
    <div class="grid">
        <div class="col-10 md:col-10">
        <div class="card p-fluid">
            <a style="font-size: 1.2em; margin-bottom: 40px;">Heat Map</a>

            <iframe src="http://127.0.0.1:5000/mapa/calor" style="width: 100%; height: 700px; border: none;"></iframe>
        </div>
    </div>
</div>


</template>
