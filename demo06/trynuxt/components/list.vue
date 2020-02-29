<template>
  <div>
    <p>list:</p>
    <!--  -->
    <template v-if="list.length > 0">
      <p v-for="(item, index) in list" :key="`${item} - ${index}`">{{index + 1}} - {{item}}</p>
    </template>
  </div>
</template>

<script>
import event from "./event";
export default {
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    // 自定义事件 绑定
    event.$on("addItem", this.add);
  },
  beforeDestroy() {
    // 自定义事件 解绑
    event.$off("addItem", this.add);
  },
  watch: {},
  methods: {
    add(e) {
      console.log("接收参数", e);
      this.list.push(e);
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
