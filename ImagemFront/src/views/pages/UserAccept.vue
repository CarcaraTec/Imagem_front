<template>
    <div>
        <h1>Pending User Approvals</h1>
        <p>Below is a list of users awaiting approval. Review their details and click "Approve" to grant them access to
            the system.</p>
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="userId" header="ID"></Column>
            <Column field="nome" header="Name"></Column>
            <Column field="telefone" header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="Action">
                <template #body="slotProps">
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel"
                        @click="ativarUsuario(slotProps.data.userId, 'Recusado')" style="margin-right: 10px;"></Button>
                    <Button icon="pi pi-check" aria-label="Submit"
                        @click="ativarUsuario(slotProps.data.userId, 'Aceito')"></Button>
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
import { useToast } from "primevue/usetoast";

const products = ref([]);  // Inicializando com um array vazio
const toast = useToast();
function removeProductById(id) {
    products.value = products.value.filter(product => product.userId !== id);
}

async function ativarUsuario(idUsuario, status) {
    try {
        const response = await axios.put(
            'http://localhost:8080/user/updateStatus' + status + '?id=' + idUsuario,
            {},
            {
                headers: {
                    'Authorization': 'Bearer ' + value
                }
            }
        );
        removeProductById(idUsuario);
        if(status === 'Aceito'){
            toast.add({ severity: 'success', summary: 'Success', detail: 'User accepted', life: 3000 });
        }else if(status === 'Recusado'){
            toast.add({ severity: 'success', summary: 'Success', detail: 'User refused', life: 3000 });
        }
    } catch (error) {
        console.error('Erro ao ativar usuário:', error);
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Error to updated user', life: 3000 });
    }
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/user/usuariosStatusAguardando', {
            headers: {
                'Authorization': 'Bearer ' + value
            }
        });

        products.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
});
</script>
