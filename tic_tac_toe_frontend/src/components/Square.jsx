import React from 'react';

/**
 * Square button for Tic Tac Toe.
 * @param {Object} props
 * @param {'X'|'O'|null} props.value - The mark to display.
 * @param {() => void} props.onClick - Click handler for the square.
 * @param {boolean} props.highlight - Whether to highlight the square (part of the winning line).
 */
export default function Square({ value, onClick, highlight }) {
  const classNames = ['square'];
  if (value === 'X') classNames.push('x');
  if (value === 'O') classNames.push('o');
  if (highlight) classNames.push('highlight');

  return (
    <button
      className={classNames.join(' ')}
      onClick={onClick}
      aria-label={`Cell ${value ? value : 'empty'}`}
    >
      {value}
    </button>
  );
}
