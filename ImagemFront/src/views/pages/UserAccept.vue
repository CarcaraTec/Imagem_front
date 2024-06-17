



<script setup>
import 'primeicons/primeicons.css'

import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { useToast } from "primevue/usetoast";
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const userData = ref(null);
const checkedActive = ref(3);
const checkedPending = ref(true);

// Variáveis reativas
const isModalVisible = ref(false);
const products = ref([]);  // Inicializando com um array vazio
const toast = useToast();
const user = JSON.parse(localStorage.getItem('userData'));

// Funções
function removeProductById(id) {
    products.value = products.value.filter(product => product.user_id !== id);
}

function abrirModal(userId) {
    buscarUsuario(userId);
    console.log('User ID:', userId); // Apenas para verificar se o ID está sendo passado corretamente
    isModalVisible.value = true;
}

function fecharModal() {
    isModalVisible.value = false;
}

async function ativarUsuario(idUsuario, status) {
    try {
        const response = await axios.put(
            `http://localhost:8080/user/updateStatus${status}?id=${idUsuario}`,
            {},
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            }
        );
        removeProductById(idUsuario);
        if (status === 'Aceito') {
            toast.add({ severity: 'success', summary: 'Success', detail: 'User accepted', life: 3000 });
        } else if (status === 'Recusado') {
            toast.add({ severity: 'success', summary: 'Success', detail: 'User refused', life: 3000 });
        }
    } catch (error) {
        console.error('Erro ao ativar usuário:', error);
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Error to updated user', life: 3000 });
    }
}
async function buscarUsuario(userId) {
    try {
        const response = await axios.get('http://localhost:8080/user/buscar/' + userId, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        });

        userData.value = response.data;
        console.log(userData.value)
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

async function atualizarUsuario() {
    const dadosUsuario = {
        userId: userData.value.user_id,
        nome: userData.value.nome,
        cpf: userData.value.cpf,
        email: userData.value.email,
        username: userData.value.username,
        telefone: userData.value.telefone
    };

    console.log(dadosUsuario);
    try {
        const response = await axios.put(
            'http://localhost:8080/user/updateUsuario',
            dadosUsuario,
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            }
        );
        console.log(response.data);
        desabilitarEdicao();
        toast.add({ severity: 'success', summary: 'Success', detail: 'User updated', life: 3000 });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
    }
}

async function listarUsuarios() {
    try {
        // Montar a URL com base nos valores de checkedActive e checkedPending
        let url = 'http://localhost:8080/user/listar';
        
        if (!(checkedActive.value && checkedPending.value)) {
            const params = new URLSearchParams();
            
            if (checkedActive.value) {
                params.append('status', 'active');
            } else if (checkedPending.value) {
                params.append('status', 'pending');
            }
            
            url += `?${params.toString()}`;
        }

        // Fazer a requisição GET usando a URL montada
        const response = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        });

        products.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

// Lifecycle hooks
onMounted( () => {
    listarUsuarios();
});
</script>

<template>
    <div>
        <h1>Pending User Approvals</h1>
        <p>Below is a list of users awaiting approval. Review their details and click "Approve" to grant them access to
            the system.</p>

        Active <Checkbox change="listarUsuarios" v-model="checkedActive" :binary="true"/>
        Pending <Checkbox v-model="checkedPending" :binary="true" />


        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="user_id" header="ID"></Column>
            <Column field="nome" header="Name"></Column>
            <Column field="telefone" header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="status" header="Status"></Column>
            <Column header="Action">
                <template #body="slotProps">
                    <div v-if="slotProps.data.status === 'AGUARDANDO'">
                        <Button icon="pi pi-times" severity="danger" aria-label="Cancel"
                            @click="ativarUsuario(slotProps.data.user_id, 'Recusado')"
                            style="margin-right: 10px;"></Button>
                        <Button icon="pi pi-check" aria-label="Submit"
                            @click="ativarUsuario(slotProps.data.user_id, 'Aceito')"></Button>
                    </div>
                    <div v-else-if="slotProps.data.status === 'ATIVO'">
                        <Button icon="pi pi-pencil" severity="warning" aria-label="Revoke"
                            @click="abrirModal(slotProps.data.user_id)" style="margin-right: 10px;"></Button>
                    </div>
                    <div v-else>
                        <span>No actions available</span>
                    </div>
                </template>
            </Column>
        </DataTable>

        <!-- Modal -->
        <Dialog header="Edit User" :visible="isModalVisible" @hide="fecharModal">
            <div>
                <div v-if="userData">
                    <div class="grid formgrid">
                        <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                            <h5>User {{ userData.nome }}</h5>
                        </div>
                    </div>

                    <p style="margin-bottom: 2rem;">Here you can edit this user</p>
                    <FloatLabel>
                        <InputText type="text" placeholder="Name" v-model="userData.nome" :disabled="notEditable">
                        </InputText>
                        <label for="username">Name</label>

                    </FloatLabel>
                    <div class="col-12 mb-2 lg:col-12 lg:mb-0"></div>

                    <div class="grid formgrid">
                        <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                            <FloatLabel>
                                <InputText type="text" placeholder="CPF" v-model="userData.cpf" :disabled="notEditable">
                                </InputText>
                                <label for="username">CPF</label>
                            </FloatLabel>
                        </div>
                        <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                            <FloatLabel>
                                <InputText type="text" placeholder="E-mail" v-model="userData.email"
                                    :disabled="notEditable" />
                                <label for="username">E-mail</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <div class="grid formgrid" style="margin-top: 2rem;">
                        <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                            <FloatLabel>
                                <InputText type="text" placeholder="Username" v-model="userData.username"
                                    :disabled="notEditable" />
                                <label for="username">Username</label>
                            </FloatLabel>
                        </div>
                        <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                            <FloatLabel>
                                <InputText type="text" placeholder="Phone" v-model="userData.telefone"
                                    :disabled="notEditable" />
                                <label for="username">Phone</label>
                            </FloatLabel>
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
    <Button label="Fechar" @click="fecharModal" />
    <Button id="invisibleButton" label="Submit" @click="atualizarUsuario()" />
</div>

        </Dialog>
    </div>
</template>

