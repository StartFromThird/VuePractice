<template>
  <div class="menu-bar">
    <!-- 底部菜单 -->
    <slide-up-animation>
      <div class="menu-wrapper" v-show="isShow" :class="{'hide-shadow': isSettingShow||isShow}">
        <div class="icon-wrapper" @click="showSetting(0)">
          <span class="iconfont">≡</span>
        </div>
        <div class="icon-wrapper" @click="showSetting(1)">
          <span class="iconfont">&#xe65c;</span>
        </div>
        <div class="icon-wrapper" @click="showSetting(2)">
          <span class="iconfont">&#xe60e;</span>
        </div>
        <div class="icon-wrapper"  @click="showSetting(3)">
          <span class="iconfont">A</span>
        </div>
      </div>
    </slide-up-animation>
    <!-- 设置 -->
    <slide-up-animation>
      <div class="setting-wrapper" v-show="isSettingShow">
        <!-- 进度条设置 -->
        <div class="setting-progress"  v-if="settingIndex===1">
          <div class="progress-wrapper">
            <input ref="progress" class="progress"
                  type="range" max="100" min="0" step="1"
                  :value="progress" :disable="!bookAvailable"
                  @input="onProgressInput($event.target.value)"
                  @change="onProgressChange($event.target.value)">
          </div>
          <div class="text-wrapper">
            <span>{{bookAvailable ? progress + "%" : "加载中"}}</span>
          </div>
        </div>
        <!-- 主题样式设置 -->
        <div class="setting-theme" v-else-if="settingIndex===2">
          <div class="select-wrapper" v-for="(item) of themeList" :key="item.name" @click="changeTheme(item.name)">
            <div class="preview" :style="{background: item.style.body.background}"></div>
            <div class="select" :class="{'selected': item.name==defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <!-- 字号设置 -->
        <div class="setting-font-size" v-else-if="settingIndex===3">
          <div class="preview" :style="{fontSize: fontSizeList[0] + 'px'}">A</div>
          <!-- 字号选择条 -->
          <div class="select">
            <div class="select-wrapper"
            v-for="(item) of fontSizeList" :key="item" @click="changeFontSize(item)">
              <div class="line"></div>
              <!-- 选中字号小圆点 -->
              <div class="point-wrapper">
                <div class="point" v-show="item==defaultFontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1] + 'px'}">A</div>
        </div>
      </div>
    </slide-up-animation>
    <!-- 电子书目录 -->
    <catalog-view v-show="isCatalogShow"
                  :navigation="navigation"
                  @jumpTo="jumpTo"
                  :bookAvailable="bookAvailable">
    </catalog-view>
    <fade-animation>
      <div class="catalog-mask"
            v-show="isCatalogShow" @click="hideCatalog">
      </div>
    </fade-animation>
  </div>
</template>

<script>
import SlideUpAnimation from '../common/SlideUp'
import FadeAnimation from '../common/Fade'
import CatalogView from './Catalog'
export default {
  name: 'TitleBar',
  components: {
    SlideUpAnimation,
    FadeAnimation,
    CatalogView
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    defaultFontSize: Number,
    fontSizeList: Array,
    defaultTheme: String,
    themeList: Array,
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: Object
  },
  data () {
    return {
      isSettingShow: false,
      settingIndex: -1,
      progress: 0,
      isCatalogShow: false
    }
  },
  methods: {
    showSetting (i) {
      if (i === 0) {
        // Catalog
        this.isSettingShow = false
        this.isCatalogShow = true
      } else {
        this.isSettingShow = true
        this.settingIndex = i
      }
    },
    hideCatalog () {
      this.isCatalogShow = false
    },
    hideSetting () {
      this.isSettingShow = false
    },
    changeFontSize (i) {
      this.$emit('fontSizeChanged', i)
    },
    changeTheme (name) {
      this.$emit('themeChanged', name)
    },
    // @input 拖动进度条触发事件
    onProgressInput (p) {
      this.progress = p
      // 修改backgroundSize实现拖动时进度条左侧样式变化
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // @change 松开进度条触发事件
    onProgressChange (p) {
      this.$emit('progressChanged', p)
    },
    jumpTo (href) {
      this.$emit('jumpTo', href)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global';
.menu-bar {
  .menu-wrapper {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 3;
    // 与menu-wrapper同级
    &.hide-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: auto;
      @include center;
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    right: 0;
    height: px2rem(60);
    z-index: 2;
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(48);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          // background: rgba(0, 220, 220, 0.3);
          // 第一个和最后一个线删除
          &:first-child {
            // background: #0f0;
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          // 字号选择横条实现：线点线 -·-
          .line {
            flex: 1;
            height: 0;
            border-top: 1px solid #333;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: 1px solid #333;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-12);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: #fff;
              border: 1px solid #333;
              box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
              .small-point {
                position: absolute;
                top: px2rem(8);
                left: px2rem(8);
                width: px2rem(4);
                height: px2rem(4);
                border-radius: 50%;
                background: #333;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      background: #fff;
      z-index: 2;
      .select-wrapper {
        cursor: pointer;
        flex: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: px2rem(5);
        .preview{
          flex: 1;
          box-sizing: border-box;
          &.border{
            border: 1px solid #ccc;
            border: 1px solid #f00;
          }
        }
        .select{
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          background: #ccc;
          color: #999;
          // color: #00f;
          @include center;
          &.selected{
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 px2rem(30);
        @include center;
        // range input设置样式
        .progress {
          width: 100%;
          // 覆盖默认样式
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#333,#333) no-repeat, #ddd;
          // background: -webkit-linear-gradient(#00f,#00f) no-repeat, #f00;
          background-size: 0 100%;
          &:focus{
            outline: none;
          }
          // 拖动手柄样式
          &::-webkit-slider-thumb{
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ccc;
          }
        }
      }
      .text-wrapper{
        position: absolute;
        left: 0;
        bottom: px2rem(5);
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        text-align: center;
      }
    }
  }
  .catalog-mask{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 3;
    display: flex;
    background: rgba(51, 51, 51, .8);
  }
}
</style>
