import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/// <reference types="vitest" />

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, "./postcss.config.js"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  build: {
    // Optimize bundle size for better Core Web Vitals
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ["react", "react-dom"],
          // UI components
          ui: ["lucide-react"],
          // Utilities
          utils: ["clsx", "tailwind-merge"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize CSS
    cssCodeSplit: true,
    // Target modern browsers for better performance
    target: "es2020",
  },
  // SEO and performance optimizations
  server: {
    // Custom headers for development security
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"],
  },
  // Test configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "../src/__tests__/setup.ts")],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["src/__tests__/setup.ts", "src/__tests__/utils/**"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
});
