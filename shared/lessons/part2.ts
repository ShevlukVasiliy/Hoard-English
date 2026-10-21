import type { LessonSource } from "../types";

export const part2: LessonSource[] = [
  {
    id: "conditionals-1-2",
    title: "First & Second Conditional",
    subtitle: "Реальное «если» и воображаемое",
    level: "B1",
    topic: "conditionals",
    theory: [
      {
        title: "First — реально возможно",
        text: "`If + Present Simple, will + V`: вполне вероятная ситуация в будущем.",
        examples: [
          { en: "If it rains, we'll stay at home." },
          { en: "If you don't hurry, you'll miss the bus." },
        ],
      },
      {
        title: "Second — воображаемое",
        text: "`If + Past Simple, would + V`: нереальное или маловероятное настоящее/будущее. Прошедшее время тут не про прошлое, а про «отдаление» от реальности.\n\nС `be` в формальном стиле — `were` для всех лиц: `If I were you, I'd apologise.`",
        examples: [
          { en: "If I had more time, I'd learn the piano.", ru: "Но времени нет." },
          { en: "What would you do if you won a million?" },
        ],
        trap: "will/would не ставятся в части с if: не «If I would have money…», а If I had money, I would…",
      },
      {
        title: "Как выбрать",
        text: "Спроси: насколько это реально для меня? `If I see him, I'll tell him` (вполне увижу) vs `If I saw a ghost, I'd scream` (вряд ли).\n\n`unless` = if … not: `I won't go unless you come with me.`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "If you heat ice, it ___.", options: ["melts", "would melt", "melted"], answer: 0, explain: "Общая истина — Zero conditional (Present + Present)." },
      { id: "2", kind: "choice", prompt: "If I ___ you, I'd take the job.", options: ["am", "were", "would be"], answer: 1 },
      { id: "3", kind: "gap", prompt: "If she ___ (call), I'll let you know.", answers: ["calls"] },
      { id: "4", kind: "gap", prompt: "If I lived by the sea, I ___ (swim) every day.", answers: ["would swim", "'d swim"] },
      { id: "5", kind: "fix", prompt: "If I will see her, I will tell her.", answers: ["If I see her, I will tell her.", "If I see her, I'll tell her."] },
      { id: "6", kind: "fix", prompt: "If I would have a car, I would drive to work.", answers: ["If I had a car, I would drive to work.", "If I had a car, I'd drive to work."] },
      { id: "7", kind: "order", form: "question", words: ["what", "would", "you", "do", "if", "you", "lost", "your", "job"], answer: "what would you do if you lost your job" },
      { id: "8", kind: "choice", prompt: "We'll miss the train ___ we leave now.", options: ["if", "unless", "when"], answer: 1 },
    ],
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    subtitle: "Когда важно действие, а не кто его сделал",
    level: "B1",
    topic: "passive",
    theory: [
      {
        title: "Формула",
        text: "`be` в нужном времени + `V3`. Время показывает `be`, смысл — причастие.\n\n• Present: `is made`\n• Past: `was built`\n• Present Perfect: `has been sold`\n• Continuous: `is being repaired`\n• Modal: `can be done`, `will be sent`",
        examples: [
          { en: "This bridge was built in 1890." },
          { en: "Your order has been shipped." },
          { en: "The road is being repaired.", ru: "Дорогу ремонтируют (прямо сейчас)." },
        ],
      },
      {
        title: "Зачем",
        text: "Исполнитель неизвестен, очевиден или неважен. Если важен — `by`: `The novel was written by Orwell.`\n\nТипичные конструкции: `It is said that…`, `He is believed to be…`, `I was told…`, `to get something done` (`I got my hair cut`).",
        trap: "Русские неопределённо-личные «Мне сказали», «Здесь говорят по-английски» — в английском почти всегда пассив: I was told, English is spoken here.",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "The Mona Lisa ___ by Leonardo da Vinci.", options: ["painted", "was painted", "has painted"], answer: 1 },
      { id: "2", kind: "choice", prompt: "Our kitchen ___ at the moment, so we're eating out.", options: ["is repaired", "is being repaired", "has repaired"], answer: 1 },
      { id: "3", kind: "gap", prompt: "The results ___ (will / announce) tomorrow.", answers: ["will be announced"] },
      { id: "4", kind: "gap", prompt: "Three people ___ (have / arrest) so far.", answers: ["have been arrested"] },
      { id: "5", kind: "fix", prompt: "The letter was wrote in French.", answers: ["The letter was written in French."] },
      { id: "6", kind: "fix", prompt: "I was said that the meeting was cancelled.", answers: ["I was told that the meeting was cancelled.", "I was told the meeting was cancelled."], explain: "say не используется с лицом-подлежащим: tell → I was told." },
      { id: "7", kind: "order", form: "statement", words: ["English", "is", "spoken", "all", "over", "the", "world"], answer: "English is spoken all over the world" },
      { id: "8", kind: "choice", prompt: "I'm going to ___ tomorrow.", options: ["cut my hair", "have my hair cut", "have cut my hair"], answer: 1, explain: "have/get something done — услугу делает кто-то другой." },
    ],
  },
  {
    id: "past-perfect",
    title: "Past Perfect & narrative tenses",
    subtitle: "The past before the past",
    level: "B2",
    topic: "past",
    theory: [
      {
        title: "The past before the past",
        text: "`had + V3` — an action that happened before another moment in the past.",
        examples: [
          { en: "When I arrived, the film had already started.", ru: "The film started before I arrived." },
          { en: "When I arrived, the film started.", ru: "The film started when I arrived (one after the other)." },
        ],
      },
      {
        title: "Not always needed",
        text: "If the order is clear from `before/after` or from the sequence itself, the Past Simple is enough: `I had breakfast and left.`\n\nUse the Past Perfect when you \"rewind\" inside a story: `She looked tired. She hadn't slept for two days.`\n\n**Past Perfect Continuous** — duration up to a moment in the past: `They had been waiting for an hour when the bus finally came.`",
        trap: "В русском нет «предпрошедшего», поэтому порядок событий теряется. Если в рассказе прыгаешь назад во времени — нужен had.",
      },
      {
        title: "Typical contexts",
        text: "`It was the first time I had ever…`, `By the time…`, `I realised that I had…`, `If only I had known` (regret).",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "By the time we got to the station, the train ___.", options: ["left", "had left", "has left"], answer: 1 },
      { id: "2", kind: "choice", prompt: "It was the first time I ___ snow.", options: ["saw", "have seen", "had seen"], answer: 2 },
      { id: "3", kind: "gap", prompt: "She was exhausted because she ___ (work) all night.", answers: ["had been working", "had worked", "'d been working"] },
      { id: "4", kind: "gap", prompt: "I realised I ___ (leave) my passport at home.", answers: ["had left", "'d left"] },
      { id: "5", kind: "fix", prompt: "When I came home, my parents already went to bed.", answers: ["When I came home, my parents had already gone to bed."] },
      { id: "6", kind: "order", form: "statement", words: ["she", "had", "never", "flown", "before", "that", "trip"], answer: "she had never flown before that trip" },
      { id: "7", kind: "choice", prompt: "They ___ for two hours when the rescue team found them.", options: ["had been walking", "were walking", "have walked"], answer: 0 },
      { id: "8", kind: "gap", prompt: "He couldn't get in because he ___ (lose) his keys.", answers: ["had lost", "'d lost"] },
    ],
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    subtitle: "He said that…",
    level: "B2",
    topic: "reported",
    theory: [
      {
        title: "Backshift",
        text: "When the reporting verb is in the past (`said, told, asked`), the tense usually moves one step back:\n\n• am/is → was\n• Present Simple → Past Simple\n• Past Simple / Present Perfect → Past Perfect\n• will → would, can → could, must → had to",
        examples: [
          { en: "\"I'm tired.\" → She said (that) she was tired." },
          { en: "\"I've lost my phone.\" → He said he had lost his phone." },
          { en: "\"I'll call you.\" → She said she would call me." },
        ],
        trap: "В русском время не сдвигается: «Он сказал, что устал / устаёт». В английском сдвиг — норма. Не сдвигают, если сказанное всё ещё актуально: He said the Earth is round.",
      },
      {
        title: "say vs tell, questions and requests",
        text: "`say (to someone)` — no direct object: `He said that…`; `tell someone` — always with a listener: `He told me that…`\n\nQuestions use statement word order, without do: `\"Where do you live?\" → She asked where I lived.` Yes/no questions take `if/whether`.\n\nRequests and orders: `tell/ask someone (not) to do`: `He told me not to worry.`\n\nTime and place words change: `here → there, now → then, tomorrow → the next day, yesterday → the day before`.",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "\"I'm working.\" → He said he ___.", options: ["is working", "was working", "has worked"], answer: 1 },
      { id: "2", kind: "choice", prompt: "She ___ me that she was leaving.", options: ["said", "told", "asked"], answer: 1 },
      { id: "3", kind: "gap", prompt: "\"I will help you.\" → He promised he ___ help me.", answers: ["would"] },
      { id: "4", kind: "fix", prompt: "She asked me where did I work.", answers: ["She asked me where I worked."], explain: "Reported questions use statement word order, without did." },
      { id: "5", kind: "fix", prompt: "He said me that he was busy.", answers: ["He told me that he was busy.", "He told me he was busy.", "He said that he was busy.", "He said he was busy."] },
      { id: "6", kind: "gap", prompt: "\"Don't touch it!\" → She told me ___ touch it.", answers: ["not to"] },
      { id: "7", kind: "order", form: "statement", words: ["they", "asked", "if", "we", "had", "seen", "the", "film"], answer: "they asked if we had seen the film" },
      { id: "8", kind: "choice", prompt: "\"I saw her yesterday.\" → He said he had seen her ___.", options: ["yesterday", "the day before", "tomorrow"], answer: 1 },
    ],
  },
  {
    id: "conditionals-3-mixed",
    title: "Third & Mixed Conditionals",
    subtitle: "If only I had…",
    level: "B2",
    topic: "conditionals",
    theory: [
      {
        title: "Third — the unreal past",
        text: "`If + had V3, would have V3`: a past that can no longer be changed. Regrets, criticism, \"what if\".",
        examples: [
          { en: "If I had left earlier, I wouldn't have missed the plane.", ru: "But I didn't leave earlier, and I missed it." },
          { en: "She would have passed if she had studied." },
        ],
        trap: "Не «If I would have known». Часть с if — только had + V3.",
      },
      {
        title: "Mixed — the past affects the present",
        text: "`If + had V3, would + V`: a past condition with a present result.\n`If I had taken that job, I would live in London now.`\n\nAnd the other way round — a permanent trait affects the past: `If I weren't so shy, I would have spoken to her.`",
      },
      {
        title: "Inversion and wish",
        text: "In formal English you can drop `if` by inverting: `Had I known, I would have called.`\n\nRegret about the past: `I wish I had…`, `If only I hadn't…`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "If you ___ me, I would have helped.", options: ["asked", "had asked", "would ask"], answer: 1 },
      { id: "2", kind: "gap", prompt: "If we had booked earlier, we ___ (get) cheaper tickets.", answers: ["would have got", "would have gotten", "'d have got"] },
      { id: "3", kind: "choice", prompt: "If I hadn't missed the bus, I ___ here now.", options: ["would be", "would have been", "will be"], answer: 0, explain: "Mixed: past condition → present result." },
      { id: "4", kind: "fix", prompt: "If I would have known, I would have told you.", answers: ["If I had known, I would have told you.", "If I'd known, I would have told you.", "If I had known, I'd have told you."] },
      { id: "5", kind: "gap", prompt: "___ I known about the problem, I would have fixed it.", answers: ["had"], explain: "Inversion: Had I known = If I had known." },
      { id: "6", kind: "order", form: "statement", words: ["I", "wish", "I", "had", "studied", "harder", "at", "school"], answer: "I wish I had studied harder at school" },
      { id: "7", kind: "choice", prompt: "If she were more careful, she ___ that mistake yesterday.", options: ["wouldn't make", "wouldn't have made", "didn't make"], answer: 1 },
      { id: "8", kind: "gap", prompt: "If he hadn't broken his leg, he ___ (play) in the final last week.", answers: ["would have played", "'d have played"] },
    ],
  },
  {
    id: "modals-deduction",
    title: "Modals of deduction",
    subtitle: "must have, can't have, might have",
    level: "B2",
    topic: "modals",
    theory: [
      {
        title: "Certainty about the present",
        text: "`must` — almost sure it's true: `She must be tired after the flight.`\n`can't` — almost sure it isn't: `That can't be Tom — he's in Paris.`\n`might / may / could` — possibly: `He might be at the gym.`",
        trap: "Противоположность must в догадках — can't, а не mustn't. mustn't = запрещено.",
      },
      {
        title: "Certainty about the past",
        text: "Modal + `have + V3`:\n\n• `must have done` — surely did\n• `can't / couldn't have done` — surely didn't\n• `might / may / could have done` — possibly did",
        examples: [
          { en: "The ground is wet. It must have rained." },
          { en: "She can't have forgotten — I reminded her twice." },
          { en: "I might have left my keys at work." },
        ],
      },
      {
        title: "Criticism and missed chances",
        text: "`should have done` — it was the right thing (but you didn't): `You should have told me.`\n`could have done` — it was possible: `You could have been killed!`\n`needn't have done` — you did it, but it wasn't necessary: `You needn't have cooked — we've eaten.`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "He's been working for 14 hours. He ___ exhausted.", options: ["must be", "can't be", "mustn't be"], answer: 0 },
      { id: "2", kind: "choice", prompt: "She ___ the email — she replied within a minute.", options: ["can't have read", "must have read", "should read"], answer: 1 },
      { id: "3", kind: "gap", prompt: "That ___ be the right address — the house is empty.", answers: ["can't", "cannot", "can not", "couldn't"] },
      { id: "4", kind: "gap", prompt: "I'm not sure where Anna is. She ___ (might / go) home already.", answers: ["might have gone"] },
      { id: "5", kind: "fix", prompt: "He mustn't have seen us — he didn't wave.", answers: ["He can't have seen us — he didn't wave.", "He couldn't have seen us — he didn't wave.", "He can't have seen us - he didn't wave.", "He can't have seen us, he didn't wave."] },
      { id: "6", kind: "order", form: "statement", words: ["you", "should", "have", "told", "me", "earlier"], answer: "you should have told me earlier" },
      { id: "7", kind: "choice", prompt: "You ___ brought an umbrella — it's sunny.", options: ["mustn't have", "needn't have", "can't have"], answer: 1 },
      { id: "8", kind: "gap", prompt: "The window is broken. Someone ___ (must / throw) a stone.", answers: ["must have thrown"] },
    ],
  },
];
