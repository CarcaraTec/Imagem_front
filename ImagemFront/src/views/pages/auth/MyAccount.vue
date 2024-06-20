
<script setup>
import ConfirmDialog from 'primevue/confirmdialog';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
const router = useRouter();

const confirm = useConfirm();
const toast = useToast();
const user = JSON.parse(localStorage.getItem('userData'));
const userData = ref(null);
const notEditable = ref(true);

function habilitarEdicao() {
    notEditable.value = false;
    var invisibleButton = document.getElementById("invisibleButton");
    invisibleButton.style.display = "block"; // ou "inline" dependendo do tipo de display que o botão originalmente possuía
}
function desabilitarEdicao() {
    notEditable.value = true;
    var invisibleButton = document.getElementById("invisibleButton");
    invisibleButton.style.display = "none"; // ou "inline" dependendo do tipo de display que o botão originalmente possuía
}

async function atualizarUsuario() {
    const dadosUsuario = {
        userId: user.userId,
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

const confirm2 = () => {
    confirm.require({
        message: 'Are you sure you want to delete your account?',
        header: 'Delete Account',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            deleteAccount();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

async function deleteAccount(){
    try {
        await axios.delete('http://localhost:8080/user/delete-account', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        });
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
    localStorage.removeItem('userData');
    router.push('/auth/login')
}

function visualizarTermo(){
    router.push('/terms')
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/user/buscar/' + user.userId, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        });
        userData.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
});
</script>

<template>
    <div class="grid justify-content-center p-fluid" style="height: 100vh;">
        <div class="col-12 md:col-6">
            <div class="card" v-if="userData">
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                        <h5>Hello {{ userData.nome }}</h5>
                    </div>
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0 parent-container">
                        <Button rounded severity="info" type="button" label="View Term" icon="pi pi-eye"
                            :loading="loading" @click="visualizarTermo()" class="small-button" />
                            <Button rounded severity="info" type="button" label="Edit" icon="pi pi-user-edit"
                            :loading="loading" @click="habilitarEdicao()" class="small-button" />
                    </div>
                    
                </div>
                
                <p  style="margin-bottom: 2rem;">These are your profile details</p>
                <FloatLabel>
                <InputText type="text" placeholder="Name" v-model="userData.nome" :disabled="notEditable"></InputText>
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
                        <InputText type="text" placeholder="E-mail" v-model="userData.email" :disabled=true />
                        <label for="username">E-mail</label>
                    </FloatLabel>
                    </div>
                </div>
                <div class="grid formgrid" style="margin-top: 2rem;">
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                        <FloatLabel>
                            <InputText type="text" placeholder="Username" v-model="userData.username"
                                :disabled=true />
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
            <div class="parent-container">
                <div class="col-12 lg:col-3 align-right">
                    <Button id="invisibleButton" v label="Submit" style="display: none;" @click="atualizarUsuario()" />
                </div>
            </div>
            <ConfirmDialog></ConfirmDialog>

            <Button @click="confirm2()" label="Delete Account" severity="danger" outlined></Button>

        </div>
    </div>

</template>


<style>
.parent-container {
    display: flex;
    justify-content: flex-end;
}

.small-button {
    width: 100px;
    height: 30px;
}
</style>
