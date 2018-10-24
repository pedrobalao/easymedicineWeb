import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Search from '@/components/Search'
import Drug from '@/components/Drug'
import Category from '@/components/Category'
import SubCategory from '@/components/SubCategory'
import DoseCalculation from '@/components/DoseCalculation'
import MedicalCalculation from '@/components/MedicalCalculation'
import SpecificMedicalCalculation from '@/components/SpecificMedicalCalculation'
import SurgeryReferral from '@/components/SurgeryReferral'
import Percentiles from '@/components/Percentiles'
import Main from '@/components/Main'
import Auth from '@/views/Auth'
import auth from '@/auth/auth'

Vue.use(Router)
let routes = [
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { guestOnly: true }
  },
  {
    path: '/about',
    name: 'about',
    component: About// ,
    // meta: { requireAuth: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Category
    // meta: { requireAuth: true }
  },
  {
    path: '/categories/:catid',
    name: 'SpecificCategory',
    component: Category
    // meta: { requireAuth: true }
  },
  {
    path: '/categories/:catid/subcategories/:idsubcat',
    name: 'SpecificSubCategory',
    component: SubCategory
    // meta: { requireAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
    // meta: { requireAuth: true }
  },
  {
    path: '/drug/:id',
    name: 'Drug',
    component: Drug
    // meta: { requireAuth: true }
  },
  {
    path: '/doses',
    name: 'DoseCalculation',
    component: DoseCalculation
    // meta: { requireAuth: true }
  },
  {
    path: '/medicalcalculations',
    name: 'MedicalCalculation',
    component: MedicalCalculation
    // meta: { requireAuth: true }
  },
  {
    path: '/medicalcalculations/:id',
    name: 'SpecificMedicalCalculation',
    component: SpecificMedicalCalculation
    // meta: { requireAuth: true }
  },
  {
    path: '/surgeryreferral',
    name: 'SurgeryReferral',
    component: SurgeryReferral
    // meta: { requireAuth: true }
  },
  {
    path: '/percentiles',
    name: 'Percentiles',
    component: Percentiles
    // meta: { requireAuth: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main
    // meta: { requireAuth: true }
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router

router.beforeEach((to, from, next) => {
  let isLoggedIn = auth.isLoggedIn()
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !isLoggedIn) next('auth')
  else if (guestOnly && isLoggedIn) next('/')
  else next()
})
