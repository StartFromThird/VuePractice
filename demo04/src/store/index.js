import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations
  // 全局公用数据
  // state: {
  //   city: defaultCity
  // },
  // actions: {
  //   // (上下文， 参数)
  //   changeCity (ctx, city) {
  //     // console.log("index", city)
  //     // action调用mutation--changeCity
  //     ctx.commit('changeCity', city)
  //   }
  // },
  // mutations: {
  // }
})
