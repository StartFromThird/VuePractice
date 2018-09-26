<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'SlideLeft'
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.v-enter, .v-leave-to {
  transform: translateX(-100%);
}
.v-enter-to, .v-leave {
  transform: translateX(0);
}
.v-enter-active, .v-leave-active {
  transition: all 0.2s linear;
}
</style>
