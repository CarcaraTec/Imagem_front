<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const user = JSON.parse(localStorage.getItem('userData'));
if(user == null){
    router.push('/auth/login');
} else if ('dadosLogin' in user) {
            router.push('/term');
        }else{
            router.push('/');
        }
</script>

<template>
    <router-view />
</template>

<style scoped></style>
