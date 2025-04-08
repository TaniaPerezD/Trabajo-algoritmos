import React from 'react';
import './Header.css';

const Header = ({ currentAlgorithm, setCurrentAlgorithm }) => {
  return (
    <div className="header-container" id="botonesParasort">
      <div className="button-group">
        <button
          className={currentAlgorithm === 'selection' ? 'active' : ''}
          onClick={() => setCurrentAlgorithm('selection')}
        >
          Selection Sort
        </button>
        <button
          className={currentAlgorithm === 'insertion' ? 'active' : ''}
          onClick={() => setCurrentAlgorithm('insertion')}
        >
          Insertion Sort
        </button>
        <button
          className={currentAlgorithm === 'merge' ? 'active' : ''}
          onClick={() => setCurrentAlgorithm('merge')}
        >
          Merge Sort
        </button>
        <button
          className={currentAlgorithm === 'shell' ? 'active' : ''}
          onClick={() => setCurrentAlgorithm('shell')}
        >
          Shell Sort
        </button>
      </div>
    </div>
  );
};

export default Header;