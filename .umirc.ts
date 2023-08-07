import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "rooms" },
    { path: "/draw", component: "draw" },
    { path: "/live2d", component: "live2d" },
    { path: "/chinese/chess", component: "chineseChess" },
  ],
  npmClient: 'yarn',
});
