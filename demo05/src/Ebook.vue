<template>
  <div class="ebook">
    <!-- <slide-down-animation></slide-down-animation> -->
    <!-- <slide-up-animation></slide-up-animation> -->
    <title-bar :isShow="isTitleAndMenuShow"></title-bar>
    <menu-bar ref="menuBar"
              :isShow="isTitleAndMenuShow"
              :defaultFontSize="defaultFontSize"
              :fontSizeList="fontSizeList"
              @fontSizeChanged="changeDefaultFontSize"
              :defaultTheme="defaultTheme"
              :themeList="themeList"
              @themeChanged="changeDefaultTheme"
              :bookAvailable="bookAvailable"
              @progressChanged="changeProgress"
              :navigation="navigation"
              @jumpTo="jumpTo">
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
      // 文本大小
      fontSizeList: [12, 14, 16, 18, 20, 22, 24],
      defaultFontSize: 16,
      // 显示主题
      themeList: [
        {
          name: 'default',
          style: {
            body: {'color': '#000', 'background': '#F5F5DC'}
          }
        },
        {
          name: 'eye',
          style: {
            body: {'color': '#000', 'background': '#afce9c'}
          }
        },
        {
          name: 'night',
          style: {
            body: {'color': '#ccc', 'background': '#000'}
          }
        },
        {
          name: 'gold',
          style: {
            body: {'color': '#000', 'background': '#FFDEAD'}
          }
        }
      ],
      defaultTheme: 'default',
      bookAvailable: false,
      navigation: {}
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
      // this.themes.register(name, styles) 注册电子书主题样式
      // this.themes.select(name) 设置电子书主题样式
      this.themesRegister()
      // this.book.locations 电子书定位
      // epub.js钩子函数 解析完成调用 ready
      this.book.ready.then(() => {
        // 生成目录
        this.navigation = this.book.navigation
        // console.log("this.navigation", this.navigation)
        // 生成对象定位符  字符串数组
        return this.book.locations.generate()
      }).then(result => {
        // console.log(result)
        this.locations = this.book.locations
        // locations加载完后，才可使用拖动进度条
        this.bookAvailable = true
        // 仅用于进度条测试
        // this.changeProgress(10)
      })
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
    },
    // 注册主题样式
    themesRegister () {
      this.themeList.forEach((i) => {
        this.themes.register(i.name, i.style)
      })
    },
    // 更改主题样式
    changeDefaultTheme (name) {
      // let name = this.themeList[i].name
      this.themes.select(name)
      this.defaultTheme = name
    },
    // 依据进度条位置p(p在0--100之间)，更改当前页面
    changeProgress (p) {
      const percent = p / 100
      // this.locations.cfiFromPercentage(50%) 传入%生成location
      const location = percent > 0 ? this.locations.cfiFromPercentage(percent) : 0
      // 跳转到location对应页面
      this.rendition.display(location)
    },
    jumpTo (href) {
      // 跳转到对应位置，title menu catalog 恢复到初始状态
      this.rendition.display(href)
      this.isTitleAndMenuShow = false
      this.$refs.menuBar.hideSetting()
      this.$refs.menuBar.hideCatalog()
    }
    // hideTitle
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
        // background: rgba(255, 0, 0, 0.2);
      }
      .center{
        flex: 1;
        // background: rgba(0, 255, 0, 0.2);
      }
      .right{
        flex: 0 0 px2rem(130);
        // background: rgba(0, 0, 255, 0.2);
      }
    }
  }
}

</style>
