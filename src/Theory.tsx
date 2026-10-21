import { useEffect, useState } from "react";
import type { Depth, TheoryBlock } from "../shared/types";
import { Inline, Markup } from "./Markup";

// Окно достаточно широкое для полей с глоссами.
export function useWide() {
  const query = "(min-width: 960px)";
  const [wide, setWide] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const m = matchMedia(query);
    const on = () => setWide(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return wide;
}

function Gloss({ text, index, wide }: { text: string; index: number; wide: boolean }) {
  const body = <div data-part={`why:${index}`}><Markup text={text} /></div>;
  return wide ? (
    <aside className="gloss">
      <p className="gloss-title">Почему так?</p>
      {body}
    </aside>
  ) : (
    <details className="gloss">
      <summary className="gloss-title">Почему так?</summary>
      {body}
    </details>
  );
}

export function Theory({ blocks, depth }: { blocks: TheoryBlock[]; depth: Depth }) {
  const wide = useWide();
  return (
    <>
      {blocks.map((b, i) => (
        <div key={i} className="theory-row">
          <section className="theory reading" data-part={`theory:${i}`}>
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
            {depth === "long" && b.more && <div className="more"><Markup text={b.more} /></div>}
            {b.trap && (
              <aside className="trap">
                <strong>Ловушка для русскоговорящих</strong>
                <Markup text={b.trap} />
              </aside>
            )}
          </section>
          {b.why && <Gloss text={b.why} index={i} wide={wide} />}
        </div>
      ))}
    </>
  );
}
