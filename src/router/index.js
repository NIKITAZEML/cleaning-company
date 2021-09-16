import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/contacts.vue')
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('../views/calculator.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
