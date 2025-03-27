import React, { useState } from 'react';
import Header from '../components/sorts/Header';
import SelectionSortVisualizer from '../components/sorts/SelectionSortVisualizer';
import InsertionSortVisualizer from '../components/sorts/InsertionSortVisualizer';
import MergeSortVisualizer from '../components/sorts/MergeSortVisualizer';
import ShellSortVisualizer from '../components/sorts/ShellSortVisualizer';

const SortsPage = () => {
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
export default SortsPage;
