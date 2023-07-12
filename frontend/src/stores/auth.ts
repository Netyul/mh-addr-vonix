import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@axios'

export const useAuthStore = defineStore('auth', () => {
  const auth = ref()
  const apikey = ref()
  const doubleCount = computed(() => auth.value = localStorage.getItem('authData'))
  async function login(username: string, password: string) {
    axios.post(`${import.meta.env.VITE_APP_BASE_URL}/login`, { username, password }).then(response => {
      auth.value = useLocalStorage('authData', response.data)
      apikey.value = useLocalStorage('apikey', response.data.uuid)
    }).catch(error => { console.log(error) })
  }
  function logout(params: any) {
    if (params.uuid === auth.value.uuid) {
      auth.value = {}
      localStorage.removeItem('authData')
    }
  }

  return { auth, apikey, doubleCount, login, logout }
})
