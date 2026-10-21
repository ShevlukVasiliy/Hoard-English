import { useEffect, useState } from "react";
import { inTauri } from "./storage";

// PWA: вышла ли новая версия сайта. iOS не перезагружает приложение при возврате
// из фона, поэтому сверяем номер сборки с version.json при возврате и раз в полчаса.
const EVERY_MS = 30 * 60_000;

export function useUpdateAvailable(): boolean {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (inTauri || !import.meta.env.PROD) return;
    const check = async () => {
      if (document.visibilityState !== "visible" || !navigator.onLine) return;
      try {
        const r = await fetch(`${import.meta.env.BASE_URL}version.json`, { cache: "no-store" });
        if (!r.ok) return;
        const { build } = (await r.json()) as { build: string };
        if (build && build !== __BUILD__) setAvailable(true);
      } catch { /* нет сети — проверим в следующий раз */ }
    };
    check();
    const timer = setInterval(check, EVERY_MS);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("online", check);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("online", check);
    };
  }, []);
  return available;
}
