<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <router-link to='/city'>
      <div class="header-right">
        <!-- {{this.$store.state.city}} -->
        {{this.city}}
        <span class="iconfont back-icon">&#xe62d;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
// 辅助函数生成计算属性
import { mapState } from 'vuex'
export default{
  name: 'HomeHeader',
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState(['city'])
  },
  props: {
    // city: String
  }
}
</script>
<style lang="stylus" scoped>
    // @import '../../../assets/styles/varibles.styl'
    // @代表src目录
    // @import '~@/assets/styles/varibles.styl'
    @import '~styles/varibles.styl'
    .header
        display: flex
        height: 0.86rem
        line-height: 0.86rem
        background: $bgColor
        color: #fff
        .header-left
            width: 0.64rem
            float: left
            .back-icon
                text-align: center
                font-size: 0.4rem
        .header-input
            flex: 1
            height: 0.64rem
            line-height: 0.64rem
            margin-top: 0.12rem
            margin-left: 0.2rem
            padding-left: 0.2rem
            background: #fff
            border-radius: 0.1rem
            color: #ccc
        .header-right
            min-width: 1.24rem
            padding 0 0.1rem
            float: right
            text-align: center
            color #fff
            .back-icon
                margin-left: -0.04rem
                font-size: 0.3rem

</style>
