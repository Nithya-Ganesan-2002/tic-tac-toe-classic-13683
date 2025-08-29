/// PUBLIC_INTERFACE
/**
 * Calculate the winner for a Tic Tac Toe board.
 * @param {Array<string|null>} squares - A length-9 array of 'X', 'O', or null.
 * @returns {{winner: 'X'|'O'|null, line: number[]}} The winner and winning line indices.
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

/// PUBLIC_INTERFACE
/**
 * Check if the board is full (no null entries).
 * @param {Array<string|null>} squares - The board.
 * @returns {boolean} True if full.
 */
export function isBoardFull(squares) {
  return squares.every((v) => v !== null);
}
