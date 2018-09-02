<template>
  <div class="wrapper">
    <!-- <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback"> -->
    <!-- <swiper :options="swiperOption"> -->
    <swiper>
      <!-- slides -->
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination'
      },
      swiperList: [{
        id: '001',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1801/6e/3f6a091804ac0a02.jpg_890x330_b6673437.jpg'
      }, {
        id: '002',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1808/a0/980b19eda13bb202.jpg_890x330_d0cc76d2.jpg'
      }, {
        id: '003',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1806/cf/eb8c2dfa395d7e02.jpg_890x330_e5cedf73.jpg'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  // 样式穿透，不受scope的限制
  .wrapper >>> .swiper-pagination-bullet-active
    background: red
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 36.95%
    backgground: #fff
    .swiper-img
      width: 100%
</style>
