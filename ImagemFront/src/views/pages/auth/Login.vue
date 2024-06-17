<script setup>
import { useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import axios from "axios";
import storeUserData from '@/stores/auth';
import { useToast } from "primevue/usetoast";
const toast = useToast();


const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
const router = useRouter();

async function login(email, password) {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            login: email,
            password: password
        });

        return response.data;
    } catch (error) {
        console.log("Error fetching data:");
        throw error;
    }
}

async function handleLogin(email, password) {
    try {
        const averageScore = await login(email, password);
        console.log(averageScore.role)
        storeUserData(averageScore);

        if (averageScore.role !== 'aceitetermo') {
            router.push('/');
        } else {
            router.push('/term');
        }

    } catch (error) {
        alert(error.response.data.mensagem);
        toast.add({ severity: 'error', summary: 'Error Message', detail: error.response.data.mensagem, life: 3000 });
        console.log(error.response.data.mensagem);
    }
}

function goToRegister() {
    router.push('/auth/register');
}
</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>


<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div>
                        <label for="login1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="login1" type="text" placeholder="Login" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="email" />
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button @click="handleLogin(email, password)" label="Sign In"
                            class="w-full p-3 text-xl mb-3"></Button>
                        <Button @click="goToRegister" label="Sign Up" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
