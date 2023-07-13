/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { PDFPlugin } from 'vue3-pdfmake';


loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
const Pinia = createPinia()
app.use(vuetify)
app.use(Pinia)
app.use(router)
app.use(PDFPlugin)

// Mount vue app
app.mount('#app')
