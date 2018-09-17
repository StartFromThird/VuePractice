# Vue2.5开发去哪儿网App 从零基础入门到实战项目  

## 环境配置  
<img align="right" src="https://raw.githubusercontent.com/StartFromThird/VuePractice/master/show/travel.gif"/>  

* 安装node, webpack  
* 码云创建仓库，git bash 生成公钥贴回码云  
* 复制SSH地址克隆到本地，git clone SSH地址    
* vue-cli 2.X  
  * 安装 npm install --global vue-cli  
  * 初始化 vue init webpack travel  项目名，描述，作者，编译，路由，ESlint，单元测试，e2e， 包管理  
* 进入项目文件夹，npm run dev    

## 项目对应文件夹及初始化  
* index.html 首页模板文件  
  * 移动端禁止缩放  
  * ```html
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    ```
* static  静态资源  
* src 源代码  
  * main.js 项目入口文件  
    * import各种引入    
    * <router-view/> 当前路由地址所对应的内容  
  * APP.vue 项目根组件    
  * router > index.js 导出路由配置项  
  * ```javascript
        // 同步写法，如果是异步写法，下面这行不需要了
        import Home from '@/pages/home/Home'
        export default new Router({
          routes: [
            {
              path: '/',
              name: 'Home',
              component: Home
              // 异步写法
              // component: () => import('@/pages/home/Home')
            }, {
              // 动态路由
              path: '/detail/:id',
              name: 'Detail',
              component: Detail
            }
          ]
        })
    ```  
  * assets 图片资源  
    * 新建文件夹 style > reset.css 等各种公用css
  * components 组件  
  * 新建文件夹 pages  
    * home > Home.vue + components > Header.vue
* config 配置文件  
  * index.js 基础配置信息  
  * dev.env.js 开发环境配置  
  * prod.env.js 线上环境  
* build 项目打包  
  * webpack.base/dev/prod.conf.js 基础/开发/线上环境webpack配置 

## 修改路径别名  
* webpack.base.conf.js   
* ```javascript
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'styles': resolve('src/assets/styles'),
        '别名': resolve('src/路径')
      }
    },
  ```  
* style 里使用  
* ```css
    @import '~styles/varibles.styl'
    @import '~别名/剩下的路径'
  ```  
* main.js 里使用 import '别名/剩下的路径'

## 安装第三方依赖
* 当前目录 npm install 依赖名@版本号 --save  
* 安装 fastclick  main.js--fastClick.attach(document.body)  
* 安装 stylus, stylus-load  
  * 单文件组件--style lang="stylus"  
  * style标签内引入.styl文件 @import '路径'  
  * background $变量 或 函数名()  
  * 具体使用参考 https://www.zhangxinxu.com/jq/stylus/  
* 安装 vue-awesome-swiper v2.6.7 基于 Swiper3 
  * https://github.com/surmon-china/vue-awesome-swiper  
  * Swiper3 https://www.swiper.com.cn/api/index2.html  
* 安装 better-scroll
  * http://ustbhuangyi.github.io/better-scroll/doc/api.html
* main.js 引入 import XXX from 'XXX'  

## iconFont  
* www.iconfont.cn  
* 图标库选择图标添加到项目，下载文件，记录Unicode
* 字体文件(svg ttf wolf eot) + iconfont.css 放入assets下，注意修改iconfont.css下字体文件引用路径   
* main.js 引入  
* 应用： <span class="iconfont">&#xe6ee;</span>  

## git 命令
* 提交到本地缓存 git add .  
* 本地缓存提交到本地仓库 git commit -m '描述内容'  
* 提交到线上 git push  
* 线上下拉到本地 git pull  
* 切换本地swiper分支 git checkout swiper  
* 查看本地分支 git statue  
* 合并到master分支( 本地切换到master, 线上index-swiper合并到本地分支，master提交到线上 )  
  git checkout master
  git merge origin/index-swiper
  git push  
* 当前分支列表选定分支b，某分支a合并b 
  git branch 选分支，git merge a 

## 首页  
* 首页 Home.vue 从 home > components 下引入Header, Swiper, Icons， Recommend, Weekend多个组件。
  轮播图：基于vue-awesome-swiper。
  图标区域：获取icon总数n，除每页icon数i，分成n/i页，存为二维数组pages。<template>中v-for嵌套一层循环页，一层循环单页的icon。  
  页面数据：static目录外部可以直接访问到，这里用static里写静态数据模拟接口。Home.vue通过axios一次请求首页所有数据，再把数据作为属性分别传给对应子组件。  
* 样式穿透突破scoped限制  
  .wrapper >>> .swiper-pagination-bullet-active  
* 通过axios获取数据  
  ```javascript
  import axios from 'axios'
  mounted () {
    this.getHomeInfo()
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        // ...
      }
    }
  }

  ```
* 开发环境下路径替换  config > index.js
  转发机制， 对API请求转发到mock文件夹下，webpack-dev-server实现
  ```javascript
  module.exports = {
    dev: {
      // Paths
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: {
        // 开发环境下更改目录
        '/api' : {
            target: 'http://localhost:8080',
            pathRewrite: {
              // 如果路径是API开头，就替换到/static/mock/
                '^/api': '/static/mock/'
            }
        }
        // '/api' : {
        //     // 接口地址
        //     target: 'http://localhost:80',
        // }        
      }
    }
  }
    ```  

## 城市选择页  
* 首页点击右上角，进入城市选择页。  
* 修改首页右上角div, 外部包裹一层<route-link to='/city'>;设置城市选择页路由。
  顶部Header: 左侧返回首页按钮，router-link  
  顶部搜索框：监听搜索输入框双向绑定数据keyword变化，遍历城市数据判断有无对应输入汉字或拼音, 若有则将对应城市存入数组list。 keyword存在时，渲染列表list，并使用better-scroll使其能正常滚动。 当list为空时，显示“没有找到匹配数据”。    
  右侧字母表：依据cities的key获取字母表。
  点击字母后，会将对应字母传给父组件City.vue，City.vue再将点击字母内容letter传给city-list，city-list监听传来letter变化，滑动到对应位置。 滑动字母列表，touchstart和touchend分别修改状态，touchmove获取触点与A的垂直距离，计算触点对应字母，将对应字母传给父组件City.vue。  
  城市列表：v-for渲染城市列表，并依据字母设置:ref="key"。通过vuex实现城市选择页与首页当前城市city数据共享，点击城市更改当前城市state.city，再跳转到首页this.$router.push('/')。  

* better-scroll  
  初始化：  
  import BScroll from 'better-scroll'
  let scroll = new BScroll('.wrapper')
  这里：
  ```html
  <div class="list" ref="wrapper">
  ```
  ```javascript
  import BScroll from 'better-scroll'
  // better-scroll 默认会阻止浏览器的原生 click 事件
  // 设置为 true，better-scroll 会派发一个 click 事件
  this.scroll = new BScroll(this.$refs.wrapper, {
    click: true,
    tap: true
  })
  ```  
  滑动到对应DOM  
  ```javascript
  const ele = this.$refs[this.letter][0]
  this.scroll.scrollToElement(ele)
  ```
* Element.offsetTop  
  它返回当前元素相对于其 offsetParent 元素的顶部的距离。  
* e.touches[0].clientY  
  返回触点相对于可见视区 上边沿的的Y坐标. 不包括任何滚动偏移.这个值会根据用户对可见视区的缩放行为而发生变化。  
* 函数截留  
  持续停留20ms才执行，减少某函数执行频率，提高性能  
  if (this.timer) { clearTimeout(this.timer) }  
  this.timer = setTimeout(() => { 执行函数 }, 20)    

* vuex  
  * 公用数据都存在State, 使用从State获取  
    修改数据流程：
      组件 dispatch Actions，异步/批量操作放在Actions; Actions commit Mutations; Mutations同步对State进行修改; 
      也可以是组件直接 commit Mutations，Mutations在对State进行修改。  
    src下新建文件夹store > index.js, main.js下引入store  
    ```javascript
    // store > index.js
    import Vue from 'vue'
    import Vuex from 'vuex'  
    Vue.use(Vuex)
    export default new Vuex.Store({
      // 全局公用数据
      state: {
        city: defaultCity
      },
      actions: {
        // (上下文， 参数)
        changeCity (ctx, city) {
          // action调用mutation--changeCity
          ctx.commit('changeCity', city)
        }
      },
      mutations: {
        changeCity (state, city) {
          state.city = city
        }
      }
    })
    // 首页Header组件 使用数据  
    {{this.$store.state.city}}  
    // 城市选择页List组件 修改state
    // this.$store.dispatch('actions函数名', 参数)  
    // this.$store.commit('mutations函数名', 参数)  
    this.$store.dispatch('changeCity', city)
    ```
  * mapState  
    一个组件需要获取多个状态时候, mapState 辅助函数帮助我们生成计算属性  
    扩展运算符...，一个数组转为用逗号分隔的参数序列  
    ```javascript
    // Vuex.city公共数据映射到的计算属性中this.currentCity
    // {{this.$store.state.city}} 可简写为 {{this.currentCity}}
    import { mapState } from 'vuex'  
    computed: {
      ...mapState({
        currentCity: 'city'
      })
    }
    ```
  * ...mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用  
    ```javascript
    // this.$store.commit('changeCity', city) 简写为 this.changeCity(city)
    import { mapMutations } from 'vuex'
    export default {
      methods: {
        handleCityClick (city) {
          this.changeCity(city)
        },
        ...mapMutations(['changeCity'])
      }
    }

    ```  

## 详情页面  
* 首页点击推荐列表，进入详情页。 
  顶部Header：获取元素顶部滑动距离，当距离超过一定值时，修改动态style对应的opacity变量及显示隐藏变量。  
  详情列表： 递归组件，name为DetailList子组件里调<detail-list>，并对同一属性赋值。  
  画廊部分： 写成公共组件，使用awesome-swiper pagination;画廊点击时$emit('close')，父组件接收到close, 修改画廊状态变量。  
  数据：依据地址参数请求数据，并将数据传给各子组件，Banner获得画廊图片数据后再传给公共画廊组件。  

* li改为跳转链接  
  li改为router-link, :to="链接地址"，tag="li"渲染成li标签  
  <router-link :to="'/detail/' + item.id" tag="li">  
* banner 渐变 background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))  
* 元素的顶部到它的最顶部可见内容（的顶部）的距离的垂直度量
  const top = document.documentElement.scrollTop
  兼容写法  
  const scrollTop = (window.parent.document.documentElement.scrollTop || window.parent.document.body.scrollTop) || (document.body.scrollTop + document.documentElement.scrollTop) || (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)  
* 全局公用组件  
  src > common > 组件文件夹 > 组件名.vue + 子组件, 注册和引入方法相同  
* axios 带参数写法  
  ```javascript
    axios.get('/api/detail.json', {
      params: {
        id: this.$route.params.id
      }
    }).then(this.handleGetDataSucc)

  ```  
* 避免页面拖动，多个页面间相互影响    
  vue-router 滚动行为  
  ```javascript
  // 每次路由切换，设置页面初始位置回到最顶部  
  scrollBehavior (to, from, savedPosition) {  
    return {x: 0, y: 0}
  }   
  ```
* 动画效果  
  动画组件 Fade.vue  
  ```Vue
    <transition>
      <slot></slot>
    </transition>
    <style lang="stylus" scoped>
      .v-enter, .v-leave-to
        opacity 0
      .v-enter-active, .v-leave-active
        transition opacity 0.5s
    </style>
  ```  
  gallary应用动画效果  
  ```html
    <fade>
      <gallary>...</gallary>
    </fade>
  ```
  
# travel

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
