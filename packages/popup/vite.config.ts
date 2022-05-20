import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  base: "./",
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
