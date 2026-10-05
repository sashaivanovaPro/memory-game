import { CARD_STATUS, PAIR_VALUES, createDeck } from "./deck.js";

export const PAIRS_TOTAL = PAIR_VALUES.length;

export const FLIP_RESULT = Object.freeze({
  IGNORED: "ignored",
  FIRST: "first",
  MATCH: "match",
  MISMATCH: "mismatch",
});

const state = {
  cards: [],
  moves: 0,
};

export function resetState() {
  state.cards = createDeck();
  state.moves = 0;
}

export function getCards() {
  return state.cards;
}

export function getMoves() {
  return state.moves;
}

export function getOpenCards() {
  return state.cards.filter((card) => card.status === CARD_STATUS.OPEN);
}

export function getPairsFound() {
  const matched = state.cards.filter(
    (card) => card.status === CARD_STATUS.MATCHED,
  );

  return matched.length / 2;
}

export function isWon() {
  return getPairsFound() === PAIRS_TOTAL;
}

function findCard(id) {
  return state.cards.find((card) => card.id === id);
}

export function canFlip(id) {
  const card = findCard(id);

  return (
    card !== undefined &&
    card.status === CARD_STATUS.HIDDEN &&
    getOpenCards().length < 2
  );
}

export function flipCard(id) {
  if (!canFlip(id)) {
    return { result: FLIP_RESULT.IGNORED, cards: [] };
  }

  const card = findCard(id);
  card.status = CARD_STATUS.OPEN;

  const openCards = getOpenCards();

  if (openCards.length < 2) {
    return { result: FLIP_RESULT.FIRST, cards: [card] };
  }

  state.moves += 1;

  const [first, second] = openCards;

  if (first.value !== second.value) {
    return { result: FLIP_RESULT.MISMATCH, cards: openCards };
  }

  first.status = CARD_STATUS.MATCHED;
  second.status = CARD_STATUS.MATCHED;

  return { result: FLIP_RESULT.MATCH, cards: openCards };
}

export function hideOpenCards() {
  const openCards = getOpenCards();

  openCards.forEach((card) => {
    card.status = CARD_STATUS.HIDDEN;
  });

  return openCards;
}
