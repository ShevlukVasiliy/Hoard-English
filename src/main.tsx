import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { inTauri } from "./storage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// PWA: офлайн-кэш. В приложении Tauri и в режиме разработки не нужен.
if (!inTauri && import.meta.env.PROD && "serviceWorker" in navigator)
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
