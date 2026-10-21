import type { Era } from "../types";

// Эпоха и вопрос для карточки Anki к каждой «Истории про язык».
// Вопрос — на языке истории: A1–B1 по-русски, B2+ по-английски.
export const STORY_META: Record<string, { era: Era; question: string }> = {
  "to-be": { era: "old", question: "Почему у глагола be такие непохожие формы: be, am, is, was?" },
  "have-got": { era: "early-modern", question: "Почему «I've got a car» значит «у меня есть машина» и откуда американское gotten?" },
  "there-is-are": { era: "modern", question: "Почему носители часто говорят «There's two cars», хотя по правилам there are?" },
  "plurals": { era: "middle", question: "Почему children, а не childs, и откуда окончание -s у множественного числа?" },
  "possessives": { era: "old", question: "Что прячется за апострофом в the king's crown?" },
  "countable-uncountable": { era: "early-modern", question: "Откуда взялось слово pea («горошина»)?" },
  "can-could": { era: "early-modern", question: "Почему в could пишется l, которую не произносят?" },
  "past-simple-basics": { era: "middle", question: "Почему прошедшее время от go — went?" },
  "comparatives": { era: "early-modern", question: "Почему у Шекспира the most unkindest cut и откуда два способа сравнения: -er и more?" },
  "present-simple-continuous": { era: "early-modern", question: "Из какого оборота выросла форма is + -ing?" },
  "past-simple-continuous": { era: "old", question: "Откуда взялось окончание -ed и почему есть неправильные глаголы?" },
  "present-perfect-past-simple": { era: "old", question: "Что буквально значил Present Perfect: I have the letter written?" },
  "present-perfect-continuous": { era: "modern", question: "Почему американец может сказать Did you eat yet?, а британец — Have you eaten yet?" },
  "future-forms": { era: "middle", question: "Как going to («иду, чтобы») стало будущим временем?" },
  "articles": { era: "old", question: "От каких слов произошли артикли the и a?" },
  "conditionals-1-2": { era: "old", question: "Почему If I were you, а не If I was?" },
  "passive-voice": { era: "modern", question: "Как раньше говорили вместо The house is being built?" },
  "past-perfect": { era: "early-modern", question: "Why is the Past Perfect also called the pluperfect?" },
  "reported-speech": { era: "modern", question: "Where does quotative like (And she was like, “No way!”) come from?" },
  "conditionals-3-mixed": { era: "modern", question: "Why do native speakers sometimes write would of instead of would have?" },
  "modals-deduction": { era: "old", question: "Why do modal verbs never take -s (he can, not he cans)?" },
  "gerund-infinitive": { era: "old", question: "Чем было to перед глаголом в древнеанглийском?" },
  "used-to-would": { era: "modern", question: "Откуда взялось used to и почему пишут use to после did?" },
  "relative-clauses": { era: "old", question: "Какое слово старше в роли «который»: that или who?" },
  "prepositions-time-place": { era: "early-modern", question: "Почему знак @ по-английски читается at?" },
  "quantifiers": { era: "modern", question: "Кто придумал правило fewer с исчисляемыми, less с неисчисляемыми?" },
  "question-tags": { era: "modern", question: "Что такое innit, eh и right в живом английском?" },
  "wish-if-only": { era: "old", question: "Which old grammar form hides in I wish I were and God save the King?" },
  "inversion": { era: "old", question: "Why does English invert after Never and Only then?" },
  "cleft-sentences": { era: "modern", question: "Why do Irish speakers say It's tired I am?" },
  "participle-clauses": { era: "early-modern", question: "What is a dangling participle?" },
  "future-perfect-continuous": { era: "modern", question: "Where does the old shall / will rule come from?" },
  "linking-words": { era: "middle", question: "Which phrases are hidden in because, although and however?" },
  "emphasis": { era: "early-modern", question: "Why can we say I do know for emphasis?" },
  "obligation": { era: "old", question: "Что когда-то значило should?" },
  "so-such-too-enough": { era: "early-modern", question: "Как из одного слова to получилось ещё и too?" },
};

// Подписи и годы эпох; строка-эпиграф — на языке эпохи, из общественного достояния.
export const ERA_INFO: Record<Era, { title: string; years: string; line: string; source: string }> = {
  "old": {
    title: "Древнеанглийский",
    years: "450–1100",
    line: "Fæder ūre þū þe eart on heofonum",
    source: "«Отче наш», уэссекский перевод, около 1000 года",
  },
  "middle": {
    title: "Среднеанглийский",
    years: "1100–1500",
    line: "Whan that Aprille with his shoures soote",
    source: "Джеффри Чосер, «Кентерберийские рассказы», около 1390 года",
  },
  "early-modern": {
    title: "Ранненовоанглийский",
    years: "1500–1700",
    line: "What do you read, my lord?",
    source: "Уильям Шекспир, «Гамлет», около 1600 года",
  },
  "modern": {
    title: "Современный английский",
    years: "с 1700",
    line: "Language is the dress of thought.",
    source: "Сэмюэл Джонсон, «Жизнеописания поэтов», 1779",
  },
};
