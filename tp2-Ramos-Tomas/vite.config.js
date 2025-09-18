import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/TP2_RAMOS_TOMAS_LENG_4/", // 👈 nombre EXACTO de tu repo
});
