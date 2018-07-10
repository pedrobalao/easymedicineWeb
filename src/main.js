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
import auth from '@/auth/auth'
import store from '@/store'
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome/styles.css'
import fontawesome from '@fortawesome/fontawesome'
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import VueAnalytics from 'vue-analytics'
import CookieLaw from 'vue-cookie-law'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import HelloCarousel from './components/HelloCarousel'
import EasyFooter from './components/EasyFooter'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Loading from 'vue-full-loading'

Vue.use(VueAnalytics, {
  id: process.env.GOOGLE_ANALYTICS_ID,
  router,
  disabled: false,
  autoTracking: {
    pageviewOnLoad: true
  }
})

fontawesome.config = {
  autoAddCss: false
}
fontawesome.library.add(faEdit)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)
Vue.component('app-titlevalue', TitleValue)
Vue.component('variable', Variable)
Vue.component('spinner', Spinner)
Vue.component('app-result', Result)
Vue.component('druglist', DrugList)
Vue.component('hello-carousel', HelloCarousel)
Vue.component('cookie-law', CookieLaw)
Vue.component('swiper', VueAwesomeSwiper)
Vue.component('easy-footer', EasyFooter)
Vue.component('icon', Icon)
Vue.component('loading', Loading)
Vue.use(VueAwesomeSwiper)

global.api = require('@/api/api')
global.http = require('@/api/http')

if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

auth.initFirebase((user) => {
  if (user) auth.updateLoginStorage(user)

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
