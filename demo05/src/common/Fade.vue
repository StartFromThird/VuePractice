<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'Fade'
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-to, .v-leave {
  opacity: 1;
}
.v-enter-active, .v-leave-active {
  transition: all 0.2s linear;
}
</style>
