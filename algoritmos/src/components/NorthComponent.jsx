import '../styles/NorthStyles.css';
import { solveTransportationProblem } from '../algoritmos/northwest/northwestCalculo.jsx';
import React, { useState } from "react";
import { HeatMapComponent, Inject, Legend, Tooltip } from '@syncfusion/ej2-react-heatmap';
import { registerLicense } from '@syncfusion/ej2-base';
import { Switch } from "@mui/material";
import IterationsComponent  from './IterationComponent'; 
registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCekx1RXxbf1x1ZFRGal9ZTnZdUiweQnxTdEBjWnxfcXRRR2BbWUF2Vklfag');


const NorthComponent = () => { 
    const [matrix, setMatrix] = useState([
        [2,  2,  5,  4, 20],
        [6,  1,  2,  6, 30],
        [7,  3,  4,  2, 10],
        [5, 20, 25, 10,  0],
    ]);
    
    const [solution, setSolution] = useState(null);
    const [totalCost, setTotalCost] = useState(null);
    const [iterations, setIterations] = useState([]); 
    const [xAxisLabels, setXAxisLabels] = useState(["Origen 1", "Origen 2", "Origen 3"]);
    const [yAxisLabels, setYAxisLabels] = useState(["Destino 1", "Destino 2", "Destino 3"]);
    const [minimized, setMinimized] = useState(false);
    const [activePanel, setActivePanel] = useState('input'); // 'input' o 'output'

    const transponerMatriz = (matriz) => {
        return matriz[0].map((_, colIndex) => matriz.map(row => row[colIndex]));
    };

    const obtenerUltimaFilaYColumna = () => {
        const ultimaFila = matrix[matrix.length - 1]; // Última fila
        const ultimaColumna = matrix.map(row => row[row.length - 1]); // Última columna
        return { ultimaFila, ultimaColumna };
    };

    const eliminarUltimaFilaYColumna = () => {
        // Eliminar la última fila
        const nuevaMatriz = matrix.slice(0, matrix.length - 1);
    
        // Eliminar la última columna de cada fila
        const nuevaMatrizSinColumna = nuevaMatriz.map(row => row.slice(0, row.length - 1));
    
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
        setMatrix([...matrix, new Array(matrix[0].length).fill(0)]);
    };
    
    // Agregar una columna vacía a cada fila
    const addColumn = () => {
        setMatrix(matrix.map((row) => [...row, 0]));
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
    const createYAxisConfig= () => {
        
        let costosMatrix = eliminarUltimaFilaYColumna();        
        const filas = costosMatrix.length;
        let { ultimaFila, ultimaColumna } = obtenerUltimaFilaYColumna();
        let supply = ultimaColumna.slice(0, -1);
        let yLabels=Array.from({ length: filas }, (_, i) => `Destino ${i + 1}`);
        return {
            labels: yLabels,
            opposedPosition: true,
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontFamily: 'Segoe UI',
            },
            multiLevelLabels: [
                {
                    overflow: 'Trim',
                    alignment: 'Center',
                    textStyle: {
                        color: 'black',
                        fontWeight: 'Bold'
                    },
                    border: { type: 'Rectangle', color: 'white' },
                    categories: supply.map((item, index, arr) => ({
                        start: arr.length - 1 - index,
                        end: arr.length - 1 - index,
                        text: `${item}`,
                    })),
                    // Agrega las sumas dinámicamente
                }
            ]
        };
    }
    const createXAxisConfig= () => {
        let costosMatrix = eliminarUltimaFilaYColumna(); 
        const columnas = costosMatrix[0].length;
        let { ultimaFila, ultimaColumna } = obtenerUltimaFilaYColumna();
        let demand = ultimaFila.slice(0, -1);
        console.log("Columnas:", columnas); 

                
        let xLabels=Array.from({ length: columnas }, (_, i) => `Origen ${i + 1}`);

        return {
            labels: xLabels,
            opposedPosition: false,
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontFamily: 'Segoe UI',
            },
            multiLevelLabels: [
                {
                    overflow: 'Trim',
                    alignment: 'Center',
                    textStyle: {
                        color: 'black',
                        fontWeight: 'Bold'
                    },
                    border: { type: 'Rectangle', color: 'white' },
                    categories: demand.map((item, index) => ({
                        start: index,
                        end: index,
                        text: `${item}`,
                    })),
                }
            ]
            
        };
    }
    const xAxisConfig = createXAxisConfig();
    const yAxisConfig = createYAxisConfig();
    //const yAxisConfig = createYAxisConfig(supply);
    //const XAxisConfig = createYAxisConfig(demand);
    console.log("heat map axis X: ",xAxisConfig);
    console.log("heat map axis X: ",yAxisConfig);
    const handleSolution = () => {
        console.log("Calculando solución...");
        let costosMatrix = eliminarUltimaFilaYColumna();
        let { ultimaFila, ultimaColumna } = obtenerUltimaFilaYColumna();
        let demand = ultimaFila.slice(0, -1);
        let supply = ultimaColumna.slice(0, -1);
        // Actualizar dinámicamente los labels de ejes basados en el tamaño de la matriz
        const filas = costosMatrix.length;
        const columnas = costosMatrix[0].length;
        //console.log("filas: ",filas,"columnas: ", columnas);
        console.log("xLabes: ");
        let xLabes=Array.from({ length: columnas }, (_, i) => `Origen ${i + 1}`);
        let yLabes=Array.from({ length: filas }, (_, i) => `Destino ${i + 1}`);
        console.log("xLabes: ",xLabes,"yLabes: ", yLabes);
        //createXAxisConfig(demand,xLabes);
        //createYAxisConfig(supply,yLabes);
        
        console.log("heat map axis X: ",xAxisConfig);
        console.log("heat map axis y: ", yAxisConfig);
        setXAxisLabels(xLabes);
        setYAxisLabels(yLabes);
        
        //console.log("xAxisLabels: ",xAxisLabels,"yAxisLabels: ", yAxisLabels);
        const { solution: solutionMatrix, totalCost: cost, iteraciones } = solveTransportationProblem(supply, demand, costosMatrix, minimized);
        setSolution(transponerMatriz(solutionMatrix.reverse()));
        setTotalCost(cost);
        setIterations(iteraciones);
        
        // Cambiar a panel de resultados automáticamente si no está minimizado
        
            setActivePanel('output');
        
    };


    const switchPanel = (panel) => {
        setActivePanel(panel);
    };

    return (
        <div className="school-theme">
            <div className="header-banner">
                <h1 className="method-title"
                style={{ fontFamily: "'Schoolbell', cursive" }}>Norwest</h1>
            </div>
            
            <div className="content-container">
                
                <div className={`control-buttons ${minimized ? 'minimized' : ''}`}>
                <label className="toggle-label">
                    {minimized ? "Maximizar" : "Minimizar"}
                    <Switch checked={minimized} onChange={() => setMinimized(!minimized)} 
                       name="toggleMinimize"
                       sx={{
                           '& .MuiSwitch-switchBase.Mui-checked': {
                               color: 'green',  // Color del switch cuando está activado (verde)
                           },
                           '& .MuiSwitch-track': {
                               backgroundColor: 'green',  // Color de la pista del switch
                           },
                           '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                               backgroundColor: 'green', // Pista cuando el switch está activado
                           },
                       }}/>
                </label>

                    { (
                        <>
                            <button 
                                className={`panel-button ${activePanel === 'input' ? 'active' : ''}`} 
                                onClick={() => switchPanel('input')}
                            >
                                Matriz de Entrada
                            </button>
                            <button 
                                className={`panel-button ${activePanel === 'output' ? 'active' : ''}`} 
                                onClick={() => switchPanel('output')}
                            >
                                Solución
                            </button>
                            <button 
                                className={`panel-button ${activePanel === 'iterations' ? 'active' : ''}`} 
                                onClick={() => switchPanel('iterations')}
                            >
                                Iteraciones
                            </button>
                        </>
                    )}
                </div>
                
                { (
                    <div className="panels-container">
                        <div className={`panel ${activePanel === 'input' ? 'active' : 'hidden'}`}>
                            <h3 className="panel-title">Matriz de Costos</h3>
                            
                            <div className="matrix-container">
                                <table className="matrix-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {matrix[0].map((_, colIndex) => (
                                                <th key={colIndex}>
                                                    {colIndex === matrix[0].length - 1 ? "Oferta" : `Origen ${colIndex + 1}`}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matrix.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <th>
                                                    {rowIndex === matrix.length - 1 ? "Demanda" : `Destino ${rowIndex + 1}`}
                                                </th>
                                                {row.map((cell, colIndex) => (
                                                    <td key={`${rowIndex}-${colIndex}`}>
                                                        <input
                                                            type="number"
                                                            value={cell}
                                                            onChange={(e) => handleChange(rowIndex, colIndex, parseInt(e.target.value) || 0)}
                                                            className="cell-input"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="button-group">
                                <button className="action-button add" onClick={addRow}>Agregar Fila</button>
                                <button className="action-button add" onClick={addColumn}>Agregar Columna</button>
                                <button className="action-button remove" onClick={removeRow}>Eliminar Fila</button>
                                <button className="action-button remove" onClick={removeColumn}>Eliminar Columna</button>
                                <button className="action-button solve" onClick={handleSolution}>Calcular Solución</button>
                            </div>
                        </div>
                        
                        <div className={`panel ${activePanel === 'output' ? 'active' : 'hidden'}`}>   
                            {solution ? (
                                <div className="solution-container">
                                    <div className="cost-display">
                                        <span className="cost-label">Costo Total Óptimo:</span>
                                        <span className="cost-value">{totalCost}</span>
                                    </div>
                                    
                                    <div className="heatmap-container">
                                        <HeatMapComponent
                                            titleSettings={{
                                                text: 'Asignación Óptima',
                                                textStyle: {
                                                    size: '18px',
                                                    fontWeight: '500',
                                                    fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                },
                                            }}
                                            width="100%"
                                            height="100%"
                                            xAxis={xAxisConfig}
                                            yAxis={yAxisConfig}
                                            cellSettings={{
                                                border: {
                                                    width: 1,
                                                    radius: 4,
                                                    color: 'white',
                                                },
                                                showLabel: true,
                                            }}
                            
                                            paletteSettings={{
                                                palette: [
                                                    { value: 0, color: '#f5f5f5' },
                                                    { value: 1, color: '#B7DFB5' },
                                                    { value: 5, color: '#87C987' },
                                                    { value: 10, color: '#51B84B' },
                                                    { value: 20, color: '#1A9414' },
                                                ],
                                                type: 'Gradient',
                                            }}
                                            dataSource={solution}
                                        >
                                            <Inject services={[Tooltip]} />
                                        </HeatMapComponent>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-solution">
                                    <p>La solución se mostrará aquí después de calcular.</p>
                                    <p>Ingrese los valores en la matriz y haga clic en "Calcular Solución".</p>
                                </div>
                            )}
                        </div>

                        <div className={`panel ${activePanel === 'iterations' ? 'active' : 'hidden'}`}>
                        <div className="iterations-container">
                            {iterations && iterations.length > 0 ? (
                                <IterationsComponent 
                                    iterations={iterations}
                                    xAxisLabels={xAxisLabels}
                                    yAxisLabels={yAxisLabels}
                                />
                            ) : (
                                <div className="no-iterations">
                                    <p>Aquí se mostrarán las iteraciones del método Norwest.</p>
                                    <p>Calcule una solución para ver las iteraciones.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                )}
            </div>
            
            <div className="school-decorations">
                <div className="ruler"></div>
                <div className="pencil"></div>
                <div className="notebook-lines"></div>
            </div>
        </div>
    );
};

export default NorthComponent;