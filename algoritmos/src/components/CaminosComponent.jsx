import React, { useState } from 'react';
import DijkstraGraph from './DijsGraph';
import KruskalGraph from './KruskalGraph';

const tabStyles = {
  container: {
    //maxWidth: '1200px',
    //margin: '2rem auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '1rem',
  },
  tabList: {
    display: 'flex',
    borderBottom: '2px solid #e0e0e0',
    marginBottom: '1rem',
  },
  tabButton: (active) => ({
    flex: 1,
    padding: '1rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: active ? 'bold' : 'normal',
    color: active ? '#3f51b5' : '#666',
    borderBottom: active ? '3px solid #3f51b5' : '3px solid transparent',
    transition: 'all 0.3s ease',
  }),
};

const CaminosComponent = () => {
  const [activeTab, setActiveTab] = useState('dijkstra');

  return (
    <div style={tabStyles.container}>
      <div style={tabStyles.tabList}>
        <button
          style={tabStyles.tabButton(activeTab === 'dijkstra')}
          onClick={() => setActiveTab('dijkstra')}
        >
          Dijkstra
        </button>
        <button
          style={tabStyles.tabButton(activeTab === 'kruskal')}
          onClick={() => setActiveTab('kruskal')}
        >
          Kruskal
        </button>
      </div>

      <div style={tabStyles.content}>
        {activeTab === 'dijkstra' && <DijkstraGraph />}
        {activeTab === 'kruskal' && <KruskalGraph />}
      </div>
    </div>
  );
};

export default CaminosComponent;
