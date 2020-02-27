<template>
  <div>
    <h4 class="title">page</h4>
    <li>设置单独的 head, meta</li>
    <li>fetch: {{$store.state.user.users}}</li>
    <li>asyncData 首屏服务端获取数据：{{user}}</li>
    <el-button
      @click="$router.push({
      'name': 'routePage-id',
      'params': {id:111}
    })"
    >asyncData 处理错误</el-button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      title: "页面内"
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "页面描述"
        }
      ]
    };
  },
  // 渲染页面前填充应用的状态树（store）数据
  // 组件初始化之前被调用 没法用this
  async fetch({ store, params, $axios }) {
    let { data } = await $axios.$get("/api/users/list");
    console.log("fetch", data);
    store.commit("user/init", data);
  },
  // 渲染组件之前异步获取数据
  async asyncData({ query, params, $axios, error }) {
    const data = await $axios.$get(`/api/users/1`);
    if (data.ok === 1) {
      return { user: data.user };
    }
    error({ statusCode: 400, message: "id未查到" });
  }
};
</script>
