import type { Exercise } from "../../../types";

// Nombres de bloques, instrucciones repetidas, explicaciones de las «trampas» y trampas propias para hispanohablantes.
export const blocks: Record<string, string> = {
  "basics": "Lo básico",
  "nouns": "Sustantivos",
  "verbs-basic": "Capacidad, pasado, comparaciones",
  "tenses-basic": "Presente y pasado",
  "future-articles": "Futuro y artículos",
  "conditionals-passive": "Condicionales y pasiva",
  "verb-patterns": "Formas del verbo",
  "linking": "Conectores y preguntas",
  "small-words": "Palabras pequeñas",
  "everyday-modals": "Obligación y exceso",
};

export const phrases: Record<string, string> = {
  "Вставь артикли": "Pon los artículos",
  "Добавь last year и измени время": "Añade last year y cambia el tiempo verbal",
  "Добавь хвостик": "Añade la coletilla (question tag)",
  "Задай вопрос с How long": "Haz una pregunta con How long",
  "Замени a car на a bus": "Cambia a car por a bus",
  "Замени in the morning на точное время (8 o'clock)": "Cambia in the morning por una hora exacta (8 o'clock)",
  "Замени much / many на a lot of": "Cambia much / many por a lot of",
  "Замени on Friday на next week": "Cambia on Friday por next week",
  "Перепиши в Past Simple (yesterday)": "Reescribe en Past Simple (yesterday)",
  "Перепиши в единственном числе": "Reescribe en singular",
  "Перепиши в пассиве": "Reescribe en pasiva",
  "Перепиши в превосходной степени (in the family)": "Reescribe en superlativo (in the family)",
  "Перепиши в прошлом": "Reescribe en pasado",
  "Перепиши вежливее с could": "Reescribe con más cortesía usando could",
  "Перепиши во множественном числе": "Reescribe en plural",
  "Перепиши во множественном числе (two)": "Reescribe en plural (two)",
  "Перепиши как план (going to)": "Reescribe como un plan (going to)",
  "Перепиши с 's": "Reescribe con 's",
  "Перепиши с a piece of": "Reescribe con a piece of",
  "Перепиши с already": "Reescribe con already",
  "Перепиши с be used to": "Reescribe con be used to",
  "Перепиши с both": "Reescribe con both",
  "Перепиши с don't have to": "Reescribe con don't have to",
  "Перепиши с have got": "Reescribe con have got",
  "Перепиши с hers / his / …": "Reescribe con hers / his / …",
  "Перепиши с mine / yours / …": "Reescribe con mine / yours / …",
  "Перепиши с neither … nor": "Reescribe con neither … nor",
  "Перепиши с none of": "Reescribe con none of",
  "Перепиши с not as … as": "Reescribe con not as … as",
  "Перепиши с promised + to": "Reescribe con promised + to",
  "Перепиши с should (совет)": "Reescribe con should (consejo)",
  "Перепиши с stopped + -ing": "Reescribe con stopped + -ing",
  "Перепиши с such": "Reescribe con such",
  "Перепиши с suggested + -ing": "Reescribe con suggested + -ing",
  "Перепиши с too": "Reescribe con too",
  "Перепиши с unless": "Reescribe con unless",
  "Перепиши с used to": "Reescribe con used to",
  "Перепиши со сравнительной степенью": "Reescribe con el comparativo",
  "Перепиши так, чтобы речь шла о том, что происходит сейчас (now)": "Reescribe para hablar de lo que pasa ahora (now)",
  "Перепиши, начав с Despite": "Reescribe empezando por Despite",
  "Перепиши, начав с Never": "Reescribe empezando por Never",
  "Перепиши, начав с What": "Reescribe empezando por What",
  "Перепиши, сделав акцент на длительности (for two hours)": "Reescribe destacando la duración (for two hours)",
  "Перескажи в косвенной речи": "Pásalo a estilo indirecto",
  "Сделай вопрос": "Haz una pregunta",
  "Сделай вопрос с How much / How many": "Haz una pregunta con How much / How many",
  "Сделай вопрос с do": "Haz una pregunta con do",
  "Сделай отрицание": "Haz una negación",
  "Сделай отрицание с have got": "Haz una negación con have got",
  "Сделай ситуацию воображаемой (Second Conditional)": "Haz la situación imaginaria (Second Conditional)",
  "Соедини в одно предложение через while": "Une en una sola oración con while",
  "Соедини через so … that": "Une con so … that",
  "Соедини через where": "Une con where",
  "Соедини через who": "Une con who",
  "Соедини через whose": "Une con whose",
  "два артикля через пробел": "dos artículos separados por un espacio",
  "два слова через пропуски: were … doing": "dos palabras separadas por un espacio: were … doing",
};

export const traps: Record<string, Record<string, string>> = {
  "basics": {
    t1: "milk es incontable → Is there.",
    t3: "En la respuesta corta afirmativa no se contrae.",
    t5: "Algo ya conocido se describe con it.",
    t6: "have breakfast es una acción: sin got.",
  },
  "nouns": { t5: "very few: muy pocos (contables)." },
  "tenses-basic": {
    t4: "Una cadena de hechos: Past Simple.",
    t6: "Un proceso en un momento del pasado.",
  },
  "future-articles": { t2: "Decisión en el momento de hablar: will." },
  "linking": { t2: "Complemento: el pronombre se puede omitir." },
};

// Errores típicos de hispanohablantes: calcos del español.
export const extraTraps: Record<string, Exercise[]> = {
  "basics": [
    { id: "es1", kind: "choice", prompt: "I ___ 25 years old.", options: ["have", "am", "has"], answer: 1, explain: "La edad va con be: I am 25. «Tengo 25 años» no se traduce con have." },
    { id: "es2", kind: "fix", prompt: "Is very cold today.", answers: ["It is very cold today.", "It's very cold today."], explain: "En inglés el sujeto es obligatorio: «Hace frío» → It's cold." },
    { id: "es3", kind: "choice", prompt: "I ___ hungry.", options: ["have", "am", "do"], answer: 1, explain: "«Tengo hambre» → I'm hungry. Igual: I'm cold, I'm thirsty, I'm afraid." },
  ],
  "nouns": [
    { id: "es1", kind: "fix", prompt: "I need some informations.", answers: ["I need some information.", "I need information."], explain: "information es incontable en inglés: nunca lleva -s." },
    { id: "es2", kind: "choice", prompt: "The people ___ very friendly here.", options: ["is", "are", "was"], answer: 1, explain: "«La gente es» va en singular, pero people en inglés es plural: people are." },
  ],
  "verbs-basic": [
    { id: "es1", kind: "fix", prompt: "She is more tall than me.", answers: ["She is taller than me.", "She's taller than me.", "She is taller than I am."], explain: "Adjetivos cortos: -er, no «more»: taller." },
  ],
  "tenses-basic": [
    { id: "es1", kind: "fix", prompt: "Where you live?", answers: ["Where do you live?"], explain: "En español basta la entonación; en inglés la pregunta necesita do." },
    { id: "es2", kind: "fix", prompt: "I don't know nothing.", answers: ["I don't know anything.", "I know nothing."], explain: "En inglés estándar no hay doble negación: «no sé nada» → I don't know anything." },
  ],
  "perfect": [
    { id: "es1", kind: "fix", prompt: "I live here since 2015.", answers: ["I have lived here since 2015.", "I've lived here since 2015.", "I have been living here since 2015.", "I've been living here since 2015."], explain: "«Vivo aquí desde 2015»: en inglés, algo que empezó en el pasado y sigue va en Present Perfect." },
  ],
  "future-articles": [
    { id: "es1", kind: "fix", prompt: "The life is beautiful.", answers: ["Life is beautiful."], explain: "Hablando en general, el inglés no pone artículo: «La vida es bella» → Life is beautiful." },
    { id: "es2", kind: "fix", prompt: "She is teacher.", answers: ["She is a teacher.", "She's a teacher."], explain: "Con profesiones el inglés sí pone a/an: «Es profesora» → She's a teacher." },
  ],
  "small-words": [
    { id: "es1", kind: "choice", prompt: "I'm good ___ maths.", options: ["in", "at", "on"], answer: 1, explain: "«Bueno en algo» → good at, no in." },
    { id: "es2", kind: "choice", prompt: "It depends ___ the weather.", options: ["of", "on", "from"], answer: 1, explain: "«Depende de» → depends on, no of." },
  ],
  "everyday-modals": [
    { id: "es1", kind: "fix", prompt: "You must to go now.", answers: ["You must go now."], explain: "Después de must, can, should va el verbo sin to." },
  ],
};
