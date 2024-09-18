import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ tsconfigPath: "./tsconfig.app.json" })],
  build: {
    outDir: "dist-lib",
    lib: {
      entry: resolve(__dirname, "./lib.ts"),
      name: "vue3EditableForm",
      formats: ["umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
