import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "rooms" },
    { path: "/draw", component: "draw" },
  ],
  npmClient: 'yarn',
});
