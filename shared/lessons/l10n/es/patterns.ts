import type { LessonL10n } from "../index";

export const patterns: Record<string, LessonL10n> = {
  "gerund-infinitive": {
    title: "Gerund o Infinitive",
    subtitle: "doing o to do",
    theory: [
      {
        title: "Depende del verbo",
        text: "Después de algunos verbos va `-ing`: `enjoy, mind, avoid, finish, keep, suggest, can't stand` — `I enjoy cooking.`\n\nDespués de otros, `to + V`: `want, decide, hope, plan, agree, refuse, manage, promise` — `She decided to leave.`\n\nDespués de una preposición, siempre `-ing`: `I'm interested in learning`, `before leaving`, `without saying`.",
        more: "Cómo recordarlo sin memorizar listas. El infinitivo con `to` suele mirar hacia delante: a un objetivo, un plan, el futuro: `want, plan, hope, decide, promise, agree, expect, would like`. El gerundio suele hablar de la acción misma, la experiencia, el proceso: `enjoy, mind, avoid, finish, practise, imagine, miss, keep`.\n\nDespués de `would like / would love / would prefer`, solo infinitivo: `I'd like to come.` Y el simple `like` admite los dos: `I like swimming / to swim`.\n\nEl gerundio puede ser sujeto: `Swimming is good for you.` `Learning languages takes time.` Donde el español usa el infinitivo («Nadar es bueno»), el inglés usa `-ing`.\n\nLa finalidad va en infinitivo: `I came here to learn English`, no «for learn» ni «for to learn».",
        why: "¿Por qué unos verbos llevan `to` y otros `-ing`? En parte es herencia del significado. `to` era antes una preposición normal de dirección: «hacia, para». Por eso los verbos de deseo y plan llevan `to`: te mueves «hacia» la acción.",
        trap: "Después de preposición el español usa el infinitivo («antes de salir», «sin decir nada», «gracias por venir»), y eso lleva a «before to leave» o «thanks for come». En inglés tras preposición va -ing: before leaving, without saying, thanks for coming. Lo mismo en look forward to seeing you: to aquí es preposición. Y «sugerir hacer» → suggest doing, no «suggest to do».",
        examples: ["¿Te importa abrir la ventana?", "Conseguimos encontrar un taxi."],
      },
      {
        title: "Cambian de sentido",
        text: "`stop doing`: dejar de hacer; `stop to do`: pararse para hacer.\n`remember doing`: recordar haberlo hecho; `remember to do`: acordarse de hacer.\n`try doing`: probar algo como solución; `try to do`: intentar, esforzarse.\n\n`like, love, hate, start, begin`: con los dos casi sin diferencia.",
        more: "Más pares que cambian de sentido:\n- `forget doing`: olvidar que lo hiciste; `forget to do`: olvidarse de hacer: `Don't forget to call me.`\n- `regret doing`: arrepentirse de algo hecho; `regret to tell`: lamentar comunicar: `We regret to inform you…`\n- `go on doing`: seguir con lo mismo; `go on to do`: pasar a lo siguiente.\n\nCon verbos de percepción, los dos, con diferencia: `I saw him cross the street`, lo vi cruzar entero; `I saw him crossing the street`, lo vi mientras cruzaba.\n\n`let` y `make` van sin `to`: `Let me go. She made me laugh.`",
      },
    ],
    explain: {
      "3": "Después de preposición, -ing.",
      "4": "Se paró para tomar un café.",
      "h1": "forget doing: no olvidar algo que pasó.",
      "h2": "stop to do: pararse para hacer algo.",
    },
    story: {
      text: "En inglés antiguo el infinitivo era solo una terminación: `etan`, «comer». Y para decir «para comer» se ponía la preposición `to` y una forma especial: `tō etanne`. Con el tiempo `to` se pegó a casi todos los infinitivos, aunque después de `can, must, will` sigue sin aparecer.\n\nDe ahí viene la polémica del «infinitivo partido». La famosa entrada de «Star Trek», `to boldly go`, los gramáticos del siglo XIX la habrían considerado un error: no se debe poner nada entre `to` y el verbo, porque en latín el infinitivo es una sola palabra.\n\nLos diccionarios y gramáticas actuales no apoyan esa regla: `to really understand` es inglés normal.",
      long: "En inglés antiguo el infinitivo era solo una terminación del verbo, como el español *-ar, -er, -ir*: `etan`, «comer»; `singan`, «cantar». No hacía falta ningún `to` delante.\n\nPero había una segunda forma, para la finalidad y la intención. Para decir «para comer», se ponía la preposición `tō`, «hacia, para», y una forma especial del infinitivo con caso: `tō etanne`. Literalmente «para el comer». En inglés antiguo el infinitivo se declinaba un poco, como un sustantivo, igual que en español puede llevar artículo: «el comer y el rascar…».\n\nEn el inglés medio las terminaciones se desgastaron y las dos formas coincidieron: tanto `etan` como `etanne` se convirtieron en `eten` y después en `eat`. Solo se podían distinguir por el `to`. Y `to` empezó a extenderse: primero detrás de verbos relacionados con un objetivo, después casi en todas partes. Así apareció `I want to eat`.\n\nPero en las construcciones más frecuentes `to` no llegó a instalarse. Los modales (`can, must, will, shall, may`) y `let`, `make` conservaron el antiguo infinitivo desnudo: `I can eat`, `Let me eat`.\n\nY entonces empieza la guerra gramatical más famosa del inglés: la del «infinitivo partido». ¿Se puede poner una palabra entre `to` y el verbo: `to boldly go`, `to really understand`?\n\nEn el siglo XIX muchos gramáticos decidieron que no. El argumento era este: en latín el infinitivo es una sola palabra (`ire`, «ir»), no se puede partir, así que en inglés `to` y el verbo tampoco deben separarse. Uno de los primeros detractores, Henry Alford, en 1864 calificó esa costumbre de inaceptable. Los profesores pasaron décadas corrigiendo con bolígrafo rojo cada `to really`.\n\nEl problema es que `to` en inglés es una palabra aparte, una antigua preposición, y la lógica latina no se le aplica. Un hispanohablante lo ve claro: en español «comer» no se puede partir porque es una palabra; en inglés `to eat` son dos. Los infinitivos partidos aparecen en textos ingleses desde los siglos XIII–XIV y nunca han desaparecido.\n\nCuando en 1966 sonó al principio de la serie «Star Trek» `to boldly go where no man has gone before`, «ir audazmente adonde nadie ha llegado antes», los puristas se indignaron. Y la frase se convirtió en una de las más conocidas de la cultura anglosajona. Intenta «corregirla»: `to go boldly` suena flojo, y `boldly to go`, raro.\n\nYa en 1926 el autor del famoso diccionario de uso del inglés, Henry Fowler, se burló de quienes temían con pánico partir un infinitivo. Hoy la mayoría de diccionarios y gramáticas consideran `to really understand` inglés normal. La regla resultó inventada, y la lengua, más fuerte que la regla.",
      takeaway: "El to delante del verbo era antes una preposición normal: «para, hacia».",
      question: "¿Qué era el to delante del verbo en inglés antiguo?",
    },
  },
  "used-to-would": {
    title: "used to y would",
    subtitle: "Cómo era antes",
    theory: [
      {
        text: "`used to + V`: una costumbre o un estado del pasado que ya no existe: `I used to live in Valencia.` `She used to have long hair.`\n\nPregunta y negación: `Did you use to…?`, `I didn't use to…`, sin `d`, porque ya está `did`.",
        more: "`used to` solo existe en pasado. Para costumbres actuales, Present Simple y `usually`: `I usually get up at 7`, no «I use to get up». El español *soler* tiene presente (*suelo*), el inglés no.\n\n`used to` subraya el contraste con el presente: antes era así y ahora no. A menudo se añade `but now…`: `I used to smoke, but I gave up.`\n\nPregunta con palabra interrogativa: `Where did you use to live? What did you use to do on weekends?`\n\nLa negación también puede ir con `never`: `I never used to like olives` suena más natural que `didn't use to`.",
        why: "El verbo `use` significaba antes «tener costumbre» y vivía en distintos tiempos: `as we use to say`, «como solemos decir», exactamente como el español *soler*. Hacia el siglo XIX solo sobrevivió la forma de pasado `used to`, y se convirtió en una construcción fija.",
        trap: "*Solía* + infinitivo se traduce muy bien con used to, pero el presente *suelo* no: «Suelo levantarme a las 7» → I usually get up at 7, no «I use to get up». Y el imperfecto español no siempre es used to: si fue una vez o con un periodo cerrado, Past Simple: «Viví cinco años en Lima» → I lived in Lima for five years.",
        examples: ["De niños jugábamos aquí.", "Aquí antes había un cine."],
      },
      {
        title: "would y be used to",
        text: "`would + V`: acciones repetidas en el pasado, a menudo en recuerdos: `Every summer we would go to the lake.` Solo para acciones, no para estados: no «I would have a dog».\n\nNo confundas: `be / get used to + -ing`: «estar acostumbrado / acostumbrarse»: `I'm used to getting up early.` Esto es presente, no pasado.",
        more: "`would` sobre el pasado tiene un tono narrativo, de recuerdo: `My grandmother would tell us stories every evening.` Normalmente primero se sitúa el tiempo con `used to` o el contexto, y después se sigue con `would`.\n\nTres formas parecidas:\n- `I used to work at night`: antes trabajaba de noche (ya no);\n- `I'm used to working at night`: estoy acostumbrado a trabajar de noche;\n- `I'm getting used to working at night`: me estoy acostumbrando.\n\nOjo: «acostumbrado a trabajar» lleva infinitivo en español, pero en inglés `-ing`, porque `to` es preposición: no «I'm used to work».\n\nDespués de `be/get used to` también puede ir un sustantivo: `I'm used to the noise`, `You'll get used to the climate.`",
      },
    ],
    explain: {
      "3": "Estado (tener) → solo used to.",
      "h1": "Estado en el pasado: solo used to, would no vale.",
      "h2": "get used to: acostumbrarse.",
    },
    story: {
      title: "¿use to o used to?",
      text: "La palabra `use` significaba antes «tener costumbre»: `He uses to rise early`, «suele levantarse temprano». Así se escribía todavía en el siglo XVIII.\n\nDespués solo quedó la forma de pasado `used to`. Y como la `d` y la `t` juntas se funden, `used to` y `use to` suenan igual: /ˈjuːstə/. De ahí la eterna confusión al escribir.\n\nLa regla es sencilla: después de `did` escribe `use to` (did ya marca el pasado); en todos los demás casos, `used to`.",
      long: "La palabra `use` fue un verbo completo con el sentido de «tener costumbre, soler hacer». En textos de los siglos XVI a XVIII aparecen frases como `as we use to say`, «como solemos decir», o `they use to dine at noon`, «suelen comer a mediodía». El verbo vivía tranquilamente en presente, igual que el español *soler*.\n\nPero en presente tenía mucha competencia: `usually`, `generally`, el presente simple. En cambio en pasado `used to` resultó muy cómodo: decía con una palabra «antes era así y ahora no». El presente murió, el pasado se quedó, y se fosilizó.\n\nAhora `used to` es una construcción rara: un verbo que solo tiene pasado. Se comporta a medias como un verbo normal y a medias como un modal, y los propios nativos no están seguros de cómo tratarlo. El español *soler* tiene la suerte contraria: conserva presente e imperfecto (*suelo, solía*), aunque tampoco tiene futuro: nadie dice «soleré».\n\n**¿Cómo se escribe la negación?** Hay variantes: `I didn't use to`, `I didn't used to`, `I usedn't to` (británico antiguo), `I used not to`. Los diccionarios recomiendan `didn't use to`: después de `did` el verbo va en forma básica. Pero `didn't used to` aparece constantemente, incluso en periódicos.\n\n**¿Por qué la confusión?** Por la pronunciación. `used to` suena `/ˈjuːstə/`: la `d` y la `t` juntas se funden en una sola `t`. De oído, `use to` y `used to` son indistinguibles, y quien escribe tiene que recordar la regla.\n\nFíjate en otra cosa: en `used to` (costumbre) la `s` suena `/s/`: `/juːst/`. En cambio en el verbo normal `use`, «usar», suena `/z/`: `I used a knife`, `/juːzd/`. Así el nativo distingue por el sonido «solía» y «usé», aunque se escriban igual.\n\nY `would` para costumbres pasadas es otra historia. Es el mismo `would` de las condicionales, y añade un tono de recuerdo, de nostalgia: `Every summer we would go to the lake`, «todos los veranos íbamos al lago». El imperfecto español hace exactamente este trabajo, por eso a un hispanohablante le resulta natural. A los escritores les encanta `would`; en la conversación corriente se oye más `used to`.",
      takeaway: "used to es el pasado fosilizado de un verbo que significaba «soler».",
      question: "¿De dónde viene used to y por qué se escribe use to después de did?",
    },
  },
};
