import { handleCardClick, showLeaderboard, startNewGame } from "./controller.js";
import { createBoard } from "./ui/board.js";
import { createElement } from "./ui/dom.js";
import { createHeader } from "./ui/header.js";
import { createModal } from "./ui/modal.js";

document.body.append(
  createHeader({
    onNewGame: startNewGame,
    onShowLeaderboard: showLeaderboard,
  }),
  createElement("main", {
    className: "page",
    children: [createBoard(handleCardClick)],
  }),
  createModal(),
);

startNewGame();
