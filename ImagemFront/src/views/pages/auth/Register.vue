<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div>
                        <label for="fullName" class="block text-900 text-xl font-medium mb-2">Full Name</label>
                        <InputText id="fullName" type="text" placeholder="Full Name" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="fullName" />
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="username" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="username" />
                        <label for="cpf" class="block text-900 text-xl font-medium mb-2">CPF</label>
                        <InputText id="cpf" type="text" placeholder="CPF" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="cpf" v-mask="'###.###.###-##'" />
                        <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />
                        <label for="phone" class="block text-900 text-xl font-medium mb-2">Phone</label>
                        <InputText id="phone" type="text" placeholder="Phone" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="phone" />
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <label for="confirmPassword" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
                        <Password id="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <Button @click="handleSignUp" label="Sign Up" class="w-full p-3 text-xl mb-3"></Button> 
                        <Button @click="goToLogin" label="Back to Login" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import axios from "axios";

const { layoutConfig } = useLayout();
const fullName = ref('');
const username = ref('');
const cpf = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

function goToLogin() {
    router.push('/auth/login');
}

async function handleSignUp() {
    if (!validateFields()) {
        alert('Please fill in all fields correctly');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/auth/register', {
            nome: fullName.value,
            login: username.value,
            cpf: cpf.value,
            email: email.value,
            telefone: phone.value,
            password: password.value,
            foto: 'abc'
        });

        if (response.status === 200) {
            alert('Registration successful! Redirecting to login...');
            router.push('/auth/login');
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    }
}

function validateFields() {
    return fullName.value && username.value && cpf.value && email.value && phone.value && password.value && confirmPassword.value && password.value === confirmPassword.value;
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
