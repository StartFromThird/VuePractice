<template>
  <div>
    <el-input v-model.trim="item"></el-input>
    <el-button @click="addItem">新增</el-button>
  </div>
</template>

<script>
import event from "./event";
export default {
  props: {},
  data() {
    return {
      item: ""
    };
  },
  methods: {
    addItem() {
      // 自定义事件
      event.$emit("addItem", this.item);
      this.item = "";
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
