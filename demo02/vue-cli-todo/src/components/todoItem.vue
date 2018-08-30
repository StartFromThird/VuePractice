<template>
  <li class="red-border green-word" @click="deleleClick">{{content}}</li>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    deleleClick(){
      this.$emit('delete', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 局部样式 -->
<style scoped>
.red-border{
  border-bottom: 1px solid red;
}
</style>
<!-- 全局样式 -->
<style>
.green-word{
  color: green;
}  
</style>
