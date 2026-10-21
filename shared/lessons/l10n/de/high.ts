import type { LessonL10n } from "../index";

// B2–C1: Die Theorie ist schon auf Englisch; hier stehen die Fallen für Deutschsprachige
// und die englischen Geschichten mit deutschen statt russischen Parallelen.
export const high: Record<string, LessonL10n> = {
  "past-perfect": {
    theory: [{}, { trap: "Das Deutsche hat das Plusquamperfekt („ich hatte gegessen“), benutzt es im Gespräch aber selten. Im Englischen musst du es setzen, wenn du in der Erzählung in der Zeit zurückspringst: When I arrived, she had already left." }, {}],
  },
  "reported-speech": {
    theory: [{ trap: "Im Deutschen markiert man indirekte Rede mit dem Konjunktiv I: „Er sagte, er sei müde.“ Das Englische hat keinen Konjunktiv dafür – es verschiebt die Zeit: He said he was tired, nicht „He said he is tired“ oder „he be tired“. Nicht verschoben wird, wenn das Gesagte noch gilt: He said the Earth is round." }, {}],
  },
  "conditionals-3-mixed": {
    theory: [{ trap: "Im Deutschen steht „hätte“ in beiden Teilen: „Wenn ich es gewusst hätte, wäre ich gekommen.“ Im Englischen steht im if-Teil nur had + V3, kein would: If I had known, I would have come – nicht „If I would have known“." }, {}, {}],
  },
  "modals-deduction": {
    theory: [{ trap: "„Er muss zu Hause sein“ (Vermutung) → He must be at home. Das Gegenteil ist aber nicht mustn't, sondern can't: „Er kann nicht zu Hause sein“ → He can't be at home. mustn't heißt „darf nicht“." }, {}, {}],
  },
  "wish-if-only": {
    theory: [
      {
        trap: "„Ich wünschte, ich wüsste es“ steht im Deutschen im Konjunktiv II – und das Englische macht fast dasselbe mit der Vergangenheit: I wish I knew, nicht „I wish I know“. Für die Vergangenheit had + V3: I wish I had studied – „Ich wünschte, ich hätte gelernt.“",
        examples: ["Schade, dass ich kein Japanisch spreche.", undefined],
      },
      {},
    ],
    story: {
      long: "Why `I wish I were` and not `I wish I was`? Because `were` here is a relic of the old English subjunctive — a set of verb forms for wishes, possibilities, commands and hypotheses. German has kept this system alive as the *Konjunktiv*: `ich wünschte, ich wäre`, `wenn ich reich wäre`, `er sagte, er sei müde`. English `were` and German `wäre` are in fact relatives — both go back to the same Germanic subjunctive form of the verb \"to be\".\n\nThe subjunctive has almost vanished from English, worn away along with most other endings. But it hides in fixed phrases that most people say without noticing anything strange.\n\n`God save the King` — why not `saves`? Because it isn't a statement, it's a wish: \"may God save the King\". `save` here is subjunctive — German still says `Gott schütze den König` with exactly the same kind of form. The same goes for:\n- `Long live the Queen` — \"may she live long\", German `Es lebe die Königin`;\n- `Heaven forbid!` — \"may heaven forbid it\", German `Gott bewahre!`;\n- `So be it` — \"let it be so\", German `So sei es`;\n- `Be that as it may` — \"however that may be\", German `Wie dem auch sei`;\n- `Come what may` — \"whatever may come\", German `Komme, was wolle`;\n- `Suffice it to say` — \"let it be enough to say\".\n\nThese phrases look like grammar mistakes — a missing `-s`, a strange `be`, inverted word order — but they are centuries-old wishes frozen in place.\n\nThere is one area where the subjunctive is not dying but thriving: the so-called *mandative* subjunctive after verbs of demanding and recommending. `The doctor insisted that he stop smoking` — not `stops`. `It is essential that she be present` — not `is`. This construction almost disappeared from British English in the 19th century, replaced by `should`: `It is essential that she should be present`. But it stayed alive in American English, and in the 20th century it travelled back across the Atlantic. Today it's common in British formal writing again — a rare case of a grammatical form returning from near-extinction.\n\nAnd `were` itself is slowly retreating. In everyday speech many people say `I wish I was taller` or `If I was you`, and dictionaries accept it as informal. But `If I were you` remains the strongest survivor of all: a whole sentence preserved because it's so useful for giving advice politely.",
    },
  },
  "inversion": {
    theory: [{ trap: "Im Deutschen ist Inversion nach einem Adverb normal: „Nie habe ich so etwas gesehen.“ Im Englischen nur nach negativen und einschränkenden Wörtern – und dann wie in einer Frage, mit Hilfsverb: Never have I seen, Seldom does he call. Nach normalen Adverbien keine Inversion: Yesterday I saw him, nicht „Yesterday saw I him“." }, {}],
  },
  "cleft-sentences": {
    theory: [{ trap: "Im Deutschen hebt man durch Wortstellung hervor: „Das Fenster hat Hans kaputt gemacht.“ Im Englischen ist die Wortstellung fest, deshalb braucht man eine Konstruktion: It was John who broke the window – wie das deutsche „Es war Hans, der…“." }, {}],
  },
  "participle-clauses": {
    theory: [{ trap: "Das Partizip muss sich auf das Subjekt des Hauptsatzes beziehen. „Im Garten sitzend, fiel mir ein Apfel auf den Kopf“ ist in beiden Sprachen ein Fehler: Nicht der Apfel saß im Garten." }, {}],
    story: {
      text: "Style guides love collecting examples like `Driving down the road, the trees looked beautiful` — as if the trees were driving. Editors call this a *dangling* (or *misplaced*) participle.\n\nIt's not a modern mistake. Writers have produced danglers for centuries, and grammarians have complained about them since at least the 18th century. Usually the meaning is clear from context, so readers don't notice — until the result is funny.\n\nGerman has the same trap with its participial phrases: in a sentence like „Im Garten sitzend, fiel mir ein Apfel auf den Kopf“, it's grammatically the apple that was sitting in the garden.",
      long: "Style guides love collecting examples like `Driving down the road, the trees looked beautiful` — as if the trees were driving. Editors call this a *dangling* (or *misplaced*) participle: the participle hangs in the air, looking for its subject, and grabs the wrong one.\n\nIt's not a modern mistake, and great writers make it too. In *Hamlet*, the Ghost of Hamlet's father tells how he was murdered: `'Tis given out that, sleeping in my orchard, / A serpent stung me.` Read strictly, it's the serpent who was sleeping. Nobody has ever misunderstood the line — the meaning is perfectly clear from context.\n\nGrammarians have complained about danglers since at least the 18th century. Usually the meaning is obvious, so readers don't notice. The trouble starts when the result is funny:\n- `Being in a dilapidated condition, I was able to buy the house very cheaply.` (Was I dilapidated?)\n- `Having eaten lunch, the bus left for the museum.`\n- `Covered in chocolate sauce, the children loved the pancakes.`\n\nWhy does English care? Because English has rigid word order and almost no endings, so the reader uses position to work out who does what. The participle clause has no subject of its own, so it borrows the subject of the main clause. If that subject is wrong, the sentence says something absurd — even if the writer meant something sensible.\n\nGerman has exactly the same rule for its participial phrases, and German style guides warn about it too. „Im Garten sitzend, fiel mir ein Apfel auf den Kopf“ — grammatically, the apple was sitting in the garden; correct would be „Als ich im Garten saß, fiel mir ein Apfel auf den Kopf“. German speakers use such constructions less often in speech than English speakers, which is one reason why the English `-ing` clause can feel tricky: it appears everywhere, and its subject is always borrowed.\n\nSome dangling participles have become completely acceptable, because they're understood as fixed expressions: `Generally speaking, the weather is good.` `Considering the price, it's a good car.` `Judging by his accent, he's from Scotland.` `Given the circumstances, we did well.` In these phrases, the implied subject is \"anyone, people in general\", and nobody objects. German has its own fixed versions: „Allgemein gesprochen“, „Genau genommen“, „Ehrlich gesagt“.",
    },
  },
  "future-perfect-continuous": {
    theory: [{ trap: "Im Deutschen reicht meist das Präsens: „Morgen um 10 arbeite ich.“ Im Englischen braucht ein Vorgang zu einem bestimmten Zeitpunkt in der Zukunft will be working: Tomorrow at 10 I'll be working – nicht „I work“ und nicht einfach „I will work“." }, {}],
  },
  "linking-words": {
    theory: [{ trap: "„trotz“ ist despite oder in spite of – ohne of nach despite: nicht „despite of“. „obwohl“ ist although + Satz, nicht + Nomen. Und „trotzdem“ am Satzanfang heißt nevertheless oder still, nicht „despite“." }, {}],
  },
  "emphasis": {
    theory: [{ trap: "Deutsche Modalpartikeln wie „doch“, „ja“, „wirklich“ gibt es im Englischen nicht – oft übernimmt do die Betonung: „Ich habe es dir doch gesagt!“ → I did tell you! „Ich verstehe dich ja“ → I do understand you." }, {}],
  },
};
