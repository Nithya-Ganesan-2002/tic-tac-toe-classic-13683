# Tic Tac Toe Frontend (React)

A modern, minimalistic Tic Tac Toe game built with React.

## Features
- Interactive 3×3 board
- Player vs Player (PVP) and Player vs Computer (PVC) modes
- Score tracking (X wins, O wins, ties)
- Restart round and Reset scores actions
- Centered, light theme UI using the specified palette:
  - Primary: `#1976d2`
  - Secondary: `#424242`
  - Accent: `#ff9800`

## Scripts
- `npm start` – start dev server
- `npm test` – run tests
- `npm run build` – build for production

## Notes
- Human is always `X` in PVC mode; AI plays `O`.
- AI strategy: win → block → center → corner → side.
