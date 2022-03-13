import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import naive from 'naive-ui'

import '@fortawesome/fontawesome-free/js/all'

const app = createApp(App)
app.use(naive)



app.use(router).mount('#app')