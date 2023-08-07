import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "rooms" },
    { path: "/draw", component: "draw" },
    { path: "/live2d", component: "live2d" },
  ],
  npmClient: 'yarn',
});
