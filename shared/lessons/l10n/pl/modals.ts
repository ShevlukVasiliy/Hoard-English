import type { LessonL10n } from "../index";

export const modals: Record<string, LessonL10n> = {
  "obligation": {
    subtitle: "Muszę, powinienem, warto",
    theory: [
      {
        title: "Obowiązek",
        text: "`must` – obowiązek od mówiącego, reguła, mocna rada: `I must call Mum.` `You must wear a seatbelt.`\n\n`have to` – obowiązek z zewnątrz, okoliczności: `I have to get up at 6 — work starts at 7.`\n\nW przeszłości i przyszłości – tylko `have to`: `I had to wait. You'll have to pay.`",
        more: "`must` o sobie – wewnętrzna decyzja: `I must lose weight` (tak postanowiłem). `have to` – okoliczności zewnętrzne: `I have to lose weight — the doctor said so` (lekarz kazał).\n\nW pytaniach częściej `have to`: `Do you have to work on Saturdays?` `Must you…?` brzmi oficjalnie albo z wyrzutem: „Musisz koniecznie…?”\n\n`have got to` – potoczna wersja `have to`, głównie brytyjska: `I've got to go.`\n\n`need to` – „trzeba” z konieczności: `I need to buy milk.` `needn't` = `don't have to`: `You needn't come`.\n\nZakazy na tabliczkach i w regulaminach: `Passengers must not smoke`, `Visitors must wear a mask`.",
        why: "`have to` wyrosło ze zwykłego „mieć”: `I have a letter to write` – „mam list do napisania”. Szyk się przesunął – `I have to write a letter` – i „mieć” stało się „musieć”. Polski zna podobny obraz: „mam coś do zrobienia”, „mam jutro egzamin”.",
        trap: "„Nie musisz” i „nie wolno ci” to dwie różne rzeczy, a po angielsku łatwo je pomylić: „Nie musisz przychodzić” – You don't have to come, „Nie wolno ci tu palić” – You mustn't smoke here. mustn't to zakaz, nie brak obowiązku.",
        examples: ["Musisz koniecznie spróbować tego ciasta!", "Trzeba rezerwować z wyprzedzeniem?"],
      },
      {
        title: "Rada",
        text: "`should / ought to` – warto, powinno się: `You should see a doctor.`\n\n`shouldn't` – nie warto, nie powinno się: `You shouldn't work so much.`\n\n`had better` – lepiej (bo inaczej będą kłopoty): `You'd better hurry.` Po nim – czasownik bez to.",
        more: "`should` kontra `must` w radach:\n- `You should see a doctor` – rada, „powinieneś”;\n- `You must see a doctor` – z naciskiem, „koniecznie idź”.\n\n`ought to` = `should`, ale bardziej książkowo i rzadziej: `You ought to apologise.` Przeczenie `oughtn't to` brzmi staroświecko – lepiej `shouldn't`.\n\n`had better` – rada z groźbą konsekwencji, zwykle o konkretnej sytuacji: `You'd better take an umbrella — it's going to rain.` Przeczenie: `You'd better not be late.`\n\nW przeszłości: `should have done` – należało, ale się nie zrobiło: `You should have called me.` To temat lekcji o czasownikach modalnych przypuszczenia.",
        why: "`ought` to czas przeszły od `owe`, „być dłużnym”. Dosłownie `You ought to go` – „jesteś winien pójść”. Obowiązek w angielskim, jak i w polskim, wyrósł z idei długu: „powinien” jest spokrewnione z „winą” i „winien” – „dłużny”.",
      },
    ],
    explain: {
      "h1": "Nie trzeba – don't have to. mustn't = nie wolno.",
      "h2": "must nie ma czasu przeszłego – had to.",
    },
    story: {
      title: "should znaczyło „być winnym pieniądze”",
      text: "`should` to przeszła forma `shall`. A staroangielskie `sculan` znaczyło „być winnym” w najdosłowniejszym sensie – „mieć dług”. W pokrewnym niemieckim `Schuld` to „dług” i „wina”, a `schulden` – „być winnym pieniądze”.\n\nStopniowo „jestem winien (komuś)” zamieniło się w „jestem zobowiązany”, potem w czas przyszły (`I shall`), a `should` stało się łagodną radą: „powinieneś”.\n\nTak więc `You should apologise` dosłownie sięga do „jesteś winien przeprosiny”.",
      long: "`should` to przeszła forma `shall`. A staroangielskie `sculan` znaczyło „być winnym” w najdosłowniejszym, pieniężnym sensie. W pokrewnym niemieckim `Schuld` to „dług” i „wina”, a `schulden` – „być winnym pieniądze”. W tekstach staroangielskich są zdania w rodzaju „ile jesteś winien mojemu panu?” – właśnie z tym czasownikiem.\n\nDalej sens przesuwał się krok po kroku:\n- „jestem komuś winien pieniądze” →\n- „jestem zobowiązany coś zrobić” →\n- „to, co jestem zobowiązany zrobić, nastąpi” – i `I shall` stało się czasem przyszłym →\n- przeszła forma `should` złagodniała do „powinieneś”.\n\nTak więc `You should apologise` dosłownie sięga do „jesteś winien przeprosiny”. A w niemieckim `Schuld` zachował się jeszcze jeden odcień: dług i wina to jedno słowo. Widać to w modlitwie „Ojcze nasz”: po angielsku „odpuść nam nasze winy” to `forgive us our debts` (albo `our trespasses`), a po niemiecku – `vergib uns unsere Schuld`. Polskie „odpuść nam nasze winy” mówi to samo: wina to dług, który trzeba odpuścić.\n\nSąsiedzi `should` mają podobne życiorysy.\n\n**`ought`** to czas przeszły od `owe`, „być dłużnym”. W staroangielskim `āgan` znaczyło „posiadać”, potem „być winnym” (kto posiada cudze – ten jest dłużny), a forma przeszła `āhte` zamieniła się w `ought`. `You ought to know` – dosłownie „byłeś winien wiedzieć”. Czasownik `owe` żyje przy tym osobno i znaczy to samo co tysiąc lat temu: `I owe you ten pounds`.\n\n**`must`** to też dawny czas przeszły: od czasownika `mōtan`, „mieć możliwość, mieć prawo”. `mōste` – „mógł, było wolno”. Potem stało się czasem teraźniejszym i zmieniło sens z „można” na „trzeba”. Taki zwrot wydaje się dziwny, ale niemieckie `müssen` („musieć”) to krewniak tego samego rdzenia. A polskie „musieć” to zapożyczenie właśnie z niemieckiego `müssen` – przez czeski.\n\n**`have to`** – najmłodsze. W średnioangielskim `I have a letter to write` znaczyło „mam list do napisania”. Stopniowo `have` i `to` się zrosły i wyszło `I have to write`, „muszę napisać”. Dziś wymowa podkreśla to zrośnięcie: w `have to` dźwięk `v` ubezdźwięcznia się w `f` – `/ˈhæftə/`, jakby to było jedno słowo. A `has to` brzmi jak `/ˈhæstə/`.\n\nI ostatni szczegół: polskie „powinien” jest spokrewnione z „winien” – „dłużny”. Różne języki niezależnie doszły do jednej metafory: obowiązek to dług, który trzeba spłacić.",
      takeaway: "Czasowniki modalne wyrosły ze zwykłych słów: „wiedzieć”, „być dłużnym”, „móc”.",
      question: "Co kiedyś znaczyło should?",
    },
  },
  "so-such-too-enough": {
    subtitle: "Za dużo, wystarczająco, taki",
    theory: [
      {
        title: "too i enough",
        text: "`too + przymiotnik` – za, zbyt (więcej niż trzeba): `It's too hot to sleep.`\n\n`przymiotnik + enough` – wystarczająco, stoi **po**: `He's old enough to drive.`\n\n`enough + rzeczownik` – **przed**: `We have enough time.`\n\nPo `too` i `enough` często idzie `to + V` albo `for + kto`: `too difficult for me`.",
        more: "`too` nie stawia się przed rzeczownikiem – potrzebne są `too much` i `too many`: `too much sugar` (niepoliczalne), `too many people` (policzalne).\n\n`not … enough` często brzmi grzeczniej niż `too`: `The room isn't big enough` łagodniej niż `The room is too small`.\n\n`enough` może stać bez rzeczownika: `That's enough!` – „dość!”. `I've had enough` – „mam dość”.\n\n`too` w znaczeniu „też” – na końcu zdania twierdzącego: `I like it too.` W przeczeniu – `either`: `I don't like it either` – „ja też nie”.",
        why: "`enough` po staroangielsku to `genōg`, jak niemieckie `genug`. Litery `gh` wymawiano kiedyś jak polskie „ch”, a potem ten dźwięk na końcu słowa zamienił się w `f`. Stąd `/ɪˈnʌf/` – tak samo jak `laugh` i `tough`.",
        trap: "Polskie „za” to too: „za drogie” → too expensive. Ale „bardzo” to very, nie too: „Jest bardzo ładnie” → It's very nice, a too nice brzmi jak wada. I „wystarczająco duży” to big enough – enough stoi po przymiotniku, nie „enough big”.",
      },
      {
        title: "so i such",
        text: "`so + przymiotnik / przysłówek`: `It's so cold.` `She speaks so fast.`\n\n`such (a) + przymiotnik + rzeczownik`: `It's such a cold day.` `They're such nice people.`\n\nSkutek – `so / such … that`: `It was so late that the shops were closed.` `It was such a good film that I watched it twice.`",
        more: "`so` i `such` w okrzykach:\n- `You're so kind!` – z przymiotnikiem;\n- `You're such a kind person!` – z rzeczownikiem;\n- `It was such fun!` – z niepoliczalnym, bez `a`.\n\n`so much / so many` – „tak dużo, tylu”: `I've got so much work!` `There were so many people!`\n\n`so … that` w rozmowie często bez `that`: `I was so tired I fell asleep at once.`\n\nPolskie „taki” odpowiada such: „taki zimny dzień” – such a cold day, a „tak” – so: „tak zimno” – so cold. `such a lot of people` = `so many people`.",
      },
    ],
    explain: {
      "h1": "weather jest niepoliczalne – such bez a.",
      "h2": "Przymiotnik + enough.",
    },
    story: {
      title: "too to to z akcentem",
      text: "`too` i `to` to jedno i to samo słowo. W staroangielskim `tō` znaczyło i „do, ku”, i „w dodatku, ponadto”.\n\nGdy słowo stało pod akcentem w znaczeniu „też, zbyt”, wymawiano je z długim dźwiękiem. W XVI wieku postanowiono pokazać tę różnicę na piśmie – i akcentowane `to` zaczęto pisać z dwoma `o`: `too`.\n\nStąd oba znaczenia `too`: „też” (`me too` – „i mnie w dodatku”) i „zbyt” (`too much` – „ponad miarę”).",
      long: "`too` i `to` to jedno i to samo słowo. W staroangielskim `tō` znaczyło i „do, w kierunku”, i „w dodatku, ponadto”. Wyobraź sobie: „do tego” – czyli „jeszcze i to”, „na dokładkę”. Stąd i „też”, i „zbyt”: „ponad miarę”. Polskie „do tego” ma przecież to samo podwójne życie: „idę do domu” i „do tego jeszcze pada”.\n\nDopóki słowo było jedno, wymawiano je różnie. Bez akcentu, jako przyimek, samogłoska się skracała: `to the house` – `/tə/`. Pod akcentem, w znaczeniu „też” i „zbyt”, zostawała długa: `/tuː/`. Porównaj dziś: `I'm going to London` z szybkim `/tə/` i `Me too!` z wyraźnym `/tuː/`.\n\nW XVI wieku, gdy angielska ortografia zaczęła się ustalać, drukarze postanowili pokazać tę różnicę na piśmie. Akcentowane `to` zaczęto pisać z dwoma `o`: `too`. Tak jedno słowo oficjalnie rozpadło się na dwa.\n\nObok żyło trzecie – `two`, „dwa”, od staroangielskiego `twā`. Dziś wszystkie trzy – `to, too, two` – brzmią tak samo i rodzimi użytkownicy, zwłaszcza dzieci, ciągle je mylą w piśmie. Ale `two` to zupełnie inne słowo, spokrewnione z polskim „dwa” i łacińskim `duo`. Nieme `w` zachowano z tradycji: kiedyś brzmiało. Jego ślad słychać w krewniakach: `twice`, `twin`, `twelve`, `twenty`, `between`.\n\n`too` ma swoje utarte wyrażenia:\n- `me too` – „ja też”;\n- `too much` – „za dużo”;\n- `all too often` – „aż nazbyt często”;\n- `only too happy` – „bardzo chętnie” (dosłownie „tylko zbyt szczęśliwy”): `I'd be only too happy to help`.\n\nTo ostatnie dobrze pokazuje, jak „zbyt” zamienia się w „bardzo”. W rozmowie `You're too kind!` znaczy „jest pan bardzo uprzejmy”, bez żadnego wyrzutu.\n\nI jeszcze jedna para. `so` pochodzi od staroangielskiego `swā`, „tak”, z tego samego rdzenia co niemieckie `so`. A `such` to ściśnięte `swylc`, „tak-podobny”: `swā` + `līc` („ciało, postać”; z tego samego rdzenia co `like`). Dosłownie „takiej postaci”. Podobnie zbudowane jest `which` – z `hwylc`, „jakiej postaci”, a polskie „taki” i „jaki” – z „tak” i „jak”.",
      takeaway: "Czasem jedno słowo rozdwaja się tylko dlatego, że wymawia się je na dwa sposoby.",
      question: "Jak z jednego słowa to powstało jeszcze too?",
    },
  },
};
