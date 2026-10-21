import type { LessonL10n } from "../index";

export const small: Record<string, LessonL10n> = {
  "prepositions-time-place": {
    title: "Przyimki czasu i miejsca",
    theory: [
      {
        title: "Czas",
        text: "`at` – punkt: `at 7 o'clock, at noon, at night, at the weekend` (bryt.).\n`on` – dzień: `on Monday, on 5 May, on my birthday`.\n`in` – okres: `in May, in 2020, in summer, in the morning`.\n\nBez przyimka: `this / next / last / every` – `next week, last year`.",
        more: "Pory dnia: `in the morning / afternoon / evening`, ale `at night`, `at noon`, `at midnight`. Z konkretnym dniem – `on`: `on Monday morning`, `on the morning of 5 May`.\n\nŚwięta: `at Christmas, at Easter` (cały okres), ale `on Christmas Day` (konkretny dzień).\n\n`in` + okres czasu – „za”: `I'll be back in ten minutes.` Nie myl z `after`: `after ten minutes` – „po dziesięciu minutach”, o przeszłości.\n\n`by` – „do, najpóźniej”: `Finish it by Friday.` `until` – „aż do”: `I'll wait until Friday.`",
        why: "`at` pochodzi od staroangielskiego `æt`, spokrewnionego z łacińskim `ad` – „do, ku”. Jego główna idea to punkt na mapie albo w czasie. Dlatego `at` stało się znakiem `@`: „użytkownik, który znajduje się w punkcie – na komputerze”.",
        trap: "Polskie „w” tłumaczy się różnie: w piątek – on Friday, w maju – in May, w weekend – at the weekend, w nocy – at night. A godzina to nie „o”, tylko at: o szóstej – at six (nie „about six” – to znaczy „około szóstej”).",
        examples: ["Do zobaczenia w piątek o szóstej.", "Urodziłem się w 1995 roku."],
      },
      {
        title: "Miejsce",
        text: "`in` – wewnątrz: `in the room, in Moscow, in a car`.\n`on` – na powierzchni, na linii: `on the table, on the wall, on the bus, on the second floor`.\n`at` – punkt, miejsce wydarzenia: `at the station, at home, at work, at a party`.\n\n`in a car / taxi`, ale `on a bus / train / plane`.",
        more: "Adresy: `in` + ulica (bryt.) albo miasto: `in Oxford Street, in London`; `on` + ulica (amer.); `at` + pełny adres z numerem: `at 10 Baker Street`.\n\nTransport: `by car / bus / train / plane` (sposób); `in a car`, ale `on a bus / train / plane / bike` – w transporcie publicznym i na tym, na czym można stać albo siedzieć okrakiem. Pieszo – `on foot`.\n\n`in the corner` (w kącie pokoju), `on the corner` (na rogu ulicy). `in the picture`, `on the page`, `on the screen`, `in the newspaper`.",
      },
    ],
    explain: {
      "h1": "in + okres czasu = „za” o przyszłości.",
      "h2": "by – nie później niż.",
    },
    story: {
      title: "Znak @ to at",
      text: "Po polsku `@` nazywamy „małpą”, a po angielsku – po prostu `at`.\n\nZnaku używali kupcy i rachmistrzowie długo przed komputerami: `5 apples @ 10p` znaczyło „5 jabłek po 10 pensów”, czyli `at the rate of` – „po cenie”. Znaczek był na klawiaturach maszyn do pisania do rachunków handlowych.\n\nW 1971 roku programista Ray Tomlinson wybierał symbol do pierwszego adresu poczty elektronicznej. Potrzebował znaku, którego nie ma w imionach, i wziął `@`: `user@host` czyta się jako „użytkownik at komputer” – czyli „użytkownik, który jest na tej maszynie”.",
      long: "Po polsku `@` nazywamy „małpą”, a po angielsku – po prostu `at`: `john at gmail dot com`. I to nie przypadkowe przezwisko, tylko prawdziwe znaczenie znaku.\n\nZnaku `@` używali kupcy i rachmistrzowie długo przed komputerami. W rachunkach handlowych `5 apples @ 10p` znaczyło „5 jabłek po 10 pensów”, czyli `at the rate of` – „po cenie”. Anglicy nazywają go `commercial at` – „handlowe at”.\n\nAle historia znaku jest jeszcze starsza. Najwcześniejszy znany dokument, w którym `@` służy jako symbol handlowy, to list florenckiego kupca Francesca Lapiego z 1536 roku. Tam `@` oznaczało amforę – miarę wina. W hiszpańskim i portugalskim `arroba` to do dziś dawna miara wagi, około 11–12 kilogramów, a znak `@` po hiszpańsku tak właśnie się nazywa – `arroba`. Uczeni spierają się, czy znak pochodzi od łacińskiego `ad` („do, po”), od skrótu `amphora`, czy od czegoś jeszcze innego.\n\nNa maszynach do pisania `@` pojawiło się pod koniec XIX wieku – do dokumentów handlowych. Stamtąd trafiło na klawiatury komputerów, gdzie prawie się go nie używało.\n\nW 1971 roku amerykański programista Ray Tomlinson wybierał symbol do pierwszego w historii adresu poczty elektronicznej w sieci ARPANET. Potrzebował znaku, którego na pewno nie ma w imionach ludzi ani w nazwach komputerów. Spojrzał na klawiaturę i wybrał `@`. Adres `user@host` czyta się jako „użytkownik at komputer” – użytkownik, który znajduje się na takiej a takiej maszynie. Przyimek miejsca zamienił się w symbol internetu.\n\nA narody świata wymyśliły dla znaku własne obrazy:\n- Polacy – „małpa”, bo przypomina małpkę z zawiniętym ogonem;\n- Rosjanie – `sobaka`, „pies”, bo wygląda jak zwinięty piesek;\n- Holendrzy – `apenstaartje`, „małpi ogonek”;\n- Włosi – `chiocciola`, „ślimak”;\n- Finowie – `kissanhäntä`, „koci ogon”.\n\nI tylko Anglicy wciąż nazywają go tym, czym był zawsze: `at` – „w punkcie, na miejscu”.",
      takeaway: "at to przyimek punktu: właśnie tak trafił do każdego adresu e-mail.",
      question: "Dlaczego znak @ czyta się po angielsku at?",
    },
  },
  "quantifiers": {
    theory: [
      {
        title: "Wszyscy, większość, nikt",
        text: "`all / most / some / none` + `of the`: `Most of the students passed. None of my friends came.`\n\nBez `of the` – o rzeczach w ogóle: `Most people like music.`\n\n`every / each` + liczba pojedyncza: `Every room has a TV.` `each` – częściej, gdy rzeczy jest niewiele albo patrzymy na nie po kolei.",
        more: "`all` i `every` – różnica w spojrzeniu:\n- `All students passed` – wszyscy razem, grupa;\n- `Every student passed` – każdy z osobna, ale czasownik w liczbie pojedynczej.\n\n`all day` – cały dzień; `every day` – codziennie.\n\n`no` i `none`: `no` – przed rzeczownikiem: `I have no money.` `none` – zamiast rzeczownika albo z `of`: `How much money do you have? – None.` `None of us knew.`\n\n`a lot of` / `lots of` – potocznie; `many` / `much` – w pytaniach i przeczeniach; `plenty of` – „mnóstwo, aż nadto”.",
        why: "`most` i `the most` myli się dlatego, że to jedno słowo w dwóch rolach: „większość” i „naj-”. W angielskim rozdzielił je przedimek: `most people` – większość ludzi, `the most beautiful` – najpiękniejszy.",
        trap: "„Większość ludzi” to most people, a nie „the most of people” ani „most of people”. most of wymaga określenia: most of the people in this room. A the most to stopień najwyższy (the most beautiful).",
      },
      {
        title: "Dwie rzeczy",
        text: "`both` – obaj, obie, oba: `Both of my sisters are doctors.`\n`either` – którykolwiek z dwóch: `You can take either bus.`\n`neither` – żaden z dwóch: `Neither answer is correct.`\n\n`either … or`, `neither … nor`: `Neither Tom nor Ann was there.`\n\n`fewer` – z policzalnymi, `less` – z niepoliczalnymi: `fewer cars, less traffic`.",
        more: "Czasownik po `either, neither, each, every` – w liczbie pojedynczej: `Neither of them is ready.` W rozmowie często `are`, ale na piśmie – `is`.\n\nW parze `neither … nor` / `either … or` czasownik zgadza się z bliższym rzeczownikiem: `Neither my brother nor my parents are coming.`\n\nKrótkie odpowiedzi-zgody: `I don't like it. – Neither do I.` (`Nor do I`, „ja też nie”). `I like it. – So do I.` („ja też”). Potocznie: `Me neither`, `Me too`.",
        why: "Regułę „`fewer` z policzalnymi, `less` z niepoliczalnymi” wymyślił jeden człowiek w 1770 roku. Wcześniej `less` przez ponad tysiąc lat spokojnie łączono ze wszystkimi rzeczownikami.",
      },
    ],
    explain: {
      "h1": "Dwoje i żaden z nich – neither.",
      "h2": "Policzalne + porównanie – fewer (w ścisłej normie).",
    },
    story: {
      title: "Kto wymyślił fewer",
      text: "Reguła „`fewer` z policzalnymi, `less` z niepoliczalnymi” wydaje się odwiecznym prawem. W rzeczywistości ma autora i datę.\n\nW 1770 roku angielski gramatyk Robert Baker napisał, że `less` z policzalnymi wydaje mu się „niezbyt eleganckie”, i zaproponował mówić `fewer`. Otwarcie przyznawał, że to jego osobisty gust.\n\nA `less` z policzalnymi występuje w angielskim od ponad tysiąca lat – na przykład u króla Alfreda w IX wieku. Tabliczka w brytyjskich supermarketach `10 items or less` do dziś budzi spory, choć wielu językoznawców uważa ją za poprawną.",
      long: "Reguła „`fewer` – z policzalnymi, `less` – z niepoliczalnymi” brzmi jak odwieczne prawo języka angielskiego. Nauczyciele obniżają za nią oceny, redaktorzy poprawiają ją w gazetach. Ale ta reguła ma dokładnie znanego autora i datę urodzin.\n\nW 1770 roku angielski gramatyk Robert Baker wydał książkę „Uwagi o języku angielskim”. Napisał w niej, że słowo `less` z rzeczownikami policzalnymi wydaje mu się „niezbyt eleganckie”, i zaproponował w takich wypadkach mówić `fewer`: `No fewer than a hundred` zamiast `No less than a hundred`. Baker uczciwie przyznawał, że to jego osobisty gust, a nie prawo. Pisał nawet, że nie zna łaciny ani greki i nie pretenduje do uczoności.\n\nA `less` z rzeczownikami policzalnymi występuje w angielskim od ponad tysiąca lat. Już król Alfred Wielki w IX wieku, tłumacząc łacińskie księgi na staroangielski, pisał o „mniejszej liczbie słów” właśnie z `less` – `swā lǣs worda`. Tak mówiono i pisano przez stulecia.\n\nDlaczego więc reguła Bakera zwyciężyła? XVIII wiek był czasem, gdy angielski starano się „uporządkować”. Wykształcona publiczność chciała jasnych reguł, jak w łacinie. Gramatyki wychodziły jedna po drugiej i każdy autor dokładał swoje zakazy. Czytelnicy nie zawsze rozumieli, gdzie jest prawo, a gdzie gust autora. Regułę Bakera przepisywano z książki do książki, aż stała się „powszechnie znana”.\n\nDziś to jedna z najżywszych bitew językowych. Brytyjska sieć supermarketów Tesco w 2008 roku pod naciskiem obrońców poprawnej mowy zmieniła tabliczkę przy kasie `10 items or less` na `Up to 10 items`, żeby nie wybierać między `less` a `fewer`.\n\nJęzykoznawcy są głównie po stronie `less`. Ich argument: w zwrotach typu `10 items or less` myślimy nie o pojedynczych rzeczach, tylko o ilości, o wielkości zakupów. Tak samo naturalnie brzmi `less than 20 people` albo `in less than three days`. A `fewer than three days` brzmi niezgrabnie nawet dla zwolenników reguły.\n\nCo masz robić: na egzaminie i w tekstach oficjalnych – `fewer people, fewer cars`. Z liczbami i okresami czasu – `less than 10 minutes, less than 5 kilometres` – to poprawne w każdym stylu. A gdy usłyszysz `less people` w filmie, wiedz: to nie nieuctwo, tylko tysiącletnia tradycja, którą w 1770 roku jeden człowiek nazwał nieelegancką.",
      takeaway: "Wiele „odwiecznych” reguł angielskiego wymyślili gramatycy XVIII wieku.",
      question: "Kto wymyślił regułę: fewer z policzalnymi, less z niepoliczalnymi?",
    },
  },
};
