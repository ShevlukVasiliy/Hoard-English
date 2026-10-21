import type { LessonL10n } from "../index";

// B2–C1: la teoría ya está en inglés; aquí van las trampas para hispanohablantes
// y las historias en inglés con paralelos del español en lugar del ruso.
export const high: Record<string, LessonL10n> = {
  "past-perfect": {
    theory: [{}, { trap: "El español tiene pluscuamperfecto («había salido»), pero en la conversación a menudo se usa el indefinido: «Cuando llegué, ya salió». En inglés, si al contar retrocedes en el tiempo, hace falta had: When I arrived, she had already left." }, {}],
  },
  "reported-speech": {
    theory: [{ trap: "El español también cambia los tiempos («Dijo que estaba cansado»), pero en la conversación es frecuente no hacerlo: «Dijo que está cansado». En inglés el cambio es la norma: He said he was tired. No se cambia si lo dicho sigue siendo verdad: He said the Earth is round." }, {}],
  },
  "conditionals-3-mixed": {
    theory: [{ trap: "En español se oye «si lo habría sabido», y eso lleva a «If I would have known». En inglés, en la parte con if, solo had + V3: If I had known, I would have come." }, {}, {}],
  },
  "modals-deduction": {
    theory: [{ trap: "«Debe de estar en casa» (deducción) → He must be at home. Pero lo contrario no es mustn't, sino can't: «No puede estar en casa» → He can't be at home. mustn't significa «está prohibido»." }, {}, {}],
  },
  "wish-if-only": {
    theory: [
      {
        trap: "En español «ojalá» y «me gustaría que» llevan subjuntivo («ojalá supiera»), y el inglés hace algo parecido con un pasado: I wish I knew, no «I wish I know». Para el pasado, had + V3: I wish I had studied, como «ojalá hubiera estudiado».",
        examples: ["Ojalá hablara japonés.", undefined],
      },
      {},
    ],
    story: {
      long: "Why `I wish I were` and not `I wish I was`? Because `were` here is a relic of the old English subjunctive — a set of verb forms for wishes, possibilities, commands and hypotheses. Spanish still has a fully living subjunctive for exactly these ideas: `ojalá fuera`, `si yo fuera`, `que te vaya bien`. Old English had one too, with special verb endings; modern English has kept only scraps of it.\n\nThe subjunctive has almost vanished from English, worn away along with most other endings. But it hides in fixed phrases that most people say without noticing anything strange.\n\n`God save the King` — why not `saves`? Because it isn't a statement, it's a wish: \"may God save the King\". `save` here is subjunctive — just like Spanish `Dios salve al rey`. The same goes for:\n- `Long live the Queen` — \"may she live long\";\n- `Heaven forbid!` — \"may heaven forbid it\";\n- `So be it` — \"let it be so\", Spanish `así sea`;\n- `Be that as it may` — \"however that may be\", Spanish `sea como sea`;\n- `Come what may` — \"whatever may come\", Spanish `pase lo que pase`;\n- `Suffice it to say` — \"let it be enough to say\".\n\nThese phrases look like grammar mistakes — a missing `-s`, a strange `be`, inverted word order — but they are centuries-old wishes frozen in place.\n\nThere is one area where the subjunctive is not dying but thriving: the so-called *mandative* subjunctive after verbs of demanding and recommending. `The doctor insisted that he stop smoking` — not `stops`. `It is essential that she be present` — not `is`. Spanish speakers will recognise the pattern at once: `insistió en que dejara de fumar`, `es esencial que esté presente`. This construction almost disappeared from British English in the 19th century, replaced by `should`: `It is essential that she should be present`. But it stayed alive in American English, and in the 20th century it travelled back across the Atlantic. Today it's common in British formal writing again — a rare case of a grammatical form returning from near-extinction.\n\nAnd `were` itself is slowly retreating. In everyday speech many people say `I wish I was taller` or `If I was you`, and dictionaries accept it as informal. But `If I were you` remains the strongest survivor of all: a whole sentence preserved because it's so useful for giving advice politely.",
    },
  },
  "inversion": {
    theory: [{ trap: "El orden es el de una pregunta: no «Never I have seen», sino Never have I seen. El español invierte con libertad («Nunca he visto…»), pero en inglés la inversión es obligatoria y necesita auxiliar: si no lo hay, se añade do/does/did: Seldom does he call." }, {}],
  },
  "cleft-sentences": {
    theory: [{ trap: "En español destacamos con el orden y con «fue… quien»: «La ventana la rompió Juan», «Fue Juan quien rompió la ventana». El inglés tiene un orden rígido, así que solo le queda la construcción: It was John who broke the window — y aquí sí se parece al español." }, {}],
  },
  "participle-clauses": {
    theory: [{ trap: "El participio o gerundio debe referirse al sujeto de la oración principal. «Paseando por el parque, me picó una abeja» es un error en los dos idiomas: no paseaba la abeja. Y cuidado con el gerundio de posterioridad: «Chocó, muriendo al instante» no se traduce con -ing." }, {}],
    story: {
      text: "Style guides love collecting examples like `Driving down the road, the trees looked beautiful` — as if the trees were driving. Editors call this a *dangling* (or *misplaced*) participle.\n\nIt's not a modern mistake. Writers have produced danglers for centuries, and grammarians have complained about them since at least the 18th century. Usually the meaning is clear from context, so readers don't notice — until the result is funny.\n\nSpanish has exactly the same trap with its gerunds: style guides, including the Real Academia Española, warn against sentences like «Paseando por el parque, me picó una abeja», where it's grammatically the bee that was walking in the park.",
      long: "Style guides love collecting examples like `Driving down the road, the trees looked beautiful` — as if the trees were driving. Editors call this a *dangling* (or *misplaced*) participle: the participle hangs in the air, looking for its subject, and grabs the wrong one.\n\nIt's not a modern mistake, and great writers make it too. In *Hamlet*, the Ghost of Hamlet's father tells how he was murdered: `'Tis given out that, sleeping in my orchard, / A serpent stung me.` Read strictly, it's the serpent who was sleeping. Nobody has ever misunderstood the line — the meaning is perfectly clear from context.\n\nGrammarians have complained about danglers since at least the 18th century. Usually the meaning is obvious, so readers don't notice. The trouble starts when the result is funny:\n- `Being in a dilapidated condition, I was able to buy the house very cheaply.` (Was I dilapidated?)\n- `Having eaten lunch, the bus left for the museum.`\n- `Covered in chocolate sauce, the children loved the pancakes.`\n\nWhy does English care? Because English has rigid word order and almost no endings, so the reader uses position to work out who does what. The participle clause has no subject of its own, so it borrows the subject of the main clause. If that subject is wrong, the sentence says something absurd — even if the writer meant something sensible.\n\nSpanish has exactly the same trap with its *gerundio*, and Spanish style guides are full of warnings about it. The Real Academia Española's grammar discusses gerunds whose implied subject doesn't match the main clause, and newspaper style books collect examples like «Paseando por el parque, me picó una abeja» — grammatically, the bee was out for a walk. Spanish teachers add a second, specifically Spanish worry: the *gerundio de posterioridad*, as in «Chocó contra un árbol, muriendo en el acto», where the gerund describes something that happened afterwards. English has no such use of `-ing`: `He crashed into a tree and died instantly`.\n\nSome dangling participles have become completely acceptable, because they're understood as fixed expressions: `Generally speaking, the weather is good.` `Considering the price, it's a good car.` `Judging by his accent, he's from Scotland.` `Given the circumstances, we did well.` In these phrases, the implied subject is \"anyone, people in general\", and nobody objects. Spanish works the same way: «Hablando en general», «Considerando el precio», «Dadas las circunstancias».",
    },
  },
  "future-perfect-continuous": {
    theory: [{ trap: "El español usa a menudo el presente o el futuro simple: «Mañana a las 10 trabajo», «trabajaré». Si se trata de un proceso en un momento concreto, hace falta will be working: Tomorrow at 10 I'll be working — como «estaré trabajando»." }, {}],
  },
  "linking-words": {
    theory: [{ trap: "Ni «despite of» ni «although + sustantivo». «A pesar de que» es despite the fact that o simplemente although; «a pesar de» + sustantivo es despite / in spite of, sin of después de despite." }, {}],
  },
  "emphasis": {
    theory: [{ trap: "El español refuerza con «sí», «claro que», «de verdad»: «¡Sí que te lo dije!», «Yo sí que lo entiendo». En inglés eso suele hacerlo do: I did tell you!, I do understand." }, {}],
  },
};
