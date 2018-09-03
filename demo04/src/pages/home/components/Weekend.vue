<template>
  <div>
    <div class="title">周末去哪</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
          <div class="item-img-wrapper">
            <img class="item-img" :src="item.imgUrl" alt="item.title">
          </div>
          <div class="item-info">
            <p class="item-title">{{item.title}}</p>
            <p class="item-desc">{{item.desc}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  data () {
    return {
      recommendList: [{
        id: '001',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/3a/f96e254541abb.jpg_r_640x214_6b1fc9f0.jpg',
        title: '鄂西旅游圈',
        desc: '感受鄂西旖旎风光，土苗民族风情'
      }, {
        id: '002',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/d5/abe8a48a6ef8bf.jpg_r_640x214_7c41cc81.jpg',
        title: '武汉必游TOP10',
        desc: '到武汉感受神奇的热干面之都'
      }, {
        id: '003',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1507/e0/4aae49007c8a64.jpg_r_640x214_65a42783.jpg',
        title: '周末出游乐翻天',
        desc: '春夏秋冬，这里是当地人最爱的休闲时光'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    margin-top 0.2rem
    line-height 0.8rem
    background #eee
    text-indent 0.2rem
  .item
    padding-bottom 0.2rem
    .item-img-wrapper
      overflow hidden
      height 0
      background #f00
      padding-bottom 37.09%
    .item-img-wrapper img
      width 100%
  .item-info
    padding: 0.1rem
    .item-title
      line-height: 0.54rem
      font-size: 0.32rem
      ellipsis()
    .item-desc
      line-height: 0.4rem
      color: #616161
      ellipsis()
</style>
