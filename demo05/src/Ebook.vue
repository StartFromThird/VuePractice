<template>
  <div class="ebook">
    <!-- <slide-down-animation></slide-down-animation> -->
    <!-- <slide-up-animation></slide-up-animation> -->
    <title-bar :isShow="isTitleAndMenuShow"></title-bar>
    <menu-bar ref="menuBar"
              :defaultFontSize="defaultFontSize"
              :isShow="isTitleAndMenuShow"
              :fontSizeList="fontSizeList"
              @fontSizeChanged="changeDefaultFontSize">
    </menu-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click='prevPage'></div>
        <div class="center" @click='toggleTitleAndMenu'></div>
        <div class="right" @click='nextPage'></div>
      </div>
    </div>
  </div>
</template>
<script>
import Epub from 'epubjs'
import TitleBar from './components/TitleBar'
import MenuBar from './components/MenuBar'
const DOWNLOAD_URL = '/static/美丽新世界.epub'
// global.ePub = Epub
export default {
  name: 'Ebook',
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      isTitleAndMenuShow: false,
      fontSizeList: [12, 14, 16, 18, 20, 22, 24],
      defaultFontSize: 16
    }
  },
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
      // themes.fontSize 设置渲染电子书字体大小
      this.themes = this.rendition.themes
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
    },
    // 点击中部，弹出顶部导航和底部菜单
    toggleTitleAndMenu () {
      // 修改弹出收起状态
      this.isTitleAndMenuShow = !this.isTitleAndMenuShow
      // 收起时同时收起底部菜单的设置页
      if (!this.isTitleAndMenuShow) {
        // 调用MenuBar的方法
        this.$refs.menuBar.hideSetting()
      }
    },
    // 更改字体大小
    changeDefaultFontSize (i) {
      this.defaultFontSize = i
      if (this.themes) {
        this.themes.fontSize(i + 'px')
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
      z-index: 1;
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
