import { CARD_STATUS } from "../game/deck.js";
import { createElement } from "./dom.js";

const HIDDEN_CARD_LABEL = "Hidden card";

const board = createElement("div", { className: "board" });

/** @type {Map<number, HTMLButtonElement>} */
const cardElements = new Map();

function applyStatus(element, card) {
  const isHidden = card.status === CARD_STATUS.HIDDEN;
  const isMatched = card.status === CARD_STATUS.MATCHED;

  element.classList.toggle("card--open", !isHidden);
  element.classList.toggle("card--matched", isMatched);
  element.disabled = isMatched;
  element.setAttribute(
    "aria-label",
    isHidden ? HIDDEN_CARD_LABEL : `Card ${card.value}`,
  );
}

function createCard(card) {
  const element = createElement("button", {
    className: "card",
    attributess: { type: "button", "data-id": String(card.id) },
    children: [
      createElement("span", {
        className: "card__back",
        attributess: { "aria-hidden": "true" },
      }),
      createElement("span", {
        className: "card__face",
        text: card.value,
        attributess: { "aria-hidden": "true" },
      }),
    ],
  });

  applyStatus(element, card);
  cardElements.set(card.id, element);

  return element;
}

/**
 * @param {(id: number) => void} onCardClick
 */
export function createBoard(onCardClick) {
  board.addEventListener("click", (event) => {
    const cardElement = event.target.closest(".card");

    if (!cardElement) {
      return;
    }

    onCardClick(Number(cardElement.dataset.id));
  });

  return board;
}

export function renderCards(cards) {
  cardElements.clear();
  board.replaceChildren(...cards.map(createCard));
}

export function updateCards(cards) {
  cards.forEach((card) => {
    const element = cardElements.get(card.id);

    if (element) {
      applyStatus(element, card);
    }
  });
}
