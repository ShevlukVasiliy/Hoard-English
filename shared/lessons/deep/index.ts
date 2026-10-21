// Подача «подробно»: дополнительные абзацы теории, глоссы «Почему так?»
// и полные версии историй. Блоки theory идут в том же порядке, что в уроке.
export type Deep = {
  theory?: { more?: string; why?: string }[];
  story?: string;
};

export const DEEP: Record<string, Deep> = {};
