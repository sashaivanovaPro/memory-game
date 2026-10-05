import { createElement } from "./dom.js";

const movesValue = createElement("span", { className: "stats__value" });
const pairsValue = createElement("span", { className: "stats__value" });

function createButton(text, onClick) {
  const button = createElement("button", {
    className: "header__button",
    text,
    attributess: { type: "button" },
  });

  button.addEventListener("click", onClick);

  return button;
}

function createStatsItem(label, valueElement) {
  return createElement("p", {
    className: "stats__item",
    children: [`${label}: `, valueElement],
  });
}

/**
 * @param {object} handlers
 * @param {() => void} handlers.onNewGame
 * @param {() => void} handlers.onShowLeaderboard
 */
export function createHeader({ onNewGame, onShowLeaderboard }) {
  return createElement("header", {
    className: "header",
    children: [
      createElement("h1", { className: "header__title", text: "Memory Game" }),
      createElement("div", {
        className: "header__actions",
        children: [
          createButton("New game", onNewGame),
          createButton("Leaderboard", onShowLeaderboard),
        ],
      }),
      createElement("div", {
        className: "stats",
        attributess: { "aria-live": "polite" },
        children: [
          createStatsItem("Moves", movesValue),
          createStatsItem("Pairs", pairsValue),
        ],
      }),
    ],
  });
}

export function updateStats({ moves, pairsFound, pairsTotal }) {
  movesValue.textContent = String(moves);
  pairsValue.textContent = `${pairsFound} of ${pairsTotal}`;
}
