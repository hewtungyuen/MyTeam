import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import naive from 'naive-ui'
import { createStore } from 'vuex'
import VueApexCharts from "vue3-apexcharts";

import '@fortawesome/fontawesome-free/js/all'


// Create a new store instance.
const store = createStore({
    state () {
      return {
          projectID : "",
          column : [],
          data : []
      }
    },
    mutations: {
      update(state, ID) {
        state.projectID = ID;
      },
      updateData(state, z) {
        state.data = z;
      },
      refreshData(state) {
        state.data = [];
      },
      updateColumn(state, y) {
        state.column = y;
      }
    }
})

const app = createApp(App)
app.use(naive)
app.use(store)
app.use(router)
app.use(VueApexCharts);


app.mount('#app')