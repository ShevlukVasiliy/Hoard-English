import type { Exercise } from "../../../types";

// Nazwy bloków, powtarzające się polecenia, objaśnienia „pułapek” i własne pułapki dla Polaków.
export const blocks: Record<string, string> = {
  "basics": "Podstawy",
  "nouns": "Rzeczowniki",
  "verbs-basic": "Umiejętności, przeszłość, porównania",
  "tenses-basic": "Teraźniejszość i przeszłość",
  "future-articles": "Przyszłość i przedimki",
  "conditionals-passive": "Okresy warunkowe i strona bierna",
  "verb-patterns": "Formy czasownika",
  "linking": "Łączniki i pytania",
  "small-words": "Małe słowa",
  "everyday-modals": "Musieć i za dużo",
};

export const phrases: Record<string, string> = {
  "Вставь артикли": "Wstaw przedimki",
  "Добавь last year и измени время": "Dodaj last year i zmień czas",
  "Добавь хвостик": "Dodaj końcówkę pytającą (question tag)",
  "Задай вопрос с How long": "Zadaj pytanie z How long",
  "Замени a car на a bus": "Zamień a car na a bus",
  "Замени in the morning на точное время (8 o'clock)": "Zamień in the morning na dokładną godzinę (8 o'clock)",
  "Замени much / many на a lot of": "Zamień much / many na a lot of",
  "Замени on Friday на next week": "Zamień on Friday na next week",
  "Перепиши в Past Simple (yesterday)": "Przepisz w Past Simple (yesterday)",
  "Перепиши в единственном числе": "Przepisz w liczbie pojedynczej",
  "Перепиши в пассиве": "Przepisz w stronie biernej",
  "Перепиши в превосходной степени (in the family)": "Przepisz w stopniu najwyższym (in the family)",
  "Перепиши в прошлом": "Przepisz w czasie przeszłym",
  "Перепиши вежливее с could": "Przepisz grzeczniej z could",
  "Перепиши во множественном числе": "Przepisz w liczbie mnogiej",
  "Перепиши во множественном числе (two)": "Przepisz w liczbie mnogiej (two)",
  "Перепиши как план (going to)": "Przepisz jako plan (going to)",
  "Перепиши с 's": "Przepisz z 's",
  "Перепиши с a piece of": "Przepisz z a piece of",
  "Перепиши с already": "Przepisz z already",
  "Перепиши с be used to": "Przepisz z be used to",
  "Перепиши с both": "Przepisz z both",
  "Перепиши с don't have to": "Przepisz z don't have to",
  "Перепиши с have got": "Przepisz z have got",
  "Перепиши с hers / his / …": "Przepisz z hers / his / …",
  "Перепиши с mine / yours / …": "Przepisz z mine / yours / …",
  "Перепиши с neither … nor": "Przepisz z neither … nor",
  "Перепиши с none of": "Przepisz z none of",
  "Перепиши с not as … as": "Przepisz z not as … as",
  "Перепиши с promised + to": "Przepisz z promised + to",
  "Перепиши с should (совет)": "Przepisz z should (rada)",
  "Перепиши с stopped + -ing": "Przepisz ze stopped + -ing",
  "Перепиши с such": "Przepisz z such",
  "Перепиши с suggested + -ing": "Przepisz z suggested + -ing",
  "Перепиши с too": "Przepisz z too",
  "Перепиши с unless": "Przepisz z unless",
  "Перепиши с used to": "Przepisz z used to",
  "Перепиши со сравнительной степенью": "Przepisz w stopniu wyższym",
  "Перепиши так, чтобы речь шла о том, что происходит сейчас (now)": "Przepisz tak, żeby chodziło o to, co dzieje się teraz (now)",
  "Перепиши, начав с Despite": "Przepisz, zaczynając od Despite",
  "Перепиши, начав с Never": "Przepisz, zaczynając od Never",
  "Перепиши, начав с What": "Przepisz, zaczynając od What",
  "Перепиши, сделав акцент на длительности (for two hours)": "Przepisz, podkreślając czas trwania (for two hours)",
  "Перескажи в косвенной речи": "Przekaż w mowie zależnej",
  "Сделай вопрос": "Utwórz pytanie",
  "Сделай вопрос с How much / How many": "Utwórz pytanie z How much / How many",
  "Сделай вопрос с do": "Utwórz pytanie z do",
  "Сделай отрицание": "Utwórz przeczenie",
  "Сделай отрицание с have got": "Utwórz przeczenie z have got",
  "Сделай ситуацию воображаемой (Second Conditional)": "Zrób z tego sytuację wyobrażoną (Second Conditional)",
  "Соедини в одно предложение через while": "Połącz w jedno zdanie za pomocą while",
  "Соедини через so … that": "Połącz za pomocą so … that",
  "Соедини через where": "Połącz za pomocą where",
  "Соедини через who": "Połącz za pomocą who",
  "Соедини через whose": "Połącz za pomocą whose",
  "два артикля через пробел": "dwa przedimki oddzielone spacją",
  "два слова через пропуски: were … doing": "dwa słowa oddzielone spacją: were … doing",
};

export const traps: Record<string, Record<string, string>> = {
  "basics": {
    t1: "milk jest niepoliczalne → Is there.",
    t3: "W twierdzącej krótkiej odpowiedzi bez skrótu.",
    t5: "Coś już znanego opisujemy przez it.",
    t6: "have breakfast to czynność – bez got.",
  },
  "nouns": { t5: "very few – bardzo mało (policzalne)." },
  "tenses-basic": {
    t4: "Ciąg zdarzeń – Past Simple.",
    t6: "Czynność w toku w danym momencie przeszłości.",
  },
  "future-articles": { t2: "Decyzja w chwili mówienia – will." },
  "linking": { t2: "Dopełnienie – zaimek można pominąć." },
};

// Błędy typowe dla Polaków: kalki z polskiego.
export const extraTraps: Record<string, Exercise[]> = {
  "basics": [
    { id: "pl1", kind: "choice", prompt: "I ___ 30 years old.", options: ["have", "am", "has"], answer: 1, explain: "„Mam 30 lat” to I am 30, nie „I have 30 years”." },
    { id: "pl2", kind: "choice", prompt: "You ___ right.", options: ["have", "are", "make"], answer: 1, explain: "„Masz rację” to you are right, nie „you have right”." },
    { id: "pl3", kind: "fix", prompt: "Is cold today.", answers: ["It is cold today.", "It's cold today."], explain: "„Jest zimno” – po angielsku podmiot jest obowiązkowy: It's cold." },
  ],
  "nouns": [
    { id: "pl1", kind: "fix", prompt: "Can you give me an advice?", answers: ["Can you give me some advice?", "Can you give me a piece of advice?", "Can you give me advice?"], explain: "„Rada” jest policzalna, ale advice – nie: some advice, a piece of advice." },
    { id: "pl2", kind: "choice", prompt: "The news ___ good.", options: ["is", "are", "were"], answer: 0, explain: "„Wiadomości są” – ale news to po angielsku liczba pojedyncza: is." },
  ],
  "tenses-basic": [
    { id: "pl1", kind: "choice", prompt: "Look! It ___.", options: ["rains", "is raining", "raining"], answer: 1, explain: "„Pada” – teraz, na naszych oczach: Present Continuous." },
  ],
  "perfect": [
    { id: "pl1", kind: "fix", prompt: "I know her since 2018.", answers: ["I have known her since 2018.", "I've known her since 2018."], explain: "„Znam ją od 2018 roku” – po polsku czas teraźniejszy, po angielsku Present Perfect: stan trwa do dziś." },
  ],
  "future-articles": [
    { id: "pl1", kind: "fix", prompt: "I am student.", answers: ["I am a student.", "I'm a student."], explain: "W polskim nie ma przedimków, a w angielskim rzeczownik policzalny w liczbie pojedynczej potrzebuje a/an." },
  ],
  "small-words": [
    { id: "pl1", kind: "choice", prompt: "I'll see you ___ Friday.", options: ["in", "on", "at"], answer: 1, explain: "„W piątek” – z dniami tygodnia on, nie in." },
  ],
  "everyday-modals": [
    { id: "pl1", kind: "fix", prompt: "You must to see this film.", answers: ["You must see this film."], explain: "Po must, can, should czasownik bez to." },
  ],
};
