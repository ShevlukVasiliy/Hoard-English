import { useState } from "react";
import { pairCode, readPairCode } from "../shared/sync";
import { useApp } from "./state";
import { inTauri } from "./storage";

const TOKEN_URL = "https://github.com/settings/tokens/new?scopes=gist&description=Hoard";

function statusText(s: ReturnType<typeof useApp>["sync"]["status"], lastSync?: string): string {
  if (s.state === "syncing") return "Синхронизирую…";
  if (s.state === "error") return `Ошибка: ${s.message}`;
  if (s.state === "offline") return `Нет связи с GitHub${lastSync ? ` · последняя синхронизация ${new Date(lastSync).toLocaleString("ru")}` : ""}`;
  if (lastSync) return `Синхронизировано ${new Date(lastSync).toLocaleString("ru")}`;
  return "Ещё не синхронизировано";
}

// Синхронизация через secret-гист GitHub: токен, пароль, код подключения другого устройства.
export function SyncSection() {
  const { sync, toast } = useApp();
  const cfg = sync.config;
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [shown, setShown] = useState<string | null>(null);

  const connect = () => {
    const t = token.trim();
    if (!t) return;
    sync.setConfig({ ...cfg, token: t, password: password || undefined, gistId: undefined, lastSync: undefined });
    setToken("");
    setPassword("");
  };

  const join = () => {
    const c = readPairCode(code);
    if (!c) return toast("Не похоже на код подключения Hoard");
    sync.setConfig({ ...cfg, token: c.token, gistId: c.gistId, password: c.password, lastSync: undefined });
    setCode("");
  };

  const copyCode = async () => {
    if (!cfg.token || !cfg.gistId) return;
    const text = pairCode({ token: cfg.token, gistId: cfg.gistId, password: cfg.password });
    try {
      await navigator.clipboard.writeText(text);
      toast("Код скопирован. На iPhone вставьте его в настройках Hoard");
    } catch {
      setShown(text);
    }
  };

  const disconnect = () => {
    sync.setConfig({ device: cfg.device });
    setShown(null);
  };

  if (!cfg.token) return (
    <section>
      <h2>Синхронизация</h2>
      <p className="muted">
        Прогресс, заметки и очередь Anki хранятся в вашем secret-гисте на GitHub. Своего сервера у Hoard нет.
      </p>

      <h3>Есть код с другого устройства</h3>
      <label className="field">
        Код подключения
        <input value={code} placeholder="hoard:…" autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(e) => setCode(e.target.value)} />
      </label>
      <div className="row"><button disabled={!code.trim()} onClick={join}>Подключить</button></div>

      <h3>Первое устройство</h3>
      <ol className="small">
        <li><a href={TOKEN_URL} target="_blank" rel="noreferrer">Создайте токен GitHub</a> с одним правом — <code>gist</code>.</li>
        <li>Вставьте его сюда. Hoard создаст secret-гист или найдёт уже созданный.</li>
      </ol>
      <label className="field">
        Токен GitHub
        <input type="password" value={token} placeholder="ghp_…" autoComplete="off" onChange={(e) => setToken(e.target.value)} />
      </label>
      <label className="field">
        Пароль шифрования <span className="muted small">необязательно; без него гист читается любым, у кого есть ссылка</span>
        <input type="password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div className="row"><button disabled={!token.trim()} onClick={connect}>Подключить</button></div>
    </section>
  );

  return (
    <section>
      <h2>Синхронизация</h2>
      <p className="muted">
        {statusText(sync.status, cfg.lastSync)}
        {cfg.password ? " · гист зашифрован" : ""}
      </p>
      <div className="row">
        <button disabled={sync.status.state === "syncing"} onClick={() => { sync.run().catch(() => {}); }}>Синхронизировать</button>
        {cfg.gistId && <button className="ghost" onClick={copyCode}>{inTauri ? "Код для iPhone" : "Код для другого устройства"}</button>}
      </div>
      {shown && (
        <label className="field">
          Скопируйте код вручную
          <textarea readOnly rows={3} value={shown} onFocus={(e) => e.currentTarget.select()} />
        </label>
      )}
      <p className="muted small">
        В коде — токен и пароль: не отправляйте его другим людям. Если код или токен утёк — отзовите токен на GitHub.
        {cfg.gistId && <> Гист: <a href={`https://gist.github.com/${cfg.gistId}`} target="_blank" rel="noreferrer">{cfg.gistId.slice(0, 8)}…</a></>}
      </p>
      <p><button className="link danger" onClick={disconnect}>Отключить синхронизацию на этом устройстве</button></p>
    </section>
  );
}
