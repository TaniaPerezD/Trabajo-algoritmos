import '../styles/NorthStyles.css';
import { solveTransportationProblem } from '../algoritmos/northwest/northwestCalculo.jsx'; // Importa desde el otro archivo

import withReactContent from 'sweetalert2-react-content'
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor, titlePositionX} from '@syncfusion/ej2-react-heatmap';
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import CanvasStyleModal from "./CanvasStyleModal";
import React, { useState } from "react";
import northwestCalculo from "../algoritmos/northwest/northwestCalculo";
import HeatMatrix from './HeatMatrix';
const NorthComponent = () => { 
    const [mostrarContenido, setMostrarContenido] = useState(false);
    const [heatmapData1, setHeatmapData] = useState([]);
    const [matrix, setMatrix] = useState([
      [2,  2,  5,  4, 20],
      [6,  1,  2,  6, 30],
      [7,  3,  4,  2, 10],
      [5, 20, 25, 10,  0],
      ]);
    const transponerMatriz = (matriz) => {
        return matriz[0].map((_, colIndex) => matriz.map(row => row[colIndex]));
    };
    const obtenerUltimaFilaYColumna = () => {
        const ultimaFila = matrix[matrix.length - 1]; // Última fila
        const ultimaColumna = matrix.map(row => row[row.length - 1]); // Última columna
        
        console.log("Última fila:", ultimaFila);
        console.log("Última columna:", ultimaColumna);
        
        return { ultimaFila, ultimaColumna };
    };
    const eliminarUltimaFilaYColumna = () => {
        // Eliminar la última fila
        const nuevaMatriz = matrix.slice(0, matrix.length - 1);
    
        // Eliminar la última columna de cada fila
        const nuevaMatrizSinColumna = nuevaMatriz.map(row => row.slice(0, row.length - 1));
    
        //setMatrix(nuevaMatrizSinColumna); // Actualizar el estado de la matriz
    
        return nuevaMatrizSinColumna;
    };
    
      // Actualiza el valor de una celda específica
      const handleChange = (row, col, value) => {
        const newMatrix = matrix.map((r, rowIndex) =>
          rowIndex === row ? r.map((c, colIndex) => (colIndex === col ? value : c)) : r
        );
        setMatrix(newMatrix);
      };
    
      // Agregar una fila vacía
      const addRow = () => {
        setMatrix([...matrix, new Array(matrix[0].length).fill("")]);
      };
    
      // Agregar una columna vacía a cada fila
      const addColumn = () => {
        setMatrix(matrix.map((row) => [...row, ""]));
      };
    
      // Eliminar la última fila
      const removeRow = () => {
        if (matrix.length > 1) {
          setMatrix(matrix.slice(0, -1));
        }
      };
    
      // Eliminar la última columna
      const removeColumn = () => {
        if (matrix[0].length > 1) {
          setMatrix(matrix.map((row) => row.slice(0, -1)));
        }
      };
      const handleSolution = () => {
        let costosMatrix = eliminarUltimaFilaYColumna();
        let { ultimaFila, ultimaColumna } = obtenerUltimaFilaYColumna();
        let demand = ultimaFila.slice(0, -1);
        let supply = ultimaColumna.slice(0, -1);

        let copiaMatrix = [...matrix];
        showSolution("Matriz de Costos", "Asignación Optima",transponerMatriz(copiaMatrix.reverse()) , ["Trabajador 1", "Trabajador 2", "Trabajador 3"], ["Tarea 1", "Tarea 2", "Tarea 3"]);
        setMostrarContenido(true);
        
        console.log("Mostrar contenido", mostrarContenido);
        console.log("Matriz", matrix);
        console.log("costosMatrix", costosMatrix);
        console.log("ultimaFila", demand);
        console.log("ultimaColumna", supply);


        
        //let ob = new northwestCalculo();
        const [solution, cost] = solveTransportationProblem(supply, demand, costosMatrix, false);
        console.log("Solucion", solution);
        console.log("Costo", cost);
        showSolution("Matriz de Costos", cost, transponerMatriz(solution.reverse()), ["Trabajador 1", "Trabajador 2", "Trabajador 3"], ["Tarea 1", "Tarea 2", "Tarea 3"]);
      }
    const showSolution = (text,asignacioOptima, MatrixData, xAxisNorth, yAxisNorth) => {
        const MySwal = withReactContent(Swal);
      
        MySwal.fire({
          html: (
            <div style={{ width: '90vw', maxWidth: '800px', height: '70vh' }}>
              <h2><i>Algoritmo de Asignación</i></h2>
              <div style={{ width: '100%', height: '100%' }}>
                <HeatMapComponent
                  titleSettings={{
                    text: `${text} : ${asignacioOptima}`,
                    textStyle: {
                      size: '24px',
                      fontWeight: '500',
                      fontFamily: 'Segoe UI',
                    },
                  }}
                  width="100%"
                  height="100%"
                  xAxis={xAxisNorth}
                  yAxis={yAxisNorth}
                  cellSettings={{
                    border: {
                      width: 1,
                      radius: 4,
                      color: 'white',
                    },
                  }}
                  paletteSettings={{
                    palette: [
                      { value: 0, color: 'rgb(227, 219, 219)' },
                      { value: 1, color: '#f7bfd8' },
                      { value: 5, color: '#f7bfd8' },
                      { value: 10, color: '#eb9ac0' },
                    ],
                    type: 'Gradient',
                  }}
                  dataSource={MatrixData}
                >
                  <Inject services={[Tooltip]} />
                </HeatMapComponent>
              </div>
            </div>
          ),
          showCloseButton: true,
          showConfirmButton: false,
          width: 'auto',
          heightAuto: true,
          customClass: {
            popup: 'custom-swal-modal',
          },
        });
      };
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Matriz Editable</h2>
            <div style={{ display: "grid", gap: "5px", gridTemplateColumns: `repeat(${matrix[0].length}, 80px)` }}>
                <table style={{ borderCollapse: "collapse", margin: "20px auto" }}>
                <thead>
                    <tr>
                    <th></th> {/* Celda vacía para la esquina superior izquierda */}
                    {matrix[0].map((_, colIndex) => (
                        <th key={colIndex} style={{ padding: "5px", textAlign: "center" }}>
                        Col {colIndex + 1}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <th style={{ padding: "5px", textAlign: "center" }}>
                        Fila {rowIndex + 1}
                        </th>
                        {row.map((cell, colIndex) => (
                        <td key={`${rowIndex}-${colIndex}`} style={{ padding: "5px" }}>
                            <input
                            type="number"
                            value={cell}
                            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                            style={{
                                width: "80px",
                                height: "30px",
                                textAlign: "center",
                                backgroundColor: "#fcdedc",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                            />
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      <div style={{ 
            marginTop: "10px" }}>
        <div className="button-group">
            <button onClick={addRow}>➕ Fila</button>
            <button onClick={addColumn}>➕ Columna</button>
            <button onClick={removeRow}>➖ Fila</button>
            <button onClick={removeColumn}>➖ Columna</button>
            <button onClick={handleSolution}> Buscar Solucion</button>
        </div>
      </div>
    </div>
    );
}

export default NorthComponent;