<template>
    <div class="grid justify-content-center p-fluid" style="height: 100vh;">
        <div class="col-12 md:col-6">
            <div class="card" v-if="userData">
                <div class="grid formgrid">
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                        <h5>Hello {{ userData.nome }}</h5>
                    </div>
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0 parent-container">
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
                        <InputText type="text" placeholder="E-mail" v-model="userData.email" :disabled="notEditable" />
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
            <div class="parent-container">
                <div class="col-12 lg:col-3 align-right">
                    <Button id="invisibleButton" v label="Submit" style="display: none;" @click="atualizarUsuario()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'primeicons/primeicons.css'
import { useToast } from "primevue/usetoast";
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
