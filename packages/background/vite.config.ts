import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src", "main.ts"),
      formats: ["es"],
      fileName: "main",
    },
  },
});
