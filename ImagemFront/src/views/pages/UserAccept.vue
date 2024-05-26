<template>
    <div>
        <h1>Pending User Approvals</h1>
        <p>Below is a list of users awaiting approval. Review their details and click "Approve" to grant them access to the system.</p>
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="userId" header="ID"></Column>
            <Column field="nome" header="Name"></Column>
            <Column field="telefone" header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="Action">
                <template #body="slotProps">
                    <Button @click="ativarUsuario(slotProps.data.userId)">Approve</Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
const value = JSON.parse(localStorage.getItem('userData'));
import axios from 'axios';

const products = ref([]);  // Inicializando com um array vazio

async function ativarUsuario(idUsuario) {
    try {
        const response = await axios.put(
            'http://localhost:8080/user/updateStatusAceito?id=' + idUsuario, 
            {}, // Corpo do POST, pode ser vazio se não precisar de payload
            {
                headers: {
                    'Authorization': 'Bearer '+value
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
                'Authorization': 'Bearer '+value
            }
        });

        products.value = response.data;  // Atribuindo a resposta à variável products
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
});
</script>
