import React from 'react';
import DijkstraGraph from './DijsGraph';
import KruskalGraph from './KruskalGraph';

const CaminosComponent = () => {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        <DijkstraGraph />
      </div>
      <div style={{ flex: 1 }}>
        <KruskalGraph />
      </div>
    </div>
  );
};

export default CaminosComponent;
