import { useState } from "react";
import { fmtDateTime, T } from "../shared/i18n";
import { pairCode, readPairCode } from "../shared/sync";
import { useApp } from "./state";
import { inTauri } from "./storage";

const TOKEN_URL = "https://github.com/settings/tokens/new?scopes=gist&description=Hoard";

function statusText(s: ReturnType<typeof useApp>["sync"]["status"], lastSync?: string): string {
  if (s.state === "syncing") return T.sync.syncing;
  if (s.state === "error") return T.sync.error(s.message);
  if (s.state === "offline") return `${T.sync.offline}${lastSync ? T.sync.last(fmtDateTime(lastSync)) : ""}`;
  if (lastSync) return T.sync.done(fmtDateTime(lastSync));
  return T.sync.never;
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
    if (!c) return toast(T.sync.badCode);
    sync.setConfig({ ...cfg, token: c.token, gistId: c.gistId, password: c.password, lastSync: undefined });
    setCode("");
  };

  const copyCode = async () => {
    if (!cfg.token || !cfg.gistId) return;
    const text = pairCode({ token: cfg.token, gistId: cfg.gistId, password: cfg.password });
    try {
      await navigator.clipboard.writeText(text);
      toast(T.sync.copied);
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
      <h2>{T.sync.title}</h2>
      <p className="muted">{T.sync.intro}</p>

      <h3>{T.sync.haveCode}</h3>
      <label className="field">
        {T.sync.code}
        <input value={code} placeholder="hoard:…" autoCapitalize="off" autoCorrect="off" spellCheck={false} onChange={(e) => setCode(e.target.value)} />
      </label>
      <div className="row"><button disabled={!code.trim()} onClick={join}>{T.sync.connect}</button></div>

      <h3>{T.sync.first}</h3>
      <ol className="small">
        <li><a href={TOKEN_URL} target="_blank" rel="noreferrer">{T.sync.step1a}</a> {T.sync.step1b} <code>gist</code>.</li>
        <li>{T.sync.step2}</li>
      </ol>
      <label className="field">
        {T.sync.token}
        <input type="password" value={token} placeholder="ghp_…" autoComplete="off" onChange={(e) => setToken(e.target.value)} />
      </label>
      <label className="field">
        {T.sync.password} <span className="muted small">{T.sync.passwordHint}</span>
        <input type="password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div className="row"><button disabled={!token.trim()} onClick={connect}>{T.sync.connect}</button></div>
    </section>
  );

  return (
    <section>
      <h2>{T.sync.title}</h2>
      <p className="muted">
        {statusText(sync.status, cfg.lastSync)}
        {cfg.password ? T.sync.encrypted : ""}
      </p>
      <div className="row">
        <button disabled={sync.status.state === "syncing"} onClick={() => { sync.run().catch(() => {}); }}>{T.sync.run}</button>
        {cfg.gistId && <button className="ghost" onClick={copyCode}>{inTauri ? T.sync.codeIphone : T.sync.codeOther}</button>}
      </div>
      {shown && (
        <label className="field">
          {T.sync.copyManually}
          <textarea readOnly rows={3} value={shown} onFocus={(e) => e.currentTarget.select()} />
        </label>
      )}
      <p className="muted small">
        {T.sync.warning}
        {cfg.gistId && <> {T.sync.gist} <a href={`https://gist.github.com/${cfg.gistId}`} target="_blank" rel="noreferrer">{cfg.gistId.slice(0, 8)}…</a></>}
      </p>
      <p><button className="link danger" onClick={disconnect}>{T.sync.disconnect}</button></p>
    </section>
  );
}
