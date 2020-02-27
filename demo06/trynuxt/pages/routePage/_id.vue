<template>
  <div class="routePageId">
    <h4 class="title">子页面 url：{{$route.path}}</h4>
    <p>动态路由: _id.vue</p>
    <p>params：{{$route.params}}</p>
  </div>
</template>
<script>
export default {
  // http://localhost:3000/routePage/1
  async asyncData({ query, params, $axios, error }) {
    if (!process.server && params.id) {
      const data = await $axios.$get(`/api/users/${params.id}`);
      if (data.ok === 1) {
        return { user: data.user };
      }
      error({ statusCode: 400, message: "id未查到" });
    }
  }
};
</script>
