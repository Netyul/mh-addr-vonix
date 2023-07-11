import axios from 'axios'

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    apiKey: `${localStorage.getItem('accessToken')}`,
  },
})

export default axiosIns
