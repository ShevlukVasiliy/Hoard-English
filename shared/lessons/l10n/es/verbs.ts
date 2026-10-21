import type { LessonL10n } from "../index";

export const verbs: Record<string, LessonL10n> = {
  "can-could": {
    title: "can y could",
    subtitle: "Saber, poder, tener permiso",
    theory: [
      {
        title: "Habilidad y posibilidad",
        text: "`can + V` sin `to`, igual para todas las personas: `I can swim. She can drive.`\n\nNegación: `can't / cannot`. Pregunta: `Can you help me?`\n\nEn pasado, `could`: `I could read when I was four.`",
        more: "`can` no cambia según la persona y no lleva `-s`: `She can`, no «she cans». Después va el verbo sin nada: `I can swim`, no «I can to swim» ni «I can swimming».\n\nEn inglés americano `can't` suena muy parecido a `can`; la diferencia está sobre todo en el acento y la vocal: `I can GO` (puedo) frente a `I CAN'T go` (no puedo). En británico `can't` lleva una `/ɑː/` larga: `/kɑːnt/`.\n\nEn pasado, `could` habla de una habilidad general: `I could swim when I was five.` Pero si se logró hacer algo una vez concreta, se dice `was able to` o `managed to`: `The fire spread, but everyone was able to escape.` Aquí «could escape» suena torpe.",
        why: "`can` antes significaba «saber, conocer»: es pariente de `know` y del alemán `kennen` («conocer») y `können` («poder»). En inglés medio `can` aún iba con un sustantivo: «can Latin» era «saber latín». El español conserva esa misma idea cuando dice *sé nadar*: el saber se convirtió en poder.",
        trap: "El español separa *saber* y *poder*, el inglés usa can para los dos: «Sé nadar» → I can swim, no «I know swim». can nunca lleva do ni to: «¿Puedes venir?» → Can you come?, no «Do you can come?». No tiene futuro: «Mañana podré» → I'll be able to, no «I will can». Y con los verbos de percepción el inglés añade can: «Oigo música» → I can hear music.",
        examples: ["¿Hablas francés? (¿sabes?)", "No te oigo."],
      },
      {
        title: "Peticiones y permiso",
        text: "`Can I open the window?`: ¿puedo? `Could you…?` es más cortés: `Could you close the door, please?`\n\nEn una petición `could` no es pasado, sino suavidad.\n\nPara el futuro y otros tiempos, `be able to`: `I'll be able to come tomorrow.`",
        more: "Grados de cortesía en una petición, de la más simple a la más suave:\n- `Can you help me?`\n- `Could you help me?`\n- `Could you possibly help me?`\n- `Would you mind helping me?`\n\nPara pedir permiso: `Can I…?` es lo normal, `Could I…?` más cortés, `May I…?` formal. La respuesta va igualmente con `can`: `Yes, of course you can.`\n\n`could` también es «podría» como posibilidad: `We could go to the cinema tonight`, «podríamos ir al cine esta noche».",
      },
    ],
    explain: {
      "h1": "Se logró una vez, en una situación concreta: was able to.",
      "h2": "can no tiene futuro: will be able to.",
    },
    story: {
      title: "La letra que sobra en could",
      text: "¿Por qué `could` se escribe con una `l` que nadie pronuncia?\n\n`would` y `should` son los pasados de `will` y `shall`, y en ellos la `l` era original: antes se pronunciaba. En cambio, el pasado de `can` en inglés medio se escribía `coude` o `cude`, sin ninguna `l`.\n\nEn el siglo XVI los copistas decidieron que tres palabras parecidas debían también verse iguales, y metieron la `l` en `could` por analogía. La pronunciación ya no cambió: la letra quedó muda.",
      long: "¿Por qué `could` se escribe con una `l` que nadie pronuncia? Para responder hay que mirar a tres vecinos: `can`, `will` y `shall`.\n\n`would` es el pasado de `will`, `should` el de `shall`. En ellos la `l` es propia: en inglés antiguo se decía `wolde` y `sceolde`, y la `l` sonaba. Se dejó de pronunciar en el inglés medio tardío, pero la letra se quedó en su sitio.\n\nEl pasado de `can`, en cambio, era muy distinto: en inglés antiguo `cūþe`, en inglés medio `coude` o `cude`. Ni rastro de `l`. Compara con el alemán `konnte`, también sin `l`.\n\nEn los siglos XV y XVI copistas e impresores notaron que tres palabras se parecían mucho: `would`, `should`, `coude`. Sonaban igual, significaban algo parecido y funcionaban igual. ¿Por qué no iban a escribirse igual? Así que metieron la `l` en `could` por analogía. Para entonces la pronunciación ya estaba fijada, así que la letra se quedó muda. Estas letras «eruditas» son frecuentes en la ortografía inglesa.\n\n**`doubt` y `debt`.** En inglés medio se escribía `doute` y `dette`, como se oía y como en francés. Los eruditos del Renacimiento recordaron el latín `dubitare` y `debitum` y metieron una `b` para mostrar un origen «noble». Nadie empezó a pronunciarla. El español, que viene directamente del latín, resolvió lo mismo sin letras mudas: *duda*, *deuda*.\n\n**`island`.** El inglés antiguo `īgland` no tiene nada que ver con el latín `insula` (de donde viene *isla*). Pero en el siglo XVI se confundió con el francés `isle` y se le añadió una `s`. La letra es muda y el origen, inventado.\n\nLa historia también tiene un giro de significado. El propio verbo `can` en inglés antiguo (`cunnan`) significaba «saber, conocer». De la misma raíz vienen el inglés `know` y `cunning` (antes «sabio, hábil», hoy «astuto»), el alemán `kennen` («conocer») y `können` («poder»), y el escocés `ken`, «saber». Así que «I can swim» significaba literalmente «sé nadar», justo como lo decimos en español. El saber se convirtió en habilidad, la habilidad en posibilidad y la posibilidad en permiso: `Can I go?` Una palabra corta recorrió el camino de «sé» a «¿puedo?».",
      takeaway: "La ortografía a veces se ajusta a las palabras vecinas, no al sonido.",
      question: "¿Por qué could se escribe con una l que no se pronuncia?",
    },
  },
  "past-simple-basics": {
    title: "Past Simple: lo básico",
    subtitle: "Ayer, el año pasado, hace mucho",
    theory: [
      {
        title: "Regulares e irregulares",
        text: "Verbos regulares: `+ -ed`: `work → worked, live → lived, stop → stopped, study → studied`.\n\nLos irregulares hay que memorizarlos: `go → went, see → saw, have → had, make → made, buy → bought`.\n\nUna sola forma para todas las personas: `I / she / they worked`.",
        more: "Ortografía de `-ed`:\n- si termina en `-e`, solo `-d`: `like → liked`;\n- consonante + `y` → `-ied`: `try → tried`, pero `play → played`;\n- un verbo corto «consonante + vocal + consonante» duplica la última: `stop → stopped`, `plan → planned`. Si el acento no cae en la última sílaba, no se duplica: `visit → visited`, `open → opened`.\n\nPronunciación de `-ed`, tres variantes:\n- `/t/` después de sonidos sordos: `worked, stopped, watched`;\n- `/d/` después de sonoros y vocales: `played, lived, cleaned`;\n- `/ɪd/` solo después de `t` y `d`: `wanted, needed, decided`.",
        why: "Los verbos regulares son «nuevos» a escala histórica. La terminación con sonido dental (`-ed`, el alemán `-te`) apareció solo en las lenguas germánicas. Los irregulares son más antiguos: cambian la vocal interior, como `sing — sang`, y ese método tiene miles de años. El español conserva algo parecido en pretéritos como `hacer — hice` o `venir — vine`.",
        examples: ["El verano pasado fuimos a la playa.", "Me llamó ayer."],
      },
      {
        title: "Pregunta y negación",
        text: "Con `did` + **forma base**: `Did you see it? I didn't see it.`\n\n`did` ya marca el pasado, así que el verbo va sin `-ed`: no «didn't went», sino `didn't go`.\n\n`to be` va sin did: `I was tired. Were you at home?`",
        more: "Respuestas cortas: `Did you call her? — Yes, I did. / No, I didn't.`\n\nLa pregunta sobre el sujeto no lleva `did`: `Who called you?`, «¿quién te llamó?», no «Who did call you?». Compara: `Who did you call?`, «¿a quién llamaste?».\n\nMarcadores del Past Simple: `yesterday, last week, two days ago, in 2010, when I was a child`. `ago` va después del plazo: `three years ago`, «hace tres años».",
        trap: "En español basta con la entonación para preguntar («¿Lo viste?»), pero en inglés hace falta did: Did you see it?, no «You saw it?». Tampoco pongas el pasado dos veces: no «Did you went», sino Did you go. Y no pronuncies -ed como sílaba aparte en todos los verbos: worked es /wɜːkt/, una sola sílaba, no «work-ed».",
      },
    ],
    explain: {
      "h1": "Pregunta sobre el sujeto: sin did.",
      "h2": "Un verbo corto con vocal acentuada duplica la consonante.",
    },
    story: {
      title: "go, went: una forma robada",
      text: "`went` no es pariente de `go`. Es el pasado de otro verbo: `wend`, «dirigirse, caminar».\n\nEn inglés antiguo `go` tenía su propio pasado: `ēode`. En el inglés medio tardío cayó en desuso, y su lugar lo ocupó `went`, «tomado prestado» de `wend`. El propio `wend` recibió un pasado nuevo, `wended`.\n\nDel viejo verbo queda la expresión `to wend one's way`, «encaminarse, ir sin prisa». Así que cada vez que dices `I went`, usas la forma de otro verbo. Al español le pasó lo mismo: `ir` y `fue` vienen de raíces distintas.",
      long: "`went` es el pasado de `go`. Pero por su origen `went` no tiene nada que ver con `go`. Es el pasado de un verbo totalmente distinto: `wend`, «girar, dirigirse, caminar».\n\nEn inglés antiguo `gān` («ir») tenía su propio pasado: `ēode`. Una palabra rara, que no se parecía a nada: ni siquiera entonces estaba emparentada con `gān`; ya era un caso antiguo de formas de un verbo tomadas de raíces distintas. En inglés medio `ēode` se convirtió en `yede` y `yode`, pero poco a poco se dejaba de usar.\n\nPor la misma época existía el verbo `wenden`, «girar, dirigirse». Su pasado era `wente`, según el modelo de `send — sent`, `spend — spent`. «Se dirigió» y «fue» son significados muy cercanos, y en el siglo XV `went` fue ocupando el lugar del moribundo `yode`, primero en el sur de Inglaterra y luego en todas partes.\n\n¿Y qué pasó con el propio `wend`? Se quedó sin su pasado y recibió uno nuevo, regular: `wended`. Hoy `wend` casi no se usa, salvo en la expresión `to wend one's way`, «encaminarse, ir sin prisa»: `We wended our way home through the park.`\n\nLos lingüistas llaman supletivismo a esta mezcla de raíces dentro de un verbo. Aparece en las palabras más frecuentes de lenguas muy distintas, porque esas palabras se repiten millones de veces y las formas viejas aguantan, aunque sean ajenas:\n- inglés `be — am — is — was`;\n- `good — better — best`, `bad — worse — worst`;\n- español `ir — voy — fue`: `ir` viene del latín *ire*, `voy` de *vadere* («caminar») y `fue` de *fui*, el pasado de «ser»;\n- francés `aller — je vais — j'irai`, también con tres raíces latinas.\n\nAsí que cada vez que dices `I went`, usas una palabra que el inglés «tomó prestada» del vecino hace quinientos años. Y `yode` hoy solo lo encontrarás en un diccionario de Chaucer.",
      takeaway: "En los verbos más frecuentes las formas a veces vienen de palabras distintas, como en el español ir — fue.",
      question: "¿Por qué el pasado de go es went?",
    },
  },
  comparatives: {
    title: "Comparativo y superlativo",
    theory: [
      {
        title: "-er/-est o more/most",
        text: "Cortos (una sílaba): `-er, the -est`: `cheap → cheaper → the cheapest`.\n\nDuplicación de consonante: `big → bigger`. En `-y`: `happy → happier → the happiest`.\n\nLargos (dos sílabas o más): `more / the most`: `interesting → more interesting → the most interesting`.\n\nExcepciones: `good → better → the best`, `bad → worse → the worst`, `far → further → the furthest`.",
        more: "Los adjetivos de dos sílabas varían:\n- los terminados en `-y`, `-ow`, `-le`, `-er` suelen tomar `-er`: `easy → easier`, `narrow → narrower`, `simple → simpler`, `clever → cleverer`;\n- los demás, `more`: `modern → more modern`, `careful → more careful`;\n- algunos admiten las dos formas: `quieter / more quiet`, `politer / more polite`.\n\nCon tres o cuatro sílabas, siempre `more / most`: `more comfortable`, `the most expensive`.\n\nAdverbios: `fast → faster`, `hard → harder`, `early → earlier`, pero `quickly → more quickly`, `carefully → more carefully`. Irregulares: `well → better → best`, `badly → worse → worst`.",
        why: "El doble sistema es huella de una mezcla de lenguas. Las terminaciones `-er/-est` son germánicas, propias. `more/most` se extendieron en inglés medio, cuando entraron en masa palabras largas francesas y latinas. Ponerles la terminación inglesa era incómodo: «beautifuller» suena pesado. El latín también comparaba con terminación (*melior*, *maior*), pero el español la cambió por `más`, y solo le quedan cuatro formas sintéticas: *mejor, peor, mayor, menor*.",
        trap: "El español compara siempre con *más*, así que es fácil decir «more big» o «more good»: es bigger, better. Tampoco dupliques: no «more bigger». *Que* tras un comparativo es than, no «that» ni «then»: taller than me. Y en el superlativo, «del mundo» se dice in: the best in the world, no «of the world».",
        examples: ["Mi piso es más pequeño que el tuyo.", undefined],
      },
      {
        text: "Igualdad: `as + adjetivo + as`: `She's as tall as her brother.`\n\nDesigualdad: `not as … as`: `This film isn't as good as the book.`\n\nRefuerzo: `much / far / a bit + comparativo`: `much cheaper, a bit older`.",
        more: "El superlativo casi siempre va con `the`: `the best day of my life`, `the tallest building in the world`. Después va `in` con un lugar o un grupo, y `of` con un período: `the oldest in the family`, `the best of all`, `the coldest day of the year`.\n\nComparaciones en progresión:\n- `The older I get, the less I sleep`: cuanto más mayor, menos duermo;\n- `It's getting colder and colder`: cada vez hace más frío;\n- `more and more expensive`: cada vez más caro.\n\nDespués de `than`, en la conversación, pronombres de objeto: `She's taller than me`. En lenguaje formal y por escrito, `than I am`.",
      },
    ],
    explain: {
      "h1": "the + comparativo, the + comparativo: cuanto más…, más…",
      "h2": "much refuerza el comparativo; con una palabra corta no hace falta more.",
    },
    story: {
      text: "Hoy `more bigger` es un error. Pero en el siglo XVI los comparativos dobles eran un refuerzo normal. En «Julio César» de Shakespeare, la puñalada de Bruto se llama `the most unkindest cut of all`, «la más crudelísima herida».\n\nEl sistema de dos maneras, `-er` y `more`, se formó poco a poco: `more` y `most` se extendieron en inglés medio, sobre todo con las palabras largas llegadas del francés y del latín. Pegarles `-er` era incómodo: `beautifuller`.\n\nLos gramáticos del siglo XVIII declararon ilógico el comparativo doble, y la norma se fijó. Pasa algo parecido con el español «más mejor»: se oye, pero la norma lo rechaza.",
      long: "Hoy `more bigger` es un error que en un examen te baja la nota. Pero en el siglo XVI los comparativos dobles eran una forma normal, incluso elegante, de reforzar una palabra. Shakespeare los usaba con libertad. En «Julio César», Marco Antonio llama a la puñalada de Bruto `the most unkindest cut of all`, «la más crudelísima herida de todas». Y en «Hamlet» aparece `worser`, algo así como «más peor»: `throw away the worser part of it`.\n\n¿De dónde salen las dos maneras de comparar? En inglés antiguo había una sola: las terminaciones `-ra` para el comparativo y `-ost` para el superlativo. `eald — ieldra — ieldest` («viejo — más viejo — el más viejo»). Fíjate: en las dos últimas formas cambió la vocal. Es el mismo cambio de sonido que hizo `feet` a partir de `foot`. Su huella sigue viva en inglés: `old — elder — eldest`. Eso sí, hoy `elder` y `eldest` solo se dicen de los miembros de una familia: `my elder sister`.\n\nEn inglés medio, tras la conquista normanda, entraron miles de palabras largas francesas y latinas: `beautiful, important, difficult, comfortable`. La terminación `-er` se les pegaba con dificultad: `importanter` cuesta pronunciarlo. En cambio, siguiendo el modelo del francés `plus beau` y del latín, se empezó a poner `more` delante. El español hizo lo mismo con `más`, que viene del latín *magis*. Poco a poco se impuso un reparto: las palabras cortas y propias toman `-er`, las largas, `more`.\n\nPero mientras la frontera no estaba fijada, la gente combinaba las dos formas «por si acaso» y por expresividad. Así nacían `more bigger` y `most unkindest`. Era un refuerzo, no ignorancia. El español conoce el mismo impulso: «más mejor» o «más peor» se oyen en el habla popular, aunque la norma los rechaza.\n\nTodo lo cambiaron los gramáticos del siglo XVIII. Querían que el inglés fuera «lógico», como el latín, y declararon redundante el comparativo doble: ¿para qué decir «más» dos veces? Sus manuales llegaron a las escuelas y la norma se fijó.\n\nLo más curioso es que en la lengua quedó un comparativo doble que nadie nota: `lesser`. Es `less` («menos») más otra terminación comparativa `-er`. `the lesser of two evils`, «el mal menor», literalmente «el menor-or de dos males». Los gramáticos lo dejaron pasar: la palabra era demasiado habitual.",
      takeaway: "Las palabras cortas y propias toman -er; las largas y prestadas, more.",
      question: "¿Por qué Shakespeare escribe the most unkindest cut y de dónde salen las dos maneras de comparar, -er y more?",
    },
  },
};
