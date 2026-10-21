import type { Story } from "../types";

// «История про язык» для каждого урока. Язык — как у теории урока:
// A1–B1 по-русски, B2+ по-английски.
export const STORIES: Record<string, Story> = {
  "present-simple-continuous": {
    title: "Как человек оказался «на охоте»",
    text: "Шекспир ещё спокойно писал `What do you read, my lord?` — так Полоний спрашивает Гамлета, что тот читает прямо сейчас. Present Continuous тогда был редкостью, и простое настоящее работало за оба времени, как в русском.\n\nСама форма `is + -ing` выросла из оборота с предлогом: `he is on hunting` — «он на охоте». Предлог стёрся до `a-` (`he is a-hunting`, так до сих пор говорят в песнях и диалектах), а потом исчез совсем.\n\nВ XVIII–XIX веках Continuous стал обязательным для «прямо сейчас», и `What do you read?` начало звучать как «Что ты вообще читаешь?».",
    takeaway: "-ing когда-то значило «нахожусь в процессе», буквально «на» деле.",
  },
  "past-simple-continuous": {
    title: "Откуда взялось -ed",
    text: "Самые старые английские глаголы меняют прошедшее время гласной внутри: `sing — sang`, `drive — drove`, `ride — rode`. Этому способу тысячи лет, он есть и в немецком (`singen — sang`).\n\nУ германских языков появился и новый способ — приставить к глаголу зубной звук: `-ed`, в немецком `-te`, в готском `-da`. Одна из гипотез: это остаток глагола «делать», то есть `loved` когда-то значило что-то вроде «любить сделал».\n\nНовый способ оказался удобнее, и почти все новые глаголы получают `-ed`: `googled`, `texted`. А старые неправильные понемногу сдаются: `helped` вытеснило `holp`, `climbed` — `clomb`.",
    takeaway: "Неправильные глаголы — не исключения, а самые древние глаголы языка.",
  },
  "present-perfect-past-simple": {
    title: "Когда have значило «иметь»",
    text: "В древнеанглийском фраза вроде `I have the letter written` значила буквально «у меня есть письмо, написанное». То есть «имею результат». Порядок слов сдвинулся, и получилось `I have written the letter` — так и родился Present Perfect.\n\nПоэтому он про **результат сейчас**: у тебя *есть* написанное письмо.\n\nС глаголами движения раньше использовали не `have`, а `be`: `He is come`, `The Lord is risen` — следы этого остались в старых текстах и молитвах. В немецком и французском такой выбор между «иметь» и «быть» жив до сих пор.",
    takeaway: "Present Perfect — это «имею сделанное».",
  },
  "present-perfect-continuous": {
    title: "Did you eat yet?",
    text: "Британец спросит `Have you eaten yet?`, а американец часто скажет `Did you eat yet?` — и это не ошибка, а норма американского английского.\n\nВ американском варианте с `just, already, yet` прошедшее простое звучит естественно: `I just saw him`, `Did you finish already?`. Британцы в тех же фразах обычно выбирают Present Perfect.\n\nВ экзаменах и учебниках всё равно ждут британского варианта, но если в сериале услышишь `I already ate`, знай: это не небрежность, а другая норма.",
    takeaway: "Граница между Perfect и Past Simple в Америке и Британии проходит по-разному.",
  },
  "future-forms": {
    title: "Как «иду» стало «буду»",
    text: "`I'm going to see him` в XV веке значило ровно то, что написано: «я иду (куда-то), чтобы увидеть его». Человек физически шёл.\n\nНо кто идёт что-то сделать, тот это сделает скоро. Смысл движения выветрился, осталось намерение — и `going to` стало будущим временем. Сегодня можно сказать `It's going to rain`, хотя дождь никуда не идёт. В речи оборот сжался до `gonna`.\n\nУ `will` похожая судьба: древнеанглийское `willan` значило «хотеть». В немецком `ich will` до сих пор — «я хочу», а не «я буду».",
    takeaway: "Будущее в английском собрано из «хочу» и «иду».",
  },
  articles: {
    title: "the — это that, a — это one",
    text: "Артиклей в древнеанглийском не было. Было указательное слово `se / seo / þæt` — «тот, та, то». Со временем оно ослабло до `the`, а форма `þæt` осталась как `that`. Так что `the` и `that` — родственники.\n\n`a / an` — это ослабленное `ān`, «один». Отсюда `an` перед гласной: исходное `n` удержалось там, где было удобно.\n\nИногда `n` перескакивало: `a napron` услышали как `an apron` («фартук»), а `a nadder` — как `an adder` («гадюка»). Отсюда и родственник фартука — `napkin`.",
    takeaway: "the указывает («тот самый»), a считает («один из»).",
  },
  "conditionals-1-2": {
    title: "Почему If I were",
    text: "`If I were you` звучит странно: почему `were`, а не `was`?\n\nЭто остаток сослагательного наклонения. Когда-то у английских глаголов были отдельные формы «как будто бы» — примерно как русское «был бы». Почти все они исчезли, а `were` для всех лиц уцелело именно в условиях и желаниях: `If I were rich`, `I wish she were here`.\n\nВ разговоре многие говорят `If I was`, и это уже нормально. Но устойчивое `If I were you` держится крепко.",
    takeaway: "were в условиях — окаменевшее «было бы».",
  },
  "passive-voice": {
    title: "Дом строится сам",
    text: "Фраза `The house is being built` кажется очевидной, но в XVIII веке её считали безграмотной. Грамматисты требовали говорить `The house is building` — «дом строится», без всякого `being`.\n\nНовая форма пробивалась больше ста лет, критики называли её неуклюжей. Победила она, потому что яснее: `The tea is making` можно понять и как «чай делается», и как странное «чай что-то делает».\n\nСледы старого способа остались в выражениях вроде `What's cooking?` и `The book is printing`.",
    takeaway: "is being done — молодая форма, ей около двухсот лет.",
  },
  "past-perfect": {
    title: "More than perfect",
    text: "The old name for the Past Perfect is the *pluperfect*, from Latin `plus quam perfectum` — \"more than perfect\". Latin grammarians meant \"further back than the perfect\": an action completed before another past action.\n\nEnglish built it the same way as the Present Perfect, just with `had`: \"I had the letter written\" → `I had written the letter`.\n\nThat is why sentences like `I had had enough` are perfectly fine: the first `had` is the auxiliary, the second is the verb \"have\" itself. You can even find chains like `had had had` in grammar puzzles.",
    takeaway: "Pluperfect: one step further into the past.",
  },
  "reported-speech": {
    title: "And she was like…",
    text: "For centuries English reported speech with `say` and `tell`. Then, in the 1980s, Californian teenagers started saying `And she was like, \"No way!\"`.\n\nLinguists first treated quotative `like` as a passing fad. Instead it spread across the English-speaking world, from the US to Britain and Australia, and older speakers picked it up too.\n\nIt does something `said` cannot: it reports attitude and tone, not just words. `He was like, \"Whatever\"` may mean he only shrugged.\n\nIn writing and exams, stick to `said`, `told` and backshift.",
    takeaway: "Reported speech keeps evolving — be like is its newest tool.",
  },
  "conditionals-3-mixed": {
    title: "Would of",
    text: "Native speakers often write `I would of come` instead of `I would have come`. Why?\n\nIn fast speech `would have` shrinks to `would've`, pronounced /ˈwʊdəv/ — exactly like `would of`. People who learn the phrase by ear write what they hear.\n\nThe same happens with `could of`, `should of` and `must of`. Teachers have complained about it since at least the 19th century.\n\nFor learners it's actually a useful clue: the third conditional sounds almost like one word, so listen for `woulda`, `coulda`, `shoulda`.",
    takeaway: "would of is a spelling mistake that shows how the third conditional really sounds.",
  },
  "modals-deduction": {
    title: "Why he can, not he cans",
    text: "Modals like `can`, `may`, `must` and `shall` never take `-s`. The reason is about two thousand years old.\n\nThey belong to a group called *preterite-present* verbs: their present-tense forms were originally past-tense forms. Old English `cann` meant roughly \"I have learned\", hence \"I know how to\" — the same root as `know` and `cunning`. Past forms never had `-s`, so neither do modals.\n\n`Must` went further: it was itself the past of `mōtan` (\"to be allowed\"), and later became present again. That's why modals have such fuzzy past forms today.",
    takeaway: "Modals look odd because they are fossilised past tenses.",
  },
};
