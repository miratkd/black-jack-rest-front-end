import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateAccount from '../views/CreateAccount.vue'
import MyAccount from '../views/MyAccount.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/criar-conta',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/eu',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
