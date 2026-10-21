import type { LessonL10n } from "../index";

// B2–C1: teoria jest już po angielsku; tu są pułapki dla Polaków
// i angielskie historie z polskimi zamiast rosyjskich paralel.
export const high: Record<string, LessonL10n> = {
  "past-perfect": {
    theory: [{}, { trap: "We współczesnym polskim nie ma czasu zaprzeszłego („był poszedł” to archaizm), więc kolejność zdarzeń się gubi. Jeśli w opowieści cofasz się w czasie – potrzebne jest had: When I arrived, she had already left." }, {}],
  },
  "reported-speech": {
    theory: [{ trap: "W polskim czas się nie przesuwa: „Powiedział, że jest zmęczony”. W angielskim przesunięcie to norma: He said he was tired. Nie przesuwa się, jeśli to, co powiedziano, wciąż jest prawdą: He said the Earth is round." }, {}],
  },
  "conditionals-3-mixed": {
    theory: [{ trap: "Polskie „gdybym wiedział, przyszedłbym” nie rozróżnia teraźniejszości i przeszłości – to samo zdanie może znaczyć „teraz” i „wtedy”. Po angielsku o przeszłości: If I had known, I would have come. I nie „If I would have known” – w części z if tylko had + V3." }, {}, {}],
  },
  "modals-deduction": {
    theory: [{ trap: "„Musi być w domu” (przypuszczenie) → He must be at home. Ale przeciwieństwo to nie mustn't, tylko can't: „Nie może być w domu” → He can't be at home. mustn't znaczy „nie wolno”." }, {}, {}],
  },
  "wish-if-only": {
    theory: [
      {
        trap: "Polskie „szkoda, że” i „żałuję, że” opisują rzeczywistość: „Szkoda, że nie wiem”. Po wish czas przesuwa się w tył: I wish I knew, a nie „I wish I know”. Bliższe jest polskie „chciałbym, żebym wiedział” albo „gdybym tylko wiedział”.",
        examples: ["Szkoda, że nie mówię po japońsku.", undefined],
      },
      {},
    ],
    story: {
      long: "Why `I wish I were` and not `I wish I was`? Because `were` here is a relic of the old English subjunctive — a set of verb forms for wishes, possibilities, commands and hypotheses. Polish expresses the same ideas with the particle `by` and the imperative: `gdybym był`, `oby się udało`, `niech żyje`. Old English had special verb endings for them.\n\nThe subjunctive has almost vanished from English, worn away along with most other endings. But it hides in fixed phrases that most people say without noticing anything strange.\n\n`God save the King` — why not `saves`? Because it isn't a statement, it's a wish: \"may God save the King\", Polish `Boże, chroń króla`. `save` here is subjunctive. The same goes for:\n- `Long live the Queen` — \"may she live long\", Polish `Niech żyje królowa`;\n- `Heaven forbid!` — \"may heaven forbid it\", Polish `Broń Boże!`;\n- `So be it` — \"let it be so\", Polish `Niech tak będzie`;\n- `Be that as it may` — \"however that may be\";\n- `Come what may` — \"whatever may come\", Polish `Niech się dzieje, co chce`;\n- `Suffice it to say` — \"let it be enough to say\".\n\nThese phrases look like grammar mistakes — a missing `-s`, a strange `be`, inverted word order — but they are centuries-old wishes frozen in place.\n\nThere is one area where the subjunctive is not dying but thriving: the so-called *mandative* subjunctive after verbs of demanding and recommending. `The doctor insisted that he stop smoking` — not `stops`. `It is essential that she be present` — not `is`. Polish uses `żeby` in the same place: `lekarz nalegał, żeby rzucił palenie`. This construction almost disappeared from British English in the 19th century, replaced by `should`: `It is essential that she should be present`. But it stayed alive in American English, and in the 20th century it travelled back across the Atlantic. Today it's common in British formal writing again — a rare case of a grammatical form returning from near-extinction.\n\nAnd `were` itself is slowly retreating. In everyday speech many people say `I wish I was taller` or `If I was you`, and dictionaries accept it as informal. But `If I were you` remains the strongest survivor of all: a whole sentence preserved because it's so useful for giving advice politely.",
    },
  },
  "inversion": {
    theory: [{ trap: "Szyk jak w pytaniu: nie „Never I have seen”, tylko Never have I seen. Polski szyk jest swobodny („Nigdy nie widziałem…”), ale w angielskim inwersja wymaga czasownika posiłkowego – jeśli go nie ma, dodajemy do/does/did: Seldom does he call." }, {}],
  },
  "cleft-sentences": {
    theory: [{ trap: "Po polsku wyróżniamy intonacją i szykiem: „Okno stłukł Janek”. W angielskim szyk jest sztywny, więc potrzebna jest konstrukcja It was John who… – podobnie jak polskie „To Janek stłukł okno”." }, {}],
  },
  "participle-clauses": {
    theory: [{ trap: "Imiesłów musi odnosić się do podmiotu zdania głównego. „Wchodząc do pokoju, zgasło światło” – to błąd i po polsku, i po angielsku: światło nie wchodziło do pokoju." }, {}],
    story: {
      text: "Style guides love collecting examples like `Driving down the road, the trees looked beautiful` — as if the trees were driving. Editors call this a *dangling* (or *misplaced*) participle.\n\nIt's not a modern mistake. Writers have produced danglers for centuries, and grammarians have complained about them since at least the 18th century. Usually the meaning is clear from context, so readers don't notice — until the result is funny.\n\nPolish has exactly the same trap, and Polish schools are famous for drilling it: a *imiesłowowy równoważnik zdania* must share the subject of the main clause. «Wchodząc do pokoju, zgasło światło» — \"Entering the room, the light went out\" — is the classic schoolbook error.",
      long: "Style guides love collecting examples like `Driving down the road, the trees looked beautiful` — as if the trees were driving. Editors call this a *dangling* (or *misplaced*) participle: the participle hangs in the air, looking for its subject, and grabs the wrong one.\n\nIt's not a modern mistake, and great writers make it too. In *Hamlet*, the Ghost of Hamlet's father tells how he was murdered: `'Tis given out that, sleeping in my orchard, / A serpent stung me.` Read strictly, it's the serpent who was sleeping. Nobody has ever misunderstood the line — the meaning is perfectly clear from context.\n\nGrammarians have complained about danglers since at least the 18th century. Usually the meaning is obvious, so readers don't notice. The trouble starts when the result is funny:\n- `Being in a dilapidated condition, I was able to buy the house very cheaply.` (Was I dilapidated?)\n- `Having eaten lunch, the bus left for the museum.`\n- `Covered in chocolate sauce, the children loved the pancakes.`\n\nWhy does English care? Because English has rigid word order and almost no endings, so the reader uses position to work out who does what. The participle clause has no subject of its own, so it borrows the subject of the main clause. If that subject is wrong, the sentence says something absurd — even if the writer meant something sensible.\n\nPolish has exactly the same trap with its adverbial participles, and every Polish schoolchild learns about it. The rule for the *imiesłowowy równoważnik zdania* — a phrase like `wchodząc` (\"entering\") or `przeczytawszy` (\"having read\") — is strict: its implied subject must be the subject of the main clause. Teachers love quoting sentences like «Wchodząc do pokoju, zgasło światło» — \"Entering the room, the light went out\" — or «Czytając książkę, zadzwonił telefon» — \"Reading a book, the phone rang\". In both, grammatically, it's the light and the phone that are doing the entering and the reading.\n\nSome dangling participles have become completely acceptable, because they're understood as fixed expressions: `Generally speaking, the weather is good.` `Considering the price, it's a good car.` `Judging by his accent, he's from Scotland.` `Given the circumstances, we did well.` In these phrases, the implied subject is \"anyone, people in general\", and nobody objects. Polish has its own fixed phrases of this kind too: `ogólnie mówiąc`, `szczerze mówiąc`, `biorąc pod uwagę`.",
    },
  },
  "future-perfect-continuous": {
    theory: [{ trap: "W polskim jest jedno „będę pracować”, a aspekt robi resztę. Jeśli chodzi o proces w konkretnym momencie przyszłości – will be working, a nie po prostu will work: Tomorrow at 10 I'll be working." }, {}],
  },
  "linking-words": {
    theory: [{ trap: "Nie „despite of” i nie „although + rzeczownik”. „Mimo że” – despite the fact that albo po prostu although; „mimo” + rzeczownik – despite / in spite of, bez of po despite." }, {}],
  },
  "emphasis": {
    theory: [{ trap: "Polskie „przecież”, „naprawdę”, „właśnie” często oddaje się przez do: „Przecież ci mówiłem!” – I did tell you! „Naprawdę rozumiem” – I do understand." }, {}],
  },
};
