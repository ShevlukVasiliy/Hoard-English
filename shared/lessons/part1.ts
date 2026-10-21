import type { Lesson } from "../types";

export const part1: Lesson[] = [
  {
    id: "present-simple-continuous",
    title: "Present Simple vs Continuous",
    subtitle: "Привычка или прямо сейчас",
    level: "A2",
    topic: "present",
    theory: [
      {
        title: "Два настоящих",
        text: "**Present Simple** — то, что верно вообще: привычки, расписания, факты.\n\n**Present Continuous** (`am/is/are + -ing`) — то, что происходит сейчас или временно, в этот период.",
        examples: [
          { en: "She works in a bank.", ru: "Она работает в банке (вообще, это её работа)." },
          { en: "She's working from home this week.", ru: "На этой неделе она работает из дома (временно)." },
          { en: "Water boils at 100°C.", ru: "Факт." },
        ],
      },
      {
        title: "Глаголы состояния",
        text: "Глаголы `know, want, like, need, believe, understand, belong, seem` почти не бывают в Continuous: они описывают состояние, а не действие.\n\nНекоторые меняют смысл: `I think it's good` (мнение) vs `I'm thinking about it` (процесс обдумывания). `She has a car` vs `She's having lunch`.",
        examples: [
          { en: "I don't understand this rule.", ru: "А не «I'm not understanding»." },
          { en: "We're having dinner — can I call you back?" },
        ],
        trap: "В русском одно настоящее время, поэтому хочется сказать «I am work every day». Вспомогательный глагол am/is/are ставится только вместе с -ing.",
      },
      {
        title: "Маркеры",
        text: "Simple: `always, usually, often, every day, on Mondays`.\nContinuous: `now, at the moment, currently, these days, this week`.\n\n`always` + Continuous — раздражение: `He's always losing his keys!`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "Listen! Somebody ___ at the door.", options: ["knocks", "is knocking", "knock"], answer: 1, explain: "Listen! — действие происходит прямо сейчас." },
      { id: "2", kind: "choice", prompt: "I ___ what you mean.", options: ["am knowing", "know", "knowing"], answer: 1, explain: "know — глагол состояния, в Continuous не используется." },
      { id: "3", kind: "gap", prompt: "The ferry ___ (leave) at 7:15 every morning.", answers: ["leaves"], explain: "Расписание → Present Simple, he/she/it → -s." },
      { id: "4", kind: "gap", prompt: "This week I ___ (stay) with my cousin while my flat is repaired.", answers: ["am staying", "'m staying", "i'm staying"], explain: "Временная ситуация → Continuous." },
      { id: "5", kind: "fix", prompt: "She is work in a hospital.", answers: ["She works in a hospital."], explain: "Постоянная работа → Present Simple, без is." },
      { id: "6", kind: "order", form: "statement", words: ["is", "he", "always", "complaining", "about", "the", "weather"], answer: "he is always complaining about the weather", explain: "always + Continuous = раздражающая привычка." },
      { id: "7", kind: "choice", prompt: "— What ___ ? — I'm a designer.", options: ["are you doing", "do you do"], answer: 1, explain: "What do you do? = кем работаешь. What are you doing? = что делаешь сейчас." },
      { id: "8", kind: "gap", prompt: "I ___ (think) about changing jobs, but I haven't decided yet.", answers: ["am thinking", "'m thinking", "i'm thinking"], explain: "think как процесс обдумывания → Continuous." },
    ],
  },
  {
    id: "past-simple-continuous",
    title: "Past Simple vs Continuous",
    subtitle: "Событие на фоне процесса",
    level: "A2",
    topic: "past",
    theory: [
      {
        title: "Кадр и фон",
        text: "**Past Simple** — завершённое событие, «кадр»: `I opened the door`.\n\n**Past Continuous** (`was/were + -ing`) — процесс в момент прошлого, «фон»: `It was raining`.\n\nВместе: длинное действие прерывается коротким.",
        examples: [
          { en: "I was cooking when the lights went out.", ru: "Я готовил(а), когда погас свет." },
          { en: "While we were talking, the train left.", ru: "Пока мы болтали, поезд ушёл." },
        ],
      },
      {
        title: "when и while",
        text: "`while` обычно перед длинным действием (Continuous), `when` — перед коротким (Simple).\n\nДва параллельных процесса — оба в Continuous: `She was reading while he was cooking`.\n\nЦепочка событий — всё в Simple: `He stood up, took his coat and left`.",
        trap: "Русское «читал» может быть и Simple, и Continuous. Спроси себя: это фон (был в процессе) или отдельное событие?",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "I ___ a shower when the phone rang.", options: ["had", "was having", "have had"], answer: 1 },
      { id: "2", kind: "choice", prompt: "She ___ the letter, put it in the envelope and went out.", options: ["was reading", "read", "was read"], answer: 1, explain: "Цепочка последовательных событий → Past Simple." },
      { id: "3", kind: "gap", prompt: "What ___ you ___ (do) at 8 pm yesterday? — I was at the gym.", answers: ["were doing", "were you doing"], hint: "два слова через пропуски: were … doing", explain: "Процесс в конкретный момент прошлого." },
      { id: "4", kind: "gap", prompt: "While I ___ (walk) home, I saw an old friend.", answers: ["was walking"] },
      { id: "5", kind: "fix", prompt: "When I was arriving, everyone was already eating.", answers: ["When I arrived, everyone was already eating."], explain: "Приезд — короткое событие → Past Simple." },
      { id: "6", kind: "order", form: "statement", words: ["the", "kids", "were", "playing", "while", "we", "were", "talking"], answer: "the kids were playing while we were talking" },
      { id: "7", kind: "choice", prompt: "It ___ heavily, so we stayed in.", options: ["rained", "was raining"], answer: 1, explain: "Фон, описание обстановки." },
      { id: "8", kind: "gap", prompt: "He ___ (break) his leg while he was skiing.", answers: ["broke"] },
    ],
  },
  {
    id: "present-perfect-past-simple",
    title: "Present Perfect vs Past Simple",
    subtitle: "Результат сейчас или история тогда",
    level: "B1",
    topic: "perfect",
    theory: [
      {
        title: "Главный вопрос: когда?",
        text: "**Past Simple** — прошлое с конкретным временем или законченный период: `yesterday, in 2019, last week, when I was a child`.\n\n**Present Perfect** (`have/has + V3`) — прошлое, важное сейчас: результат, опыт, период, который ещё не закончился. Время не названо.",
        examples: [
          { en: "I've lost my keys.", ru: "Я потерял ключи (и сейчас их нет)." },
          { en: "I lost my keys yesterday.", ru: "Указано когда → Past Simple." },
          { en: "Have you ever been to Japan?", ru: "Опыт за всю жизнь." },
        ],
      },
      {
        title: "Маркеры",
        text: "Present Perfect: `ever, never, just, already, yet, so far, since, for` (о периоде до сейчас), `this week/today` (если они не закончились).\n\nPast Simple: `ago, yesterday, last…, in + год, when…`.\n\n`since + момент` (since Monday), `for + длительность` (for three years).",
        trap: "«Я видел этот фильм вчера» — только Past Simple: I saw it yesterday. Present Perfect с «вчера» невозможен.",
      },
      {
        title: "Новости",
        text: "Новость часто начинается с Present Perfect, а детали идут в Past Simple:\n\n`A ship has sunk near the coast. It hit the rocks at 3 am.`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "I ___ this film three times.", options: ["saw", "have seen", "have saw"], answer: 1, explain: "Опыт, время не указано." },
      { id: "2", kind: "choice", prompt: "We ___ to Rome in 2018.", options: ["went", "have gone", "have been"], answer: 0 },
      { id: "3", kind: "gap", prompt: "She ___ (live) here since 2020.", answers: ["has lived", "'s lived", "has been living"] },
      { id: "4", kind: "gap", prompt: "When ___ you ___ (start) learning English?", answers: ["did start", "did you start"], hint: "did … start", explain: "Вопрос When → всегда Past Simple." },
      { id: "5", kind: "fix", prompt: "I have met him two years ago.", answers: ["I met him two years ago."], explain: "ago → Past Simple." },
      { id: "6", kind: "fix", prompt: "Did you finish your report yet?", answers: ["Have you finished your report yet?"], explain: "yet в вопросе → Present Perfect (в британском варианте)." },
      { id: "7", kind: "order", form: "statement", words: ["I've", "never", "tried", "sushi", "before"], answer: "I've never tried sushi before" },
      { id: "8", kind: "choice", prompt: "— Where's Tom? — He ___ to the shop. He'll be back soon.", options: ["has been", "has gone", "went"], answer: 1, explain: "has gone = ушёл и ещё там; has been = был и вернулся." },
    ],
  },
  {
    id: "present-perfect-continuous",
    title: "Present Perfect Continuous",
    subtitle: "Сколько уже длится и откуда следы",
    level: "B1",
    topic: "perfect",
    theory: [
      {
        title: "Длительность до сейчас",
        text: "`have/has been + -ing` — действие началось в прошлом и продолжается (или только что закончилось). Важен процесс и длительность.",
        examples: [
          { en: "I've been waiting for an hour.", ru: "Я жду уже час (по-русски — настоящее время!)." },
          { en: "How long have you been learning English?" },
        ],
        trap: "«Я живу здесь пять лет» — не «I live here for five years», а I've been living / I've lived here for five years.",
      },
      {
        title: "Видимые следы",
        text: "Continuous объясняет, почему сейчас что-то видно: `Your eyes are red. Have you been crying?` `It's been raining — the streets are wet.`",
      },
      {
        title: "Perfect vs Perfect Continuous",
        text: "Результат и количество → Simple: `I've written three emails.`\nПроцесс и длительность → Continuous: `I've been writing emails all morning.`\n\nГлаголы состояния (know, have = иметь) — только Simple: `I've known her for years.`",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "I ___ for you for forty minutes!", options: ["wait", "am waiting", "have been waiting"], answer: 2 },
      { id: "2", kind: "choice", prompt: "She ___ three chapters today.", options: ["has been writing", "has written"], answer: 1, explain: "Количество, результат → Present Perfect Simple." },
      { id: "3", kind: "gap", prompt: "You're out of breath. ___ you ___ (run)?", answers: ["have been running", "have you been running"], hint: "have … been running" },
      { id: "4", kind: "gap", prompt: "I ___ (know) him since school.", answers: ["have known", "'ve known"], explain: "know не используется в Continuous." },
      { id: "5", kind: "fix", prompt: "I live in this city for ten years.", answers: ["I have lived in this city for ten years.", "I've lived in this city for ten years.", "I have been living in this city for ten years.", "I've been living in this city for ten years."] },
      { id: "6", kind: "order", form: "question", words: ["how", "long", "have", "you", "been", "working", "here"], answer: "how long have you been working here" },
      { id: "7", kind: "choice", prompt: "The ground is wet. It ___.", options: ["has been raining", "rained", "is raining since"], answer: 0 },
      { id: "8", kind: "gap", prompt: "We ___ (try) to fix this bug all week and it still doesn't work.", answers: ["have been trying", "'ve been trying"] },
    ],
  },
  {
    id: "future-forms",
    title: "Future: will, going to, Continuous",
    subtitle: "Решение, план и договорённость",
    level: "B1",
    topic: "future",
    theory: [
      {
        title: "Три будущих",
        text: "**will** — решение в момент речи, обещание, прогноз-мнение: `I'll help you. I think it will rain.`\n\n**be going to** — намерение, решённое заранее; прогноз по признакам: `I'm going to quit. Look at those clouds — it's going to rain.`\n\n**Present Continuous** — договорённость с временем и местом: `I'm meeting Kate at six.`",
        examples: [
          { en: "— The phone's ringing. — I'll get it.", ru: "Решение прямо сейчас." },
          { en: "I'm going to learn Spanish next year.", ru: "План, обдуманный заранее." },
          { en: "We're flying to Lisbon on Friday.", ru: "Билеты куплены." },
        ],
      },
      {
        title: "Расписания и время",
        text: "Расписания — Present Simple: `The train leaves at 6.`\n\nПосле `when, if, as soon as, before, until` будущее выражается **настоящим**: `I'll call you when I arrive` (а не when I will arrive).",
        trap: "Русское «когда приеду» тянет за собой will. В придаточных времени will не ставится.",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "— I've forgotten my wallet. — Don't worry, I ___ for you.", options: ["'m going to pay", "'ll pay", "pay"], answer: 1 },
      { id: "2", kind: "choice", prompt: "Look at that car! It ___ crash!", options: ["will", "is going to"], answer: 1, explain: "Прогноз по видимым признакам." },
      { id: "3", kind: "gap", prompt: "I'll text you as soon as I ___ (land).", answers: ["land"] },
      { id: "4", kind: "gap", prompt: "We ___ (have) dinner with my parents on Saturday — it's all arranged.", answers: ["are having", "'re having"] },
      { id: "5", kind: "fix", prompt: "When I will finish, I'll call you.", answers: ["When I finish, I'll call you.", "When I finish, I will call you."] },
      { id: "6", kind: "order", form: "statement", words: ["I'm", "going", "to", "start", "running", "next", "month"], answer: "I'm going to start running next month" },
      { id: "7", kind: "choice", prompt: "The film ___ at 8:30, so let's meet at 8.", options: ["starts", "will be start", "is going start"], answer: 0 },
      { id: "8", kind: "choice", prompt: "I promise I ___ tell anyone.", options: ["won't", "am not going to", "don't"], answer: 0, explain: "Обещание → will / won't." },
    ],
  },
  {
    id: "articles",
    title: "Articles: a, the, —",
    subtitle: "Какой именно предмет",
    level: "B1",
    topic: "articles",
    theory: [
      {
        title: "Логика артикля",
        text: "**a/an** — один из многих, упоминается впервые, «какой-то»: `I saw a dog.`\n\n**the** — конкретный, понятно какой: уже упоминали, он один, его уточнили: `The dog was huge. The sun. The man in the red coat.`\n\n**без артикля** — общее понятие во множественном или неисчисляемом: `Dogs are loyal. I love music.`",
        examples: [
          { en: "There's a key in the drawer. The key is old." },
          { en: "Life is short.", ru: "Жизнь вообще — без артикля." },
          { en: "The life of a keeper is lonely.", ru: "Уточнили, чья жизнь → the." },
        ],
      },
      {
        title: "Устойчивые случаи",
        text: "`the` — с океанами, реками, горными цепями, `the UK`, `the USA`, с превосходной степенью (`the best`), с порядковыми (`the first`), с инструментами (`play the piano`).\n\nБез артикля: города, большинство стран, приёмы пищи (`have lunch`), `go to bed/work/school` (по назначению), `by car`.\n\nПрофессия: `She's a doctor` — артикль обязателен.",
        trap: "В русском артиклей нет, поэтому их «теряют» перед исчисляемыми в единственном числе. Правило-страховка: исчисляемое в ед. числе почти никогда не стоит голым.",
      },
    ],
    exercises: [
      { id: "1", kind: "choice", prompt: "My sister is ___ architect.", options: ["—", "a", "an", "the"], answer: 2 },
      { id: "2", kind: "choice", prompt: "___ honesty is important in any relationship.", options: ["The", "An", "—"], answer: 2, explain: "Абстрактное понятие вообще." },
      { id: "3", kind: "gap", prompt: "I bought a lamp and a chair. ___ lamp was cheap, but ___ chair wasn't.", answers: ["the the", "the, the", "the … the"], hint: "два артикля через пробел", explain: "Второе упоминание → the." },
      { id: "4", kind: "gap", prompt: "She can play ___ guitar really well.", answers: ["the"] },
      { id: "5", kind: "fix", prompt: "He is best player in the team.", answers: ["He is the best player in the team.", "He's the best player in the team."] },
      { id: "6", kind: "fix", prompt: "I usually go to the bed at midnight.", answers: ["I usually go to bed at midnight."] },
      { id: "7", kind: "choice", prompt: "We crossed ___ Atlantic by ship.", options: ["—", "the", "an"], answer: 1 },
      { id: "8", kind: "order", form: "statement", words: ["the", "man", "who", "called", "you", "is", "a", "journalist"], answer: "the man who called you is a journalist" },
    ],
  },
];
