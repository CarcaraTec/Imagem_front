<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

import CardComponent from '../../../components/CardComponent.vue';
import Checkbox from 'primevue/checkbox';
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

const user = JSON.parse(localStorage.getItem('userData'));
const toast = useToast();
const router = useRouter();

const termo = ref({
    termo: {
        idTermo: null,
        versao: null,
        descricao: String
    },
    itens: [
        {
            mandatorio: null,
            idItem: null,
            descricao: String
        }
    ]
});
const selectedItems = ref([]);

async function assinarContrato() {
    try {
        const response = await axios.post(
            'http://localhost:8080/itensTermo/aceitar',
            selectedItems.value,
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            }
        );
        toast.add({ severity: 'success', summary: 'Success', detail: 'User updated', life: 3000 });
        console.log(response.data)
        localStorage.setItem('userData', JSON.stringify(response.data));
        router.push('/');
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Error to updated user', life: 3000 });
        console.error('Erro ao atualizar usuário:', error);
    }
}

function handleCheckboxChange(checked, idItem) {
    if (checked) {
        selectedItems.value.push(idItem);
    } else {
        const index = selectedItems.value.indexOf(idItem);
        if (index > -1) {
            selectedItems.value.splice(index, 1);
        }
    }
    console.log('Itens selecionados:', selectedItems.value); // Para depuração
};

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8080/termo/ultimo-termo');
        termo.value = response.data;
        console.log(response)
        console.log(termo.value)
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
});
</script>

<template>
    <div class="min-h-[50vh]">

        <div class="grid gap-6 py-20 overflow-y-scroll h-[50vh] relative"
            style="border: 1px solid ; border-radius: 20px; margin: 200px 30% 10px; height: 400px;">
            <CardComponent>
                <p>Lorem ipsum dolor sit amet. Aut maxime doloremque sed quidem voluptas vel voluptatem quia est rerum
                    voluptatem ut error repudiandae id reiciendis fugit. Eum tenetur natus sit dolorem unde aut quam
                    aliquam
                    et
                    illum dolorum ut dolor excepturi hic atque sint. Non quia minima aut consequatur consequatur et
                    nulla
                    quisquam non voluptates laboriosam. Id magni fugit aut nihil inventore et repellat neque. </p>
                <p>Eum quidem autem ut doloremque provident et dignissimos consequatur qui nihil sequi est iure vitae.
                    In
                    atque
                    blanditiis qui laborum aliquid qui galisum dolorem qui praesentium doloribus. Quo quisquam voluptas
                    et
                    molestiae voluptatibus ut voluptatem mollitia. A nihil officia id ipsa tenetur ab incidunt eius id
                    voluptatem molestiae in nesciunt consequatur a doloribus mollitia id incidunt enim. </p>
                <p>Et recusandae dolores aut repudiandae voluptate aut dolor itaque aut quia rerum 33 nisi galisum et
                    minus
                    consectetur ut impedit reiciendis! At magni reprehenderit sit dolores exercitationem eum accusantium
                    mollitia eum reiciendis nisi et vero saepe qui nihil odit. Et internos doloribus quo esse laudantium
                    nam
                    fugiat nisi in dicta magni in obcaecati repellat qui doloribus iure sit maiores quia. </p>
                <p>Lorem ipsum dolor sit amet. Aut maxime doloremque sed quidem voluptas vel voluptatem quia est rerum
                    voluptatem ut error repudiandae id reiciendis fugit. Eum tenetur natus sit dolorem unde aut quam
                    aliquam
                    et
                    illum dolorum ut dolor excepturi hic atque sint. Non quia minima aut consequatur consequatur et
                    nulla
                    quisquam non voluptates laboriosam. Id magni fugit aut nihil inventore et repellat neque. </p>
                <p>Eum quidem autem ut doloremque provident et dignissimos consequatur qui nihil sequi est iure vitae.
                    In
                    atque
                    blanditiis qui laborum aliquid qui galisum dolorem qui praesentium doloribus. Quo quisquam voluptas
                    et
                    molestiae voluptatibus ut voluptatem mollitia. A nihil officia id ipsa tenetur ab incidunt eius id
                    voluptatem molestiae in nesciunt consequatur a doloribus mollitia id incidunt enim. </p>
                <p>Et recusandae dolores aut repudiandae voluptate aut dolor itaque aut quia rerum 33 nisi galisum et
                    minus
                    consectetur ut impedit reiciendis! At magni reprehenderit sit dolores exercitationem eum accusantium
                    mollitia eum reiciendis nisi et vero saepe qui nihil odit. Et internos doloribus quo esse laudantium
                    nam
                    fugiat nisi in dicta magni in obcaecati repellat qui doloribus iure sit maiores quia. </p>
                <p>Lorem ipsum dolor sit amet. Aut maxime doloremque sed quidem voluptas vel voluptatem quia est rerum
                    voluptatem ut error repudiandae id reiciendis fugit. Eum tenetur natus sit dolorem unde aut quam
                    aliquam
                    et
                    illum dolorum ut dolor excepturi hic atque sint. Non quia minima aut consequatur consequatur et
                    nulla
                    quisquam non voluptates laboriosam. Id magni fugit aut nihil inventore et repellat neque. </p>
                <p>Eum quidem autem ut doloremque provident et dignissimos consequatur qui nihil sequi est iure vitae.
                    In
                    atque
                    blanditiis qui laborum aliquid qui galisum dolorem qui praesentium doloribus. Quo quisquam voluptas
                    et
                    molestiae voluptatibus ut voluptatem mollitia. A nihil officia id ipsa tenetur ab incidunt eius id
                    voluptatem molestiae in nesciunt consequatur a doloribus mollitia id incidunt enim. </p>
                <p>Et recusandae dolores aut repudiandae voluptate aut dolor itaque aut quia rerum 33 nisi galisum et
                    minus
                    consectetur ut impedit reiciendis! At magni reprehenderit sit dolores exercitationem eum accusantium
                    mollitia eum reiciendis nisi et vero saepe qui nihil odit. Et internos doloribus quo esse laudantium
                    nam
                    fugiat nisi in dicta magni in obcaecati repellat qui doloribus iure sit maiores quia. </p>

                <div>
                    <div v-html="htmlContent" />

                    <div class="mt-10">
                        <slot name="confirm-box">
                            <div v-for="(item, index) in termo.itens" :key="item.idItem" style="margin-bottom: 5px;">
                                <Checkbox v-model="item.checked" :input-id="'confirm-' + index"
                                    :name="'confirmSigning-' + index" :value="true"
                                    @change="() => handleCheckboxChange(item.checked, item.idItem)" />
                                <label :for="'confirm-' + index" class="ml-2">
                                    {{ item.descricao }}
                                </label>
                            </div>
                        </slot>
                    </div>
                </div>
            </CardComponent>
        </div>
        <div class="flex justify-between mt-10" style="display: flex; margin: 0% 30%; justify-content: space-between;">
            <Button label="Voltar" rounded type="button" outlined
                @click="router.push({ name: 'createAccountStep2' })" />

            <Button label="Assinar contrato" type="button" rounded @click="assinarContrato" />
        </div>
    </div>
</template>
