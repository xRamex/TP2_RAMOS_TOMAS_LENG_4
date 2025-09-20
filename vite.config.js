import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/TP2_RAMOS_TOMAS_LENG_4/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
