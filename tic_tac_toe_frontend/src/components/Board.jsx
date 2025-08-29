import React from 'react';
import Square from './Square.jsx';

/**
 * Board renders a 3x3 grid of squares.
 * @param {Object} props
 * @param {Array<'X'|'O'|null>} props.squares - Board state.
 * @param {(index:number) => void} props.onSquareClick - Click handler for squares.
 * @param {number[]} props.winningLine - Indices of the winning line.
 */
export default function Board({ squares, onSquareClick, winningLine = [] }) {
  return (
    <div className="board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          highlight={winningLine.includes(idx)}
        />
      ))}
    </div>
  );
}
