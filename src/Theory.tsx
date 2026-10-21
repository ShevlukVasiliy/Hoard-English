import type { TheoryBlock } from "../shared/types";
import { Inline, Markup } from "./Markup";

export function Theory({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <section key={i} className="theory reading">
          {b.title && <h2>{b.title}</h2>}
          <Markup text={b.text} />
          {b.examples && (
            <ul className="examples">
              {b.examples.map((e, j) => (
                <li key={j}>
                  <span className="en"><Inline text={e.en} /></span>
                  {e.ru && <span className="ru"><Inline text={e.ru} /></span>}
                </li>
              ))}
            </ul>
          )}
          {b.trap && (
            <aside className="trap">
              <strong>Ловушка</strong>
              <Markup text={b.trap} />
            </aside>
          )}
        </section>
      ))}
    </>
  );
}
