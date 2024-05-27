<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { usePrimeVue } from 'primevue/config';
import Menu from 'primevue/menu';
import 'primeicons/primeicons.css'
import { useToast } from "primevue/usetoast";
const user = JSON.parse(localStorage.getItem('userData'));
const { layoutConfig, onMenuToggle } = useLayout();


const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const $primevue = usePrimeVue();


var darkMode = JSON.parse(localStorage.getItem('mode')) == true;
console.log('modo :' + darkMode)
onMounted(() => {
    bindOutsideClickListener();
    onChangeTheme(JSON.parse(localStorage.getItem('theme')), JSON.parse(localStorage.getItem('mode')))
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();

});


const onDarkModeChange = (value) => {
    darkMode = value;
    const newThemeName = value ? layoutConfig.theme.value.replace('light', 'dark') : layoutConfig.theme.value.replace('dark', 'light');
    layoutConfig.darkTheme.value = value;
    localStorage.setItem('mode', JSON.stringify(value));
    localStorage.setItem('theme', JSON.stringify(newThemeName));
    var theme = localStorage.getItem('theme');
    var parsedTheme = JSON.parse(theme);
    console.log(parsedTheme)
    onChangeTheme(newThemeName, value);
};

const onChangeTheme = (theme, mode) => {
    $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
        layoutConfig.theme.value = theme;
        layoutConfig.darkTheme.value = mode;
    });
};


const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const toast = useToast();

const checked = ref(false);
const menu = ref();
const items = ref([
    {
        label: user.nome,
        items: [{
                label: 'My Account',
                icon: 'pi pi-user',
            command: () => {
                router.push('/my-account')
            }
            },
            {
                label: 'User Management',
                icon: 'pi pi-user-edit',
            command: () => {
                router.push('/user-management')
            }
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
            command: () => {
                localStorage.removeItem('userData')
                router.push('/auth/login')
            }
            }
        ]
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div class="layout-topbar">
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">

            <ToggleButton v-model="checked" class="w-6rem" :onLabel="darkMode ? 'Dark' : 'White'"
                :offLabel="darkMode ? 'Dark' : 'White'" @update:modelValue="onDarkModeChange" />
                
            <Button style="margin-left: 1rem;" type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true"
                aria-controls="overlay_menu" />
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
