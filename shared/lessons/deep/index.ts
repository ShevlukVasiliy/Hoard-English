// Подача «подробно»: дополнительные абзацы теории, глоссы «Почему так?»
// и полные версии историй. Блоки theory идут в том же порядке, что в уроке.
export type Deep = {
  theory?: { more?: string; why?: string }[];
  story?: string;
};

import { DEEP_B01_05 } from "./b01-05";
import { DEEP_B06_10 } from "./b06-10";
import { DEEP_B11_15 } from "./b11-15";

export const DEEP: Record<string, Deep> = { ...DEEP_B01_05, ...DEEP_B06_10, ...DEEP_B11_15 };
