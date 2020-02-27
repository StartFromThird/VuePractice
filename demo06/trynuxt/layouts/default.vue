<template>
  <div>
    <el-row class="tac">
      <el-col class="nav-left">
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
          <template v-for="submenu in menu">
            <el-submenu :index="submenu.path" :key="submenu.name" v-if="submenu.children">
              <template slot="title">
                <span>{{submenu.name}}</span>
              </template>
              <template v-if="submenu.children">
                <el-menu-item
                  v-for="menuitem in submenu.children"
                  :index="`${submenu.path}/${menuitem.path}`"
                  :key="menuitem.name"
                >
                  <template slot="title">
                    <span>{{menuitem.name}}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index="submenu.path" :key="submenu.name" v-else>
              <template slot="title">
                <span>{{submenu.name}}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col class="main-right">
        <nuxt />
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import a from "./a";
export default {
  data() {
    return {
      menu: []
    };
  },
  methods: {},
  created() {
    this.menu = this.$router.options.routes;
  }
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.nav-left {
  width: 300px;
  height: 100vh;
  padding-right: 20px;
}
.main-right {
  border-left: 1px solid #e6e6e6;
  width: calc(100% - 300px);
  height: 100vh;
  box-sizing: border-box;
  padding: 0 20px;
  line-height: 1.5;
}
.main-right .title {
  padding: 10px 0;
}
</style>
