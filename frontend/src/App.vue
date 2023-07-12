<script setup lang="ts">
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/login.vue'

const authStore = useAuthStore()
const { global } = useTheme()
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <div v-if="!authStore.apikey">
      <Login />
    </div>
    <RouterView v-else />
  </VApp>
</template>
