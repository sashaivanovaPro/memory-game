import { shuffle } from "../utils/shuffle.js";

/** @typedef {"hidden" | "open" | "matched"} CardStatus */

/**
 * @typedef {object} Card
 * @property {number} id уникальное значение внутри одной игры.
 * @property {string} value значение-ключ для поиска пары.
 * @property {CardStatus} status
 */

export const CARD_STATUS = Object.freeze({
  HIDDEN: "hidden",
  OPEN: "open",
  MATCHED: "matched",
});

export const PAIR_VALUES = Object.freeze([
  "🍎",
  "🍋",
  "🍇",
  "🍒",
  "🥝",
  "🍑",
  "🍍",
  "🥥",
]);

/**
 * Создание доски, где каждая карточка повторяется дважды
 *
 * @param {readonly string[]} [values]
 * @returns {Card[]}
 */
export function createDeck(values = PAIR_VALUES) {
  return shuffle([...values, ...values]).map((value, index) => ({
    id: index,
    value,
    status: CARD_STATUS.HIDDEN,
  }));
}
