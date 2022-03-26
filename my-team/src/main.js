import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import naive from 'naive-ui'
import { createStore } from 'vuex'

import '@fortawesome/fontawesome-free/js/all'

// Create a new store instance.
const store = createStore({
    state () {
      return {
          projectID : "387UsydZXmACIAU9WQMk",
          data : []
      }
    },
    mutations: {
      update(state, ID) {
        state.projectID = ID;
      },
      updateData(state, z) {
        state.data = z;
      }
    }
})

const app = createApp(App)
app.use(naive)
app.use(store)
app.use(router)


app.mount('#app')