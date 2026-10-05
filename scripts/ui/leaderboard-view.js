import { createElement } from "./dom.js";

/** @typedef {import("../storage/leaderboard.js").GameResult} GameResult */

/** @param {number} timestamp */
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}.${month}.${date.getFullYear()}`;
}

function createRow(cellTag, values) {
  return createElement("tr", {
    children: values.map((value) => createElement(cellTag, { text: value })),
  });
}

/** @param {GameResult[]} results */
function createTable(results) {
  return createElement("table", {
    className: "leaderboard",
    children: [
      createElement("thead", {
        children: [createRow("th", ["Place", "Moves", "Date"])],
      }),
      createElement("tbody", {
        children: results.map((result, index) =>
          createRow("td", [index + 1, result.moves, formatDate(result.date)]),
        ),
      }),
    ],
  });
}

/**
 * Content for the shared modal shell.
 *
 * @param {GameResult[]} results Already sorted and limited.
 * @returns {Node[]}
 */
export function createLeaderboardContent(results) {
  const title = createElement("h2", {
    className: "modal__title",
    text: "Leaderboard",
  });

  if (results.length === 0) {
    return [
      title,
      createElement("p", { className: "modal__text", text: "No results yet." }),
    ];
  }

  return [title, createTable(results)];
}
