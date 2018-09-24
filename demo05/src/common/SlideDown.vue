<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'SlideDown'
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.v-enter, .v-leave-to {
  transform: translateY(-100%);
}
.v-enter-to, .v-leave {
  transform: translateY(0);
}
.v-enter-active, .v-leave-active {
  transition: all 0.2s linear;
}
</style>
