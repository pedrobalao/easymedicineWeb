import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Explore from '@/components/Explore'
import Search from '@/components/Search'
import Drug from '@/components/Drug'
import Category from '@/components/Category'
import SubCategory from '@/components/SubCategory'

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
      path: '/categories',
      name: 'Categories',
      component: Category
    },
    {
      path: '/categories/:catid',
      name: 'SpecificCategory',
      component: Category
    },
    {
      path: '/categories/:catid/subcategories/:idsubcat',
      name: 'SpecificSubCategory',
      component: SubCategory
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
