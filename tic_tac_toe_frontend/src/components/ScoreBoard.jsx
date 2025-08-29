import React from 'react';

/**
 * ScoreBoard shows running totals for X wins, ties, and O wins.
 * @param {Object} props
 * @param {{X:number, O:number, ties:number}} props.scores
 */
export default function ScoreBoard({ scores }) {
  return (
    <div className="scoreboard">
      <div className="score-card x-score" aria-label="X score">
        <div className="label">X</div>
        <div className="value">{scores.X}</div>
      </div>
      <div className="score-card ties-score" aria-label="Ties score">
        <div className="label">Ties</div>
        <div className="value">{scores.ties}</div>
      </div>
      <div className="score-card o-score" aria-label="O score">
        <div className="label">O</div>
        <div className="value">{scores.O}</div>
      </div>
    </div>
  );
}
