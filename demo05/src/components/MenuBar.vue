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
        <!-- 主题样式设置 -->
        <div class="setting-theme" v-if="settingIndex===2">
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
  </div>
</template>

<script>
import SlideUpAnimation from '../common/SlideUp'
export default {
  name: 'TitleBar',
  components: {
    SlideUpAnimation
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    defaultFontSize: Number,
    fontSizeList: Array,
    defaultTheme: String,
    themeList: Array
  },
  data () {
    return {
      isSettingShow: false,
      settingIndex: -1
    }
  },
  methods: {
    showSetting (i) {
      this.isSettingShow = true
      this.settingIndex = i
      // console.log(this.defaultFontSize)
    },
    hideSetting () {
      this.isSettingShow = false
    },
    changeFontSize (i) {
      this.$emit('fontSizeChanged', i)
    },
    changeTheme (name) {
      this.$emit('themeChanged', name)
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
  }
}

</style>
