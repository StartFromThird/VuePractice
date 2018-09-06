import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/HelloWorld'
import Home from '@/pages/home/Home'
// import List from '@/pages/home/List'
import City from '@/pages/city/City'

Vue.use(Router)

// 导出路由配置项
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/city',
      name: 'City',
      component: City
    }
  ]
})
