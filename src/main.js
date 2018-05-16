// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import TitleValue from './components/TitleValue'
import Variable from './components/Variable'
import Spinner from './components/Spinner'
import Result from './components/Result'
import DrugList from './components/DrugList'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('app-titlevalue', TitleValue)
Vue.component('variable', Variable)
Vue.component('spinner', Spinner)
Vue.component('app-result', Result)
Vue.component('druglist', DrugList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
