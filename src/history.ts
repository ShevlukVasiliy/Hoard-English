import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { Route } from "./state";

// История переходов внутри приложения: стек экранов, указатель и прокрутка каждого.
type Entry = { route: Route; scroll: number };
type Stack = { entries: Entry[]; index: number };

const LIMIT = 100;

export function useHistory(initial: Route) {
  const [stack, setStack] = useState<Stack>({ entries: [{ route: initial, scroll: 0 }], index: 0 });
  // прокрутка, которую нужно восстановить после перехода
  const restore = useRef<number | null>(null);

  const remember = (s: Stack): Entry[] =>
    s.entries.map((e, i) => (i === s.index ? { ...e, scroll: window.scrollY } : e));

  const go = useCallback((route: Route) => {
    setStack((s) => {
      const cur = s.entries[s.index]!.route;
      if (JSON.stringify(cur) === JSON.stringify(route)) return s;
      const entries = [...remember(s).slice(0, s.index + 1), { route, scroll: 0 }].slice(-LIMIT);
      restore.current = 0;
      return { entries, index: entries.length - 1 };
    });
  }, []);

  const move = useCallback((delta: number) => {
    setStack((s) => {
      const index = s.index + delta;
      if (index < 0 || index >= s.entries.length) return s;
      const entries = remember(s);
      restore.current = entries[index]!.scroll;
      return { entries, index };
    });
  }, []);

  useLayoutEffect(() => {
    if (restore.current === null) return;
    const y = restore.current;
    restore.current = null;
    window.scrollTo(0, y);
  }, [stack]);

  return {
    route: stack.entries[stack.index]!.route,
    go,
    back: useCallback(() => move(-1), [move]),
    forward: useCallback(() => move(1), [move]),
    canBack: stack.index > 0,
    canForward: stack.index < stack.entries.length - 1,
  };
}
