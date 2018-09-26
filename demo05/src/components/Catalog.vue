<template>
  <!-- <div>catalog</div> -->
  <slide-left-animation>
    <div class="catalog">
      <div class="catalog-wrapper" v-if="bookAvailable">
        <div class="catalog-item" v-for="(item) in navigation.toc" :key="item.href"
              @click="jumpTo(item.href)">
          <span>{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中</div>
    </div>
  </slide-left-animation>
</template>

<script>
import SlideLeftAnimation from '../common/SlideLeft'
export default {
  name: 'Catalog',
  components: {SlideLeftAnimation},
  props: {
    navigation: Object,
    bookAvailable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    jumpTo (href) {
      this.$emit('jumpTo', href)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.catalog {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  min-width: 50%;
  max-width: 90%;
  // height: 300px;
  background: #fff;
  overflow: scroll;
  z-index: 4;
  .catalog-wrapper {
    .catalog-item {
      height: px2rem(40);
      line-height: px2rem(40);
      padding-left: px2rem(30);
      padding-right: px2rem(30);
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      span {
        font-size: px2rem(12);
      }
    }
  }
}
</style>
