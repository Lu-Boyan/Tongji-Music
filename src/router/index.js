import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'

Vue.use(Router)


export default new Router({
  mode:'history',
  routes: [
    {     
      path: '/',
      name: 'login',
      component: login
    }
  ]
})

