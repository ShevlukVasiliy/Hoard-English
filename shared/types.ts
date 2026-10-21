// Общие типы приложения.
//
// Данные живут в ~/.eng-teacher/, у каждого файла ровно один «владелец»,
// чтобы приложение и модель никогда не перетирали записи друг друга:
//   приложение:  progress.json, settings.json, anki-words.json
//   Rust-фон:     reminder-state.json

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Level = (typeof LEVELS)[number];

// Теория A1–B1 на русском, B2+ на английском. Ловушка всегда на русском.
export const theoryLang = (level: Level): "ru" | "en" =>
  LEVELS.indexOf(level) <= LEVELS.indexOf("B1") ? "ru" : "en";

// Все задания проверяются без нейросети: у каждого есть эталонные ответы.
export type Exercise =
  | { id: string; kind: "choice"; prompt: string; options: string[]; answer: number; explain?: string }
  // prompt содержит ___ на месте пропуска; answers — все допустимые варианты
  | { id: string; kind: "gap"; prompt: string; answers: string[]; hint?: string; explain?: string }
  // words показываются перемешанными; answer — правильное предложение;
  // form называет, что собрать, и задаёт знак в конце (у фраз из Anki знака нет)
  | { id: string; kind: "order"; form: OrderForm; prompt?: string; words: string[]; answer: string; explain?: string }
  // prompt — предложение с ошибкой; answers — исправленные варианты
  | { id: string; kind: "fix"; prompt: string; answers: string[]; explain?: string }
  // task — инструкция («Перепиши в пассиве»), source — исходное предложение
  | { id: string; kind: "transform"; task: string; source: string; answers: string[]; explain?: string };

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
};

// «История про язык» — почему в английском так. Открывается после практики.
export type Story = {
  title: string;
  // та же мини-разметка, что в теории
  text: string;
  // одна фраза-вывод в конце
  takeaway?: string;
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

// Блок — группа уроков с контрольной в конце.
export type LessonBlock = {
  id: string;
  title: string;
  level: Level;
  lessonIds: string[];
};

// Вопрос тестов: обычное задание с уровнем и темой.
export type TestQuestion = Exercise & { level: Level; topic: string };

export type TestKind = "placement" | "block" | "monthly";

export type TestResult = {
  kind: TestKind;
  at: string;
  blockId?: string;
  correct: number;
  total: number;
  // для placement и monthly — оценённый уровень
  level?: Level;
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
  // ISO-даты занятий, из них считается серия недель
  activity: string[];
  // подсказка для фонового напоминания в Rust: текущий блок и сколько уроков осталось
  nextBlock?: { title: string; lessonsLeft: number };
};

export type AnkiWord = { front: string; back: string; lapses: number; ivl: number; reps: number };

// Слово, которое ждёт добавления через AnkiConnect, пока Anki закрыт.
export type AnkiQueueItem = { front: string; back: string; source: "lesson" | "ngsl"; addedAt: string };

export type AnkiCache = { syncedAt: string; deck: string; words: AnkiWord[]; queue: AnkiQueueItem[] };

export type Settings = {
  ankiPath?: string;
  ankiDeck: string;
  // 0 = воскресенье … 6 = суббота
  reminderWeekday: number;
  reminderHour: number;
  remindersEnabled: boolean;
  autostart: boolean;
  theme: "system" | "light" | "dark";
};


export const DEFAULT_SETTINGS: Settings = {
  ankiDeck: "english",
  reminderWeekday: 0,
  reminderHour: 11,
  remindersEnabled: true,
  autostart: true,
  theme: "system",
};

export const EMPTY_PROGRESS: Progress = {
  lessons: {},
  topics: {},
  reviews: [],
  tests: [],
  stories: [],
  activity: [],
};
