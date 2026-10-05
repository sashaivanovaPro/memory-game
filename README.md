# Memory Game

A card-matching game built with vanilla JavaScript: open cards two at a time, remember where they are, and find all 8 pairs in as few moves as possible.

RS School task: [Memory Game](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/memory-game/README.md).
The app is developed in the `memory-game` branch.

**Deploy:** https://sashaivanovapro.github.io/memory-game/

## Features

- 16 cards (8 pairs), shuffled with Fisher–Yates on every new game
- Move and found-pair counters
- A mismatched pair closes after 1 second; other cards are locked meanwhile
- Win modal with the final number of moves
- Leaderboard with the top 10 results, stored in `localStorage`
- The whole interface is generated with `document.createElement`; `<body>` in `index.html` contains only a `<script>`

## Run locally

The app uses native ES modules, so it has to be served over HTTP (opening `index.html` via `file://` will not work). No build step and no dependencies.

```bash
git clone https://github.com/sashaivanovaPro/memory-game.git
cd memory-game
git checkout memory-game
```

Start any static server in the project folder, for example:

```bash
npx serve
# or
python3 -m http.server 8080
```

Then open the URL printed in the terminal (`http://localhost:3000` for `serve`, `http://localhost:8080` for Python).

## Project structure

```
scripts/
├── main.js            entry point: builds the page and starts the game
├── controller.js      handles user actions, the mismatch timer and saving results
├── game/              game rules without DOM: deck, state, flip logic
├── storage/           leaderboard in localStorage
└── ui/                views: board, header, shared modal and its contents
styles/main.css
images/
```

## Credits

- Card back pattern: <source and license>
