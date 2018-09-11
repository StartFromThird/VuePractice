<template>
  <ul class="list">
    <!-- .prevent 修饰符阻止默认事件 -->
    <li class="item" v-for="item of letters" :key="item" :ref="item"
    @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
    @click="handleLetterClick(item)"
    >{{item}}</li>
    <!-- <li class="item">B</li> -->
  </ul>
</template>

<script>
export default{
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  computed: {
    // 计算字母列表数组
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return {
      touchStatus: false,
      alphabetLen: 0,
      AY: 0,
      timer: null
    }
  },
  // 字母表数据更新，页面完成字母表渲染后
  updated () {
    this.AY = this.$refs['A'][0].offsetTop
    this.alphabetLen = this.letters.length
    // this.$refs['A'][0].offsetHeight
  },
  methods: {
    handleLetterClick (key) {
      this.$emit('change', key)
    },
    // 滑动字母表
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        // 函数截留，减少执行频率
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // 获取触点与A的垂直距离，计算触点对应字母
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.AY) / 20)
          if (index >= 0 && index < this.alphabetLen) {
            this.$emit('change', this.letters[index])
          }
        }, 15)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .list
    display flex
    flex-direction column
    justify-content center
    position absolute
    top 1.58rem
    right 0
    bottom 0
    width 0.6rem
    overflow hidden
    .item
      height 0.4rem
      line-height 0.4rem
      text-align center
      color $bgColor
      z-index 1
</style>
