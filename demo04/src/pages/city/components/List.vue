<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
          <div class="button-list">
            <div class="button-wrapper">
              <div class="button">{{this.currentCity}}</div>
            </div>
          </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item of hotCities" :key="item.id" @click="handleCityClick(item.name)">
            <div class="button">{{item.name}}</div>
          </div>
          <!-- <div class="button-wrapper">
            <div class="button">XXXX</div>
          </div> -->
        </div>
      </div>
      <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div class="item border-bottom" v-for="i of item" :key="i.id" @click="handleCityClick(i.name)">{{i.name}}</div>
        </div>
<!--         <div class="title border-topbottom">B</div>
        <div class="item-list">
          <div class="item border-bottom">BAA</div>
          <div class="item border-bottom">BA</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'

export default{
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  methods: {
    handleCityClick (city) {
      // dispatch 派发 action--changeCity, 附带参数city
      // this.$store.dispatch('changeCity', city)
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      // 编程示导航 跳转到home
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  mounted () {
    // better-scroll 参数配置
    // better-scroll 默认会阻止浏览器的原生 click 事件
    // 设置为 true，better-scroll 会派发一个 click 事件
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      tap: true
    })
  },
  watch: {
    // 监听传来letter变化，滑动到对应位置
    letter () {
      const ele = this.$refs[this.letter][0]
      this.scroll.scrollToElement(ele)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  // 线宽颜色待改 ccc
  .border-topbottom
    &:before
      border-color #666
    &:after
      border-color #666
  .border-bottom
    &:before
      border-color #666
  .list
    overflow: hidden
    position: absolute
    top 1.58rem
    left: 0
    right: 0
    bottom: 0
  .title
    height 0.24rem
    line-height 0.24rem
    background #eee
    padding 0.24rem 0.3rem
    color: #666
    font-size: 0.24rem
  .button-list
    overflow hidden
    padding 0.1rem 0.6rem 0.1rem 0.1rem
    // outline 1px solid red
    .button-wrapper
      float left
      box-sizing border-box
      width 33.33%
      padding 0.1rem
      // outline 1px solid red
      .button
        padding 0.1rem 0
        // border 1px solid #0f0
        border 1px solid #ccc
        border-radius 3px
        text-align center
  .item-list
    .item
      height 0.76rem
      line-height 0.76rem
      padding-left 0.3rem
</style>
