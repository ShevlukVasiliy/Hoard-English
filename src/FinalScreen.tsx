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
      <p className="label">Финал блока</p>
      <h1>{block.title}</h1>
      <p className="muted">
        {s.ready ? "Все уроки блока пройдены." : `Пройдено уроков: ${s.done} из ${s.total}. Финал можно начать и сейчас.`}
      </p>

      <ul className="formats">
        <li>
          <div>
            <h3>Контрольная {passed(control) && <span className="mark">✓</span>}</h3>
            <p className="muted">15 вопросов по всем урокам блока, засчитывается от {Math.round(BLOCK_PASS_RATIO * 100)}%. Сданная контрольная закрывает блок.</p>
            {control && <p className="small muted">Лучший результат: {control.correct} из {control.total}</p>}
          </div>
          <button onClick={() => go({ name: "test", kind: "block", blockId })}>Начать</button>
        </li>
        <li>
          <div>
            <h3>Ловушки {passed(traps) && <span className="mark">✓</span>}</h3>
            <p className="muted">Похожие конструкции рядом и поиск ошибок. Сложнее контрольной.</p>
            {traps && <p className="small muted">Лучший результат: {traps.correct} из {traps.total}</p>}
          </div>
          <button className="ghost" onClick={() => go({ name: "test", kind: "traps", blockId })}>Начать</button>
        </li>
        <li>
          <div>
            <h3>Блиц по блоку</h3>
            <p className="muted">{BLITZ_SIZE} вопросов за 60 секунд.</p>
            {blitz && <p className="small gilt">Рекорд: {blitz.correct} из {blitz.total}</p>}
          </div>
          <button className="ghost" onClick={() => go({ name: "blitz", blockId })}>Начать</button>
        </li>
      </ul>
    </article>
  );
}
