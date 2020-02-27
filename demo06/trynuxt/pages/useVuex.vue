<template>
  <div class="useVuex">
    <h4 class="title">VueX 使用</h4>
    <h5>store/index</h5>
    <span>counter: {{$store.state.counter}}</span>
    <el-button @click="addNum" size="small">counter 加1</el-button>
    <h5>store/user</h5>
    <li>直接取：{{$store.state.user.users}}</li>
    <li>mapState：{{mapUsers}}</li>
    <li>调方法</li>
    <el-form :inline="true" :model="user">
      <el-form-item label="姓名">
        <el-input v-model="user.name" placeholder="人员姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">添加</el-button>
        <el-button type="danger" @click="delUser(user.name)">删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      user: {
        name: ""
      }
    };
  },
  methods: {
    addNum() {
      this.$store.commit("increment");
    },
    addUser() {
      this.$store.commit("user/add", this.user);
      this.user.name = "";
    },
    delUser(name) {
      this.delUserByName(name);
      this.user.name = "";
    },
    ...mapMutations({
      delUserByName: "user/delete"
    })
  },
  computed: {
    ...mapState("user", {
      mapUsers: state => state.users
    })
  }
};
</script>