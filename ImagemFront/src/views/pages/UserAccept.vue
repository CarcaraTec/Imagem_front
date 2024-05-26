<template>
    <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="userId" header="ID"></Column>
        <Column field="nome" header="NAME"></Column>
        <Column field="telefone" header="PHONE"></Column>
        <Column field="email" header="E-MAIL"></Column>
        <Column header="APPROVE">
            <template #body="slotProps">
                <Button @click="ativarUsuario(slotProps.data.userId)">Ativar</Button>
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';

import axios from 'axios';

const products = ref([]);  // Inicializando com um array vazio

async function ativarUsuario(idUsuario) {
    try {
        const response = await axios.put(
            'http://localhost:8080/user/updateStatusAceito?id=' + idUsuario, 
            {}, // Corpo do POST, pode ser vazio se não precisar de payload
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbWFnZW1fYmFja2VuZF9zZWN1cml0eSIsInN1YiI6InN0cmluZyIsImV4cCI6MTcxNjY5Mjc3OH0.wLi14lLB28pX6kBHR1jqOchkDrOeiA9QJPtR_xQMaIs'
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error('Erro ao ativar usuário:', error);
    }
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/user/usuariosStatusAguardando', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbWFnZW1fYmFja2VuZF9zZWN1cml0eSIsInN1YiI6InN0cmluZyIsImV4cCI6MTcxNjY5Mjc3OH0.wLi14lLB28pX6kBHR1jqOchkDrOeiA9QJPtR_xQMaIs'
            }
        });

        products.value = response.data;  // Atribuindo a resposta à variável products
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
});
</script>
