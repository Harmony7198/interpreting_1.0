import { defineConfig } from "vite";

export default defineConfig({
  base: "/interpreting_1.0/",

  server: {
    host: "localhost",
    port: 5173,
    open: true
  },

  preview: {
    host: "localhost",
    port: 4173
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true
  }
});