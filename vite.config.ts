import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  base: "./",
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
      },
    },
  },
});
