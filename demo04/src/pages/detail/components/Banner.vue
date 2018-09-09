<template>
  <div>
    <div class="banner" @click="handleBannerShow">
      <img :src="bannerImg" alt="" class="banner-img">
      <div class="banner-info">
        <div class="banner-title">{{sightName}}</div>
        <div class="banner-icon"><span class="iconfont">&#xe6ee;</span> {{gallaryImgs.length}}</div>
      </div>
    </div>
    <common-gallary :imgs="gallaryImgs" v-show="showGallery" @close="handleGalleryClose"></common-gallary>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
export default{
  name: 'DetailBanner',
  components: {
    CommonGallary
  },
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  data () {
    return {
      // imgs: ["http://img1.qunarzz.com/sight/p0/1803/2e/2ee74981c5f7e0a4a3.img.jpg_r_800x800_1189225b.jpg",
      //   "http://img1.qunarzz.com/sight/p0/1803/20/20bc07e39751824a3.img.jpg_350x240_05c33076.jpg"],
      showGallery: false
    }
  },
  methods: {
    // 显示画廊
    handleBannerShow () {
      this.showGallery = true
    },
    // 隐藏画廊
    handleGalleryClose () {
      this.showGallery = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .banner
    position relative
    overflow hidden
    height 0
    padding-bottom 55%
    .banner-img
      width 100%
    .banner-info
      position absolute
      bottom 0
      box-sizing border-box
      width 100%
      padding 0 0.2rem
      line-height 0.6rem
      color #fff
      background-image linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
      .banner-title
        float left
        font-size 0.32rem
      .banner-icon
        float right
        margin-top 0.1rem
        padding 0 0.4rem
        height 0.4rem
        line-height 0.4rem
        font-size 0.24rem
        border-radius 0.2rem
        background rgba(0, 0, 0, 0.8)
        .iconfont
          font-size 0.24rem
</style>
