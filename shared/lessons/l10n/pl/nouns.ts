import type { LessonL10n } from "../index";

export const nouns: Record<string, LessonL10n> = {
  "plurals": {
    title: "Liczba mnoga",
    subtitle: "-s, -es i dziwne wyjątki",
    theory: [
      {
        title: "Podstawowa reguła",
        text: "Zwykle dodajemy `-s`: `book → books`.\n\n`-es` po `s, ss, sh, ch, x`: `bus → buses, box → boxes, watch → watches`.\n\nSpółgłoska + `y` → `-ies`: `city → cities`. Ale samogłoska + `y` → samo `-s`: `day → days`.\n\nCzęsto `f / fe` → `-ves`: `knife → knives, leaf → leaves`.",
        more: "Jak się wymawia końcówkę. Litera jedna, a dźwięki trzy:\n- `/s/` po dźwiękach bezdźwięcznych: `books, cats, cups`;\n- `/z/` po dźwięcznych i samogłoskach: `dogs, days, trees`;\n- `/ɪz/` po syczących i szumiących: `buses, boxes, watches, pages`.\n\nUwaga na `/z/` na końcu: po polsku spółgłoski na końcu wyrazu ubezdźwięczniają się, dlatego `dogs` w polskich ustach często brzmi jak „doks”.\n\nKońcówka `-o`: częściej `-es` – `potatoes, tomatoes, heroes`, ale w krótkich i zapożyczonych słowach `-s`: `photos, pianos, radios, videos`.\n\nNie wszystkie słowa na `-f` się zmieniają: `roofs, chiefs, beliefs`. Zapamiętaj najczęstsze `-ves`: `knife, wife, life, half, leaf, shelf, wolf, thief`.",
        why: "Końcówka `-s` nie zwyciężyła od razu. W staroangielskim miała ją tylko jedna grupa słów rodzaju męskiego (`stān → stānas`, „kamienie”). W średnioangielskim północny zwyczaj stawiania `-es` wszędzie rozlał się po kraju, a wraz z nim uproszczona gramatyka.",
      },
      {
        title: "Wyjątki",
        text: "`man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice`.\n\nNie zmieniają się: `sheep, fish, deer`.\n\nTylko w liczbie mnogiej: `trousers, jeans, glasses, scissors` — `My jeans are new.`",
        more: "Słowa złożone: liczbę mnogą dostaje słowo główne – `passers-by`, `mothers-in-law`. Ale jeśli słowo już się zrosło – na końcu: `spoonfuls`.\n\nRzeczownik przed rzeczownikiem nie dostaje `-s`: `a shoe shop`, `a ten-minute break`, `a five-year-old boy` – choć butów jest wiele, a minut dziesięć.\n\nZbiorowe w rodzaju `police` i `people` – zawsze w liczbie mnogiej: `The police are here. People are friendly.` A `family`, `team` w brytyjskim angielskim bywają i w pojedynczej, i w mnogiej: `My family is / are…`",
        why: "`deer` w staroangielskim znaczyło każde zwierzę – „zwierz”, jak niemieckie `Tier`. U Szekspira w „Królu Learze” jest `mice and rats, and such small deer` – „myszy, szczury i inna drobna zwierzyna”. Liczba mnoga bez końcówki została z tamtych czasów.",
        trap: "„Pieniądze”, „wiadomości” i „rady” są po polsku w liczbie mnogiej, a po angielsku money, news, advice – w pojedynczej: The news is good. Za to „ludzie” to people – zawsze z are.",
      },
    ],
    explain: {
      "h1": "police – zawsze liczba mnoga.",
      "h2": "Przed rzeczownikiem – bez -s: a ten-minute walk.",
    },
    story: {
      title: "Dlaczego children, a nie childs",
      text: "W staroangielskim liczbę mnogą tworzono na różne sposoby. Końcówka `-as` (przyszłe `-s`) była tylko jedną z możliwości, a zwyciężyła później.\n\nKońcówka `-en` przetrwała w `oxen` („woły”). `children` to podwójna liczba mnoga: najpierw było `childer` (tak wciąż mówi się w dialektach północnej Anglii), potem dodano jeszcze `-en`.\n\n`feet, teeth, mice` to ślady dawnej zmiany samogłosek: końcówka liczby mnogiej zmieniła samogłoskę rdzenia, a potem sama zniknęła. Został tylko zmieniony dźwięk. Tak samo w niemieckim: `Fuß — Füße`.",
      long: "Dlaczego `children`, a nie `childs`? Dlaczego `feet`, a nie `foots`? Każdy angielski wyjątek w liczbie mnogiej to ocalała dawna reguła. Kiedyś było ich wiele i każda działała dla całej grupy słów.\n\nW staroangielskim rzeczowniki dzieliły się na typy, mniej więcej jak polskie deklinacje. Każdy typ miał własną liczbę mnogą:\n- **-as**: `stān — stānas` (kamień — kamienie). To przyszłe `-s`, ale wtedy tylko jedna z możliwości.\n- **-an**: `oxa — oxan` (wół — woły), `ēage — ēagan` (oko — oczy). U Chaucera w XIV wieku wciąż spotyka się `eyen` – „oczy”, a w dawnych tekstach `shoon` – „buty”.\n- **bez końcówki**: w wielu słowach rodzaju nijakiego liczba mnoga była taka sama jak pojedyncza – `word`, „słowa”, `scēap`, „owce”. Stąd dzisiejsze `sheep` i `deer`.\n- **zmiana samogłoski**: `fōt — fēt`, `tōþ — tēþ`, `mūs — mȳs`.\n\nOstatni typ jest najciekawszy. W bardzo dawnym języku pragermańskim liczba mnoga tych słów miała końcówkę z dźwiękiem `i`. To `i` „przyciągało” samogłoskę rdzenia do przodu: `o` zmieniało się w `e`, `u` – w `y`. Potem sama końcówka odpadła, a zmieniona samogłoska została jedynym znakiem liczby mnogiej. Tak powstały `feet`, `teeth`, `geese`, `mice`, `men`, `women`. Ten sam proces dał w niemieckim `Fuß — Füße`, `Maus — Mäuse`. Językoznawcy nazywają go przegłosem albo umlautem. Polski zna podobne zjawisko: wymiana samogłosek w „kościół — kościele”, „lato — lecie”.\n\n`children` to osobna, podwójna historia. Najpierw liczbą mnogą od `cild` było `cildru`, potem `childer` – tak do dziś mówi się w dialektach północnej Anglii i Irlandii. Ale w średnioangielskim ludzie przestali czuć w `-er` liczbę mnogą i na południu dodali do niego jeszcze jedną, dobrze znaną końcówkę `-en`. Wyszła podwójna liczba mnoga, coś jak „dziecie-ci”. Tak samo zbudowane jest `brethren` – dawne „bracia” w języku kościelnym.\n\nDlaczego zwyciężyło `-s`? W średnioangielskim, po podboju normańskim, końcówki w ogóle osłabły i się pomieszały. Na północy, gdzie żyli potomkowie wikingów, gramatykę upraszczano szczególnie śmiało i `-es` stawiano niemal wszędzie. Północny zwyczaj stopniowo dotarł do Londynu. Ocalały tylko słowa, które brzmiały zbyt często, by je przerobić: dzieci, stopy, zęby, myszy, mężczyźni.\n\nJęzyk wyrównuje wyjątki także dziś. Kiedyś `cow` w liczbie mnogiej brzmiało `kine`, a `book` – `bēc`. Teraz to `cows` i `books`. A w komputerach `mouse` coraz częściej staje się `mouses` – przynajmniej u tych, którzy mają na myśli myszkę do laptopa.",
      takeaway: "Wyjątki w liczbie mnogiej to ocalałe dawne reguły.",
      question: "Dlaczego children, a nie childs, i skąd końcówka -s w liczbie mnogiej?",
    },
  },
  "possessives": {
    title: "Dzierżawcze: my, mine, 's",
    subtitle: "Czyje to",
    theory: [
      {
        title: "my i mine",
        text: "Przed rzeczownikiem: `my, your, his, her, its, our, their` — `This is my bag.`\n\nZamiast rzeczownika: `mine, yours, his, hers, ours, theirs` — `This bag is mine.`",
        more: "`its` i `it's` mylą nawet rodzimi użytkownicy. Test jest prosty: jeśli da się wstawić `it is` albo `it has` – pisz z apostrofem. `It's raining` = `It is raining`. `The dog wagged its tail` – „it is tail” nie pasuje, więc bez apostrofu.\n\n`whose` – „czyj”: `Whose bag is this?` Nie myl z `who's` = `who is`: `Who's there?`\n\nPo `mine, yours` i innych nie stawia się rzeczownika: `This is mine`, nie „This is mine bag”. A przed `own` – tylko `my, your…`: `I have my own room`, „mam własny pokój”.",
        why: "`its` bez apostrofu to późna forma. Do XVII wieku zaimkiem dzierżawczym od `it` było `his`: w Biblii króla Jakuba czytamy `if the salt have lost his savour` – „jeśli sól utraci swój smak”. `its` pojawiło się około 1600 roku i długo uchodziło za potoczne.",
        trap: "Polskie „swój” nie ma jednego odpowiednika: „Wziął swoją torbę” – He took his bag, „Sprzedali swój samochód” – They sold their car, „Zgubiłam swój telefon” – I lost my phone.",
        examples: ["Czy to twój płaszcz? – Nie, jej."],
      },
      {
        title: "'s i of",
        text: "U ludzi i zwierząt – `'s`: `Anna's phone, my brother's car`.\n\nLiczba mnoga na -s – sam apostrof: `my parents' house`. Nieregularna liczba mnoga – `'s`: `children's books`.\n\nU przedmiotów częściej `of`: `the end of the film`, `the roof of the house`.\n\n`its` (jego, u przedmiotu) – bez apostrofu. `it's` = it is.",
        more: "`'s` stawia się na końcu całej grupy: `the King of Spain's daughter` – córka króla Hiszpanii, a nie Hiszpanii. `my sister and brother's flat` – jedno wspólne mieszkanie; `my sister's and my brother's flats` – dwa różne.\n\nPo `'s` słowo może zniknąć: `at my mother's` (u mamy w domu), `at the doctor's` (u lekarza), `I'll go to Tom's` (do Toma).\n\nCzas i odległość też biorą `'s`: `today's news`, `a week's holiday`, `two hours' drive`.",
      },
    ],
    explain: {
      "4": "Liczba mnoga na -s → sam apostrof.",
      "h1": "Liczba mnoga na -s – sam apostrof.",
      "h2": "its – dzierżawcze, it's = it is.",
    },
    story: {
      title: "Co kryje się za apostrofem",
      text: "W staroangielskim słowa miały końcówkę dopełniacza `-es`: `cyninges` – „króla”. Z czasem samogłoska wypadła, zostało `-s`.\n\nPóźniej, w XVI–XVII wieku, ludzie sądzili, że `the king's crown` to skrót od `the king his crown` („król jego korona”). Tak pisano nawet w książkach, a apostrof rzekomo zastępował zaginione `hi`. To błąd: wtedy trzeba by pisać `the queen her crown`, a mówi się `the queen's crown`.\n\nW rzeczywistości apostrof oznacza po prostu wypadłe `e` ze starej końcówki.",
      long: "W staroangielskim rzeczowniki miały przypadki, prawie jak w polskim. Dopełniacz – „kogo? czego?” – miał w wielu słowach końcówkę `-es`: `cyning` – „król”, `cyninges` – „króla”. `Cyninges sunu` – „syn króla”.\n\nPrzez tysiąc lat angielskie rzeczowniki straciły wszystkie przypadki prócz jednego. Mianownik, biernik, celownik zlały się w jedną formę. A dopełniacz przetrwał, tylko samogłoska w końcówce wypadła: `cyninges → kinges → king's`. To jedyna końcówka przypadka, jaka została angielskim rzeczownikom.\n\nDalej zaczyna się zamieszanie. W XVI–XVII wieku angielscy uczeni znali łacinę lepiej niż historię własnego języka. Wydawało im się, że `the king's crown` to skrót od `the king his crown`, „król jego korona”, a apostrof zastępuje zaginione litery `hi`. Tak nawet pisano na poważnie: w anglikańskim modlitewniku do dziś jest fraza `for Jesus Christ his sake` – „przez wzgląd na Jezusa Chrystusa”.\n\nTę teorię łatwo obalić: wtedy trzeba by mówić `the queen her crown`, a wszyscy mówili `the queen's crown`. Poza tym `-es` było końcówką dopełniacza setki lat przed tym, zanim ktoś wymyślił „his”.\n\nSam apostrof to francuski wynalazek. Używano go, by zaznaczyć wypadłą literę: `l'homme` zamiast `le homme`. W angielskich książkach pojawił się w XVI wieku, a w formie dzierżawczej oznacza właśnie wypadłe `e` ze starej końcówki. Reguła stawiania apostrofu po `s` w liczbie mnogiej – `the girls' room` – utrwaliła się jeszcze później, dopiero w XVIII wieku.\n\nI ostatnia osobliwość. Końcówka `'s` we współczesnym angielskim nie zachowuje się jak końcówka słowa, tylko jak partykuła, która przyczepia się do końca całej grupy: `the King of England's daughter` – córka króla Anglii. W rozmowie zdarza się nawet `the man I met yesterday's car` – samochód człowieka, którego wczoraj spotkałem. Przypadek zamienił się w małe osobne słowo – to rzadkość w historii języków. Polak, który ma do dyspozycji siedem przypadków, może tylko się zdziwić, że Anglikom został jeden – i to w takiej postaci.",
      takeaway: "'s to resztka dawnego przypadka – jedynego, który zachował się w angielskich rzeczownikach.",
      question: "Co kryje się za apostrofem w the king's crown?",
    },
  },
  "countable-uncountable": {
    title: "Policzalne i niepoliczalne",
    theory: [
      {
        title: "Czy da się policzyć",
        text: "**Policzalne** mają liczbę mnogą i `a/an`: `an apple, three apples`.\n\n**Niepoliczalne** to substancje i pojęcia abstrakcyjne bez liczby mnogiej: `water, money, information, advice, furniture, luggage, news, work`. Nie ma z nimi `a/an`: nie „an advice”, tylko `some advice / a piece of advice`.",
        more: "Wiele słów bywa i takich, i takich, ale z innym sensem:\n- `paper` – papier, `a paper` – gazeta albo artykuł naukowy;\n- `glass` – szkło, `a glass` – szklanka;\n- `time` – czas, `three times` – trzy razy;\n- `chicken` – kurczak jako mięso, `a chicken` – kura;\n- `coffee` – kawa w ogóle, `two coffees` – dwie kawy w kawiarni.\n\nJeszcze jedna grupa niepoliczalnych – zajęcia i pojęcia: `homework, research, progress, knowledge, traffic, weather, fun`. „Ładna pogoda” – `nice weather`, nie „a nice weather”.",
        why: "Granica policzalności to umowa języka, a nie logika. Po polsku „pieniądze” są w liczbie mnogiej, a po angielsku `money` jest niepoliczalne; po polsku „meble”, „informacje”, „rady”, a po angielsku `furniture`, `information`, `advice` nie mają liczby mnogiej. Rodzimi użytkownicy nie „widzą” rzeczy inaczej, po prostu słowa tak się ułożyły.",
        trap: "Polskie „informacje”, „meble”, „rady”, „wiadomości” ciągną do „informations”, „furnitures”, „advices”. Po angielsku są niepoliczalne: some information, some furniture, some advice.",
      },
      {
        title: "Ile",
        text: "Policzalne: `many, a few, few, How many…?`\nNiepoliczalne: `much, a little, little, How much…?`\nOba: `a lot of, some, any, no`.\n\n`a few / a little` – „trochę, ale jest”; `few / little` – „mało, prawie nic”.\n\nW zdaniach twierdzących zamiast `much` zwykle mówi się `a lot of`: `I drink a lot of coffee.`",
        more: "Jak policzyć niepoliczalne: potrzebne są słowa-jednostki.\n- `a piece of advice / information / furniture / news`\n- `a slice of bread`, `a loaf of bread`\n- `a bottle of water`, `a cup of tea`, `a glass of milk`\n- `a bar of chocolate`, `a kilo of rice`, `an item of luggage`\n\nPytanie „ile” z jednostkami – przez `many`: `How many cups of coffee do you drink?` – liczymy filiżanki, a nie kawę.",
      },
    ],
    explain: {
      "h1": "advice – niepoliczalne: a piece of advice.",
      "h2": "W kawiarni „dwie kawy” to dwie porcje: two coffees.",
    },
    story: {
      title: "Groszek, którego nie było",
      text: "W angielskim było kiedyś słowo `pease` – „groch”, niepoliczalne jak `rice`. Stąd stara dziecięca wyliczanka o `pease porridge` – grochowej kaszy.\n\nAle `pease` na końcu brzmiało jak liczba mnoga. Ludzie uznali, że jedno ziarnko grochu to `pea`, i w XVII wieku pojawiło się nowe słowo. Tak niepoliczalne stało się policzalne: `a pea, two peas`.\n\nTo samo stało się z wiśnią: starofrancuskie `cherise` Anglicy usłyszeli jako liczbę mnogą i odcięli „nadmiar” – wyszło `cherry`.",
      long: "W angielskim było kiedyś słowo `pease` – „groch”. Było niepoliczalne, jak `rice` czy `sand`: groch to masa, a nie osobne sztuki. Zachowała się stara dziecięca wyliczanka: `Pease porridge hot, pease porridge cold` – „grochówka gorąca, grochówka zimna”.\n\nAle `pease` kończyło się dźwiękiem `/z/` i brzmiało dokładnie jak liczba mnoga. Ludzie zaczęli „słyszeć” w nim `peas`, a skoro tak, to jedno ziarnko to `pea`. W połowie XVII wieku nowe słowo pojawiło się w tekstach i niepoliczalne stało się policzalne: `a pea, two peas`.\n\nJęzykoznawcy nazywają to derywacją wsteczną: od słowa odcina się to, co bierze się za przyrostek lub końcówkę, choć w rzeczywistości to część rdzenia. Historia z grochem nie jest jedyna.\n\n**Wiśnia.** Anglicy wzięli z normańskiego francuskiego słowo `cherise`. Końcowe `-se` znów zabrzmiało jak liczba mnoga i zostało odcięte – wyszło `cherry`. We francuskim zostało `cerise`.\n\n**Sherry.** Hiszpańskie wino z miasta Jerez Anglicy w XVI wieku nazywali `sherris`. Wkrótce `-s` uznano za końcówkę i zaczęto mówić `sherry`.\n\n**Wiadomości i rady.** Bywało i odwrotnie. `news` to dosłownie „nowe rzeczy”, i w XVI–XVIII wieku często było w liczbie mnogiej: pisano `these news are…` – jak polskie „te wiadomości są”. Potem stało się niepoliczalne i dziś mówi się `The news is bad`. A `advice` w języku handlowym XVIII–XIX wieku bywało policzalne: `advices from London` – „doniesienia z Londynu”. Zwykłe `advice` – „rada” – zostało bez liczby mnogiej.\n\nA proces odwrotny trwa właśnie teraz. Słowo `data` to z pochodzenia łacińska liczba mnoga od `datum`. Surowi redaktorzy wymagają pisać `the data are`. Ale większość ludzi od dawna odbiera `data` jako substancję, jak `information`, i mówi `the data is`. Najpewniej za kilka pokoleń nikt już nie będzie się o to spierać.\n\nMorał: policzalność to nie prawo natury, tylko umowa. Zmieniają ją sami mówiący, czasem przez jeden źle usłyszany dźwięk.",
      takeaway: "Granica między policzalnym a niepoliczalnym to nie logika, tylko umowa języka.",
      question: "Skąd wzięło się słowo pea („ziarnko grochu”)?",
    },
  },
};
