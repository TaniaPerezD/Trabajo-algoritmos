// Componente para mostrar las iteraciones
import React, { useState } from "react";
import Swal from "sweetalert2";

const IterationsComponent = ({ iterations, xAxisLabels, yAxisLabels }) => {
    const [currentIteration, setCurrentIteration] = useState(0);
    const [avisoMostrado,setAvisoMostrado] = useState(false);
    if (!iterations || iterations.length === 0) {
      return (
        <div className="no-iterations">
          <p>No hay iteraciones disponibles.</p>
          <p>Calcule una solución para ver las iteraciones.</p>
        </div>
      );
    }
  
    const iteration = iterations[currentIteration];
  
    // Función para crear una matriz visual a partir de los datos de la iteración
    const createMatrixFromBFS = (bfs, rows, cols) => {

      console.log("Rows:", rows, "Cols:", cols);

      
      const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
      
      bfs.forEach(([[i, j], value]) => {
        if (i >= 0 && i < rows && j >= 0 && j < cols) {
          matrix[i][j] = value;
        } else {
          console.warn(`Índice fuera de rango: (${i}, ${j})`);

          if (!avisoMostrado){
            Swal.fire({
                  title: "¡Oh no!",
                  text
                  : "Parece que tu matriz de costos con tus demandas y ofertas tienen mas de una solucion. Se mostrara solo una de sus soluciones",
                  icon: "warning",
                  confirmButtonText: "Entendido",
                  confirmButtonColor: "#95bb59",
                  customClass: {
                    popup: "swal-popup",
                  },
                });
                setAvisoMostrado(true);
          }
          return false;
        }
        matrix[i][j] = value;
      });
      
      return matrix;
    };
  
    // Crear la matriz de asignación para la iteración actual
    const assignmentMatrix = createMatrixFromBFS(
      iteration.bfs,
      yAxisLabels.length,
      xAxisLabels.length
    );
  
    // Crear la matriz de costos reducidos
    const createReducedCostsMatrix = (bfs, ws, rows, cols) => {
      const matrix = Array.from({ length: rows }, () => Array(cols).fill(null));
      
      // Marcar todas las celdas que son variables básicas
      bfs.forEach(([[i, j], _]) => {
        if (i < rows && j < cols) {
          matrix[i][j] = "BV";
        }
      });
      
      // Añadir los costos reducidos para las variables no básicas
      ws.forEach(([[i, j], cost]) => {
        if (i < rows && j < cols) {
          matrix[i][j] = cost.toFixed(2);
        }
      });
      
      return matrix;
    };
  
    const reducedCostsMatrix = createReducedCostsMatrix(
      iteration.bfs,
      iteration.ws,
      yAxisLabels.length,
      xAxisLabels.length
    );
  
    return (
      <div className="iterations-display">
        <div className="iteration-controls">
          <button 
            className="iteration-btn"
            disabled={currentIteration === 0} 
            onClick={() => setCurrentIteration(prev => Math.max(0, prev - 1))}
          >
            &lt; Anterior
          </button>
          <span className="iteration-counter">
            Iteración {currentIteration + 1} de {iterations.length}
          </span>
          <button 
            className="iteration-btn"
            disabled={currentIteration === iterations.length - 1} 
            onClick={() => setCurrentIteration(prev => Math.min(iterations.length - 1, prev + 1))}
          >
            Siguiente &gt;
          </button>
        </div>
        
        <div className="iteration-grids">
    <div className="iteration-grid">
        <h4>Matriz de Asignación</h4>
        <table className="iteration-table">
            <thead>
                <tr>
                    <th></th>
                    {xAxisLabels.map((label, index) => (
                        <th key={index}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {assignmentMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <th>{yAxisLabels[rowIndex]}</th>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex} className={cell > 0 ? "basic-variable" : ""}>
                                {cell > 0 ? cell : "-"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <div className="iteration-grid">
        <h4>Costos Reducidos (Variables No Básicas)</h4>
        <table className="iteration-table">
            <thead>
                <tr>
                    <th></th>
                    {xAxisLabels.map((label, index) => (
                        <th key={index}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {reducedCostsMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <th>{yAxisLabels[rowIndex]}</th>
                        {row.map((cell, colIndex) => (
                            <td 
                                key={colIndex} 
                                className={
                                    cell === "BV" ? "basic-variable" : 
                                    (cell < 0 ? "negative-cost" : "")
                                }
                            >
                                {cell === "BV" ? "Básica" : (cell !== null ? cell : "-")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

      </div>
    );
  };
export default IterationsComponent;