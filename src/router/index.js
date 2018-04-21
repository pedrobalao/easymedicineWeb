import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Explore from '@/components/Explore'
import Search from '@/components/Search'
import Drug from '@/components/Drug'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/drug/:id',
      name: 'Drug',
      component: Drug
    }
  ]
})
