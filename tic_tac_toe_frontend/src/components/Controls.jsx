import React from 'react';

/**
 * Controls for changing game mode and performing actions.
 * @param {Object} props
 * @param {'PVP'|'PVC'} props.mode
 * @param {(mode:'PVP'|'PVC') => void} props.onModeChange
 * @param {() => void} props.onRestart
 * @param {() => void} props.onResetScores
 */
export default function Controls({ mode, onModeChange, onRestart, onResetScores }) {
  return (
    <div className="controls">
      <div className="mode-switch">
        <button
          className={`mode-btn ${mode === 'PVP' ? 'active' : ''}`}
          onClick={() => onModeChange('PVP')}
          aria-pressed={mode === 'PVP'}
        >
          Player vs Player
        </button>
        <button
          className={`mode-btn ${mode === 'PVC' ? 'active' : ''}`}
          onClick={() => onModeChange('PVC')}
          aria-pressed={mode === 'PVC'}
        >
          Player vs Computer
        </button>
      </div>
      <div className="actions">
        <button className="btn primary" onClick={onRestart}>Restart Round</button>
        <button className="btn secondary" onClick={onResetScores}>Reset Scores</button>
      </div>
    </div>
  );
}
