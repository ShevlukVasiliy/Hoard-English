import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Tauri ожидает фиксированный порт и не должен терять вывод Rust в консоли.
// BASE — путь сайта для PWA на GitHub Pages (/Hoard-English/); Tauri собирается от корня.
export default defineConfig({
  base: process.env.BASE ?? "/",
  plugins: [react()],
  clearScreen: false,
  server: { port: 1420, strictPort: true },
  envPrefix: ["VITE_", "TAURI_"],
  build: { target: "safari15", outDir: "dist" },
});
