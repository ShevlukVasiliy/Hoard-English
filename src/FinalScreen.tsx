import { T } from "../shared/i18n";
import { BLOCKS } from "../shared/lessons";
import { blockStatus } from "../shared/stats";
import { blitzBest, BLITZ_SIZE } from "../shared/tests";
import { BLOCK_PASS_RATIO, type TestKind } from "../shared/types";
import { useApp } from "./state";

// Финал блока: три формата, ничего не блокируется.
export function FinalScreen({ blockId }: { blockId: string }) {
  const { progress: p, go } = useApp();
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block) return null;
  const s = blockStatus(p, block);
  const best = (kind: TestKind) =>
    p.tests.filter((t) => t.kind === kind && t.blockId === blockId).sort((a, b) => b.correct / b.total - a.correct / a.total)[0];
  const control = best("block");
  const traps = best("traps");
  const blitz = blitzBest(p, blockId);
  const passed = (t?: { correct: number; total: number }) => !!t && t.correct / t.total >= BLOCK_PASS_RATIO;

  return (
    <article>
      <p className="label">{T.final.label}</p>
      <h1>{block.title}</h1>
      <p className="muted">
        {s.ready ? T.final.ready : T.final.notReady(s.done, s.total)}
      </p>

      <ul className="formats">
        <li>
          <div>
            <h3>{T.final.control} {passed(control) && <span className="mark">✓</span>}</h3>
            <p className="muted">{T.final.controlHint(Math.round(BLOCK_PASS_RATIO * 100))}</p>
            {control && <p className="small muted">{T.final.best(control.correct, control.total)}</p>}
          </div>
          <button onClick={() => go({ name: "test", kind: "block", blockId })}>{T.final.start}</button>
        </li>
        <li>
          <div>
            <h3>{T.final.traps} {passed(traps) && <span className="mark">✓</span>}</h3>
            <p className="muted">{T.final.trapsHint}</p>
            {traps && <p className="small muted">{T.final.best(traps.correct, traps.total)}</p>}
          </div>
          <button className="ghost" onClick={() => go({ name: "test", kind: "traps", blockId })}>{T.final.start}</button>
        </li>
        <li>
          <div>
            <h3>{T.final.blitz}</h3>
            <p className="muted">{T.final.blitzHint(BLITZ_SIZE)}</p>
            {blitz && <p className="small gilt">{T.final.record(blitz.correct, blitz.total)}</p>}
          </div>
          <button className="ghost" onClick={() => go({ name: "blitz", blockId })}>{T.final.start}</button>
        </li>
      </ul>
    </article>
  );
}
