<template>
  <div>
    <div class="search">
      <input v-model="keyword"
      type="text" class="search-input" placeholder="输入城市或拼音">
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li v-for="item of list" :key="item.id"
        class="search-item border-bottom">{{item.name}}</li>
        <li v-if="notFind"
        class="search-item border-bottom">没有找到匹配数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default{
  name: 'CitySearch',
  props: {
    cities: Object
  },
  computed: {
    notFind () {
      return !this.list.length
    }
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  watch: {
    keyword () {
      if (!this.keyword) {
        this.list = []
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const resultArr = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword.toLowerCase()) !== -1 ||
              value.name.indexOf(this.keyword.toLowerCase()) !== -1) {
              resultArr.push(value)
            }
          })
        }
        this.list = resultArr
        // console.log(this.list)
      }, 100)
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.search)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .search
    height 0.72rem
    padding 0 0.1rem
    background $bgColor
    .search-input
      box-sizing border-box
      padding 0 0.1rem
      width 100%
      height 0.62rem
      line-height 0.62rem
      text-align center
      border-radius 3px
      color $darkTextColor
  .search-content
    position absolute
    top 1.58rem
    bottom 0
    overflow hidden
    z-index 2
    width 100%
    background #eee
    .search-item
      line-height 0.62rem
      padding-left 0.2rem
      color #666
      background #fff
</style>
