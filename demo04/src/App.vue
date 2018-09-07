<template>
  <div id="app">
    <!-- 避免反复重渲染导致的性能问题 -->
    <keep-alive>
      <!-- 当前路由地址所对应的内容 -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
}
</style>
