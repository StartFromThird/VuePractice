<template>
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click='prevPage'></div>
        <div class="center"></div>
        <div class="right" @click='nextPage'></div>
      </div>
    </div>
  </div>
</template>
<script>
import Epub from 'epubjs'
const DOWNLOAD_URL = '/static/美丽新世界.epub'
// global.ePub = Epub
export default {
  name: 'Ebook',
  methods: {
    // 电子书内容渲染
    showEpub () {
      this.book = new Epub(DOWNLOAD_URL)
      // console.log(this.book)
      // renderTo(ele, {参数}) 生成Rendition
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // Rendition.display 渲染电子书
      this.rendition.display()
    },
    // 向前翻页
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    // 向后翻页
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    }
  },
  mounted () {
    this.showEpub()
  }
    
}
</script>
<style lang='scss' scoped>
@import './assets/styles/global';
.ebook{
  position: relative;
  .read-wrapper{
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height:100%;
      .left{
        flex: 0 0 px2rem(130);
        background: rgba(255, 0, 0, 0.2);
      }
      .center{
        flex: 1;
        background: rgba(0, 255, 0, 0.2);
      }
      .right{
        flex: 0 0 px2rem(130);
        background: rgba(0, 0, 255, 0.2);
      }
    }
  }
}

</style>
