// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import TitleValue from './components/TitleValue'
import Spinner from './components/Spinner'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('app-titlevalue', TitleValue)
Vue.component('spinner', Spinner)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
