import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import Header from './sorts/Header';

import SelectionSortVisualizer from './sorts/SelectionSortVisualizer';
import InsertionSortVisualizer from './sorts/InsertionSortVisualizer';
import MergeSortVisualizer from './sorts/MergeSortVisualizer';
import ShellSortVisualizer from './sorts/ShellSortVisualizer';

const SortComponent = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState('selection');

  return (
    <div className="app-body">
      <Header
        currentAlgorithm={currentAlgorithm}
        setCurrentAlgorithm={setCurrentAlgorithm}
      />
      <div className="visualizer-container">
        {currentAlgorithm === 'selection' && <SelectionSortVisualizer />}
        {currentAlgorithm === 'insertion' && <InsertionSortVisualizer />}
        {currentAlgorithm === 'merge' && <MergeSortVisualizer />}
        {currentAlgorithm === 'shell' && <ShellSortVisualizer />}
      </div>
    </div>
  );
};

// Exporta SortsPage correctamente
export default SortComponent;
