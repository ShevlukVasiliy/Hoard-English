import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Номер сборки: коммит в GitHub Actions, время — при локальной сборке.
const BUILD = process.env.GITHUB_SHA?.slice(0, 12) ?? Date.now().toString(36);

// version.json рядом с сайтом: номер сборки и её файлы. PWA по нему узнаёт о новой
// версии (src/update.ts), а service worker удаляет из кэша файлы старых сборок.
function versionFile(): Plugin {
  return {
    name: "hoard-version",
    apply: "build",
    generateBundle(_, bundle) {
      const assets = Object.keys(bundle).filter((f) => f.startsWith("assets/"));
      this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ build: BUILD, assets }) });
    },
  };
}

// Tauri ожидает фиксированный порт и не должен терять вывод Rust в консоли.
// BASE — путь сайта для PWA на GitHub Pages (/Hoard-English/); Tauri собирается от корня.
export default defineConfig({
  base: process.env.BASE ?? "/",
  plugins: [react(), versionFile()],
  define: { __BUILD__: JSON.stringify(BUILD) },
  clearScreen: false,
  server: { port: 1420, strictPort: true },
  envPrefix: ["VITE_", "TAURI_"],
  build: { target: "safari15", outDir: "dist" },
});
