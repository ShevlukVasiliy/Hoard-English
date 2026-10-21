import type { LessonL10n } from "../index";

export const nouns: Record<string, LessonL10n> = {
  "plurals": {
    title: "El plural",
    subtitle: "-s, -es y excepciones raras",
    theory: [
      {
        title: "La regla básica",
        text: "Normalmente se añade `-s`: `book → books`.\n\n`-es` después de `s, ss, sh, ch, x`: `bus → buses, box → boxes, watch → watches`.\n\nConsonante + `y` → `-ies`: `city → cities`. Pero vocal + `y` → solo `-s`: `day → days`.\n\nA menudo `f / fe` → `-ves`: `knife → knives, leaf → leaves`.",
        more: "Cómo se pronuncia la terminación. Una sola letra, tres sonidos:\n- `/s/` después de sonidos sordos: `books, cats, cups`;\n- `/z/` después de sonidos sonoros y vocales: `dogs, days, trees`;\n- `/ɪz/` después de sibilantes: `buses, boxes, watches, pages`.\n\nOjo con la `-s` sonora `/z/`: en español la *s* casi siempre es sorda, y `dogs` suena entonces como «docs».\n\nTerminación `-o`: a menudo `-es` — `potatoes, tomatoes, heroes`, pero en palabras cortas o prestadas `-s`: `photos, pianos, radios, videos`.\n\nNo todas las palabras en `-f` cambian: `roofs, chiefs, beliefs`. Recuerda las `-ves` más frecuentes: `knife, wife, life, half, leaf, shelf, wolf, thief`.",
        why: "La `-s` inglesa no ganó de inmediato. En inglés antiguo solo la tenía un grupo de palabras masculinas (`stān → stānas`, «piedras»). En el inglés medio la costumbre del norte de poner `-es` en todas partes se extendió por el país. La `-s` española tiene otro origen, el latín (`rosas`, `muros`), pero el resultado se parece: una sola terminación para casi todo.",
      },
      {
        title: "Excepciones",
        text: "`man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice`.\n\nNo cambian: `sheep, fish, deer`.\n\nSolo en plural: `trousers, jeans, glasses, scissors` — `My jeans are new.`",
        more: "Palabras compuestas: el plural va en la palabra principal — `passers-by`, `mothers-in-law`. Pero si la palabra ya está fundida, al final: `spoonfuls`.\n\nUn sustantivo delante de otro no lleva `-s`: `a shoe shop`, `a ten-minute break`, `a five-year-old boy`, aunque haya muchos zapatos y diez minutos.\n\nColectivos como `police` y `people` van siempre en plural: `The police are here. People are friendly.` En cambio `family` y `team`, en el inglés británico, pueden ir en singular o en plural: `My family is / are…`",
        why: "`deer` en inglés antiguo significaba cualquier animal, como el alemán `Tier`. En «El rey Lear» de Shakespeare aparece `mice and rats, and such small deer`: «ratones, ratas y otros animalillos». El plural sin terminación viene de aquella época.",
        trap: "*La gente* es singular en español, pero people es plural: People are friendly, no «People is». Y al revés: *las noticias* van en plural, pero news es singular: The news is good.",
      },
    ],
    explain: {
      "h1": "police siempre va en plural.",
      "h2": "Delante de un sustantivo, sin -s: a ten-minute walk.",
    },
    story: {
      title: "Por qué children y no childs",
      text: "En inglés antiguo el plural se formaba de varias maneras. La terminación `-as` (la futura `-s`) era solo una de ellas, y ganó más tarde.\n\nLa terminación `-en` sobrevivió en `oxen` («bueyes»). `children` es un plural doble: primero fue `childer` (así se dice todavía en dialectos del norte de Inglaterra) y luego se le añadió además `-en`.\n\n`feet, teeth, mice` son huellas de un antiguo cambio vocálico: la terminación del plural cambió la vocal de la raíz y después desapareció. Solo quedó el sonido cambiado. Lo mismo en alemán: `Fuß — Füße`.",
      long: "¿Por qué `children` y no `childs`? ¿Por qué `feet` y no `foots`? Cada excepción inglesa en el plural es una regla antigua que sobrevivió. Hubo un tiempo en que eran muchas, y cada una funcionaba para todo un grupo de palabras.\n\nEn inglés antiguo los sustantivos se dividían en tipos, un poco como las declinaciones del latín. Cada tipo tenía su propio plural:\n- **-as**: `stān — stānas` (piedra — piedras). Es la futura `-s`, pero entonces solo una opción entre varias.\n- **-an**: `oxa — oxan` (buey — bueyes), `ēage — ēagan` (ojo — ojos). En Chaucer, en el siglo XIV, todavía aparece `eyen`, «ojos», y en textos antiguos `shoon`, «zapatos».\n- **sin terminación**: en muchas palabras neutras el plural era igual que el singular: `word`, «palabras», `scēap`, «ovejas». De ahí los actuales `sheep` y `deer`.\n- **cambio de vocal**: `fōt — fēt`, `tōþ — tēþ`, `mūs — mȳs`.\n\nEl último tipo es el más interesante. En una lengua muy antigua, el germánico común, el plural de estas palabras tenía una terminación con el sonido `i`. Esa `i` «tiraba» de la vocal de la raíz hacia delante: la `o` se convertía en `e`, la `u` en `y`. Después la terminación cayó, y la vocal cambiada quedó como única señal del plural. Así nacieron `feet`, `teeth`, `geese`, `mice`, `men`, `women`. El mismo proceso dio en alemán `Fuß — Füße`, `Maus — Mäuse`. Los lingüistas lo llaman metafonía o *umlaut*.\n\n`children` tiene una historia aparte, doble. Primero el plural de `cild` era `cildru`, luego `childer`: así se dice todavía en dialectos del norte de Inglaterra y de Irlanda. Pero en el inglés medio la gente dejó de sentir el plural en `-er`, y en el sur le añadieron otra terminación bien conocida, `-en`. Resultó un plural doble, algo así como «niñoses». Igual está hecho `brethren`, el antiguo «hermanos» del lenguaje religioso.\n\n¿Por qué ganó la `-s`? En el inglés medio, tras la conquista normanda, las terminaciones en general se debilitaron y se mezclaron. En el norte, donde vivían los descendientes de los vikingos, la gramática se simplificaba con especial audacia, y `-es` se ponía casi en todas partes. Esa costumbre del norte llegó poco a poco a Londres. Solo sobrevivieron las palabras que sonaban demasiado a menudo como para rehacerlas: niños, pies, dientes, ratones, hombres.\n\nEl español también tuvo sus restos de este tipo, aunque menos: la `-s` latina de acusativo se impuso pronto en casi todo. Por eso a un hispanohablante le sorprende tanto `children`: en su lengua casi no hay plurales irregulares.\n\nLa lengua sigue regularizando las excepciones hoy. En otro tiempo el plural de `cow` era `kine`, y el de `book`, `bēc`. Ahora son `cows` y `books`. Y en informática `mouse` se convierte a veces en `mouses`, al menos para quien habla del ratón del ordenador.",
      takeaway: "Las excepciones del plural son reglas antiguas que sobrevivieron.",
      question: "¿Por qué children y no childs, y de dónde viene la terminación -s del plural?",
    },
  },
  "possessives": {
    title: "Posesivos: my, mine, 's",
    subtitle: "De quién es",
    theory: [
      {
        title: "my y mine",
        text: "Delante del sustantivo: `my, your, his, her, its, our, their` — `This is my bag.`\n\nEn lugar del sustantivo: `mine, yours, his, hers, ours, theirs` — `This bag is mine.`",
        more: "`its` e `it's` los confunden incluso los nativos. La prueba es sencilla: si se puede poner `it is` o `it has`, se escribe con apóstrofo. `It's raining` = `It is raining`. `The dog wagged its tail`: «it is tail» no encaja, así que sin apóstrofo.\n\n`whose` es «de quién»: `Whose bag is this?` No lo confundas con `who's` = `who is`: `Who's there?`\n\nDespués de `mine, yours` y los demás no va sustantivo: `This is mine`, no «This is mine bag». Y delante de `own`, solo `my, your…`: `I have my own room`, «tengo mi propia habitación».",
        why: "`its` sin apóstrofo es una forma tardía. Hasta el siglo XVII el posesivo de `it` era `his`: en la Biblia del rey Jacobo dice `if the salt have lost his savour`, «si la sal pierde su sabor». `its` apareció hacia 1600 y durante mucho tiempo se consideró vulgar.",
        trap: "El español *su* sirve para todo: *su* casa puede ser de él, de ella, de ellos o de usted. En inglés hay que elegir: his house, her house, their house, your house. «Ana y su hermano» → Anna and her brother.",
        examples: ["¿Es tu abrigo? — No, es suyo (de ella)."],
      },
      {
        title: "'s y of",
        text: "Con personas y animales, `'s`: `Anna's phone, my brother's car`.\n\nPlural en -s: solo apóstrofo: `my parents' house`. Plural irregular: `'s`: `children's books`.\n\nCon cosas suele usarse `of`: `the end of the film`, `the roof of the house`.\n\n`its` (su, de una cosa) va sin apóstrofo. `it's` = it is.",
        more: "`'s` se pone al final de todo el grupo: `the King of Spain's daughter` es la hija del rey de España, no la de España. `my sister and brother's flat`: un piso común; `my sister's and my brother's flats`: dos pisos distintos.\n\nDespués de `'s` la palabra puede omitirse: `at my mother's` (en casa de mi madre), `at the doctor's` (en el médico), `I'll go to Tom's` (a casa de Tom).\n\nEl tiempo y la distancia también llevan `'s`: `today's news`, `a week's holiday`, `two hours' drive`.\n\nNo traduzcas palabra por palabra «el coche de Ana» como «the car of Anna»: con personas se dice `Anna's car`.",
      },
    ],
    explain: {
      "4": "Plural en -s → solo apóstrofo.",
      "h1": "Plural en -s: solo apóstrofo.",
      "h2": "its es posesivo; it's = it is.",
    },
    story: {
      title: "Qué se esconde tras el apóstrofo",
      text: "En inglés antiguo las palabras tenían una terminación de genitivo, `-es`: `cyninges`, «del rey». Con el tiempo se perdió la vocal y quedó `-s`.\n\nMás tarde, en los siglos XVI y XVII, se creyó que `the king's crown` era una abreviatura de `the king his crown` («el rey su corona»). Así se escribía incluso en libros, y el apóstrofo supuestamente sustituía el `hi` perdido. Es un error: entonces habría que decir `the queen her crown`, y se dice `the queen's crown`.\n\nEn realidad el apóstrofo marca solo la `e` que se perdió de la vieja terminación.",
      long: "En inglés antiguo los sustantivos tenían casos, como en latín. El genitivo, el caso de «de quién», tenía en muchas palabras la terminación `-es`: `cyning`, «rey»; `cyninges`, «del rey». `Cyninges sunu`, «el hijo del rey».\n\nEn mil años los sustantivos ingleses perdieron todos los casos menos uno. Nominativo, acusativo y dativo se fundieron en una sola forma. El genitivo sobrevivió, solo que la vocal de la terminación cayó: `cyninges → kinges → king's`. Es la única terminación de caso que les queda a los sustantivos ingleses. El español hizo algo parecido con el latín, pero de forma más radical: perdió todos los casos y expresa la posesión con *de*.\n\nAquí empieza la confusión. En los siglos XVI y XVII los eruditos ingleses sabían más latín que historia de su propia lengua. Creían que `the king's crown` era una abreviatura de `the king his crown`, «el rey su corona», y que el apóstrofo sustituía las letras perdidas `hi`. Hasta se escribía así en serio: en el devocionario anglicano todavía aparece `for Jesus Christ his sake`, «por amor de Jesucristo».\n\nEsta teoría se refuta fácilmente: entonces habría que decir `the queen her crown`, y todo el mundo decía `the queen's crown`. Además, `-es` era la terminación del genitivo cientos de años antes de que a nadie se le ocurriera el «his».\n\nEl propio apóstrofo es un invento francés. Se usaba para marcar una letra perdida: `l'homme` en lugar de `le homme`. En los libros ingleses apareció en el siglo XVI, y en el posesivo marca justamente la `e` caída de la vieja terminación. La regla de poner el apóstrofo después de la `s` en plural, `the girls' room`, se fijó todavía más tarde, en el siglo XVIII.\n\nY una última rareza. En el inglés actual `'s` no se comporta como terminación de una palabra, sino como una partícula que se engancha al final de todo un grupo: `the King of England's daughter`, la hija del rey de Inglaterra. En la conversación se oye incluso `the man I met yesterday's car`, el coche del hombre que conocí ayer. Un caso gramatical convertido en una pequeña palabra independiente: algo poco frecuente en la historia de las lenguas.",
      takeaway: "'s es el resto de un caso antiguo, el único que les queda a los sustantivos ingleses.",
      question: "¿Qué se esconde tras el apóstrofo de the king's crown?",
    },
  },
  "countable-uncountable": {
    title: "Contables e incontables",
    theory: [
      {
        title: "¿Se puede contar?",
        text: "Los **contables** tienen plural y `a/an`: `an apple, three apples`.\n\nLos **incontables** son sustancias y abstracciones sin plural: `water, money, information, advice, furniture, luggage, news, work`. No llevan `a/an`: no «an advice», sino `some advice / a piece of advice`.",
        more: "Muchas palabras pueden ser de los dos tipos, con distinto sentido:\n- `paper`: papel; `a paper`: un periódico o un artículo científico;\n- `glass`: vidrio; `a glass`: un vaso;\n- `time`: tiempo; `three times`: tres veces;\n- `chicken`: carne de pollo; `a chicken`: una gallina;\n- `coffee`: el café en general; `two coffees`: dos cafés en un bar.\n\nOtro grupo de incontables son actividades y abstracciones: `homework, research, progress, knowledge, traffic, weather, fun`. «Hace buen tiempo»: `nice weather`, no «a nice weather».",
        why: "La frontera de lo contable es un acuerdo de cada lengua, no lógica. En español decimos *muebles*, *consejos*, *informaciones*; en inglés `furniture`, `advice`, `information` no tienen plural. En cambio *el pelo* es singular en español y `hair` también, pero *las tijeras* es plural en los dos idiomas. Los hablantes no «ven» las cosas de otra forma: las palabras se formaron así.",
        trap: "*Muebles, consejos, informaciones, noticias* llevan a decir «furnitures», «advices», «informations», «a news». En inglés son incontables: some furniture, some advice, some information, some news.",
      },
      {
        title: "Cuánto",
        text: "Contables: `many, a few, few, How many…?`\nIncontables: `much, a little, little, How much…?`\nLos dos: `a lot of, some, any, no`.\n\n`a few / a little`: «un poco, pero hay»; `few / little`: «poco, casi nada».\n\nEn las afirmaciones, en lugar de `much` se suele decir `a lot of`: `I drink a lot of coffee.`",
        more: "Cómo contar lo incontable: hacen falta palabras-unidad.\n- `a piece of advice / information / furniture / news`\n- `a slice of bread`, `a loaf of bread`\n- `a bottle of water`, `a cup of tea`, `a glass of milk`\n- `a bar of chocolate`, `a kilo of rice`, `an item of luggage`\n\nLa pregunta «cuántos» con unidades va con `many`: `How many cups of coffee do you drink?` Contamos tazas, no café.",
      },
    ],
    explain: {
      "h1": "advice es incontable: a piece of advice.",
      "h2": "En un bar, «dos cafés» son dos tazas: two coffees.",
    },
    story: {
      title: "El guisante que no existía",
      text: "En inglés existía la palabra `pease`, «guisantes», incontable como `rice`. De ahí una vieja canción infantil sobre el `pease porridge`, el puré de guisantes.\n\nPero `pease` sonaba al final como un plural. La gente decidió que un guisante era `pea`, y en el siglo XVII nació una palabra nueva. Así lo incontable se volvió contable: `a pea, two peas`.\n\nLo mismo pasó con la cereza: el francés antiguo `cherise` sonó a los ingleses como un plural, y cortaron lo «sobrante»: salió `cherry`.",
      long: "En inglés existía la palabra `pease`, «guisantes». Era incontable, como `rice` o `sand`: los guisantes eran una masa, no piezas sueltas. Se conserva una vieja canción infantil: `Pease porridge hot, pease porridge cold`, «puré de guisantes caliente, puré de guisantes frío».\n\nPero `pease` terminaba en el sonido `/z/` y sonaba exactamente como un plural. Los hablantes empezaron a «oír» en ella `peas`, y si era así, un solo guisante tenía que ser `pea`. A mediados del siglo XVII la palabra nueva aparece en los textos, y lo incontable se vuelve contable: `a pea, two peas`.\n\nLos lingüistas lo llaman derivación regresiva: se le corta a una palabra lo que se toma por sufijo o terminación, aunque en realidad sea parte de la raíz. La historia del guisante no es la única.\n\n**La cereza.** Los ingleses tomaron del francés normando la palabra `cherise`. La `-se` final volvió a sonar a plural y se cortó: salió `cherry`. En francés se quedó `cerise`.\n\n**El jerez.** El vino de Jerez, en el siglo XVI, se llamaba en Inglaterra `sherris`. Pronto la `-s` se tomó por terminación y empezó a decirse `sherry`. Así que esa palabra inglesa es, en el fondo, el nombre de una ciudad española con la «s» recortada.\n\n**Noticias y consejos.** También pasó lo contrario. `news` es literalmente «cosas nuevas», y en los siglos XVI–XVIII a menudo era plural: se escribía `these news are…` Luego se volvió incontable, y hoy se dice `The news is bad`, aunque en español *las noticias* siguen siendo plural. Y `advice`, en el lenguaje comercial de los siglos XVIII y XIX, a veces era contable: `advices from London`, «avisos desde Londres». El `advice` corriente, «consejo», se quedó sin plural.\n\nAhora mismo está ocurriendo el proceso inverso. La palabra `data` es, por su origen, el plural latino de `datum`. Los editores estrictos exigen escribir `the data are`. Pero la mayoría de la gente percibe `data` como una sustancia, igual que `information`, y dice `the data is`. Lo más probable es que dentro de un par de generaciones ya nadie discuta. Al español le pasó algo parecido: *los datos* sigue en plural, pero *la data* ya se oye en algunos países.\n\nMoraleja: lo contable no es una ley de la naturaleza, sino un acuerdo. Lo cambian los propios hablantes, a veces por un solo sonido que se oyó mal.",
      takeaway: "La frontera entre contable e incontable no es lógica, sino un acuerdo de la lengua.",
      question: "¿De dónde salió la palabra pea («guisante»)?",
    },
  },
};
