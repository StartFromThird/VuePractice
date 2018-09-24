<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'SlideUp'
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.v-enter, .v-leave-to {
  // transform: translateY(100%);
  // 两个不同高度以同一速度下拉
  transform: translateY(px2rem(108));
}
.v-enter-to, .v-leave {
  transform: translateY(0);
}
.v-enter-active, .v-leave-active {
  transition: all 0.2s linear;
}
</style>
