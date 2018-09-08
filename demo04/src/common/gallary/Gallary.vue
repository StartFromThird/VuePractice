<template>
  <div class="container" @click="handleGalleryShow" >
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide  v-for="(item, index) of imgs" :key="index">
          <img class="gallery-img" :src="item"/>
        </swiper-slide>
<!--         <swiper-slide>
          <img class="gallery-img" src="http://img1.qunarzz.com/sight/p0/1803/20/20bc07e39751824a3.img.jpg_350x240_05c33076.jpg" />
        </swiper-slide> -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonGallary',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        // 分页器样式
        paginationType: 'fraction',
        // 观察swiper父元素及swiper变化刷新一次
        observeParents: true,
        observer: true

      }
    }
  },
  methods: {
    handleGalleryShow () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.container >>> .swiper-container
  // 默认 overflow:hidden
  overflow: inherit
.container
  display flex
  flex-direction column
  justify-content center
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 10
  background #000
  color #fff
  .wrapper
    // overflow hidden
    // background #0f0
    height 0
    width 100%
    padding-bottom 66.67%
    .gallery-img
      width 100%
    .swiper-pagination
      color: #fff
      bottom: -1rem
</style>
