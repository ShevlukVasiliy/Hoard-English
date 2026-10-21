import { Fragment, type ReactNode } from "react";

// **жирный**, `конструкция`, *курсив*; пустая строка — новый абзац, перенос — <br>, «- » — пункт списка.
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**") && p.length > 4) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`") && p.length > 2) return <code key={i}>{p.slice(1, -1)}</code>;
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

// Строки, начинающиеся с «- », собираются в список.
export function Markup({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).flatMap((para, i) => {
        const out: ReactNode[] = [];
        let lines: string[] = [];
        let items: string[] = [];
        const flushLines = () => {
          if (lines.length) out.push(
            <p key={`${i}-p${out.length}`}>
              {lines.map((line, j) => <Fragment key={j}>{j > 0 && <br />}{inline(line)}</Fragment>)}
            </p>,
          );
          lines = [];
        };
        const flushItems = () => {
          if (items.length) out.push(<ul key={`${i}-u${out.length}`} className="md-list">{items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>);
          items = [];
        };
        for (const line of para.split("\n")) {
          if (/^- /.test(line)) { flushLines(); items.push(line.slice(2)); }
          else { flushItems(); lines.push(line); }
        }
        flushLines();
        flushItems();
        return out;
      })}
    </>
  );
}

export function Inline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}
