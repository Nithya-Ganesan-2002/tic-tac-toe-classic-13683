import { calculateWinner } from './game.js';

/// PUBLIC_INTERFACE
/**
 * Compute the AI move for the given board state.
 * Strategy (in order):
 * 1) Win: If AI can win in the next move, do it.
 * 2) Block: If human can win next, block it.
 * 3) Take center if available.
 * 4) Take a corner if available.
 * 5) Take a side.
 *
 * @param {Array<string|null>} squares - Current board state.
 * @param {'X'|'O'} aiPlayer - Which mark the AI uses (default 'O').
 * @param {'X'|'O'} humanPlayer - Which mark the human uses (default 'X').
 * @returns {number|null} Index of the selected move, or null if no move is possible.
 */
export function computeAIMove(squares, aiPlayer = 'O', humanPlayer = 'X') {
  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((v) => v !== null);

  if (emptyIndices.length === 0) return null;

  // 1) Try to win
  for (const idx of emptyIndices) {
    const clone = squares.slice();
    clone[idx] = aiPlayer;
    if (calculateWinner(clone).winner === aiPlayer) {
      return idx;
    }
  }

  // 2) Block human
  for (const idx of emptyIndices) {
    const clone = squares.slice();
    clone[idx] = humanPlayer;
    if (calculateWinner(clone).winner === humanPlayer) {
      return idx;
    }
  }

  // 3) Center
  if (emptyIndices.includes(4)) return 4;

  // 4) Corners
  const corners = [0, 2, 6, 8];
  const openCorners = corners.filter((i) => emptyIndices.includes(i));
  if (openCorners.length) return openCorners[0];

  // 5) Sides
  const sides = [1, 3, 5, 7];
  const openSides = sides.filter((i) => emptyIndices.includes(i));
  if (openSides.length) return openSides[0];

  // Fallback
  return emptyIndices[0] ?? null;
}
