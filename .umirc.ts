import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "rooms" },
    { path: "/draw", component: "draw" },
    { path: "/live2d", component: "live2d" },
    { path: "/sheep", component: "sheep" },
    { path: "/chinese-chess", component: "chinese-chess" },
  ],
  npmClient: 'yarn',
  lessLoader: {
    modifyVars: {
      // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      hack: 'true; @import "/src/styles/index.less";',
    },   
  },
});
