import { applyContentLang } from "../lessons/l10n";
import { de } from "./de";
import { es } from "./es";
import { lang, setCurrentLang, type Lang } from "./lang";
import { pl } from "./pl";
import { ru, type Dict } from "./ru";

export { detectLang, fmtDate, fmtDateTime, isLang, lang, LANGS, plural, type Lang } from "./lang";
export type { Dict } from "./ru";

const DICTS: Record<Lang, Dict> = { ru, es, de, pl };

// Строки текущего языка. Live binding: после setLang импортёры видят новый словарь.
export let T: Dict = ru;

// Меняет язык интерфейса и контента уроков. Вызывается до рендера экранов.
export function setLang(l: Lang) {
  if (l === lang() && T === DICTS[l]) return;
  setCurrentLang(l);
  T = DICTS[l];
  applyContentLang(l);
  if (typeof document !== "undefined") document.documentElement.lang = l;
}
