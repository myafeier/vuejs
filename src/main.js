import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'
import './styles/font.css'
import DataTables from 'vue-data-tables'
// import { getCookie } from '@/utils'

Vue.use(ElementUI)
Vue.use(DataTables)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
