<template>
  <div class="search">
    <input type="text" class="search-input" placeholder="输入城市或拼音">
  </div>
</template>

<script>
export default{
  name: 'CitySearch'
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
</style>
