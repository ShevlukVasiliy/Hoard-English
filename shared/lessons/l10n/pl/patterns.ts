import type { LessonL10n } from "../index";

export const patterns: Record<string, LessonL10n> = {
  "gerund-infinitive": {
    title: "Gerund czy Infinitive",
    subtitle: "doing czy to do",
    theory: [
      {
        title: "Zależy od czasownika",
        text: "Po jednych czasownikach idzie `-ing`: `enjoy, mind, avoid, finish, keep, suggest, can't stand` — `I enjoy cooking.`\n\nPo innych – `to + V`: `want, decide, hope, plan, agree, refuse, manage, promise` — `She decided to leave.`\n\nPo przyimkach – zawsze `-ing`: `I'm interested in learning`, `before leaving`, `without saying`.",
        more: "Jak zapamiętać bez wkuwania. Bezokolicznik z `to` często patrzy naprzód – na cel, plan, przyszłość: `want, plan, hope, decide, promise, agree, expect, would like`. Gerundium częściej mówi o samej czynności, doświadczeniu, procesie: `enjoy, mind, avoid, finish, practise, imagine, miss, keep`.\n\nPo `would like / would love / would prefer` – tylko bezokolicznik: `I'd like to come.` A samo `like` – oba: `I like swimming / to swim`.\n\nGerundium bywa podmiotem: `Swimming is good for you.` `Learning languages takes time.` Polski używa tu rzeczownika odczasownikowego: „pływanie”, „nauka języków”.\n\nCel – bezokolicznik: `I came here to learn English`, nie „for learn”.",
        why: "Dlaczego po jednych czasownikach `to`, a po innych `-ing`? Po części to dziedzictwo znaczenia. `to` było kiedyś zwykłym przyimkiem kierunku – „do, dla”. Dlatego czasowniki dążenia i planu biorą `to`: poruszasz się „ku” czynności.",
        trap: "Po polsku po czasowniku zwykle stoi bezokolicznik: „lubię gotować”, „przestań palić”, „unikam jeżdżenia”. To ciągnie do „I enjoy to cook”, „stop to smoke”. A po przyimku polski ma rzeczownik („przed wyjściem”, „bez mówienia”), angielski – -ing: before leaving, without saying. I to w look forward to jest przyimkiem: I look forward to seeing you.",
        examples: ["Otworzysz okno?", "Udało nam się złapać taksówkę."],
      },
      {
        title: "Zmieniają sens",
        text: "`stop doing` – przestać; `stop to do` – zatrzymać się, żeby coś zrobić.\n`remember doing` – pamiętać, że się zrobiło; `remember to do` – nie zapomnieć zrobić.\n`try doing` – spróbować czegoś jako sposobu; `try to do` – postarać się.\n\n`like, love, hate, start, begin` – z oboma prawie bez różnicy.",
        more: "Kolejne pary ze zmianą sensu:\n- `forget doing` – zapomnieć, że się zrobiło; `forget to do` – zapomnieć zrobić: `Don't forget to call me.`\n- `regret doing` – żałować zrobionego; `regret to tell` – z przykrością zawiadomić: `We regret to inform you…`\n- `go on doing` – kontynuować to samo; `go on to do` – przejść do następnego.\n\nPo czasownikach percepcji – oba, z różnicą: `I saw him cross the street` – widziałem całość; `I saw him crossing the street` – widziałem moment, w trakcie.\n\n`let` i `make` – bez `to`: `Let me go. She made me laugh.`",
      },
    ],
    explain: {
      "3": "Po przyimku – -ing.",
      "4": "Zatrzymał się, żeby wypić kawę.",
      "h1": "forget doing – nie zapomnieć tego, co było.",
      "h2": "stop to do – zatrzymać się, żeby coś zrobić.",
    },
    story: {
      text: "W staroangielskim bezokolicznik był po prostu końcówką: `etan` – „jeść”. A żeby powiedzieć „żeby zjeść”, stawiano przyimek `to` i specjalną formę: `tō etanne`. Z czasem `to` przykleiło się do prawie wszystkich bezokoliczników, choć po `can, must, will` wciąż go nie ma.\n\nStąd spór o „rozszczepiony bezokolicznik”. Słynny wstęp do „Star Treka” – `to boldly go` – gramatycy XIX wieku uznaliby za błąd: nie wolno stawiać słowa między `to` a czasownikiem, bo w łacinie bezokolicznik to jedno słowo.\n\nWspółczesne słowniki i gramatyki nie popierają tej reguły: `to really understand` to normalny angielski.",
      long: "W staroangielskim bezokolicznik był po prostu końcówką czasownika, jak polskie „-ć”: `etan` – „jeść”, `singan` – „śpiewać”. Żadne `to` przed nim nie było potrzebne.\n\nAle była też druga forma – dla celu i zamiaru. Żeby powiedzieć „żeby zjeść”, stawiano przyimek `tō` – „do, dla” – i specjalną formę przypadkową bezokolicznika: `tō etanne`. Dosłownie „do jedzenia”, „dla zjedzenia”. W staroangielskim bezokolicznik trochę się odmieniał, jak rzeczownik.\n\nW średnioangielskim końcówki się starły i obie formy się zbiegły: i `etan`, i `etanne` zamieniły się w `eten`, potem w `eat`. Rozróżnić je można było tylko po `to`. I `to` zaczęło się rozprzestrzeniać: najpierw po czasownikach związanych z celem, potem prawie wszędzie. Tak powstało `I want to eat`.\n\nAle w najczęstszych konstrukcjach `to` nie zdążyło się utrwalić. Czasowniki modalne – `can, must, will, shall, may` – oraz `let`, `make` zachowały dawny goły bezokolicznik: `I can eat`, `Let me eat`.\n\nPotem zaczyna się najsłynniejsza wojna gramatyczna języka angielskiego – o „rozszczepiony bezokolicznik”. Czy można postawić słowo między `to` a czasownikiem: `to boldly go`, `to really understand`?\n\nW XIX wieku wielu gramatyków uznało, że nie. Argument był taki: w łacinie bezokolicznik to jedno słowo (`ire` – „iść”), nie da się go rozerwać, więc i w angielskim `to` i czasownik są nierozłączne. Jeden z pierwszych przeciwników, Henry Alford, w 1864 roku nazwał ten zwyczaj niedopuszczalnym. Nauczyciele przez dziesięciolecia poprawiali czerwonym długopisem każde `to really`.\n\nKłopot w tym, że `to` w angielskim to osobne słowo, dawny przyimek, i łacińska logika go nie dotyczy. Polak widzi to od razu: „jeść” to jedno słowo i nie da się go rozciąć, a `to eat` to dwa. Rozszczepione bezokoliczniki występują w angielskich tekstach od XIII–XIV wieku i od tamtej pory nie zniknęły.\n\nGdy w 1966 roku na początku serialu „Star Trek” padło `to boldly go where no man has gone before` – „śmiało iść tam, gdzie nie dotarł jeszcze żaden człowiek” – puryści się oburzyli. A zdanie stało się jednym z najbardziej znanych w kulturze anglojęzycznej. Spróbuj je „poprawić”: `to go boldly` brzmi blado, a `boldly to go` – dziwnie.\n\nJuż w 1926 roku autor słynnego słownika angielskiego użycia, Henry Fowler, wyśmiał tych, którzy panicznie boją się rozszczepiać bezokolicznik. Dziś większość słowników i gramatyk uważa `to really understand` za normalny angielski. Reguła okazała się wymyślona, a język – silniejszy od reguły.",
      takeaway: "to przed czasownikiem było kiedyś zwykłym przyimkiem „do, dla”.",
      question: "Czym było to przed czasownikiem w staroangielskim?",
    },
  },
  "used-to-would": {
    title: "used to i would",
    subtitle: "Jak było kiedyś",
    theory: [
      {
        text: "`used to + V` – nawyk albo stan w przeszłości, którego już nie ma: `I used to live in Gdańsk.` `She used to have long hair.`\n\nPytanie i przeczenie: `Did you use to…?`, `I didn't use to…` – bez `d`, bo jest już `did`.",
        more: "`used to` występuje tylko w przeszłości. Dla obecnych nawyków – Present Simple i `usually`: `I usually get up at 7`, nie „I use to get up”.\n\n`used to` podkreśla kontrast z teraźniejszością: kiedyś było tak, a teraz nie. Często dodaje się `but now…`: `I used to smoke, but I gave up.`\n\nPytanie ze słowem pytającym: `Where did you use to live? What did you use to do on weekends?`\n\nPrzeczenie bywa też z `never`: `I never used to like olives` – brzmi naturalniej niż `didn't use to`.",
        why: "Czasownik `use` znaczył dawniej „mieć zwyczaj” i żył w różnych czasach: `as we use to say` – „jak zwykliśmy mówić”. Do XIX wieku przetrwała tylko forma przeszła `used to` i zamieniła się w skamieniałą konstrukcję. Polskie „zwykłem” ma podobny los: dziś brzmi już książkowo.",
        trap: "Polskie „kiedyś”, „dawniej” nie zawsze oznacza used to: jeśli coś było raz albo z określonym czasem trwania – zwykły Past Simple. „Mieszkałem w Gdańsku pięć lat” – I lived in Gdańsk for five years. A „zwykle wstaję o siódmej” to nie „I use to”, tylko I usually get up at 7.",
        examples: ["W dzieciństwie bawiliśmy się tutaj.", "Kiedyś było tu kino."],
      },
      {
        title: "would i be used to",
        text: "`would + V` – powtarzające się czynności w przeszłości, często we wspomnieniach: `Every summer we would go to the lake.` Tylko dla czynności, nie dla stanów: nie „I would have a dog”.\n\nNie myl: `be / get used to + -ing` – „być przyzwyczajonym / przyzwyczajać się”: `I'm used to getting up early.` To teraźniejszość, a nie przeszłość.",
        more: "`would` o przeszłości ma książkowy, narracyjny odcień wspomnień: `My grandmother would tell us stories every evening.` Zwykle najpierw ustala się czas przez `used to` albo kontekst, a potem kontynuuje z `would`.\n\nTrzy podobne formy:\n- `I used to work at night` – kiedyś pracowałem w nocy (teraz nie);\n- `I'm used to working at night` – jestem przyzwyczajony do pracy w nocy;\n- `I'm getting used to working at night` – przyzwyczajam się.\n\nPo `be/get used to` może stać też rzeczownik: `I'm used to the noise`, `You'll get used to the climate.` Jak po polsku „przyzwyczaić się do hałasu” – tylko że zamiast „do” jest `to`, a czasownik dostaje `-ing`.",
      },
    ],
    explain: {
      "3": "Stan (mieć) → tylko used to.",
      "h1": "Stan w przeszłości – tylko used to, would nie można.",
      "h2": "get used to – przyzwyczaić się.",
    },
    story: {
      title: "use to czy used to?",
      text: "Słowo `use` znaczyło kiedyś „mieć zwyczaj”: `He uses to rise early` – „zwykł wstawać wcześnie”. Tak pisano jeszcze w XVIII wieku.\n\nPotem została tylko forma przeszła `used to`. A ponieważ `d` i `t` obok siebie się zlewają, na słuch `used to` i `use to` brzmią tak samo – /ˈjuːstə/. Stąd wieczne zamieszanie na piśmie.\n\nReguła jest prosta: po `did` pisz `use to` (did już pokazuje przeszłość), we wszystkich innych przypadkach – `used to`.",
      long: "Słowo `use` było kiedyś pełnoprawnym czasownikiem o znaczeniu „mieć zwyczaj, przywyknąć coś robić”. W tekstach XVI–XVIII wieku spotyka się zdania w rodzaju `as we use to say` – „jak zwykliśmy mówić” – albo `they use to dine at noon` – „zwykle jedzą obiad w południe”. Czasownik spokojnie żył w czasie teraźniejszym.\n\nAle w teraźniejszości miał silną konkurencję: `usually`, `generally`, prosty czas teraźniejszy. A w przeszłości `used to` okazało się bardzo wygodne: jednym słowem mówiło „kiedyś było tak, a teraz nie”. Teraźniejszość obumarła, a przeszłość została – i zastygła.\n\nTeraz `used to` to dziwna konstrukcja: czasownik, który ma tylko czas przeszły. Zachowuje się pół zwyczajnie, pół modalnie, i rodzimi użytkownicy sami nie są pewni, jak się z nim obchodzić.\n\n**Jak pisać przeczenie?** Warianty: `I didn't use to`, `I didn't used to`, `I usedn't to` (staroświeckie brytyjskie), `I used not to`. Słowniki zalecają `didn't use to`: po `did` czasownik stoi w formie podstawowej. Ale `didn't used to` spotyka się ciągle, nawet w gazetach.\n\n**Skąd zamieszanie?** Z wymowy. `used to` brzmi jak `/ˈjuːstə/`: `d` i `t` obok siebie zlewają się w jedno `t`. Na słuch `use to` i `used to` są nie do odróżnienia, i piszący musi pamiętać regułę.\n\nZauważ jeszcze jedno: w `used to` (nawyk) litera `s` brzmi jak `/s/`: `/juːst/`. A w zwykłym czasowniku `use` – „używać” – jak `/z/`: `I used a knife` – `/juːzd/`. Rodzimy użytkownik rozróżnia więc na słuch „zwykł” i „użył”, choć pisze się je tak samo.\n\nA `would` o przeszłych nawykach to zupełnie inna historia. To samo `would` co w warunkach, i dodaje odcień wspomnienia, nostalgii: `Every summer we would go to the lake` – „każdego lata jeździliśmy nad jezioro”. Polski wyraża to aspektem niedokonanym – „jeździliśmy”, „opowiadała” – i czasem słowem „bywało”. Pisarze kochają `would`, a w zwykłej rozmowie częściej słychać `used to`.",
      takeaway: "used to to skamieniały czas przeszły czasownika „mieć zwyczaj”.",
      question: "Skąd się wzięło used to i dlaczego po did pisze się use to?",
    },
  },
};
