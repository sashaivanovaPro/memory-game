import {
  FLIP_RESULT,
  PAIRS_TOTAL,
  flipCard,
  getCards,
  getMoves,
  getPairsFound,
  hideOpenCards,
  isWon,
  resetState,
} from "./game/state.js";
import { addResult, getTopResults } from "./storage/leaderboard.js";
import { renderCards, updateCards } from "./ui/board.js";
import { updateStats } from "./ui/header.js";
import { createLeaderboardContent } from "./ui/leaderboard-view.js";
import { closeModal, openModal } from "./ui/modal.js";
import { createWinContent } from "./ui/win-view.js";

const MISMATCH_DELAY_MS = 1000;

/** @type {number | null} */
let mismatchTimerId = null;

function renderStats() {
  updateStats({
    moves: getMoves(),
    pairsFound: getPairsFound(),
    pairsTotal: PAIRS_TOTAL,
  });
}

function cancelMismatchTimer() {
  if (mismatchTimerId !== null) {
    clearTimeout(mismatchTimerId);
    mismatchTimerId = null;
  }
}

function scheduleMismatchHide() {
  mismatchTimerId = setTimeout(() => {
    mismatchTimerId = null;
    updateCards(hideOpenCards());
  }, MISMATCH_DELAY_MS);
}

function finishGame() {
  addResult(getMoves());
  openModal(createWinContent(getMoves(), startNewGame));
}

export function startNewGame() {
  cancelMismatchTimer();
  closeModal();
  resetState();
  renderCards(getCards());
  renderStats();
}

/** @param {number} id */
export function handleCardClick(id) {
  const { result, cards } = flipCard(id);

  switch (result) {
    case FLIP_RESULT.IGNORED:
      return;

    case FLIP_RESULT.FIRST:
      updateCards(cards);
      return;

    case FLIP_RESULT.MISMATCH:
      updateCards(cards);
      renderStats();
      scheduleMismatchHide();
      return;

    case FLIP_RESULT.MATCH:
      updateCards(cards);
      renderStats();

      if (isWon()) {
        finishGame();
      }
      return;

    default:
      return;
  }
}

export function showLeaderboard() {
  openModal(createLeaderboardContent(getTopResults()));
}
