import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import Controls from './components/Controls.jsx';
import { calculateWinner, isBoardFull } from './utils/game.js';
import { computeAIMove } from './utils/ai.js';

const EMPTY_BOARD = Array(9).fill(null);

export default function App() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true); // Human is 'X'
  const [mode, setMode] = useState('PVC'); // 'PVP' | 'PVC'
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [winner, setWinner] = useState(null); // 'X' | 'O' | null
  const [winningLine, setWinningLine] = useState([]);
  const [roundOver, setRoundOver] = useState(false);

  // Handle human click on a square
  const handleSquareClick = (idx) => {
    if (roundOver || board[idx] !== null) return;

    // In PVC mode, human is 'X' and only plays when xIsNext is true
    if (mode === 'PVC' && !xIsNext) return;

    setBoard((prev) => {
      if (prev[idx] !== null) return prev;
      const next = prev.slice();
      next[idx] = xIsNext ? 'X' : 'O';
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  /**
   * Restart the current round (clears board and status).
   */
  const restartRound = () => {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
    setRoundOver(false);
  };

  // PUBLIC_INTERFACE
  /**
   * Reset all scores to zero and restart current round.
   */
  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
    restartRound();
  };

  // PUBLIC_INTERFACE
  /**
   * Set game mode.
   * @param {'PVP'|'PVC'} nextMode
   */
  const changeMode = (nextMode) => {
    setMode(nextMode);
    restartRound();
  };

  // Core game loop effects: detect winner/draw and drive AI move when needed
  useEffect(() => {
    const result = calculateWinner(board);

    if (result.winner && !roundOver) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setRoundOver(true);
      setScores((prev) => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1,
      }));
      return;
    }

    if (!result.winner && isBoardFull(board) && !roundOver) {
      setWinner(null);
      setWinningLine([]);
      setRoundOver(true);
      setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      return;
    }

    // AI turn for PVC mode: AI is 'O'
    if (mode === 'PVC' && !xIsNext && !result.winner && !isBoardFull(board)) {
      const move = computeAIMove(board, 'O', 'X');
      if (move !== null) {
        // Add a slight delay for a more natural feel
        const t = setTimeout(() => {
          setBoard((prev) => {
            if (prev[move] !== null) return prev; // guard
            const next = prev.slice();
            next[move] = 'O';
            return next;
          });
          setXIsNext(true);
        }, 350);
        return () => clearTimeout(t);
      }
    }
    // No cleanup required otherwise
    return undefined;
  }, [board, mode, roundOver, xIsNext]);

  const nextPlayer = xIsNext ? 'X' : 'O';
  const statusText = roundOver
    ? (winner ? `${winner} wins!` : 'It’s a tie!')
    : (mode === 'PVC' && !xIsNext ? "Computer's turn (O)" : `Next turn: ${nextPlayer}`);

  return (
    <div className="app-root">
      <main className="container">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle">Modern, minimalistic, and fun</p>
        </header>

        <ScoreBoard scores={scores} />

        <div className="status-row">
          <div className={`player-indicator ${nextPlayer === 'X' && !roundOver ? 'active' : ''}`}>
            <span className="badge x">X</span>
            <span className="label">Player X</span>
          </div>
          <div className="status-text" role="status" aria-live="polite">
            {statusText}
          </div>
          <div className={`player-indicator ${nextPlayer === 'O' && !roundOver ? 'active' : ''}`}>
            <span className="badge o">O</span>
            <span className="label">{mode === 'PVC' ? 'Computer O' : 'Player O'}</span>
          </div>
        </div>

        <div className="board-wrap">
          <Board
            squares={board}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
          />
        </div>

        <Controls
          mode={mode}
          onModeChange={changeMode}
          onRestart={restartRound}
          onResetScores={resetScores}
        />

        <footer className="footer">
          <small>Built with React • Light theme • Primary #1976d2 • Secondary #424242 • Accent #ff9800</small>
        </footer>
      </main>
    </div>
  );
}
