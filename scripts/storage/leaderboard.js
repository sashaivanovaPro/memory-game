const STORAGE_KEY = "memory-game-leaderboard";
const MAX_RESULTS = 10;

/**
 * @typedef {object} GameResult
 * @property {number} moves
 * @property {number} date Timestamp in milliseconds.
 */

/** @returns {GameResult[]} */
function readResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * @param {GameResult} a
 * @param {GameResult} b
 */
function compareResults(a, b) {
  return a.moves - b.moves || a.date - b.date;
}

/** @returns {GameResult[]} */
export function getTopResults() {
  return readResults().sort(compareResults).slice(0, MAX_RESULTS);
}

/** @param {number} moves */
export function addResult(moves) {
  const results = [...readResults(), { moves, date: Date.now() }]
    .sort(compareResults)
    .slice(0, MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // Storage is full or disabled: the game keeps working without saving.
  }
}
