import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "/", 
  plugins: [react({ include: /\.(jsx|js|tsx|ts)$/ } )], 
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "./src"),  
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        en: resolve(__dirname, "en/index.html"),
        uk: resolve(__dirname, "uk/index.html"),
      },
    },
  },
});
