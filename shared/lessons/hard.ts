import type { Exercise } from "../types";

// Сложные задания к урокам: тонкие различия и ловушки. Попадают в банк урока с hard: true.
// Исправление ошибок и трансформации тоже считаются сложными (см. lessons/index.ts).
type Hard = Omit<Extract<Exercise, { kind: "choice" }>, "hard"> | Omit<Extract<Exercise, { kind: "gap" }>, "hard">;

export const HARD: Record<string, Hard[]> = {
  "to-be": [
    { id: "h1", kind: "choice", prompt: "— Are you and Tom brothers? — No, ___ cousins.", options: ["we're", "we", "we've"], answer: 0, explain: "Нужен глагол be: we are → we're." },
    { id: "h2", kind: "gap", prompt: "I'm right, ___ I?", answers: ["aren't"], explain: "К I am хвостик aren't I — формы amn't в стандартном английском нет." },
  ],
  "have-got": [
    { id: "h1", kind: "choice", prompt: "We ___ a great time at the party last night.", options: ["had got", "had", "have got"], answer: 1, explain: "have a good time — действие, только have. В прошлом — had." },
    { id: "h2", kind: "gap", prompt: "___ your sister got a car? (одно слово)", answers: ["Has"], explain: "have got строит вопрос сам: Has she got…?" },
  ],
  "there-is-are": [
    { id: "h1", kind: "choice", prompt: "There ___ a sofa and two armchairs in the living room.", options: ["is", "are", "be"], answer: 0, explain: "Согласование с первым существительным: a sofa → is." },
    { id: "h2", kind: "choice", prompt: "Look, ___ a letter for you. ___ from your bank.", options: ["it's … There's", "there's … It's", "there's … There's"], answer: 1, explain: "Сначала вводим новое (there's), потом описываем (it's)." },
  ],
  "plurals": [
    { id: "h1", kind: "choice", prompt: "The police ___ looking for two men.", options: ["is", "are", "was"], answer: 1, explain: "police — всегда множественное число." },
    { id: "h2", kind: "gap", prompt: "We went for a ___ (ten / minute) walk.", answers: ["ten-minute", "ten minute"], explain: "Перед существительным — без -s: a ten-minute walk." },
  ],
  "possessives": [
    { id: "h1", kind: "choice", prompt: "This is ___ house — my mum and dad live here.", options: ["my parent's", "my parents'", "my parents's"], answer: 1, explain: "Множественное на -s — только апостроф." },
    { id: "h2", kind: "choice", prompt: "The company changed ___ logo last year.", options: ["it's", "its", "their's"], answer: 1, explain: "its — притяжательное, it's = it is." },
  ],
  "countable-uncountable": [
    { id: "h1", kind: "choice", prompt: "Can I give you ___ advice?", options: ["an", "a piece of", "many"], answer: 1, explain: "advice — неисчисляемое: a piece of advice." },
    { id: "h2", kind: "choice", prompt: "I'd like two ___, please — black, no sugar.", options: ["coffee", "coffees", "cups coffee"], answer: 1, explain: "В кафе «два кофе» = две порции: two coffees." },
  ],
  "can-could": [
    { id: "h1", kind: "choice", prompt: "The fire spread quickly, but everyone ___ get out.", options: ["could", "was able to", "can"], answer: 1, explain: "Удалось один раз в конкретной ситуации — was able to." },
    { id: "h2", kind: "gap", prompt: "I'm sorry, I ___ (not / be able to) come tomorrow.", answers: ["won't be able to", "will not be able to"], explain: "У can нет будущего — will be able to." },
  ],
  "past-simple-basics": [
    { id: "h1", kind: "choice", prompt: "Who ___ the window?", options: ["did break", "broke", "did broke"], answer: 1, explain: "Вопрос к подлежащему — без did." },
    { id: "h2", kind: "gap", prompt: "We ___ (plan) the trip for months.", answers: ["planned"], explain: "Короткий глагол с ударной гласной удваивает согласную." },
  ],
  "comparatives": [
    { id: "h1", kind: "choice", prompt: "The ___ you practise, the ___ you get.", options: ["more … better", "most … best", "much … good"], answer: 0, explain: "the + сравнительная, the + сравнительная: чем…, тем…" },
    { id: "h2", kind: "choice", prompt: "Tom is ___ than his brother.", options: ["much more taller", "much taller", "more much taller"], answer: 1, explain: "much усиливает сравнение, more с коротким словом не нужно." },
  ],
  "present-simple-continuous": [
    { id: "h1", kind: "choice", prompt: "You ___ very rude today. That's not like you.", options: ["are", "are being", "be"], answer: 1, explain: "be в Continuous — временное поведение." },
    { id: "h2", kind: "choice", prompt: "I ___ of buying a new laptop. What do you think?", options: ["think", "am thinking", "thinks"], answer: 1, explain: "think of/about — процесс обдумывания → Continuous." },
  ],
  "past-simple-continuous": [
    { id: "h1", kind: "choice", prompt: "When the teacher came in, the students stood up. (Что было сначала?)", options: ["учитель вошёл, потом они встали", "они уже стояли", "они вставали, когда он входил"], answer: 0, explain: "Два Past Simple — последовательные события." },
    { id: "h2", kind: "choice", prompt: "I ___ if you could help me with this form.", options: ["wonder", "was wondering", "wondered"], answer: 1, explain: "was wondering — самая вежливая форма просьбы." },
  ],
  "present-perfect-past-simple": [
    { id: "h1", kind: "choice", prompt: "— Where's Anna? — She ___ to the bank. She'll be back soon.", options: ["has been", "has gone", "went"], answer: 1, explain: "has gone — ушла и сейчас там." },
    { id: "h2", kind: "choice", prompt: "I ___ him since we left school.", options: ["didn't see", "haven't seen", "don't see"], answer: 1, explain: "since — период до сейчас → Present Perfect." },
  ],
  "present-perfect-continuous": [
    { id: "h1", kind: "choice", prompt: "I ___ three chapters this morning.", options: ["have been reading", "have read", "read already"], answer: 1, explain: "Названо количество — Present Perfect Simple." },
    { id: "h2", kind: "choice", prompt: "How long ___ each other?", options: ["have you been knowing", "have you known", "do you know"], answer: 1, explain: "know — глагол состояния, только Simple." },
  ],
  "future-forms": [
    { id: "h1", kind: "choice", prompt: "I'll text you as soon as I ___.", options: ["will land", "land", "am going to land"], answer: 1, explain: "После as soon as — настоящее время." },
    { id: "h2", kind: "choice", prompt: "I don't know when he ___ back.", options: ["comes", "will come", "come"], answer: 1, explain: "Здесь when — «когда?», косвенный вопрос, поэтому will." },
  ],
  "articles": [
    { id: "h1", kind: "choice", prompt: "In Russia children start ___ school at the age of six or seven.", options: ["the", "—", "a"], answer: 1, explain: "school по назначению — учиться — без артикля." },
    { id: "h2", kind: "choice", prompt: "She wants to study at ___ university in ___ UK.", options: ["a … the", "an … —", "a … —"], answer: 0, explain: "a university (звук «ю»), the UK." },
  ],
  "conditionals-1-2": [
    { id: "h1", kind: "choice", prompt: "I'm scared to go alone. I won't go ___ you come with me.", options: ["if", "unless", "when"], answer: 1, explain: "unless = if … not." },
    { id: "h2", kind: "choice", prompt: "If I ___ his number, I would call him. But I don't.", options: ["know", "knew", "would know"], answer: 1, explain: "Воображаемое настоящее — Past Simple в части с if." },
  ],
  "passive-voice": [
    { id: "h1", kind: "choice", prompt: "The accident ___ last night.", options: ["was happened", "happened", "has been happened"], answer: 1, explain: "happen не бывает в пассиве." },
    { id: "h2", kind: "choice", prompt: "I need to ___ — my hair is too long.", options: ["cut my hair", "have my hair cut", "have cut my hair"], answer: 1, explain: "Услуга, которую делает другой: have something done." },
  ],
  "gerund-infinitive": [
    { id: "h1", kind: "choice", prompt: "I'll never forget ___ the Alps for the first time.", options: ["to see", "seeing", "see"], answer: 1, explain: "forget doing — не забыть, что было." },
    { id: "h2", kind: "choice", prompt: "We stopped ___ some petrol on the way.", options: ["getting", "to get", "get"], answer: 1, explain: "stop to do — остановиться, чтобы сделать." },
  ],
  "used-to-would": [
    { id: "h1", kind: "choice", prompt: "When I was a child, I ___ a dog called Rex.", options: ["would have", "used to have", "was used to have"], answer: 1, explain: "Состояние в прошлом — только used to, would нельзя." },
    { id: "h2", kind: "choice", prompt: "Don't worry about the noise — you'll soon ___ it.", options: ["use to", "get used to", "used to"], answer: 1, explain: "get used to — привыкнуть." },
  ],
  "relative-clauses": [
    { id: "h1", kind: "choice", prompt: "My sister, ___ lives in Kazan, is a pilot.", options: ["that", "who", "—"], answer: 1, explain: "Уточняющее с запятыми: нельзя that и нельзя опускать." },
    { id: "h2", kind: "choice", prompt: "He lost his job, ___ was a shock to everyone.", options: ["what", "which", "that"], answer: 1, explain: "which — о всём предыдущем предложении." },
  ],
  "question-tags": [
    { id: "h1", kind: "choice", prompt: "Nobody called, ___?", options: ["did they", "didn't they", "did he"], answer: 0, explain: "nobody — отрицание, хвост положительный; местоимение they." },
    { id: "h2", kind: "choice", prompt: "Let's have a break, ___?", options: ["shall we", "will you", "don't we"], answer: 0, explain: "Let's → shall we." },
  ],
  "prepositions-time-place": [
    { id: "h1", kind: "choice", prompt: "I'll call you back ___ ten minutes.", options: ["after", "in", "for"], answer: 1, explain: "in + срок = «через» о будущем." },
    { id: "h2", kind: "choice", prompt: "Please send the report ___ Friday at the latest.", options: ["until", "by", "on"], answer: 1, explain: "by — не позже чем." },
  ],
  "quantifiers": [
    { id: "h1", kind: "choice", prompt: "___ of my parents speaks English — they only speak Russian.", options: ["Both", "Neither", "None"], answer: 1, explain: "Двое и ни один — neither." },
    { id: "h2", kind: "choice", prompt: "There were ___ people at the meeting than we expected.", options: ["less", "fewer", "few"], answer: 1, explain: "Исчисляемые + сравнение — fewer (в строгой норме)." },
  ],
  "obligation": [
    { id: "h1", kind: "choice", prompt: "Tomorrow is Sunday, so I ___ get up early.", options: ["mustn't", "don't have to", "haven't to"], answer: 1, explain: "Не обязательно — don't have to. mustn't = нельзя." },
    { id: "h2", kind: "choice", prompt: "Yesterday I ___ wait two hours for the doctor.", options: ["must", "had to", "musted"], answer: 1, explain: "У must нет прошедшего — had to." },
  ],
  "so-such-too-enough": [
    { id: "h1", kind: "choice", prompt: "It was ___ that we stayed inside all day.", options: ["such bad weather", "such a bad weather", "so bad weather"], answer: 0, explain: "weather неисчисляемое — such без a." },
    { id: "h2", kind: "choice", prompt: "She isn't ___ to reach the top shelf.", options: ["enough tall", "tall enough", "too tall"], answer: 1, explain: "Прилагательное + enough." },
  ],
  "past-perfect": [
    { id: "h1", kind: "choice", prompt: "When I got to the station, the train ___, so I took a taxi.", options: ["left", "had left", "was leaving"], answer: 1, explain: "The train left before I arrived — Past Perfect." },
    { id: "h2", kind: "choice", prompt: "It was the first time she ___ abroad.", options: ["was", "had been", "has been"], answer: 1, explain: "It was the first time + Past Perfect." },
  ],
  "reported-speech": [
    { id: "h1", kind: "choice", prompt: "\"Don't touch anything,\" the guide said. → The guide told us ___ anything.", options: ["don't touch", "not to touch", "to not touching"], answer: 1, explain: "Negative order: tell someone not to do." },
    { id: "h2", kind: "choice", prompt: "She asked me where ___.", options: ["did I live", "I lived", "do I live"], answer: 1, explain: "Reported questions use statement word order." },
  ],
  "conditionals-3-mixed": [
    { id: "h1", kind: "choice", prompt: "If she had taken the job in Berlin, she ___ German now.", options: ["would have spoken", "would speak", "had spoken"], answer: 1, explain: "Past condition, present result — mixed conditional." },
    { id: "h2", kind: "choice", prompt: "___ the rain, we would have finished the match.", options: ["If not", "But for", "Unless"], answer: 1, explain: "But for + noun = if it hadn't been for." },
  ],
  "modals-deduction": [
    { id: "h1", kind: "choice", prompt: "She ___ have seen us — it was completely dark.", options: ["mustn't", "can't", "shouldn't"], answer: 1, explain: "Opposite of must in deduction: can't." },
    { id: "h2", kind: "choice", prompt: "We ___ have bought so much food — only three people came.", options: ["needn't", "mustn't", "couldn't"], answer: 0, explain: "We did it, and it was unnecessary: needn't have." },
  ],
  "future-perfect-continuous": [
    { id: "h1", kind: "choice", prompt: "Call me after eight — I ___ dinner by then.", options: ["will have", "will have had", "will be having"], answer: 1, explain: "by then — completed before that moment." },
    { id: "h2", kind: "choice", prompt: "___ the car this evening? I need to know if I can take it.", options: ["Will you use", "Will you be using", "Are you use"], answer: 1, explain: "A neutral question about plans: will be doing." },
  ],
  "wish-if-only": [
    { id: "h1", kind: "choice", prompt: "I wish I ___ swim. I'd love to go diving.", options: ["can", "could", "would"], answer: 1, explain: "Present wish with can → could." },
    { id: "h2", kind: "choice", prompt: "It's high time we ___ home.", options: ["go", "went", "will go"], answer: 1, explain: "It's (high) time + past." },
  ],
  "linking-words": [
    { id: "h1", kind: "choice", prompt: "Take an umbrella with you now ___ it rains later.", options: ["if", "in case", "unless"], answer: 1, explain: "A precaution: in case." },
    { id: "h2", kind: "choice", prompt: "___ having little money, they travelled around Asia.", options: ["Although", "Despite", "However"], answer: 1, explain: "Despite + -ing." },
  ],
  "participle-clauses": [
    { id: "h1", kind: "choice", prompt: "___ the letter, she burst into tears.", options: ["Having read", "Read", "Being read"], answer: 0, explain: "Active, completed before the main action." },
    { id: "h2", kind: "choice", prompt: "Which sentence is correct?", options: ["Walking home, it started to rain.", "Walking home, I got caught in the rain.", "Walking home, the rain started."], answer: 1, explain: "The participle borrows the subject of the main clause." },
  ],
  "cleft-sentences": [
    { id: "h1", kind: "choice", prompt: "It wasn't until midnight ___ he finally arrived.", options: ["when", "that", "which"], answer: 1, explain: "It + be + focus + that." },
    { id: "h2", kind: "choice", prompt: "All I want ___ a cup of tea.", options: ["are", "is", "be"], answer: 1, explain: "All I want = the only thing I want → is." },
  ],
  "inversion": [
    { id: "h1", kind: "choice", prompt: "Only when I got home ___ that I'd lost my wallet.", options: ["I realised", "did I realise", "I did realise"], answer: 1, explain: "Only when … inverts the main clause." },
    { id: "h2", kind: "choice", prompt: "Not long ago, ___ an old friend in the street.", options: ["did I meet", "I met", "met I"], answer: 1, explain: "Not long ago is just a time phrase — no inversion." },
  ],
  "emphasis": [
    { id: "h1", kind: "choice", prompt: "The film was ___ amazing.", options: ["very", "absolutely", "a bit"], answer: 1, explain: "Extreme adjectives take absolutely, not very." },
    { id: "h2", kind: "choice", prompt: "— You never listen to me. — That's not true! I ___ listen!", options: ["do", "am", "does"], answer: 0, explain: "Emphatic do contradicts." },
  ],
};
