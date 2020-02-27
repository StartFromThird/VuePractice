export default function({ $axios }) {
  // 拦截器
  $axios.onRequest(config => {
    if (!process.server) {
      config.headers.token = "token121";
    }
  });
}
