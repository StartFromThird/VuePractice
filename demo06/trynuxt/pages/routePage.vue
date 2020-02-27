<template>
  <div class="routePage">
    <h3 class="title">routePage</h3>
    <div>
      <nuxt-link to="/routePage/detail">
        <el-button>嵌套路由</el-button>
      </nuxt-link>
      <el-button @click="$router.push({name: 'routePage-id', params: {id: 1}})">动态路由</el-button>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>