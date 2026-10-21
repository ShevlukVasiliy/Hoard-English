import type { Exercise } from "../types";

// «Ловушки» финала блока: похожие конструкции рядом и поиск ошибок.
// Ключ — id блока. Дополняются заданиями fix и transform из уроков блока.
export const TRAPS: Record<string, Exercise[]> = {};
