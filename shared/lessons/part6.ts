import type { Lesson } from "../types";

// Дополнительные уроки B1.
export const part6: Lesson[] = [
  {
    id: "obligation",
    title: "must, have to, should",
    subtitle: "Надо, должен, стоит",
    level: "B1",
    topic: "modals",
    theory: [
      {
        title: "Обязанность",
        text: "`must` — обязанность от говорящего, правило, сильный совет: `I must call Mum.` `You must wear a seatbelt.`\n\n`have to` — обязанность извне, обстоятельства: `I have to get up at 6 — work starts at 7.`\n\nВ прошлом и будущем — только `have to`: `I had to wait. You'll have to pay.`",
        examples: [
          { en: "You must try this cake!", ru: "Ты обязательно должен попробовать этот торт!" },
          { en: "Do we have to book in advance?", ru: "Нужно бронировать заранее?" },
        ],
        trap: "mustn't и don't have to — противоположности: mustn't = нельзя, don't have to = не обязательно. «Тебе не надо приходить» — You don't have to come, а не «You mustn't come».",
      },
      {
        title: "Совет",
        text: "`should / ought to` — стоит, следует: `You should see a doctor.`\n\n`shouldn't` — не стоит: `You shouldn't work so much.`\n\n`had better` — лучше бы (иначе будут проблемы): `You'd better hurry.` После него — глагол без to.",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "You ___ smoke in the hospital — it's forbidden.", options: ["mustn't", "don't have to", "shouldn't to"], answer: 0 },
      { id: "2", kind: "choice", prompt: "It's Sunday, so I ___ get up early.", options: ["mustn't", "don't have to", "must"], answer: 1 },
      { id: "3", kind: "choice", prompt: "Yesterday I ___ work late.", options: ["must", "had to", "have to"], answer: 1 },
      { id: "4", kind: "choice", prompt: "You look tired. You ___ go to bed.", options: ["should", "must to", "have"], answer: 0 },
      { id: "5", kind: "gap", prompt: "___ we have to wear a uniform?", answers: ["do"] },
      { id: "6", kind: "gap", prompt: "You'd better ___ (take) an umbrella.", answers: ["take"] },
      { id: "7", kind: "gap", prompt: "Next year she will ___ pass a difficult exam. (have to)", answers: ["have to"] },
      { id: "8", kind: "gap", prompt: "You ___ eat so much sugar — it's bad for you. (should, negative)", answers: ["shouldn't", "should not"] },
      { id: "9", kind: "fix", prompt: "You must to finish this today.", answers: ["You must finish this today."] },
      { id: "10", kind: "fix", prompt: "I must go to the dentist yesterday.", answers: ["I had to go to the dentist yesterday."] },
      { id: "11", kind: "fix", prompt: "She has to wears a uniform.", answers: ["She has to wear a uniform."] },
      { id: "12", kind: "order", form: "negative", words: ["you", "don't", "have", "to", "come", "if", "you're", "busy"], answer: "you don't have to come if you're busy" },
      { id: "13", kind: "order", form: "statement", words: ["we", "should", "leave", "before", "it", "gets", "dark"], answer: "we should leave before it gets dark" },
      { id: "14", kind: "transform", task: "Перепиши в прошлом", source: "I have to work on Saturday.", answers: ["I had to work on Saturday."] },
      { id: "15", kind: "transform", task: "Перепиши с don't have to", source: "It isn't necessary to bring food.", answers: ["You don't have to bring food.", "We don't have to bring food.", "You do not have to bring food."] },
      { id: "16", kind: "transform", task: "Перепиши с should (совет)", source: "Why don't you see a doctor?", answers: ["You should see a doctor."] },
    ],
    story: {
      title: "should значило «быть должным денег»",
      text: "`should` — прошедшая форма `shall`. А древнеанглийское `sculan` значило «быть должным» в самом прямом смысле — «задолжать». В родственном немецком `Schuld` — это «долг» и «вина», а `schulden` — «быть должным денег».\n\nПостепенно «я должен (кому-то)» превратилось в «я обязан», потом в будущее время (`I shall`), а `should` стало мягким советом: «тебе бы следовало».\n\nТак что `You should apologise` буквально восходит к «за тобой долг — извиниться».",
      takeaway: "Модальные глаголы выросли из обычных слов: «знать», «быть должным», «быть в силах».",
    },
  },
  {
    id: "so-such-too-enough",
    title: "so, such, too, enough",
    subtitle: "Слишком, достаточно, такой",
    level: "B1",
    topic: "adjectives",
    theory: [
      {
        title: "too и enough",
        text: "`too + прилагательное` — слишком (больше, чем нужно): `It's too hot to sleep.`\n\n`прилагательное + enough` — достаточно, ставится **после**: `He's old enough to drive.`\n\n`enough + существительное` — **перед**: `We have enough time.`\n\nС `too` и `enough` часто идёт `to + V` или `for + кто`: `too difficult for me`.",
        trap: "«Слишком» не всегда too. Русское «очень» в восторге — very или so: «Он слишком красивый!» (восхищение) — He's so handsome!, а too handsome звучит как недостаток.",
      },
      {
        title: "so и such",
        text: "`so + прилагательное / наречие`: `It's so cold.` `She speaks so fast.`\n\n`such (a) + прилагательное + существительное`: `It's such a cold day.` `They're such nice people.`\n\nРезультат — `so / such … that`: `It was so late that the shops were closed.` `It was such a good film that I watched it twice.`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "This coffee is ___ hot to drink.", options: ["too", "enough", "so"], answer: 0 },
      { id: "2", kind: "choice", prompt: "She isn't ___ to go to school.", options: ["enough old", "old enough", "too old"], answer: 1 },
      { id: "3", kind: "choice", prompt: "It was ___ beautiful day!", options: ["so a", "such a", "such"], answer: 1 },
      { id: "4", kind: "choice", prompt: "Do we have ___ for everyone?", options: ["chairs enough", "enough chairs", "too chairs"], answer: 1 },
      { id: "5", kind: "gap", prompt: "The film was ___ boring that I left early. (so / such)", answers: ["so"] },
      { id: "6", kind: "gap", prompt: "They are ___ friendly people. (so / such)", answers: ["such"] },
      { id: "7", kind: "gap", prompt: "This box is too heavy ___ me to carry.", answers: ["for"] },
      { id: "8", kind: "gap", prompt: "You're not tall ___ to reach the shelf.", answers: ["enough"] },
      { id: "9", kind: "fix", prompt: "He is enough strong to lift it.", answers: ["He is strong enough to lift it.", "He's strong enough to lift it."] },
      { id: "10", kind: "fix", prompt: "It was so a long journey.", answers: ["It was such a long journey.", "The journey was so long."] },
      { id: "11", kind: "fix", prompt: "The bag is too small for to carry my laptop.", answers: ["The bag is too small to carry my laptop.", "The bag is too small for my laptop."] },
      { id: "12", kind: "order", form: "statement", words: ["it", "is", "too", "late", "to", "call", "him"], answer: "it is too late to call him" },
      { id: "13", kind: "order", form: "negative", words: ["we", "didn't", "have", "enough", "money"], answer: "we didn't have enough money" },
      { id: "14", kind: "transform", task: "Перепиши с too", source: "The water isn't warm enough to swim.", answers: ["The water is too cold to swim.", "The water is too cold to swim in.", "The water is too cold for swimming."] },
      { id: "15", kind: "transform", task: "Перепиши с such", source: "The test was so easy.", answers: ["It was such an easy test."] },
      { id: "16", kind: "transform", task: "Соедини через so … that", source: "He was very tired. He fell asleep at once.", answers: ["He was so tired that he fell asleep at once.", "He was so tired he fell asleep at once."] },
    ],
    story: {
      title: "too — это to с ударением",
      text: "`too` и `to` — одно и то же слово. В древнеанглийском `tō` значило и «к», и «вдобавок, сверх того».\n\nКогда слово стояло под ударением в значении «тоже, слишком», его произносили с долгим звуком. В XVI веке это различие решили показать на письме — и ударное `to` стали писать с двумя `o`: `too`.\n\nОтсюда же оба значения `too`: «тоже» (`me too` — «и мне сверху») и «слишком» (`too much` — «сверх меры»).",
      takeaway: "Иногда одно слово раздваивается только потому, что его по-разному произносят.",
    },
  },
];
