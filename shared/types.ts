// Общие типы приложения.
//
// Данные живут в ~/.eng-teacher/, у каждого файла ровно один «владелец»,
// чтобы приложение и модель никогда не перетирали записи друг друга:
//   приложение:  progress.json, settings.json, anki-words.json, highlights.json
//   Rust-фон:     reminder-state.json

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Level = (typeof LEVELS)[number];

// Теория A1–B1 на русском, B2+ на английском. Ловушка всегда на русском.
export const theoryLang = (level: Level): "ru" | "en" =>
  LEVELS.indexOf(level) <= LEVELS.indexOf("B1") ? "ru" : "en";

// Все задания проверяются без нейросети: у каждого есть эталонные ответы.
// hard — задание повышенной сложности: их больше при повторе хорошо пройденного урока.
type Common = { id: string; explain?: string; hard?: boolean };
export type Exercise = Common & (
  | { kind: "choice"; prompt: string; options: string[]; answer: number }
  // prompt содержит ___ на месте пропуска; answers — все допустимые варианты
  | { kind: "gap"; prompt: string; answers: string[]; hint?: string }
  // words показываются перемешанными; answer — правильное предложение;
  // form называет, что собрать, и задаёт знак в конце (у фраз из Anki знака нет)
  | { kind: "order"; form: OrderForm; prompt?: string; words: string[]; answer: string }
  // prompt — предложение с ошибкой; answers — исправленные варианты
  | { kind: "fix"; prompt: string; answers: string[] }
  // task — инструкция («Перепиши в пассиве»), source — исходное предложение
  | { kind: "transform"; task: string; source: string; answers: string[] }
);

export type OrderForm = "statement" | "question" | "negative" | "phrase";

export type ExerciseKind = Exercise["kind"];

// Сколько заданий из банка урока выдаётся за один проход.
export const PRACTICE_SIZE = 10;

export type TheoryBlock = {
  title?: string;
  // мини-разметка: **жирный**, `конструкция`, пустая строка = абзац
  text: string;
  examples?: { en: string; ru?: string }[];
  // типичная ловушка для русскоговорящих, всегда на русском
  trap?: string;
  // подача «подробно»: дополнительные абзацы после text
  more?: string;
  // глосса «Почему так?» — историческое пояснение к блоку, на полях
  why?: string;
};

// Эпохи английского для ленты «История языка».
export const ERAS = ["old", "middle", "early-modern", "modern"] as const;
export type Era = (typeof ERAS)[number];

// «История про язык» — почему в английском так. Открывается после практики.
export type Story = {
  title: string;
  // та же мини-разметка, что в теории; подача «кратко»
  text: string;
  // подача «подробно»: полная версия, заменяет text
  long?: string;
  // одна фраза-вывод в конце
  takeaway?: string;
  // эпоха, о которой история
  era: Era;
  // вопрос для карточки Anki; ответ — takeaway
  question: string;
};

export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  // тема для освоенности и рекомендаций: несколько уроков могут делить тему
  topic: string;
  theory: TheoryBlock[];
  // банк из 15–20 заданий, в урок попадает случайная выборка PRACTICE_SIZE
  exercises: Exercise[];
  story?: Story;
};

// Так уроки и истории записаны в файлах контента; эпоха, вопрос и подробная
// версия истории подмешиваются в каталоге (lessons/index.ts).
export type StorySource = Omit<Story, "era" | "question" | "long">;
export type LessonSource = Omit<Lesson, "story"> & { story?: StorySource };

// Блок — группа уроков с контрольной в конце.
export type LessonBlock = {
  id: string;
  title: string;
  level: Level;
  lessonIds: string[];
};

// Вопрос тестов: обычное задание с уровнем и темой.
export type TestQuestion = Exercise & { level: Level; topic: string };

// block — контрольная финала блока, traps — «ловушки», blitz — блиц (с blockId — по блоку)
export type TestKind = "placement" | "block" | "monthly" | "traps" | "blitz";

export type TestResult = {
  kind: TestKind;
  at: string;
  blockId?: string;
  correct: number;
  total: number;
  // для placement и monthly — оценённый уровень
  level?: Level;
  // для блица — сколько миллисекунд заняло
  ms?: number;
  byTopic: Record<string, { correct: number; total: number }>;
};

// Порог контрольной после блока.
export const BLOCK_PASS_RATIO = 0.8;

// Освоенность темы: скользящая оценка 0..1 по последним ответам.
export type TopicMastery = { score: number; answered: number; updatedAt: string };

// Интервалы повторения ошибок в днях.
export const REVIEW_INTERVALS = [1, 3, 7, 21] as const;

// Ошибка в очереди на повторение. stage — индекс в REVIEW_INTERVALS;
// верный ответ на последнем шаге убирает элемент из очереди.
export type ReviewItem = {
  lessonId: string;
  exerciseId: string;
  given: string;
  firstAt: string;
  dueAt: string;
  stage: number;
};

export type LessonProgress = { completedAt: string; score: number; total: number; attempts: number };

export type Progress = {
  level?: { value: Level; source: TestKind; at: string };
  lessons: Record<string, LessonProgress>;
  topics: Record<string, TopicMastery>;
  reviews: ReviewItem[];
  tests: TestResult[];
  // id уроков с открытой «Историей про язык»
  stories: string[];
  // истории, отправленные в Anki
  storiesInAnki?: string[];
  // ISO-даты занятий, из них считается серия недель
  activity: string[];
  // подсказка для фонового напоминания в Rust: текущий блок и сколько уроков осталось
  nextBlock?: { title: string; lessonsLeft: number };
  // подсказка для напоминания: название следующего урока
  nextLesson?: string;
};

export type AnkiWord = { front: string; back: string; lapses: number; ivl: number; reps: number };

// Слово, которое ждёт добавления через AnkiConnect, пока Anki закрыт.
// deck — своя колода (заметки, истории); без неё — колода из настроек.
export type AnkiQueueItem = { front: string; back: string; source: "lesson" | "ngsl" | "note" | "story"; addedAt: string; deck?: string };

export type AnkiCache = { syncedAt: string; deck: string; words: AnkiWord[]; queue: AnkiQueueItem[] };

export type Depth = "short" | "long";

export type Settings = {
  ankiPath?: string;
  ankiDeck: string;
  // дни напоминаний: 0 = воскресенье … 6 = суббота
  reminderDays: number[];
  // время напоминания в минутах от полуночи
  reminderMinutes: number;
  remindersEnabled: boolean;
  autostart: boolean;
  theme: "system" | "light" | "dark";
  // подача теории и историй: кратко или подробно
  theoryDepth: Depth;
  storyDepth: Depth;
  // мастер первого запуска пройден
  onboarded: boolean;
  // устаревшее: еженедельное напоминание до перехода на дни недели
  reminderWeekday?: number;
  reminderHour?: number;
};

// Сохранённый фрагмент урока. part — где он: "theory:0", "story", "why:2".
// start — смещение в тексте части (подсказка), text — сам фрагмент: по нему
// фрагмент находится, даже если текст урока поправили.
export type Highlight = {
  id: string;
  lessonId: string;
  part: string;
  start: number;
  text: string;
  createdAt: string;
  // когда отправлен в Anki
  ankiAt?: string;
};

export type HighlightsFile = { items: Highlight[] };


export const DEFAULT_SETTINGS: Settings = {
  ankiDeck: "english",
  reminderDays: [0, 1, 2, 3, 4, 5, 6],
  reminderMinutes: 19 * 60,
  remindersEnabled: true,
  autostart: true,
  theme: "system",
  theoryDepth: "short",
  storyDepth: "short",
  onboarded: false,
};

// Колоды Anki для заметок и историй.
export const NOTES_DECK = "Hoard::Заметки";
export const STORIES_DECK = "Hoard::Истории";

export const EMPTY_PROGRESS: Progress = {
  lessons: {},
  topics: {},
  reviews: [],
  tests: [],
  stories: [],
  activity: [],
};
