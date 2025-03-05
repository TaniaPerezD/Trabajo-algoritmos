import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const generateAdjacencyMatrix = (nodes, edges) => {
  const size = nodes.length;

  // Crear una matriz vacía de tamaño nodes.length x nodes.length
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));

  // Llenar la matriz con los valores correctos desde edges
  edges.forEach(({ from, to, label }) => {
    const rowIndex = nodes.findIndex(node => node.id === from);
    const colIndex = nodes.findIndex(node => node.id === to);

    if (rowIndex !== -1 && colIndex !== -1) {
      matrix[rowIndex][colIndex] = Number(label.split("\n")[0]) || 0;
    }
  });

  return matrix; // Devolvemos la matriz directamente sin transponer
};

const MatrizAsignacion = ({ nodes, edges, highlightedCells }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (nodes.length && edges.length) {
      setHeatmapData(generateAdjacencyMatrix(nodes, edges));
    }
  }, [nodes, edges]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Ver Matriz de Adyacencia
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Matriz de Adyacencia</DialogTitle>
        <DialogContent>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={heatmapData.map((row, rowIndex) => ({
                id: rowIndex,
                ...row.reduce((acc, value, colIndex) => {
                  acc[`col_${colIndex}`] = value;
                  return acc;
                }, {}),  
              }))}
              columns={nodes.map((node, index) => ({
                field: `col_${index}`,
                headerName: node.label || `Nodo ${index + 1}`,
                width: 100,
              }))}  
              pageSize={5}
              getRowId={(row) => row.id}
              getCellClassName={(params) => {
                const cellId = `${params.row.id}_${params.field.split('_')[1]}`;
                return highlightedCells.includes(cellId) ? 'highlighted-cell' : '';
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Estilos CSS */}
      <style jsx>{`
        .highlighted-cell {
          background-color: pink !important;
        }
      `}</style>
      
    </div>
  );
};

export default MatrizAsignacion;
