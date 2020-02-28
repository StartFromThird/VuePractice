<template>
  <div>
    <add-item-form />
    <list />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      show: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    // 异步
    list: () => import("~/components/list.vue"),
    addItemForm: () => import("~/components/addItemForm.vue")
  }
};
</script>

<style scoped lang="scss">
</style>
