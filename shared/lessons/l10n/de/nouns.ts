import type { LessonL10n } from "../index";

export const nouns: Record<string, LessonL10n> = {
  "plurals": {
    title: "Der Plural",
    subtitle: "-s, -es und seltsame Ausnahmen",
    theory: [
      {
        title: "Die Grundregel",
        text: "Meist hängt man `-s` an: `book → books`.\n\n`-es` nach `s, ss, sh, ch, x`: `bus → buses, box → boxes, watch → watches`.\n\nKonsonant + `y` → `-ies`: `city → cities`. Aber Vokal + `y` → nur `-s`: `day → days`.\n\nOft `f / fe` → `-ves`: `knife → knives, leaf → leaves`.",
        more: "Wie die Endung ausgesprochen wird. Ein Buchstabe, drei Laute:\n- `/s/` nach stimmlosen Lauten: `books, cats, cups`;\n- `/z/` nach stimmhaften Lauten und Vokalen: `dogs, days, trees`;\n- `/ɪz/` nach Zisch- und S-Lauten: `buses, boxes, watches, pages`.\n\nAchtung bei `/z/` am Wortende: Im Deutschen werden Konsonanten am Ende stimmlos (Auslautverhärtung), deshalb klingt `dogs` bei Deutschsprachigen oft wie „docks“.\n\nEndung `-o`: oft `-es` – `potatoes, tomatoes, heroes`, aber bei kurzen und entlehnten Wörtern `-s`: `photos, pianos, radios, videos`.\n\nNicht alle Wörter auf `-f` ändern sich: `roofs, chiefs, beliefs`. Merke dir die häufigsten `-ves`: `knife, wife, life, half, leaf, shelf, wolf, thief`.",
        why: "Die Endung `-s` hat sich nicht sofort durchgesetzt. Im Altenglischen hatte sie nur eine Gruppe männlicher Wörter (`stān → stānas`, „Steine“). Im Mittelenglischen breitete sich die nördliche Gewohnheit, überall `-es` anzuhängen, im ganzen Land aus. Das Deutsche hat dagegen seine vielen Pluralformen behalten: Tage, Kinder, Männer, Autos.",
      },
      {
        title: "Ausnahmen",
        text: "`man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice`.\n\nUnverändert: `sheep, fish, deer`.\n\nNur im Plural: `trousers, jeans, glasses, scissors` — `My jeans are new.`",
        more: "Zusammengesetzte Wörter: Der Plural steht am Hauptwort – `passers-by`, `mothers-in-law`. Ist das Wort schon verschmolzen, am Ende: `spoonfuls`.\n\nEin Nomen vor einem Nomen bekommt kein `-s`: `a shoe shop`, `a ten-minute break`, `a five-year-old boy` – obwohl es viele Schuhe und zehn Minuten sind. Ähnlich wie im Deutschen: „ein Schuhgeschäft“, „eine Zehn-Minuten-Pause“.\n\nSammelwörter wie `police` und `people` stehen immer im Plural: `The police are here. People are friendly.` `family` und `team` können im britischen Englisch Singular oder Plural haben: `My family is / are…`",
        why: "`deer` bedeutete im Altenglischen jedes Tier – genau wie das verwandte deutsche `Tier`. Bei Shakespeare im „König Lear“ heißt es `mice and rats, and such small deer` – „Mäuse, Ratten und solches Kleingetier“. Der Plural ohne Endung stammt aus dieser Zeit.",
        trap: "„Die Hose“ ist im Deutschen Singular, trousers aber Plural: My trousers are new. Umgekehrt: „die Nachrichten“ und „die Informationen“ sind Plural, news und information im Englischen Singular: The news is good.",
      },
    ],
    explain: {
      "h1": "police steht immer im Plural.",
      "h2": "Vor einem Nomen ohne -s: a ten-minute walk.",
    },
    story: {
      title: "Warum children und nicht childs",
      text: "Im Altenglischen wurde der Plural auf verschiedene Weisen gebildet. Die Endung `-as` (das spätere `-s`) war nur eine Möglichkeit und setzte sich erst später durch.\n\nDie Endung `-en` überlebte in `oxen` („Ochsen“ – auch im Deutschen mit -en!). `children` ist ein doppelter Plural: Zuerst hieß es `childer` (so sagt man noch in Dialekten Nordenglands), dann kam noch `-en` dazu.\n\n`feet, teeth, mice` sind Spuren einer alten Vokalveränderung: Die Pluralendung veränderte den Vokal im Stamm und verschwand dann. Übrig blieb nur der veränderte Laut. Genau wie im Deutschen: `Fuß – Füße`, `Maus – Mäuse`.",
      long: "Warum `children` und nicht `childs`? Warum `feet` und nicht `foots`? Jede englische Pluralausnahme ist eine überlebende alte Regel. Früher gab es viele davon, und jede galt für eine ganze Gruppe von Wörtern – so wie im Deutschen bis heute.\n\nIm Altenglischen teilten sich die Nomen in Klassen, ähnlich wie die deutschen Deklinationen. Jede Klasse hatte ihren eigenen Plural:\n- **-as**: `stān — stānas` (Stein — Steine). Das ist das spätere `-s`, damals aber nur eine Variante.\n- **-an**: `oxa — oxan` (Ochse — Ochsen), `ēage — ēagan` (Auge — Augen). Bei Chaucer im 14. Jahrhundert steht noch `eyen` – „Augen“, und in alten Texten `shoon` – „Schuhe“. Genau diese Endung lebt im Deutschen weiter: Augen, Ochsen, Frauen.\n- **ohne Endung**: Viele sächliche Wörter hatten im Plural dieselbe Form wie im Singular – `word`, „Wörter“, `scēap`, „Schafe“. Daher kommen die heutigen `sheep` und `deer`. Im Deutschen ist es ähnlich: das Messer, die Messer.\n- **Vokalwechsel**: `fōt — fēt`, `tōþ — tēþ`, `mūs — mȳs`.\n\nDer letzte Typ ist der spannendste – und Deutschsprachigen sofort vertraut. Im sehr alten Gemeingermanischen hatte der Plural dieser Wörter eine Endung mit dem Laut `i`. Dieses `i` „zog“ den Stammvokal nach vorn: `o` wurde zu `e`, `u` zu `y`. Dann fiel die Endung weg, und der veränderte Vokal blieb als einziges Pluralzeichen. So entstanden `feet`, `teeth`, `geese`, `mice`, `men`, `women`. Derselbe Vorgang ergab im Deutschen `Fuß — Füße`, `Maus — Mäuse`, `Gans — Gänse`. Es ist der Umlaut – im Deutschen sogar mit eigenen Buchstaben sichtbar.\n\n`children` hat eine eigene, doppelte Geschichte. Zuerst war der Plural von `cild` `cildru`, dann `childer` – so sagt man bis heute in Dialekten Nordenglands und Irlands. Das ist derselbe Typ wie das deutsche `Kind — Kinder`. Im Mittelenglischen spürte man im `-er` aber keinen Plural mehr, und im Süden hängte man noch eine bekannte Endung an: `-en`. Heraus kam ein doppelter Plural, ungefähr „Kinderen“. Genauso gebaut ist `brethren`, das alte „Brüder“ der Kirchensprache.\n\nWarum hat `-s` gewonnen? Im Mittelenglischen, nach der normannischen Eroberung, wurden die Endungen insgesamt schwächer und vermischten sich. Im Norden, wo die Nachfahren der Wikinger lebten, wurde die Grammatik besonders kühn vereinfacht, und `-es` hängte man fast überall an. Die nördliche Gewohnheit erreichte nach und nach London. Übrig blieben nur Wörter, die zu oft gesagt wurden, um sie umzubauen: Kinder, Füße, Zähne, Mäuse, Männer.\n\nDie Sprache gleicht Ausnahmen auch heute weiter an. Früher hieß der Plural von `cow` `kine`, der von `book` `bēc` – verwandt mit dem deutschen `Bücher`. Heute sind es `cows` und `books`. Und beim Computer wird `mouse` manchmal zu `mouses` – zumindest bei denen, die die Maus am Laptop meinen.",
      takeaway: "Pluralausnahmen sind überlebende alte Regeln.",
      question: "Warum children und nicht childs, und woher kommt die Pluralendung -s?",
    },
  },
  "possessives": {
    title: "Besitz: my, mine, 's",
    subtitle: "Wem gehört das",
    theory: [
      {
        title: "my und mine",
        text: "Vor dem Nomen: `my, your, his, her, its, our, their` — `This is my bag.`\n\nStatt des Nomens: `mine, yours, his, hers, ours, theirs` — `This bag is mine.`",
        more: "`its` und `it's` verwechseln sogar Muttersprachler. Der Test ist einfach: Wenn man `it is` oder `it has` einsetzen kann, schreibt man es mit Apostroph. `It's raining` = `It is raining`. `The dog wagged its tail` – „it is tail“ passt nicht, also ohne Apostroph.\n\n`whose` heißt „wessen“: `Whose bag is this?` Nicht verwechseln mit `who's` = `who is`: `Who's there?`\n\nNach `mine, yours` usw. steht kein Nomen: `This is mine`, nicht „This is mine bag“. Vor `own` nur `my, your…`: `I have my own room` – „Ich habe mein eigenes Zimmer“.",
        why: "`its` ohne Apostroph ist eine späte Form. Bis ins 17. Jahrhundert war das Possessivpronomen zu `it` einfach `his`: In der King-James-Bibel heißt es `if the salt have lost his savour` – „wenn das Salz seine Würze verliert“. Wie im Deutschen „das Salz … seine Würze“. `its` kam um 1600 auf und galt lange als umgangssprachlich.",
        trap: "Im Deutschen hängt „sein/ihr“ vom grammatischen Geschlecht ab: „die Firma und ihr Logo“. Im Englischen haben Dinge kein Geschlecht – alles ist its: The company changed its logo. Und der deutsche Genitiv „Annas Buch“ hat keinen Apostroph, der englische schon: Anna's book.",
        examples: ["Ist das dein Mantel? – Nein, ihrer."],
      },
      {
        title: "'s und of",
        text: "Bei Menschen und Tieren `'s`: `Anna's phone, my brother's car`.\n\nPlural auf -s – nur Apostroph: `my parents' house`. Unregelmäßiger Plural – `'s`: `children's books`.\n\nBei Dingen meist `of`: `the end of the film`, `the roof of the house`.\n\n`its` (sein, bei Dingen) ohne Apostroph. `it's` = it is.",
        more: "`'s` steht am Ende der ganzen Gruppe: `the King of Spain's daughter` ist die Tochter des Königs von Spanien, nicht Spaniens. `my sister and brother's flat` – eine gemeinsame Wohnung; `my sister's and my brother's flats` – zwei verschiedene.\n\nNach `'s` kann das Wort wegfallen: `at my mother's` (bei meiner Mutter zu Hause), `at the doctor's` (beim Arzt), `I'll go to Tom's` (zu Tom).\n\nAuch Zeit und Entfernung bekommen `'s`: `today's news`, `a week's holiday`, `two hours' drive`.",
      },
    ],
    explain: {
      "4": "Plural auf -s → nur Apostroph.",
      "h1": "Plural auf -s – nur Apostroph.",
      "h2": "its ist besitzanzeigend, it's = it is.",
    },
    story: {
      title: "Was hinter dem Apostroph steckt",
      text: "Im Altenglischen hatten Wörter eine Genitivendung `-es`: `cyninges` – „des Königs“. Wie im Deutschen: des Königs, des Tages. Mit der Zeit fiel der Vokal weg, `-s` blieb.\n\nSpäter, im 16. und 17. Jahrhundert, glaubte man, `the king's crown` sei eine Abkürzung von `the king his crown` („der König seine Krone“). So schrieb man sogar in Büchern, und der Apostroph ersetze angeblich das verlorene `hi`. Ein Irrtum: Dann müsste es `the queen her crown` heißen, man sagt aber `the queen's crown`.\n\nTatsächlich markiert der Apostroph nur das ausgefallene `e` der alten Endung.",
      long: "Im Altenglischen hatten Nomen Fälle, fast wie im Deutschen. Der Genitiv – „wessen?“ – hatte bei vielen Wörtern die Endung `-es`: `cyning` – „König“, `cyninges` – „des Königs“. `Cyninges sunu` – „des Königs Sohn“. Das Deutsche hat genau diese Endung bis heute: des Königs, des Tages, des Hauses.\n\nIn tausend Jahren haben die englischen Nomen alle Fälle bis auf einen verloren. Nominativ, Akkusativ und Dativ verschmolzen zu einer Form. Der Genitiv überlebte, nur der Vokal der Endung fiel weg: `cyninges → kinges → king's`. Es ist die einzige Fallendung, die englischen Nomen geblieben ist.\n\nDann beginnt die Verwirrung. Im 16. und 17. Jahrhundert kannten englische Gelehrte Latein besser als die Geschichte ihrer eigenen Sprache. Sie glaubten, `the king's crown` sei eine Abkürzung von `the king his crown`, „der König seine Krone“, und der Apostroph ersetze die verlorenen Buchstaben `hi`. Das schrieb man sogar ernsthaft: Im anglikanischen Gebetbuch steht bis heute `for Jesus Christ his sake` – „um Jesu Christi willen“. Deutschsprachigen kommt die Konstruktion bekannt vor: Umgangssprachlich sagt man ja „dem König seine Krone“.\n\nDie Theorie lässt sich leicht widerlegen: Dann müsste man `the queen her crown` sagen, aber alle sagten `the queen's crown`. Und `-es` war schon Hunderte Jahre vor der Erfindung des „his“ die Genitivendung.\n\nDer Apostroph selbst ist eine französische Erfindung. Man markierte damit einen ausgefallenen Buchstaben: `l'homme` statt `le homme`. In englischen Büchern erschien er im 16. Jahrhundert, und im Possessiv markiert er genau das ausgefallene `e` der alten Endung. Die Regel, den Apostroph im Plural nach dem `s` zu setzen – `the girls' room` –, setzte sich noch später durch, erst im 18. Jahrhundert. Im Deutschen dagegen gehört beim Genitiv kein Apostroph hin: „Annas Buch“. Der englische Einfluss bringt trotzdem viele Schilder wie „Anna's Café“ hervor.\n\nUnd eine letzte Seltsamkeit. Im heutigen Englisch verhält sich `'s` nicht wie eine Wortendung, sondern wie eine Partikel, die sich ans Ende einer ganzen Gruppe hängt: `the King of England's daughter` – die Tochter des Königs von England. Im Gespräch hört man sogar `the man I met yesterday's car` – das Auto des Mannes, den ich gestern getroffen habe. Ein Fall wurde zu einem kleinen selbstständigen Wort – das ist in der Geschichte der Sprachen selten.",
      takeaway: "'s ist der Rest eines alten Falls – des einzigen, den englische Nomen behalten haben.",
      question: "Was steckt hinter dem Apostroph in the king's crown?",
    },
  },
  "countable-uncountable": {
    title: "Zählbar und unzählbar",
    theory: [
      {
        title: "Kann man es zählen?",
        text: "**Zählbare** Nomen haben einen Plural und `a/an`: `an apple, three apples`.\n\n**Unzählbare** sind Stoffe und Abstraktes ohne Plural: `water, money, information, advice, furniture, luggage, news, work`. Sie haben kein `a/an`: nicht „an advice“, sondern `some advice / a piece of advice`.",
        more: "Viele Wörter können beides sein, mit unterschiedlicher Bedeutung:\n- `paper` – Papier, `a paper` – eine Zeitung oder ein wissenschaftlicher Artikel;\n- `glass` – Glas als Material, `a glass` – ein Trinkglas;\n- `time` – Zeit, `three times` – dreimal;\n- `chicken` – Hähnchenfleisch, `a chicken` – ein Huhn;\n- `coffee` – Kaffee allgemein, `two coffees` – zwei Tassen Kaffee im Café.\n\nEine weitere Gruppe Unzählbarer sind Tätigkeiten und Abstraktes: `homework, research, progress, knowledge, traffic, weather, fun`. „Schönes Wetter“ – `nice weather`, nicht „a nice weather“.",
        why: "Die Grenze der Zählbarkeit ist eine Vereinbarung der Sprache, keine Logik. Im Deutschen sagt man „die Möbel“, „die Ratschläge“, „die Informationen“; im Englischen haben `furniture`, `advice` und `information` keinen Plural. Dafür ist „die Hose“ Singular und `trousers` Plural. Die Sprecher sehen die Dinge nicht anders – die Wörter haben sich einfach so entwickelt.",
        trap: "„Informationen“, „Möbel“, „Ratschläge“, „Hausaufgaben“ verleiten zu „informations“, „furnitures“, „advices“, „homeworks“. Im Englischen sind sie unzählbar: some information, some furniture, some advice, my homework.",
      },
      {
        title: "Wie viel",
        text: "Zählbar: `many, a few, few, How many…?`\nUnzählbar: `much, a little, little, How much…?`\nBeide: `a lot of, some, any, no`.\n\n`a few / a little` – „ein paar, ein bisschen“; `few / little` – „wenig, fast nichts“.\n\nIn Aussagesätzen sagt man statt `much` meist `a lot of`: `I drink a lot of coffee.`",
        more: "Wie man Unzählbares zählt: Man braucht Maßwörter.\n- `a piece of advice / information / furniture / news`\n- `a slice of bread`, `a loaf of bread`\n- `a bottle of water`, `a cup of tea`, `a glass of milk`\n- `a bar of chocolate`, `a kilo of rice`, `an item of luggage`\n\nDie Frage „wie viele“ mit Maßwörtern geht mit `many`: `How many cups of coffee do you drink?` – wir zählen Tassen, nicht Kaffee.",
      },
    ],
    explain: {
      "h1": "advice ist unzählbar: a piece of advice.",
      "h2": "Im Café sind „zwei Kaffee“ zwei Portionen: two coffees.",
    },
    story: {
      title: "Die Erbse, die es nicht gab",
      text: "Im Englischen gab es einmal das Wort `pease` – „Erbsen“, unzählbar wie `rice`. Daher stammt ein altes Kinderlied über `pease porridge`, Erbsenbrei.\n\nAber `pease` klang am Ende wie ein Plural. Man beschloss, eine einzelne Erbse sei `pea`, und im 17. Jahrhundert entstand ein neues Wort. So wurde Unzählbares zählbar: `a pea, two peas`.\n\nDasselbe passierte mit der Kirsche: Das altfranzösische `cherise` hörten die Engländer als Plural und schnitten das „Überflüssige“ ab – heraus kam `cherry`.",
      long: "Im Englischen gab es einmal das Wort `pease` – „Erbsen“. Es war unzählbar wie `rice` oder `sand`: Erbsen waren eine Masse, keine einzelnen Stücke. Erhalten ist ein alter Kindervers: `Pease porridge hot, pease porridge cold` – „Erbsenbrei heiß, Erbsenbrei kalt“.\n\nAber `pease` endete auf den Laut `/z/` und klang genau wie ein Plural. Die Sprecher begannen, darin `peas` zu „hören“, und wenn das so war, musste eine einzelne Erbse `pea` heißen. Mitte des 17. Jahrhunderts taucht das neue Wort in Texten auf, und das Unzählbare wird zählbar: `a pea, two peas`.\n\nSprachwissenschaftler nennen das Rückbildung: Man schneidet von einem Wort ab, was man für eine Endung hält, obwohl es eigentlich zum Stamm gehört. Die Erbse ist kein Einzelfall.\n\n**Die Kirsche.** Die Engländer übernahmen aus dem normannischen Französisch das Wort `cherise`. Das `-se` am Ende klang wieder wie ein Plural und wurde abgeschnitten – so entstand `cherry`. Im Französischen blieb `cerise`, und das deutsche „Kirsche“ geht auf dieselbe lateinische Wurzel zurück.\n\n**Der Sherry.** Den Wein aus der spanischen Stadt Jerez nannte man in England im 16. Jahrhundert `sherris`. Bald hielt man das `-s` für eine Endung und sagte `sherry`.\n\n**Nachrichten und Ratschläge.** Es gab auch das Umgekehrte. `news` heißt wörtlich „neue Dinge“, und im 16. bis 18. Jahrhundert war es oft Plural: Man schrieb `these news are…` – wie das deutsche „diese Nachrichten sind“. Dann wurde es unzählbar, und heute heißt es `The news is bad`. Und `advice` war in der Geschäftssprache des 18. und 19. Jahrhunderts manchmal zählbar: `advices from London` – „Avis aus London“, Benachrichtigungen. Im Deutschen lebt dieses Wort noch im „Avis“ der Bankensprache. Das normale `advice` – „Rat“ – blieb ohne Plural.\n\nDer umgekehrte Prozess läuft gerade jetzt. Das Wort `data` ist von der Herkunft her der lateinische Plural von `datum`. Strenge Redakteure verlangen `the data are`. Aber die meisten Menschen empfinden `data` als Stoff, wie `information`, und sagen `the data is`. Wahrscheinlich streitet in ein paar Generationen niemand mehr darüber. Im Deutschen ist „die Daten“ dagegen fest im Plural geblieben.\n\nDie Moral: Zählbarkeit ist kein Naturgesetz, sondern eine Vereinbarung. Die Sprecher selbst ändern sie – manchmal wegen eines einzigen falsch gehörten Lauts.",
      takeaway: "Die Grenze zwischen zählbar und unzählbar ist keine Logik, sondern eine Vereinbarung der Sprache.",
      question: "Woher kommt das Wort pea („Erbse“)?",
    },
  },
};
