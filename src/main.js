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
import PulseLoader from 'vue-spinner/src/PulseLoader'
import auth from '@/auth/auth'
import store from '@/store'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('app-titlevalue', TitleValue)
Vue.component('variable', Variable)
Vue.component('spinner', Spinner)
Vue.component('app-result', Result)
Vue.component('druglist', DrugList)
Vue.component('pulse-loader', PulseLoader)

if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

auth.initFirebase((user) => {
  if (user) localStorage.setItem('user', user)

  /* eslint-disable no-new */
  let app
  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      beforeCreate () {
        auth.initContext(this)
      },
      template: '<App/>',
      components: { App }
    })

    auth.setCurrentUser(user, app)
  }
})
