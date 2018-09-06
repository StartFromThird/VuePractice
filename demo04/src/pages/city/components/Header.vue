<template>
  <div class="header">
    城市选择
    <router-link class="header-left" to="/">
      <div class="iconfont back-icon">&#xe624;</div>
    </router-link>
  </div>
</template>

<script>
export default{
  name: 'CityHeader'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header
    height 0.86rem
    background $bgColor
    line-height 0.86rem
    font-size 0.32rem
    text-align center
    color #fff
    .header-left
      float left
      width: 0.64rem
      height 0.86rem
      // display block
      .back-icon
        text-align: center
        font-size: 0.4rem
        color #fff
</style>
