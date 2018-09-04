<template>
    <div class="icons">
      <swiper :options="swiperOption">

        <swiper-slide v-for="(page, i) of pages" :key="i">
          <div class="icon" v-for="item of page" :key="item.id">
            <div class="icon-img">
              <img :src="item.iconUrl" alt="">
            </div>
            <p>{{item.desc}}</p>
          </div>
        </swiper-slide>

      </swiper>
    </div>
</template>

<script>
export default{
  name: 'HomeIcons',
  props: {
    iconList: Array
  },
  data () {
    return {
      swiperOption: {
        autoplay: false
      }
      // iconList: [ {
      //   id: '001',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
      //   desc: '景点门票'
      // }, {
      //   id: '002',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/6a/45f595250c73d102.png',
      //   desc: '夏日玩水'
      // }, {
      //   id: '003',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png',
      //   desc: '名胜古迹'
      // }, {
      //   id: '004',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',
      //   desc: '必游榜单'
      // }, {
      //   id: '005',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/e3/67df61427c8e1302.png',
      //   desc: '演出'
      // }, {
      //   id: '006',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/95/8246f27355943202.png',
      //   desc: '游乐场'
      // }, {
      //   id: '007',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/fa/2548667cb6e902.png',
      //   desc: '逛博物馆'
      // }, {
      //   id: '008',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1804/95/8d02011d149bdb02.png',
      //   desc: '直通车'
      // }, {
      //   id: '009',
      //   iconUrl: 'http://img1.qunarzz.com/piao/fusion/1803/80/416c6ab3368d1f02.png',
      //   desc: '全部玩乐'
      // }]
    }
  },
  computed: {
    // 将icon存到二维数组中，行号为页码
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  @import '~styles/mixins.styl'
  .icons  >>> .swiper-container.swiper-container-horizontal.swiper-container-android
    width 100%
    height 0
    padding-bottom 50%
    // background green
  .icons
    margin-top 0.1rem
  .icon
    float left
    position relative
    overflow hidden
    width 25%
    height 0
    padding-bottom 25%
    // background red
    .icon-img
      position absolute
      top 0px
      left 0.22rem
      right 0.22rem
      bottom 0.44rem
      // background blue
      >img
        height 100%
    >p
      position absolute
      bottom 0%
      width 100%
      height 0.44rem
      line-height 0.44rem
      text-align center
      color $darkTextColor
      ellipsis()
</style>
