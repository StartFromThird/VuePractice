<template>
  <slide-down-animation>
    <div class="title-wrapper" v-show='isShow'>
      <div class="left">
        <span class="iconfont">&#xe720;</span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="iconfont">&#xe746;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont">&#xe70e;</span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont">&#xe72e;</span>
        </div>
      </div>
    </div>
  </slide-down-animation>
</template>

<script>
import SlideDownAnimation from '../common/SlideDown'
export default {
  name: 'TitleBar',
  components: {
    SlideDownAnimation
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.title-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  z-index: 2;
  .left {
    // float: left;
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(48);
      @include center;
    }
  }
}
</style>
