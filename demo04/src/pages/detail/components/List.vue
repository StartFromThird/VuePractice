<template>
  <div>
    <div v-for="(item, index) of list" :key="index" class="item">
      <div class="item-title border-bottom">
        <span class="item-title-icon"></span>
        <span>{{item.title}}</span>
      </div>
      <!-- 组件递归 -->
      <div v-if="item.children" class="item-children">
        <detail-list :list="item.children"></detail-list>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'DetailList',
  props: {
    list: Array
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .item-title-icon
    position relative
    left 0.06rem
    top 0.06rem
    display inline-block
    width 0.36rem
    height 0.36rem
    background url(http://s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -0.45rem no-repeat
    margin-right: .1rem
    background-size: .4rem 3rem
  .item-title
    line-height 0.8rem
    font-size 0.32rem
    padding 0 0.2rem
  .item-children
    padding 0 0.2rem
</style>
