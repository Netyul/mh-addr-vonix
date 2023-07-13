<script setup lang="ts">
import logo from '@images/logotipo-vonix.png'
import useAuthStore from '@/stores/auth'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const authStore = useAuthStore()
const isPasswordVisible = ref(false)
const keyValues = ref(localStorage.getItem('apikey'))

const login = async ( form ) => {
  const rt = await authStore.login(form.username, form.password)
}

console.log('apikey k', keyValues.value)
if (keyValues.value) {
// verifica se existe apikey
  router.push('/')
}
watch(keyValues, () => {
  if (keyValues.value) {
    console.log('apikey w', apikey)
    router.push('/')
  }
})

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <VImg
              class="d-flex text-primary"
              :src="logo"
            />
          </div>
        </template>
        <VCardTitle class="text-2xl font-weight-bold">
          Vonix
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2 ">
        <h5 class="text-h5 mb-1 text-center">
          Bem Vindo! 👋🏻
        </h5>
        <p class="mb-0 text-center">
          Por favor, entre na sua conta e comece a aventura
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login(form)">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                placeholder="johndoe@email.com"
                label="Login"
                type="text"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Lembrar-me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Esqueceu sua senha?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <!--
              <VCol
              cols="12"
              class="text-center text-base"
              >
              <span>New on our platform?</span>
              <RouterLink
              class="text-primary ms-2"
              to="/register"
              >
              Create an account
              </RouterLink>
              </VCol>

              <VCol
              cols="12"
              class="d-flex align-center"
              >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
              </VCol>

              auth providers
              <VCol
              cols="12"
              class="text-center"
              >
              <AuthProvider />
              </VCol>
            -->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
