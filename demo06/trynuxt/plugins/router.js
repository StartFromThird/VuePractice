export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // console.log("路由拦截", to.path);
    next();
  });
};
