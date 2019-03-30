import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import Home from '@/components/Home'
import UsersManage from '@/components/userManage/UsersManage'
import ProductInfomange from  '@/components/productInfoManage/ProductInfoManage'

import { getCookie } from '@/utils'
// import Head from '@/components/common/Head'
// import Nav from '@/components/common/Nav'

Vue.use(Router)


const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '',
      component: Admin,
      children:[
        {
          path: '/',
          name:'Home',
          component: Home,
          meta: {
            title: '主页',
            requireAuth: true,
            cid:1
          }
        },{
          path: '/users',
          name:'Users',
          component: UsersManage,
          meta: {
            title: '用户管理',
            requireAuth: true,
            cid:2
          }
        },{
          path: '/ProductInfo',
          name:'ProductInfo',
          component: ProductInfomange,
          meta: {
            title: '产品品类管理',
            requireAuth: true,
            cid:3
          }
        }
      ]
    },{
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录页',
        requireAuth: false,
      },
      component: Login
    }

  ]
  
})

router.beforeEach((to, from, next) => {
  console.log('to:',to)
  if(to.meta.requireAuth) {
    if(!getCookie('token')) { // 没有登录则跳转/login页，进行登录 
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
