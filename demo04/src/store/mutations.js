export default {
  // 更新选择城市数据, 并存储
  changeCity (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  }
}
