import type { Exercise } from "../../../types";

// Blocknamen, wiederkehrende Anweisungen, Erklärungen zu den „Fallen“ und eigene Fallen für Deutschsprachige.
export const blocks: Record<string, string> = {
  "basics": "Grundlagen",
  "nouns": "Nomen",
  "verbs-basic": "Können, Vergangenheit, Vergleiche",
  "tenses-basic": "Gegenwart und Vergangenheit",
  "future-articles": "Zukunft und Artikel",
  "conditionals-passive": "Bedingungssätze und Passiv",
  "verb-patterns": "Verbformen",
  "linking": "Verknüpfungen und Fragen",
  "small-words": "Kleine Wörter",
  "everyday-modals": "Müssen und zu viel",
};

export const phrases: Record<string, string> = {
  "Вставь артикли": "Setze die Artikel ein",
  "Добавь last year и измени время": "Ergänze last year und ändere die Zeitform",
  "Добавь хвостик": "Ergänze das Frageanhängsel (question tag)",
  "Задай вопрос с How long": "Stelle eine Frage mit How long",
  "Замени a car на a bus": "Ersetze a car durch a bus",
  "Замени in the morning на точное время (8 o'clock)": "Ersetze in the morning durch eine genaue Uhrzeit (8 o'clock)",
  "Замени much / many на a lot of": "Ersetze much / many durch a lot of",
  "Замени on Friday на next week": "Ersetze on Friday durch next week",
  "Перепиши в Past Simple (yesterday)": "Schreibe im Past Simple (yesterday)",
  "Перепиши в единственном числе": "Schreibe im Singular",
  "Перепиши в пассиве": "Schreibe im Passiv",
  "Перепиши в превосходной степени (in the family)": "Schreibe im Superlativ (in the family)",
  "Перепиши в прошлом": "Schreibe in der Vergangenheit",
  "Перепиши вежливее с could": "Schreibe höflicher mit could",
  "Перепиши во множественном числе": "Schreibe im Plural",
  "Перепиши во множественном числе (two)": "Schreibe im Plural (two)",
  "Перепиши как план (going to)": "Schreibe als Plan (going to)",
  "Перепиши с 's": "Schreibe mit 's",
  "Перепиши с a piece of": "Schreibe mit a piece of",
  "Перепиши с already": "Schreibe mit already",
  "Перепиши с be used to": "Schreibe mit be used to",
  "Перепиши с both": "Schreibe mit both",
  "Перепиши с don't have to": "Schreibe mit don't have to",
  "Перепиши с have got": "Schreibe mit have got",
  "Перепиши с hers / his / …": "Schreibe mit hers / his / …",
  "Перепиши с mine / yours / …": "Schreibe mit mine / yours / …",
  "Перепиши с neither … nor": "Schreibe mit neither … nor",
  "Перепиши с none of": "Schreibe mit none of",
  "Перепиши с not as … as": "Schreibe mit not as … as",
  "Перепиши с promised + to": "Schreibe mit promised + to",
  "Перепиши с should (совет)": "Schreibe mit should (Rat)",
  "Перепиши с stopped + -ing": "Schreibe mit stopped + -ing",
  "Перепиши с such": "Schreibe mit such",
  "Перепиши с suggested + -ing": "Schreibe mit suggested + -ing",
  "Перепиши с too": "Schreibe mit too",
  "Перепиши с unless": "Schreibe mit unless",
  "Перепиши с used to": "Schreibe mit used to",
  "Перепиши со сравнительной степенью": "Schreibe mit dem Komparativ",
  "Перепиши так, чтобы речь шла о том, что происходит сейчас (now)": "Schreibe so, dass es um das geht, was gerade passiert (now)",
  "Перепиши, начав с Despite": "Schreibe den Satz neu und beginne mit Despite",
  "Перепиши, начав с Never": "Schreibe den Satz neu und beginne mit Never",
  "Перепиши, начав с What": "Schreibe den Satz neu und beginne mit What",
  "Перепиши, сделав акцент на длительности (for two hours)": "Schreibe mit Betonung der Dauer (for two hours)",
  "Перескажи в косвенной речи": "Gib es in indirekter Rede wieder",
  "Сделай вопрос": "Bilde eine Frage",
  "Сделай вопрос с How much / How many": "Bilde eine Frage mit How much / How many",
  "Сделай вопрос с do": "Bilde eine Frage mit do",
  "Сделай отрицание": "Bilde eine Verneinung",
  "Сделай отрицание с have got": "Bilde eine Verneinung mit have got",
  "Сделай ситуацию воображаемой (Second Conditional)": "Mache die Situation hypothetisch (Second Conditional)",
  "Соедини в одно предложение через while": "Verbinde zu einem Satz mit while",
  "Соедини через so … that": "Verbinde mit so … that",
  "Соедини через where": "Verbinde mit where",
  "Соедини через who": "Verbinde mit who",
  "Соедини через whose": "Verbinde mit whose",
  "два артикля через пробел": "zwei Artikel mit Leerzeichen",
  "два слова через пропуски: were … doing": "zwei Wörter mit Leerzeichen: were … doing",
};

export const traps: Record<string, Record<string, string>> = {
  "basics": {
    t1: "milk ist unzählbar → Is there.",
    t3: "In der bejahenden Kurzantwort wird nicht zusammengezogen.",
    t5: "Etwas schon Bekanntes beschreiben wir mit it.",
    t6: "have breakfast ist eine Handlung – ohne got.",
  },
  "nouns": { t5: "very few – sehr wenige (zählbar)." },
  "tenses-basic": {
    t4: "Eine Kette von Ereignissen – Past Simple.",
    t6: "Ein Vorgang zu einem Zeitpunkt in der Vergangenheit.",
  },
  "future-articles": { t2: "Entscheidung im Moment des Sprechens – will." },
  "linking": { t2: "Objekt – das Relativpronomen kann wegfallen." },
};

// Typische Fehler von Deutschsprachigen: Lehnübersetzungen aus dem Deutschen.
export const extraTraps: Record<string, Exercise[]> = {
  "basics": [
    { id: "de1", kind: "choice", prompt: "You ___ right, I was wrong.", options: ["have", "are", "make"], answer: 1, explain: "„Du hast recht“ heißt you are right, nicht „you have right“." },
    { id: "de2", kind: "choice", prompt: "I ___ afraid of dogs.", options: ["have", "am", "do"], answer: 1, explain: "„Ich habe Angst“ → I'm afraid. Ebenso: I'm hungry, I'm thirsty." },
  ],
  "nouns": [
    { id: "de1", kind: "fix", prompt: "Can you give me an information?", answers: ["Can you give me some information?", "Can you give me a piece of information?", "Can you give me information?"], explain: "information ist im Englischen unzählbar: kein a, kein -s." },
    { id: "de2", kind: "choice", prompt: "Your trousers ___ too long.", options: ["is", "are", "was"], answer: 1, explain: "„Die Hose ist“ – aber trousers ist im Englischen Plural: are." },
  ],
  "verbs-basic": [
    { id: "de1", kind: "choice", prompt: "Yesterday I ___ a new phone.", options: ["became", "got", "become"], answer: 1, explain: "„bekommen“ ist get, nicht become. become heißt „werden“." },
  ],
  "tenses-basic": [
    { id: "de1", kind: "fix", prompt: "I have seen him yesterday.", answers: ["I saw him yesterday."], explain: "Mit yesterday, last week, in 2019 steht im Englischen Past Simple, auch wenn man im Deutschen das Perfekt benutzt." },
    { id: "de2", kind: "choice", prompt: "Listen! Somebody ___ at the door.", options: ["knocks", "is knocking", "knock"], answer: 1, explain: "Im Deutschen gibt es keine Verlaufsform: „Jemand klopft“. Was gerade passiert, steht im Englischen im Present Continuous." },
  ],
  "perfect": [
    { id: "de1", kind: "fix", prompt: "I live here since two years.", answers: ["I have lived here for two years.", "I've lived here for two years.", "I have been living here for two years.", "I've been living here for two years."], explain: "„seit zwei Jahren“: für eine Dauer steht for, für einen Zeitpunkt since – und die Zeitform ist Present Perfect." },
  ],
  "future-articles": [
    { id: "de1", kind: "choice", prompt: "I ___ a coffee, please.", options: ["will", "would like", "want to"], answer: 1, explain: "„Ich will“ ist nicht will. will drückt Zukunft aus; höflich bestellt man mit I'd like." },
  ],
  "verb-patterns": [
    { id: "de1", kind: "fix", prompt: "I look forward to see you.", answers: ["I look forward to seeing you.", "I'm looking forward to seeing you.", "I am looking forward to seeing you."], explain: "Nach look forward to steht -ing: to ist hier eine Präposition." },
  ],
  "linking": [
    { id: "de1", kind: "fix", prompt: "I think, that he is right.", answers: ["I think that he is right.", "I think he is right.", "I think he's right.", "I think that he's right."], explain: "Vor that steht im Englischen kein Komma – anders als vor „dass“." },
  ],
  "small-words": [
    { id: "de1", kind: "choice", prompt: "She is married ___ a doctor.", options: ["with", "to", "by"], answer: 1, explain: "„verheiratet mit“ heißt married to, nicht „married with“." },
  ],
  "everyday-modals": [
    { id: "de1", kind: "choice", prompt: "You ___ smoke here. It's not allowed.", options: ["mustn't", "don't have to", "needn't"], answer: 0, explain: "„Du musst nicht“ heißt don't have to (keine Pflicht). Verboten ist mustn't – „du darfst nicht“." },
  ],
};
