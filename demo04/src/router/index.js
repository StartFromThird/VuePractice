import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/HelloWorld'
// import List from '@/pages/home/List'
// 同步写法，如果是异步写法，下面不需要了
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

// 导出路由配置项
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
      // 异步写法
      // component: () => import('@/pages/home/Home')
    }, {
      path: '/city',
      name: 'City',
      component: City
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ],
  // 每次路由切换，页面初始位置
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
