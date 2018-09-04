<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
          <img class="item-img" :src="item.imgUrl" alt="">
          <div class="item-info">
            <p class="item-title">{{item.title}}</p>
            <p class="item-desc">{{item.title}}</p>
            <button class="item-button">查看详情</button>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommendList: Array
  },
  data () {
    return {
      // recommendList: [{
      //   id: '001',
      //   imgUrl: 'http://img1.qunarzz.com/sight/p0/1509/53/5313f7a1f0386316.water.jpg_200x200_845d06e1.jpg',
      //   title: '荆州楚王车马阵景区'
      // }, {
      //   id: '002',
      //   imgUrl: 'http://img1.qunarzz.com/sight/p0/1706/9d/9d2fa92a83ee0540a3.img.jpg_200x200_21fce863.jpg',
      //   title: '悦兮半岛海洋梦幻水上乐园'
      // }, {
      //   id: '003',
      //   imgUrl: 'http://img1.qunarzz.com/sight/p0/1409/17/eef5507e97a8ea03844b8c71faeaf046.jpg_200x200_e922164f.jpg',
      //   title: '张居正故居'
      // }]
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
    // 首行文本缩进
    text-indent 0.2rem
  .item
    overflow: hidden
    display: flex
    height: 1.9rem
    .item-img
      width: 1.7rem
      height: 1.7rem
      padding: 0.1rem
    .item-info
      flex: 1
      padding: 0.1rem
      min-width: 0
      .item-title
        line-height: 0.54rem
        font-size: 0.32rem
        ellipsis()
      .item-desc
        line-height: 0.4rem
        color: #616161
        ellipsis()
      .item-button
        height 0.44rem
        line-height 0.44rem
        margin-top 0.16rem
        background #ff9300
        padding 0 0.2rem
        border-radius 3px
        color #fff
</style>
