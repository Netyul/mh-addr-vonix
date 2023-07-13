import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import axios from '../plugins/axios'
import type { Sair, SairParams } from '../types/auth/Sair'

const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const auth = ref()
  const apikey = ref()
  const authStatus = computed(() => auth.value = localStorage.getItem('authData'))
  const apiStatus = computed(() => apikey.value = localStorage.getItem('apikey'))

  async function login(username: string, password: string) {
    console.log('apikey atual', axios.defaults.headers)
    axios.post(`/login`, { username, password }).then(response => {
      auth.value = useLocalStorage('authData', response.data)
      apikey.value = useLocalStorage('apikey', response.data.uuid)
      axios.defaults.headers.common['ApiKey'] = response.data.uuid
      router.push('/faturamento')
    }).catch(error => { console.log(error) })
  }

  const logout: Sair = (params: SairParams) => {
    console.log(`auth logout: ${params.uuid}`)
    if (params.uuid === auth.value.uuid) {
      auth.value = undefined
      apikey.value = undefined
      localStorage.removeItem('apikey')
      localStorage.removeItem('authData')
      router.push('/login')
    }
  }

  watch(auth, () => {
    console.log(`auth: ${auth.value}`)
    if (auth.value === undefined) {
      localStorage.removeItem('apikey')
      localStorage.removeItem('authData')
    }
    else {
      axios.defaults.headers.common['ApiKey'] = auth.value.uuid
    }
  })

  watch(apikey, () => {
    console.log(`apikey w: ${apikey.value}`)
    if (apikey.value === undefined) {
      localStorage.removeItem('apikey')
      localStorage.removeItem('authData')
    }
    else {
      axios.defaults.headers.common['ApiKey'] = apikey.value
    }
  })

  return { auth, apikey, authStatus, apiStatus, login, logout }
})

export default useAuthStore
