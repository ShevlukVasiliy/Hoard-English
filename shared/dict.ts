// Встроенный словарь: неправильные глаголы и признаки частей речи.
// Без внешних данных; уровни и части речи из CEFR-J можно подключить позже.

// base, past, participle
export const IRREGULAR: [string, string, string][] = [
  ["arise", "arose", "arisen"], ["be", "was", "been"], ["bear", "bore", "borne"], ["beat", "beat", "beaten"],
  ["become", "became", "become"], ["begin", "began", "begun"], ["bend", "bent", "bent"], ["bet", "bet", "bet"],
  ["bind", "bound", "bound"], ["bite", "bit", "bitten"], ["bleed", "bled", "bled"], ["blow", "blew", "blown"],
  ["break", "broke", "broken"], ["breed", "bred", "bred"], ["bring", "brought", "brought"], ["build", "built", "built"],
  ["burst", "burst", "burst"], ["buy", "bought", "bought"], ["cast", "cast", "cast"], ["catch", "caught", "caught"],
  ["choose", "chose", "chosen"], ["cling", "clung", "clung"], ["come", "came", "come"], ["cost", "cost", "cost"],
  ["creep", "crept", "crept"], ["cut", "cut", "cut"], ["deal", "dealt", "dealt"], ["dig", "dug", "dug"],
  ["do", "did", "done"], ["draw", "drew", "drawn"], ["drink", "drank", "drunk"], ["drive", "drove", "driven"],
  ["eat", "ate", "eaten"], ["fall", "fell", "fallen"], ["feed", "fed", "fed"], ["feel", "felt", "felt"],
  ["fight", "fought", "fought"], ["find", "found", "found"], ["flee", "fled", "fled"], ["fling", "flung", "flung"],
  ["fly", "flew", "flown"], ["forbid", "forbade", "forbidden"], ["forget", "forgot", "forgotten"], ["forgive", "forgave", "forgiven"],
  ["freeze", "froze", "frozen"], ["get", "got", "got"], ["give", "gave", "given"], ["go", "went", "gone"],
  ["grind", "ground", "ground"], ["grow", "grew", "grown"], ["hang", "hung", "hung"], ["have", "had", "had"],
  ["hear", "heard", "heard"], ["hide", "hid", "hidden"], ["hit", "hit", "hit"], ["hold", "held", "held"],
  ["hurt", "hurt", "hurt"], ["keep", "kept", "kept"], ["kneel", "knelt", "knelt"], ["know", "knew", "known"],
  ["lay", "laid", "laid"], ["lead", "led", "led"], ["lean", "leant", "leant"], ["leave", "left", "left"],
  ["lend", "lent", "lent"], ["let", "let", "let"], ["lie", "lay", "lain"], ["light", "lit", "lit"],
  ["lose", "lost", "lost"], ["make", "made", "made"], ["mean", "meant", "meant"], ["meet", "met", "met"],
  ["mislead", "misled", "misled"], ["overcome", "overcame", "overcome"], ["pay", "paid", "paid"], ["put", "put", "put"],
  ["quit", "quit", "quit"], ["read", "read", "read"], ["ride", "rode", "ridden"], ["ring", "rang", "rung"],
  ["rise", "rose", "risen"], ["run", "ran", "run"], ["say", "said", "said"], ["see", "saw", "seen"],
  ["seek", "sought", "sought"], ["sell", "sold", "sold"], ["send", "sent", "sent"], ["set", "set", "set"],
  ["shake", "shook", "shaken"], ["shine", "shone", "shone"], ["shoot", "shot", "shot"], ["show", "showed", "shown"],
  ["shrink", "shrank", "shrunk"], ["shut", "shut", "shut"], ["sing", "sang", "sung"], ["sink", "sank", "sunk"],
  ["sit", "sat", "sat"], ["sleep", "slept", "slept"], ["slide", "slid", "slid"], ["speak", "spoke", "spoken"],
  ["spend", "spent", "spent"], ["spin", "spun", "spun"], ["split", "split", "split"], ["spread", "spread", "spread"],
  ["spring", "sprang", "sprung"], ["stand", "stood", "stood"], ["steal", "stole", "stolen"], ["stick", "stuck", "stuck"],
  ["sting", "stung", "stung"], ["strike", "struck", "struck"], ["swear", "swore", "sworn"], ["sweep", "swept", "swept"],
  ["swim", "swam", "swum"], ["swing", "swung", "swung"], ["take", "took", "taken"], ["teach", "taught", "taught"],
  ["tear", "tore", "torn"], ["tell", "told", "told"], ["think", "thought", "thought"], ["throw", "threw", "thrown"],
  ["undergo", "underwent", "undergone"], ["understand", "understood", "understood"], ["undertake", "undertook", "undertaken"], ["upset", "upset", "upset"],
  ["wake", "woke", "woken"], ["wear", "wore", "worn"], ["weave", "wove", "woven"], ["win", "won", "won"],
  ["withdraw", "withdrew", "withdrawn"], ["wind", "wound", "wound"], ["write", "wrote", "written"],
];

const BY_FORM = new Map<string, [string, string, string]>();
for (const v of IRREGULAR) for (const f of v) if (!BY_FORM.has(f)) BY_FORM.set(f, v);

export const irregularByForm = (w: string) => BY_FORM.get(w.toLowerCase());
export const irregular = (base: string) => IRREGULAR.find((v) => v[0] === base.toLowerCase());

// Формы правильного глагола по правилам орфографии.
export function regularPast(base: string): string {
  const b = base.toLowerCase();
  if (b.endsWith("e")) return b + "d";
  if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + "ied";
  if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(b)) return b + b.at(-1) + "ed";
  return b + "ed";
}

export const verbForms = (base: string): [string, string, string] => irregular(base) ?? [base.toLowerCase(), regularPast(base), regularPast(base)];

// Частицы фразовых глаголов.
export const PARTICLES = new Set(["up", "out", "off", "down", "away", "back", "on", "in", "over", "through", "around", "apart", "along", "across", "into"]);

// Прилагательные: явный список частых + суффиксы. Возвращает сравнительную форму или null.
const SHORT_ADJ = new Set(["big", "small", "old", "young", "long", "short", "high", "low", "fast", "slow", "hot", "cold", "warm", "cool", "new", "rich", "poor", "cheap", "strong", "weak", "hard", "soft", "dark", "light", "bright", "deep", "wide", "thin", "thick", "clean", "kind", "quick", "quiet", "loud", "safe", "nice", "brave", "wise", "rare", "fine", "close", "late", "large", "strange", "tight", "loose", "rough", "smooth", "sharp", "harsh", "fair", "proud", "grand", "vast", "dull", "bold", "calm", "plain", "pure", "sweet", "fresh", "wild", "mild", "busy", "easy", "happy", "heavy", "early", "funny", "lucky", "pretty", "angry", "dirty", "noisy", "lazy", "tidy", "silly", "ugly", "healthy", "wealthy", "clever", "narrow", "simple", "gentle", "humble", "subtle"]);
const IRR_ADJ: Record<string, [string, string]> = { good: ["better", "best"], bad: ["worse", "worst"], far: ["further", "furthest"], little: ["less", "least"], many: ["more", "most"], much: ["more", "most"] };
const LONG_SUFFIX = /(ive|ous|ful|less|able|ible|ical|ish)$/;

// Русский перевод вида «обширный», «тугой, тесный» подсказывает, что слово — прилагательное.
// Весь перевод — прилагательные через запятую или слеш.
export const looksAdjectiveRu = (back: string) =>
  back.split(/[,/;]/).map((s) => s.trim()).filter(Boolean).every((p) => /^[а-яё-]+(ый|ий|ой)$/i.test(p));

// Слоги по группам гласных; немое -e на конце не считается.
export const syllables = (w: string) => (w.toLowerCase().replace(/(?<=[^aeiouy])e$/, "").match(/[aeiouy]+/g) ?? []).length || 1;

// Не прилагательные, хотя перевод может так выглядеть: причастия, наречия, служебные слова.
const NOT_ADJ = /(ed|en|ing|[^su]s)$|^(further|either|whenever|whatever|other|own|such)$/;

export function isAdjective(w: string): boolean {
  const b = w.toLowerCase();
  return b in IRR_ADJ || SHORT_ADJ.has(b) || (b.length > 5 && LONG_SUFFIX.test(b) && !b.endsWith("ment"));
}

export function comparative(adj: string, force: boolean | "known" = false): [string, string] | null {
  const b = adj.toLowerCase();
  if (IRR_ADJ[b]) return IRR_ADJ[b];
  if (SHORT_ADJ.has(b)) {
    if (/[^aeiou]y$/.test(b)) return [b.slice(0, -1) + "ier", b.slice(0, -1) + "iest"];
    if (["clever", "narrow", "simple", "gentle", "humble", "subtle"].includes(b))
      return b.endsWith("e") ? [b + "r", b + "st"] : [b + "er", b + "est"];
    if (b.endsWith("e")) return [b + "r", b + "st"];
    if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(b)) return [b + b.at(-1) + "er", b + b.at(-1) + "est"];
    return [b + "er", b + "est"];
  }
  // force = "known": часть речи подтверждена словарём, суффиксы не проверяем
  if (force === "known" || (force && !NOT_ADJ.test(b)) || isAdjective(b)) {
    const n = syllables(b);
    // двусложные на согласную + y: happy → happier
    if (n === 2 && /[^aeiou]y$/.test(b)) return [b.slice(0, -1) + "ier", b.slice(0, -1) + "iest"];
    if (n === 1) {
      if (/[^aeiou]y$/.test(b)) return [b.slice(0, -1) + "ier", b.slice(0, -1) + "iest"];
      if (b.endsWith("e")) return [b + "r", b + "st"];
      if (/^[^aeiou]*[aeiou][^aeiouwxy]$/.test(b)) return [b + b.at(-1) + "er", b + b.at(-1) + "est"];
      return [b + "er", b + "est"];
    }
    return [`more ${b}`, `most ${b}`];
  }
  return null;
}
