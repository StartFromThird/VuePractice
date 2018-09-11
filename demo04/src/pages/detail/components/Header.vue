<template>
  <div>
    <router-link tag="div" to="/" v-show="showAbs" class="header-abs">
      <span class="iconfont back-icon">&#xe624;</span>
    </router-link>
    <div v-show="!showAbs" :style="opacityStyle" class="header-fixed">
      景点详情
      <router-link class="header-left" to="/">
        <div class="iconfont fixed-back-icon">&#xe624;</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default{
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    // 拖动页面 景点详情透明度变化及显示隐藏
    handleScroll () {
      // 元素的顶部到它的最顶部可见内容（的顶部）的距离的垂直度量
      // const top = document.documentElement.scrollTop
      // 兼容写法
      const top = (window.parent.document.documentElement.scrollTop || window.parent.document.body.scrollTop) || (document.body.scrollTop + document.documentElement.scrollTop) || (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
      // console.log(top)
      if (top > 60) {
        let opacity = top / 140
        opacity = (opacity > 1) ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  // keep-alive exclude="Detail" 不会执行activated()
  // activated () {
  //   // 监听滚动,这里是全局监听，会影响其他组件
  //   window.addEventListener('scroll', this.handleScroll)
  // },
  // deactivated 页面隐藏或要替换成新页面时调用
  // deactivated () {
  //   // 解绑全局事件
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
  created () {
    // 监听滚动,这里是全局监听，不解绑其他组件scroll也会调handleScroll
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // 解绑全局事件
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
.header-abs
  position absolute
  top 0.2rem
  left 0.2rem
  width 0.8rem
  height 0.8rem
  line-height 0.8rem
  border-radius 50%
  background rgba(200, 200, 0, 0.3)
  text-align center
  .back-icon
    color #fff
.header-fixed
  position fixed
  top 0px
  z-index 1
  width 100%
  height 0.86rem
  background $bgColor
  line-height 0.86rem
  font-size 0.32rem
  text-align center
  color #fff
  .header-left
    float left
    width: 0.64rem
    height 0.86rem
    // display block
    .fixed-back-icon
      text-align center
      font-size 0.4rem
      color #fff
</style>
