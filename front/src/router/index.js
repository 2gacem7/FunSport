import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import MyProfile from '../views/MyProfile.vue'
import Dashboard from '../views/Dashboard.vue'
import ManageUsers from '../views/ManageUsers.vue'

import LOL from '../views/LOL.vue'
import CSGO from '../views/CSGO.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/manageusers',
    name: 'ManageUsers',
    component: ManageUsers
  },
  {
    path: '/',
    name: 'Home',
    component: CSGO
  },
  {
    path: '/csgo',
    name: 'CSGO',
    component: CSGO
  },
  {
    path: '/lol',
    name: 'LOL',
    component: LOL
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
