import { createElement } from "./dom.js";

/**
 * Content for the shared modal shell; the shell adds the Close button.
 *
 * @param {number} moves
 * @param {() => void} onNewGame
 * @returns {Node[]}
 */
export function createWinContent(moves, onNewGame) {
  const newGameButton = createElement("button", {
    className: "modal__button",
    text: "New game",
    attributess: { type: "button" },
  });

  newGameButton.addEventListener("click", onNewGame);

  return [
    createElement("h2", { className: "modal__title", text: "You won!" }),
    createElement("p", {
      className: "modal__text",
      text: `All pairs found in ${moves} moves.`,
    }),
    newGameButton,
  ];
}
