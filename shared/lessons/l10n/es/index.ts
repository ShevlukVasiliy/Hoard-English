import type { ContentL10n } from "../index";
import { basics } from "./basics";
import { conditionals } from "./conditionals";
import { future } from "./future";
import { high } from "./high";
import { linking } from "./linking";
import { modals } from "./modals";
import { nouns } from "./nouns";
import { patterns } from "./patterns";
import { perfect } from "./perfect";
import { small } from "./small";
import { tenses } from "./tenses";
import { verbs } from "./verbs";
import { blocks, extraTraps, phrases, traps } from "./common";

export const es: ContentL10n = {
  lessons: { ...basics, ...conditionals, ...future, ...high, ...linking, ...modals, ...nouns, ...patterns, ...perfect, ...small, ...tenses, ...verbs, },
  blocks, phrases, traps, extraTraps,
};
