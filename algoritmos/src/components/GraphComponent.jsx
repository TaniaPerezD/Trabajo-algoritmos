import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import CanvasStyleModal from "./CanvasStyleModal";
import withReactContent from 'sweetalert2-react-content'
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor, titlePositionX} from '@syncfusion/ej2-react-heatmap';
import { registerLicense } from '@syncfusion/ej2-base';
import ExpandIcon from "@mui/icons-material/ExpandMore";
import CollapseIcon from "@mui/icons-material/ExpandLess";

import Toolbar from "./Toolbar";
import jsPDF from "jspdf";
import ShapeAndColorModal from "./ShapeAndColorModal"; 
import borrador from "../assets/img/icons/borrador.png";


import { johnson } from "../algoritmos/jonhson/jonhsonCalculo";
import Asignacion from "../algoritmos/asignacion/Asignacion";

//para el botón flotante, iconos, son cambiables (miu icons-material)
import SchoolIcon from '@mui/icons-material/School';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CalculateIcon from '@mui/icons-material/Calculate';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

import SpeedDialTooltipOpen from "./BotonAlgoritmos";
import MaxAsignacion from "../algoritmos/asignacion/MaxAsignacion";
import { IconButton, Menu, MenuItem, Button } from "@mui/material";
import SpeedIcon from '@mui/icons-material/Speed';
import DataArrayIcon from '@mui/icons-material/DataArray';
import TimelineIcon from '@mui/icons-material/Timeline';
import EqualizerIcon from '@mui/icons-material/Equalizer';

//Para la Matriz de Asignaciones
import MatrizAsignacion from "./MatrizAsignacion";

registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCekx1RXxbf1x1ZFRGal9ZTnZdUiweQnxTdEBjWnxfcXRRR2BbWUF2Vklfag');

//funcion para el color random inicial del nodo
function colorRandom() {
  const r = Math.floor(Math.random() * 106) + 150;
  const g = Math.floor(Math.random() * 106) + 150;
  const b = Math.floor(Math.random() * 106) + 150;
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  return hex;
}


const GraphComponent = () => {

  // Estado para el menú
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);

  
  const flag = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nextNodeId = useRef(1);
  const nextEdgeId = useRef(1);
  const graphNetwork = useRef(null);
  const graphRef = useRef(null);
  const graphOnlyRef = useRef(null);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [canvasStyle, setCanvasStyle] = useState("blanco"); // Estilo por defecto
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [mostrarRutaCritica, setMostrarRutaCritica] = useState(false);
  
  //Para las matriz de asignaciones
  
  const [heatmapData1, setHeatmapData] = useState([]);

  const onMatrixGenerated = (matrix) => {
    setHeatmapData(matrix);  // Guardar la matriz generada
  };


  const [showButtons, setShowButtons] = useState(false);

  const runAsignacion1 = () => {
    setShowButtons(!showButtons);
  };


  // const runAsignacion1 = () => {
  //   // Mostrar el Swal
  //   Swal.fire({
  //     title: '¿Quieres maximizar o minimizar?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Maximizar',
  //     cancelButtonText: 'Minimizar',
  //     customClass: {
  //       container: 'swal-container', // Clase personalizada para el contenedor
  //       popup: 'swal-popup', // Clase personalizada para el popup
  //       title: 'swal-title', // Clase personalizada para el título
  //       confirmButton: 'swal-confirm-button', // Clase personalizada para el botón "Maximizar"
  //       cancelButton: 'swal-cancel-button', // Clase personalizada para el botón "Minimizar"
  //     },
  //     buttonsStyling: false, // Para usar tu propio estilo de botones
  //     didOpen: () => {
  //       // Estilo para el botón "Maximizar"
  //       const confirmButton = document.querySelector('.swal2-confirm');
  //       confirmButton.style.backgroundColor = "#c6f4c6";
  //       confirmButton.style.border = "none";
  //       confirmButton.style.padding = "10px 20px";
  //       confirmButton.style.borderRadius = "10px";
  //       confirmButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  //       confirmButton.style.cursor = "pointer";
  //       confirmButton.style.color = "#000";
  //       confirmButton.style.fontSize = "14px";
  //       confirmButton.style.fontWeight = "bold";
  //       confirmButton.style.fontFamily = "Arial";
  //       confirmButton.style.transition = "background-color 0.3s ease-in-out";
  //       confirmButton.style.marginRight = "20px"; // Separar de la derecha
  
  //       confirmButton.addEventListener('mouseenter', () => {
  //         confirmButton.style.backgroundColor = "#a8f0a8"; // Hover color
  //       });
  //       confirmButton.addEventListener('mouseleave', () => {
  //         confirmButton.style.backgroundColor = "#c6f4c6"; // Original color
  //       });
        
  //       // Estilo para el botón "Minimizar"
  //       const cancelButton = document.querySelector('.swal2-cancel');
  //       cancelButton.style.backgroundColor = "#ffc8c3";
  //       cancelButton.style.border = "none";
  //       cancelButton.style.padding = "10px 20px";
  //       cancelButton.style.borderRadius = "10px";
  //       cancelButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  //       cancelButton.style.cursor = "pointer";
  //       cancelButton.style.color = "#000";
  //       cancelButton.style.fontSize = "14px";
  //       cancelButton.style.fontWeight = "bold";
  //       cancelButton.style.fontFamily = "Arial";
  //       cancelButton.style.transition = "background-color 0.3s ease-in-out";
  //       cancelButton.style.marginLeft = "20px"; // Separar de la izquierda
  
  //       cancelButton.addEventListener('mouseenter', () => {
  //         cancelButton.style.backgroundColor = "#fe939b"; // Hover color
  //       });
  //       cancelButton.addEventListener('mouseleave', () => {
  //         cancelButton.style.backgroundColor = "#ffc8c3"; // Original color
  //       });
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Lógica cuando elige Maximizar
  //       console.log('Maximizar');
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       // Lógica cuando elige Minimizar
  //       console.log('Minimizar');
  //     }
  //   });
  // };

  const runJohnson = () => {
    
    //verificar que no haya retornos antes de ejecutar johnson
    if (edges.some((edge) => edge.from === edge.to)) {
      Swal.fire({
        title: "¡Oh no!",
        text
        : "Parece que en tu grafo hay nodos con retorno, por favor elimínalos para poder ejecutar el algoritmo de Johnson.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
    //verificar que jonshon no haya sido ejecutado antes, con las holguras
    if (edges.some((edge) => edge.label.includes("h"))) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Parece que en tu grafo ya fue ejecutado el algoritmo de Johnson",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    let result = johnson(nodes, edges);
    if (!result || !result.nodosCriticos) {
      Swal.fire({
        title: "Error al ejecutar el algoritmo",
        text: "No se pudo ejecutar el algoritmo de Johnson.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    let { nodes: updatedNodes, edges: updatedEdges, nodosCriticos } = result;
  
    updatedEdges = updatedEdges.map((edge) => ({
      ...edge,
      label: `${edge.label}`,
      color: { color: edge.color },
      width: edge.width,
    }));
  
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  
    // Mantener el mensaje de la ruta crítica visible
    setMostrarRutaCritica(true);
  
    // Aplicar el brillo a los nodos críticos
    let nodosConBrillo = updatedNodes.map((node) => ({
      ...node,
      color: nodosCriticos.has(node.id)
        ? {
            background: "rgb(237, 112, 135)",
            border: "rgb(237, 112, 135)",
          }
        : node.color,
      shadow: nodosCriticos.has(node.id) 
        ? { enabled: true, size: 70, color: "rgba(237, 112, 135, 0.9)" } // Brillo activado
        : { enabled: true, size: 10, color: "rgba(0, 0, 0, 0.3)" } // Sombra normal
    }));
  
    setNodes(nodosConBrillo);
  
    // Después de 5 segundos, apagar el brillo
    setTimeout(() => {
      let nodosFinales = updatedNodes.map((node) => ({
        ...node,
        color: nodosCriticos.has(node.id)
          ? {
              background: "rgb(237, 112, 135)",
              border: "rgb(237, 112, 135)",
            }
          : node.color,
        shadow: { enabled: true, size: 10, color: "rgba(0, 0, 0, 0.3)" } // Mantiene solo la sombra normal
      }));
  
      setNodes(nodosFinales);
    }, 5000); // Se apaga después de 5 segundos
  };
  const showSwalHunga = (text,minimoRecorrido, FiltradoHungara, xAxisHunga, yAxisHunga) => {
    const MySwal = withReactContent(Swal);
  
    MySwal.fire({
      html: (
        <div style={{ width: '90vw', maxWidth: '800px', height: '70vh' }}>
          <h2><i>Algoritmo de Asignación</i></h2>
          <div style={{ width: '100%', height: '100%' }}>
            <HeatMapComponent
              titleSettings={{
                text: `${text} : ${minimoRecorrido}`,
                textStyle: {
                  size: '24px',
                  fontWeight: '500',
                  fontFamily: 'Segoe UI',
                },
              }}
              width="100%"
              height="100%"
              xAxis={xAxisHunga}
              yAxis={yAxisHunga}
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
              dataSource={FiltradoHungara}
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
  function transponerMatriz(matriz) {
    if (!matriz.length) return [];
  
    return matriz[0].map((_, colIndex) => matriz.map(fila => fila[colIndex]));
  }
  function invertirFilas(matriz) {
    return [...matriz].reverse(); // hace una copia y la invierte
  }
  function invertirColumnas(matriz) {
    return matriz.map(fila => [...fila].reverse());
  }
  
  function hacerCuadrada(matriz) {
    let m = matriz.length;
    let n = matriz[0].length;
  
    if (m === n) return matriz; // Ya es cuadrada
  
    // Determinar si hay que agregar filas o columnas
    const size = Math.max(m, n);
    
    // Agregar filas de ceros si es necesario
    while (matriz.length < size) {
      matriz.push(new Array(size).fill(0));
    }
  
    // Agregar columnas de ceros si es necesario
    matriz = matriz.map(fila => {
      while (fila.length < size) {
        fila.push(0);
      }
      return fila;
    });
  
    return matriz;
  }
  const runAsignacion = () => {

    //console.log("redondeo", Math.ceil(sinTextNodes.length/2));
    
    //console.log("Aristas antes de ejecutar Asignacion:", heatmapData);
    let hungarianMatrix = [];
    for (let i = ((sinTextNodes.length)-Math.ceil(sinTextNodes.length/2)); i < sinTextNodes.length; i++) {
      //let row = [];
      for (let j = ((sinTextNodes.length)-Math.ceil(sinTextNodes.length/2)); j < sinTextNodes.length; j++) {
        //row.push(heatmapData[i][j]);
        
        if (!heatmapData[i] || heatmapData[i][j] === undefined) { 
          hungarianMatrix.push(0);
          console.log(0);
        }else{
          
          hungarianMatrix.push(heatmapData[i][j]);
          console.log(heatmapData[i][j]);
        }
      }
      //hungarianMatrix.push(row);
    }

    let ob = new Asignacion();
    let asignaciones = [];//console.log("Matriz hunga", hungarianMatrix);
    
    
    let DosDHungara= convertirABidimensional(hungarianMatrix,Math.ceil(Math.sqrt(hungarianMatrix.length)));
    console.log("convertirABidimensional", DosDHungara);
    //console.log("eliminarFilasYColumnasCero", transponerMatriz(eliminarFilasYColumnasCero(heatmapData)));
    DosDHungara= (eliminarFilasYColumnasCero(heatmapData));
    //console.log("eliminarFilasYColumnasCero", DosDHungara);
    //DosDHungara= transponerMatriz(DosDHungara);
    console.log("transponerMatriz", DosDHungara);
    let { xAxisH, yAxisH, xIndex, yIndex } = generarEjes(DosDHungara);//FUNCION DOS PARA GENERAR EJES
    console.log("Ejes",xIndex,yIndex);
    //DosDHungara= invertirFilas(DosDHungara);
    console.log("reverse", DosDHungara);
    
    //DosDHungara= invertirColumnas(DosDHungara);
    DosDHungara= hacerCuadrada(DosDHungara);
    console.log("hacerCuadrada", DosDHungara);    
    
    console.log("tamaño", DosDHungara.length);   

    console.log("Minimo recorrido: " ,ob.assignmentProblem(DosDHungara.flat(),DosDHungara.length));
    asignaciones = ob.getAssignments(); 

    
    let FiltradoHungara=[];
    for (let i = 0; i < DosDHungara.length; i++) {
      FiltradoHungara[i] = [];  // Inicializa cada fila del arreglo
    }    
    // Recorrer DosDHungara y asignar valores a FiltradoHungara
    DosDHungara.map((fila, rowIndex) => {
      fila.map((valor, colIndex) => {
        // Verificar si existe una asignación para esa posición
        if (asignaciones.some((asignacion) => asignacion.worker === rowIndex && asignacion.job === colIndex)) {
          FiltradoHungara[rowIndex][colIndex] = valor; // Asignar valor de DosDHungara
        } else {
          FiltradoHungara[rowIndex][colIndex] = 0; // Asignar 0 si no hay asignación
        }
      });
    });
    
    showSwalHunga("Minima asignación",ob.assignmentProblem(DosDHungara.flat(),DosDHungara.length),//minimo recorrido
    FiltradoHungara,xAxisHunga(xAxisH),yAxisHunga(yAxisH.reverse()));
    let {nodes: pintadosNodes}=ob.pintarNodes(nodes,xIndex,yIndex,asignaciones);
    console.log("updatedNodes: ",pintadosNodes);
    setNodes(pintadosNodes);
  };

  const runMaxAsignacion = () => {

    console.log("redondeo", Math.ceil(nodes.length/2));
    
    console.log("Aristas antes de ejecutar Asignacion:", heatmapData);
    let hungarianMatrix = [];
    for (let i = ((sinTextNodes.length)-Math.ceil(sinTextNodes.length/2)); i < sinTextNodes.length; i++) {
      //let row = [];
      for (let j = ((sinTextNodes.length)-Math.ceil(sinTextNodes.length/2)); j < sinTextNodes.length; j++) {
        //row.push(heatmapData[i][j]);
        
        if (!heatmapData[i] || heatmapData[i][j] === undefined) { 
          hungarianMatrix.push(0);
        }else{
          
          hungarianMatrix.push(heatmapData[i][j]);
        }
      }
      //hungarianMatrix.push(row);
    }

    let ob = new MaxAsignacion();
    let asignaciones = [];
    console.log("Matriz hunga", hungarianMatrix);
    console.log("Máximo recorrido: " ,ob.assignmentProblem(hungarianMatrix,Math.ceil(sinTextNodes.length/2)));
    
    asignaciones = ob.getAssignments();

    let DosDHungara= convertirABidimensional(hungarianMatrix,Math.ceil(Math.sqrt(hungarianMatrix.length)));
    let { xAxisH, yAxisH,xIndex ,yIndex} = generarEjes(DosDHungara);//FUNCION DOS PARA GENERAR EJES
    console.log("Ejes",xAxisH,yAxisH);
    console.log("Ejes",xIndex,yIndex);
    let FiltradoHungara=[];
    for (let i = 0; i < DosDHungara.length; i++) {
      FiltradoHungara[i] = [];  // Inicializa cada fila del arreglo
    }    
    // Recorrer DosDHungara y asignar valores a FiltradoHungara
    DosDHungara.map((fila, rowIndex) => {
      fila.map((valor, colIndex) => {
        // Verificar si existe una asignación para esa posición
        if (asignaciones.some((asignacion) => asignacion.worker === rowIndex && asignacion.job === colIndex)) {
          FiltradoHungara[rowIndex][colIndex] = valor; // Asignar valor de DosDHungara
        } else {
          FiltradoHungara[rowIndex][colIndex] = 0; // Asignar 0 si no hay asignación
        }
      });
    });

    showSwalHunga("Maxima asignación",ob.assignmentProblem(hungarianMatrix,Math.ceil(sinTextNodes.length/2)),//maximo recorrido
    FiltradoHungara,xAxisHunga(xAxisH),yAxisHunga(yAxisH.reverse()));
    let {nodes: pintadosNodes}=ob.pintarNodes(nodes,xIndex,yIndex,asignaciones);
    console.log("updatedNodes: ",pintadosNodes);
    setNodes(pintadosNodes);
  };

  //Esto para la nueva libreria de la matriz
  // const [highlightedCells, setHighlightedCells] = useState([]);  // Estado para las celdas resaltadas

  // const runMaxAsignacion = () => {
  //   // Crear la submatriz húngara
  //   let hungarianMatrix = [];
  //   for (let i = Math.ceil(nodes.length / 2); i < Math.ceil(nodes.length / 2) * 2; i++) {
  //     for (let j = Math.ceil(nodes.length / 2); j < Math.ceil(nodes.length / 2) * 2; j++) {
  //       hungarianMatrix.push(heatmapData[i][j]);
  //     }
  //   }

  //   let ob = new MaxAsignacion();
    
  //   console.log("Matriz hunga", hungarianMatrix);
  //   console.log("Maximo recorrido: ", ob.assignmentProblem(hungarianMatrix, Math.ceil(nodes.length / 2)));

  //   // Obtener las asignaciones
  //   let assignments = ob.getIteracion() % 2 === 0 ? ob.getAssignments() : ob.getAssignmentsReversed();
  //   console.log("Asignaciones:", assignments);
  //   console.log("Iteración:", ob.getIteracion());

  //   // Resaltar las celdas asignadas en la matriz
  //   const highlighted = assignments.map(([row, col]) => `${row}_${col}`);
  //   setHighlightedCells(highlighted);  // Actualizar el estado con las celdas resaltadas
  // };


  // const runMaxAsignacion = () => {

  //   console.log("redondeo", Math.ceil(nodes.length/2));
    
  //   console.log("Aristas antes de ejecutar Asignacion:", heatmapData);
  //   let hungarianMatrix = [];
    
  //   for (let i = Math.ceil(nodes.length/2); i < Math.ceil(nodes.length/2) * 2; i++) {
  //     //let row = [];
  //     for (let j = Math.ceil(nodes.length/2); j < Math.ceil(nodes.length/2) * 2; j++) {
  //       //row.push(heatmapData[i][j]);
        
  //       hungarianMatrix.push(heatmapData[i][j]);
  //       console.log(heatmapData[i][j]);
  //     }
  //     //hungarianMatrix.push(row);
  //   }

  //   let ob = new MaxAsignacion();
    
  //   console.log("Matriz hunga", hungarianMatrix);
  //   console.log("Maximo recorrido: " ,ob.assignmentProblem(hungarianMatrix,(Math.ceil(nodes.length/2))));
  //   if(ob.getIteracion()%2 === 0){
  //     console.log("Asignaciones 1:", ob.getAssignments());    
  //     console.log("Asignaciones:", ob.getIteracion());
  //   }
  //   else{
  //     console.log("Asignaciones 2:", ob.getAssignmentsReversed());
  //     console.log("Asignaciones:", ob.getIteracion());
  //   }
  //   matrizAsignacion(ob.getAssignmentsReversed());
  // };



  
//   const runMaxAsignacion = () => {
//     console.log("redondeo", Math.ceil(nodes.length / 2));
  
//     console.log("Aristas antes de ejecutar Asignacion:", heatmapData);
  
//     let hungarianMatrix = [];
  
//     // Crear la submatriz para la asignación (asumiendo que los nodos son cuadrados)
//     for (let i = Math.ceil(nodes.length / 2); i < Math.ceil(nodes.length / 2) * 2; i++) {
//         for (let j = Math.ceil(nodes.length / 2); j < Math.ceil(nodes.length / 2) * 2; j++) {
//             hungarianMatrix.push(heatmapData[i][j]);
//             console.log(heatmapData[i][j]);
//         }
//     }
  
//     let ob = new MaxAsignacion();
  
//     console.log("Matriz húngara", hungarianMatrix);
//     console.log("Máximo recorrido: ", ob.assignmentProblem(hungarianMatrix, Math.ceil(nodes.length / 2)));
  
//     let assignments = [];
  
//     if (ob.getIteracion() % 2 === 0) {
//         assignments = ob.getAssignments();
//         console.log("Asignaciones:", assignments);
//         console.log("Iteración:", ob.getIteracion());
//     } else {
//         assignments = ob.getAssignmentsReversed();
//         console.log("Asignaciones:", assignments);
//         console.log("Iteración:", ob.getIteracion());
//     }
  
//     // Verificar si 'assignments' es un arreglo de objetos
//     if (Array.isArray(assignments)) {
//         // Aquí es donde debes asegurarte de que las asignaciones contienen las coordenadas
//         const updatedHeatmapData = [...heatmapData];  // Copiar la matriz original de calor
  
//         // Iterar sobre cada asignación, asumiendo que cada elemento es un arreglo [assignedRow, assignedCol]
//         assignments.forEach(assignment => {
//             // Aquí cada 'assignment' es un arreglo con dos elementos [row, col]
//             const [assignedRow, assignedCol] = assignment;  // Desestructuración directa
  
//             if (assignedRow !== undefined && assignedCol !== undefined) {
//                 updatedHeatmapData[assignedRow][assignedCol] = 1;  // O cualquier valor representando la asignación
//             }
//         });
  
//         console.log("Datos que se pasan a MyHeatmap:", { nodes, heatmapData: updatedHeatmapData, asignaciones: assignments });
//         setHeatmapData(updatedHeatmapData);  // Asegúrate de que el estado de `heatmapData` se actualiza
//     } else {
//         // Si 'assignments' no es un arreglo válido, muestra un error
//         console.error("Error: Las asignaciones no son un arreglo válido", assignments);
//     }
// };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const sinTextNodes = nodes.filter((node) => node.shape !== "text");
  const matrixSize = sinTextNodes.length;
  const rowSums = Array(matrixSize).fill(0);
  const colSums = Array(matrixSize).fill(0); 

  const heatmapData = sinTextNodes.map((colNode) =>
    sinTextNodes.map((rowNode) => {
      // Buscar si hay una arista entre rowNode y colNode
      const edge = edges.find((e) => e.from === rowNode.id && e.to === colNode.id);
      return Number((edge?.label || "").split("\n")[0]) || 0;
    })
    .reverse(),
  );

  heatmapData.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      rowSums[rowIndex] += value; // Sumar fila
      colSums[colIndex] += value; // Sumar columna
    });
  });

  const yLabels = sinTextNodes.map((node, index) => `${node.label.split("\n")[0]}`);
  const xLabels = sinTextNodes.map((node, index) => `${node.label.split("\n")[0]}`);
  yLabels.reverse();

  //para tener las sumas de las filas en un arreglo
  const categoriesArray = rowSums.map((sum, index) => ({
      start: index,
      end: index,
      text: `${sum}`,
  }));
  //para tener las sumas de las columnas en un arreglo
  const rowCategoriesArray = colSums.map((sum, index) => ({
    start: index,
    end: index,
    text: `${sum}`,
  }));
rowSums.reverse();

function detectarTipoMatriz(matriz) {
  const n = matriz.length;
  let filaCeros = matriz.findIndex(fila => fila.every(val => val === 0));
  let columnaCeros = -1;
  for (let j = 0; j < n; j++) {
    if (matriz.every(fila => fila[j] === 0)) {
      columnaCeros = j;
      break;
    }
  }

  if (filaCeros !== -1) {  //n-1 x n matriz tiene fila de ceros
    return 3;
  } else if (columnaCeros !== -1) {
    return 2; //n x n-1 matriz tiene columna de ceros
  } else{
    return 1; //cuadrada
  }
}
function generarEjes(DosDHungara) {//por la
  let xAxisH = [];
  let yAxisH = [];   
  let xIndex = [];
  let yIndex = []; 
  let tipoMatriz=detectarTipoMatriz(DosDHungara);
  console.log("dos d hugnaa", DosDHungara);

    for(let i = 0; i < xLabels.length; i++){
      if((i) > (xLabels.length/2)){
        if(i<DosDHungara.length){
          xAxisH.push("EXTRA");
        }
        else{
          xAxisH.push(xLabels[i]);
          xIndex.push(filteredSinTextNodes[i].id);
        }
      }
      else{
        if((i)>DosDHungara[0].length){
          yAxisH.push("EXTRA");

        }
        else{
          yAxisH.push(xLabels[i]);
          yIndex.push(filteredSinTextNodes[i].id);
        }
      }
    }
  return { xAxisH, yAxisH ,xIndex,yIndex};
}
const yAxisConfig = {
  labels: yLabels,
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
          categories: rowCategoriesArray, 
          // Agrega las sumas dinámicamente
      }
  ]
};
const indexMap = sinTextNodes
  .map((value, index) => (value !== undefined ? index : null)) // Guardamos el índice si hay valor
  .filter(index => index !== null); // Eliminamos los valores nulos



const filteredSinTextNodes = sinTextNodes.filter(value => value !== undefined);
const xAxisHunga = (matrizHunga) => ({
  labels: matrizHunga, // Índices de las filas
  opposedPosition: true,
});

const yAxisHunga = (matrizHunga) => ({
  labels: matrizHunga // Índices de las columnas
});
const convertirABidimensional = (array, columnas) => {
  let matriz = [];
  for (let i = 0; i < array.length; i += columnas) {
      matriz.push(array.slice(i, i + columnas)); // Toma "columnas" elementos por fila
  }
  return matriz;
};
function eliminarFilasYColumnasCero(matriz) {
  const m = matriz.length;
  const n = matriz[0].length;

  // Identificar filas con solo ceros
  const filasNoCero = matriz.map(fila => fila.some(val => val !== 0));

  // Identificar columnas con solo ceros
  const columnasNoCero = Array(n).fill(false);
  for (let j = 0; j < n; j++) {
    if (matriz.some(fila => fila[j] !== 0)) {
      columnasNoCero[j] = true;
    }
  }

  // Construir la nueva matriz sin las filas y columnas de ceros
  const nuevaMatriz = matriz
    .filter((_, i) => filasNoCero[i])
    .map(fila => fila.filter((_, j) => columnasNoCero[j]));

  return nuevaMatriz;
}
categoriesArray.reverse();
const xAxisConfig = {
    labels: xLabels,
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
            categories: categoriesArray, // Aquí agregamos los valores de colSums dinámicamente
        }
    ]
    
};


  const showSwal = () => {
    const MySwal = withReactContent(Swal);
    
    MySwal.fire({
      html: (
        <div style={{ width: '90vw', maxWidth: '800px', height: '60vh'}}>
          <h2><i>Conexiones</i></h2>
          <div style={{ width: '100%', height: '100%' }}>
            <HeatMapComponent
              titleSettings={{
                text: 'Matriz de adyacencia',
                textStyle: {
                  size: '24px',
                  fontWeight: '500',
                  fontFamily: 'Segoe UI',
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
              }}
              paletteSettings={{
                palette: [
                  { value: 0, color: 'rgb(227, 219, 219)' },
                  { value: 1, color: '#f7bfd8' },
                  { value: 5, color: '#f3aacb' },
                  { value: 10, color: '#eb9ac0' },
                ],
                type: 'Gradient',
              }}
              dataSource={heatmapData}
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



  
//   const matrizAsignacion = (asignaciones) => {
//     const MySwal = withReactContent(Swal);

//     // Crear una copia de la matriz de calor original para modificarla
//     const updatedHeatmapData = heatmapData.map(row => [...row]);

//     // Revertir el orden de las filas en la matriz (invertir el número de índices)
//     updatedHeatmapData.reverse();

//     // Itera sobre las asignaciones y marca las casillas correspondientes como verde
//     console.log("Asignaciones otras :", asignaciones);

//     // Asegúrate de que las asignaciones estén en el formato esperado
//     asignaciones.forEach(assignment => {
//         const [assignedRow, assignedCol] = assignment; // Cada asignación es un par [fila, columna]

//         console.log("Asignaciones por fila y columna:", assignedRow, assignedCol);

//         // Verifica si las asignaciones son válidas (en el rango de la matriz)
//         if (
//             assignedRow >= 0 && assignedRow < updatedHeatmapData.length &&
//             assignedCol >= 0 && assignedCol < updatedHeatmapData[assignedRow].length
//         ) {
//             console.log(`Asignación válida en fila ${assignedRow}, columna ${assignedCol}`);
//             updatedHeatmapData[assignedRow][assignedCol] = true;  // Marcar la asignación con 'true'
//         } else {
//             console.warn(`Asignación fuera de rango: fila ${assignedRow}, columna ${assignedCol}`);
//         }
//     });

//     // Verifica el resultado de la matriz después de marcar las asignaciones
//     console.log("Matriz actualizada con asignaciones:", updatedHeatmapData);

//     // Ahora, pasamos esta matriz actualizada al componente de HeatMap
//     MySwal.fire({
//         html: (
//             <div style={{ width: '90vw', maxWidth: '800px', height: '60vh' }}>
//                 <h2><i>Conexiones</i></h2>
//                 <div style={{ width: '100%', height: '100%' }}>
//                     <HeatMapComponent
//                         titleSettings={{
//                             text: 'Matriz de adyacencia',
//                             textStyle: {
//                                 size: '24px',
//                                 fontWeight: '500',
//                                 fontFamily: 'Segoe UI',
//                             },
//                         }}
//                         width="100%"
//                         height="100%"
//                         xAxis={xAxisConfig}
//                         yAxis={yAxisConfig}
//                         cellSettings={{
//                             border: {
//                                 width: 1,
//                                 radius: 4,
//                                 color: 'white',
//                             },
//                         }}
//                         paletteSettings={{
//                             palette: [
//                                 { value: 0, color: 'rgb(227, 219, 219)' },
//                                 { value: 1, color: 'rgb(250, 193, 193)' },
//                                 { value: 5, color: 'rgb(237, 112, 135)' },
//                                 { value: 10, color: 'rgb(249, 78, 109)' },
//                                 { value: true, color: 'rgb(0, 255, 0)' },  // Verde para las asignaciones
//                             ],
//                             type: 'Gradient',
//                         }}
//                         dataSource={updatedHeatmapData}  // Usamos la matriz modificada con asignaciones
//                     >
//                         <Inject services={[Tooltip]} />
//                     </HeatMapComponent>
//                 </div>
//             </div>
//         ),
//         showCloseButton: true,
//         showConfirmButton: false,
//         width: 'auto', 
//         heightAuto: true,
//         customClass: {
//             popup: 'custom-swal-modal',
//         },
//     });
// };


  
  

  //guardado del nodo como imagen
  const exportAsImage = async () => {
    if (!graphOnlyRef.current) {
      console.error("No se encontró la pizarra del grafo.");
      return;
    }

    const canvas = await html2canvas(graphOnlyRef.current, {
      backgroundImage: graphOnlyRef.current.backgroundImage,
      ignoreElements: (element) => element.classList.contains("exclude"),
    });
  
    const date = new Date();
    const formattedDate = date
      .toISOString()
      .replace(/T/, "_") 
      .replace(/:/g, "-") 
      .split(".")[0]; 
  
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    
    link.download = `pizarra_grafo_${formattedDate}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  //guardado del nodo como pdf
  const exportAsPDF = async () => {
    if (!graphOnlyRef.current) return; 
    const canvas = await html2canvas(graphOnlyRef.current, {
      backgroundImage: graphOnlyRef.current.backgroundImage,
      ignoreElements: (element) => element.classList.contains("exclude"),
    });
    const image = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    const imgWidth = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(image, "PNG", 10, 10, imgWidth, imgHeight);
  
    const date = new Date();
    const formattedDate = date
      .toISOString()
      .replace(/T/, "_") 
      .replace(/:/g, "-") 
      .split(".")[0]; 
  

      pdf.save(`pizarra_grafo_${formattedDate}.pdf`);
  };
  ///para exportar
  const exportGraphAsJSON = () => {
    const graphData = { nodes, edges }; 
  
    
    console.log('Exportando grafo:', graphData);
    const graphJSON = JSON.stringify(graphData);
  

    const link = document.createElement("a");
    const blob = new Blob([graphJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    link.href = url;
    const date = new Date();
    const formattedDate = date
      .toISOString()
      .replace(/T/, "_") 
      .replace(/:/g, "-") 
      .split(".")[0]; 

    link.download = `pizarra_grafo_${formattedDate}.json`; 
    link.click();
    URL.revokeObjectURL(url); 
  };
  
  //para importar
  const importGraphFromJSON = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (!file) {
      console.error("No se seleccionó ningún archivo.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      try {
        const graphData = JSON.parse(reader.result);
        if (graphData && graphData.nodes && graphData.edges) {
          setNodes(graphData.nodes);
          setEdges(graphData.edges);
        } else {
          Swal.fire({
            title: "Error al importar el grafo",
            text: "El archivo seleccionado no contiene un grafo válido.",
            icon: "error",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#95bb59",
            customClass: {
              popup: "swal-popup",
            },
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error al importar el grafo",
          text: "El archivo seleccionado no contiene un grafo válido.",
          icon: "error",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#95bb59",
          customClass: {
            popup: "swal-popup",
          },
        });
      }
  
      fileInput.value = "";
    };
  
    reader.readAsText(file);
  };
  
  
  //opciones del grafo
  const options = {
    layout: { hierarchical: false },
    physics: false,
    interaction: { dragNodes: true, multiselect: true },
    nodes: {
      shape: "circle",
      size: 15,
      shadow: true,
      
    },
    edges: {
      smooth: { type: "curvedCW", roundness: 0.2,  },
      arrows: { to: { enabled: true, scaleFactor: 1 } },
      font: {
        align: "middle",
        size: 14,
        color: "#3c3c3c",
        face: "arial"
      },
      selfReference: { size:40 , angle: Math.PI },

    }
  };

  const getUniqueNodeId = () => {
    let newId = nextNodeId.current++;
    while (nodes.some((node) => node.id === newId)) {
      newId = nextNodeId.current++;
    }
    return newId;
  };

  const getUniqueEdgeId = () => 
    {
      let newId = nextEdgeId.current++;
      while (edges.some((edge) => edge.id === newId)) {
        newId = nextEdgeId.current++;
      }
      return newId;
    };
  
  // funcion para crear nodo con doble click
  const handleDoubleClick = (event) => {
    if (event.nodes.length > 0) return;
    const newId = getUniqueNodeId();
    const color = colorRandom();
    // Se asigna automáticamente el nombre "Nodo X"
    const newNode = {
      id: newId,
      label: `Nodo ${newId}`,
      x: event.pointer.canvas.x,
      y: event.pointer.canvas.y,
      shape: "circle",
      color: { background: color, border: color },
      selfReferenceSize: 30,
      
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
  
    const shape = event.dataTransfer.getData("shape") || "circle"; 
    if (!shape) return;
  
    if (!graphRef.current) return;
    const rect = graphRef.current.getBoundingClientRect();
    const newX = event.clientX - rect.left;
    const newY = event.clientY - rect.top;
  
    const newId = getUniqueNodeId();
    const color = colorRandom();
  
    const newNode = {
      id: newId,
      label: `Nodo ${newId}`,
      x: newX,
      y: newY,
      shape: shape,
      color: { background: color, border: color },
      size: 15, 
    };
  
    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode].map(node => ({
        ...node,
        shape: node.shape || "circle",
        size: node.size || 15, 
      }));
  
      return updatedNodes;
    });
  
    console.log("Nodo agregado:", newNode);
  };

  const handleDragEnd = (event) => {
    const { nodes: movedNodes } = event;
    if (!movedNodes.length) return;
  
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        movedNodes.includes(node.id)
          ? {
              ...node,
              x: event.pointer.canvas.x,
              y: event.pointer.canvas.y,
              shape: node.shape,
            }
          : node
      )
    );
  };

  const handleChangeNode = (nodeId, newLabel, newShape, newColor) => {
    setNodes((prevNodes) =>
        prevNodes.map((node) =>
            node.id === nodeId ? { ...node, label: newLabel, shape: newShape, color: { background: newColor ,border: newColor } } : node
        )
    );
};

  const allowDrop = (event) => event.preventDefault();

  const createEdge = async (from, to) => {
    if((edges.some((edge) => edge.label.includes("h")))){
      Swal.fire({
        title: "Oh no",
        text: "En en el algoritmo de Johnson no se permite tener retorno",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#8dbd4c",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    } else{
      console.log("Flag funciona" + flag);
    const fromNode = nodes.find((node) => node.id === from);  // Buscar el nodo por su ID
    const toNode = nodes.find((node) => node.id === to);  // Buscar el nodo por su ID

    // Verificar si los nodos existen
    if (!fromNode || !toNode) {
      console.warn("Uno de los nodos no existe, no se puede crear la arista.");
      return;
    }

  

    // Bloquear la creación de aristas si uno de los nodos tiene shape "text"
    if (fromNode.shape === "text" || toNode.shape === "text") {
      console.warn("No se pueden crear aristas desde/hacia nodos de tipo 'text'");
      return;
    }
    const newWeight = await handleEdgeWeight();
    if (from === to) {
      console.log("Flag" + flag);
      const newEdge = {
        id: getUniqueEdgeId(),
        from,
        to,
        label: newWeight,
        color: { color: "#3c3c3c" },
        smooth: { type: "curvedCW", roundness: 0.5 },
        arrows: { to: { enabled: true, scaleFactor: 1 } },
        selfReference: { size: 30, angle: Math.PI }
      };
      
      setEdges((prevEdges) => [...prevEdges, newEdge]);
      return;
    }
    if (edges.some((edge) => edge.from === from && edge.to === to)) return;
    const newEdge = {
      id: getUniqueEdgeId(),
      from,
      to,
      color: { color: "#3c3c3c" },
      label: newWeight
    };
    
    setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
  };

  const reverseEdge = (edgeId) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === edgeId ? { ...edge, from: edge.to, to: edge.from } : edge
      )
    );
  };

  const deleteNodeAndEdges = (nodeId) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.from !== nodeId && edge.to !== nodeId)
    );
  };

  const deleteEdge = (edgeId) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
  };

  // Con clic izquierdo se selecciona el nodo para crear aristas
  const handleNodeClick = (event) => {
    const clickedNodeId = event.nodes[0];
    if (!clickedNodeId) return;
    if (selectedNode) {
      createEdge(selectedNode, clickedNodeId);
      setSelectedNode(null);
    } else {
      setSelectedNode(clickedNodeId);
    }
  };

  const handleEdgeClick = (event) => {
    const clickedEdgeId = event.edges[0];
    setSelectedEdge(clickedEdgeId);
  };

  const handleDelete = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      if (selectedNode) {
        deleteNodeAndEdges(selectedNode);
        setSelectedNode(null);
      } else if (selectedEdge) {
        deleteEdge(selectedEdge);
        setSelectedEdge(null);
      }
    }
  };
 

const getBackgroundStyle = () => {
   

    const baseStyles = {
        backgroundColor: "#ffffff",
        backgroundPosition: `${offsetX}px ${offsetY}px`
    };

    switch (canvasStyle) {
        case "blanco":
            return baseStyles;
        case "cuadricula":
            return {
                ...baseStyles,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px"
            };
            case "puntos":
              return {
                  ...baseStyles,
                  backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
                  backgroundSize: "20px 20px", // Asegura la repetición
                  backgroundRepeat: "repeat"
              };
        default:
            return baseStyles;
    }
};
useEffect(() => {
  console.log("🎨 Estilo cambiado a:", canvasStyle);
}, [canvasStyle]);
  const handleEdgeDoubleClick = async (event) => {
    const edgeId = event.edges[0];
    const edge = edges.find((e) => e.id === edgeId);
    if (!edge) return;
    //if(edge.label.includes("h")) return;
    const { value: newWeight } = await Swal.fire({
      title: "Ingrese el peso de la arista",
      input: "number",
      inputLabel: "Solo números",
      inputValue: edge.label,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#8dbd4c",
      customClass: { popup: "swal-popup" },
      inputValidator: (value) => {
        if (!value || isNaN(value))
          return "Por favor ingrese un número válido.";
      }
    });
    if (newWeight !== undefined) {
      setEdges((prevEdges) =>
        prevEdges.map((e) =>
          e.id === edgeId ? { ...e, label: newWeight } : e
        )
      );
    }
  };
  const handleEdgeWeight = async () => {
    const { value: newWeight } = await Swal.fire({
      title: "Ingrese el peso de la arista",
      input: "number",
      inputLabel: "Solo números",
      inputValue: "",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#8dbd4c",
      customClass: { popup: "swal-popup" },
      inputValidator: (value) => {
        if (!value || isNaN(value))
          return "Por favor ingrese un número válido.";
      }
    });
    if (newWeight !== undefined) {
      return newWeight;
    }
  };
  const handleClearBoard = () => {
    setNodes([]);
    setEdges([]);
    setMostrarRutaCritica(false); // Ocultar mensaje cuando se borra todo
  };

  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const explicarFuncionamiento = () => {
    setIsTutorialOpen(true); // Abre el tutorial
  };

  const [isHovered, setIsHovered] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
      if (firstRender.current && nodes.length === 1) {
          firstRender.current = false;
      }
  }, [nodes]);

  useEffect(() => {
    const graphContainer = graphNetwork.current?.body?.container || graphRef.current;
    const handleKeyDown = (event) => {
      handleDelete(event);
    };
    if (graphContainer) {
      graphContainer.focus();
      graphContainer.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (graphContainer) {
        graphContainer.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [selectedNode, selectedEdge]);


  // Función para obtener la instancia de la red
  const getNetwork = (network) => {
    graphNetwork.current = network;
  };
  //creación de arreglo con las acciones del botón para pasarlas como argumento
  const actions = [
    { icon: <SchoolIcon sx={{ color: "rgb(255,182,193)" }} />, name: "Johnson", action: runJohnson },
    { icon: <CalculateIcon  sx={{ color: "rgb(255,182,193)"}} />, name: "Asignación", action: runAsignacion1 },
  ];

  return (
    

    <div
      

    id="pizarra"        
    ref={graphRef}
            style={{    
                width: "1500px",
                height: "560px",
                border: "15px solid rgb(226,188,157)",
                outline: "none",
                ...getBackgroundStyle(), // Llamada a la función para obtener el estilo dinámico
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                display: "flex",
                position: "relative"
                
            }}
            onDrop={handleDrop}
            onDragOver={allowDrop}
            tabIndex="0"
        >
          

            {/* Botón dentro de la pizarra para cambiar el estilo */}
          <button  
              id="cambiarPizarra"
              onClick={() => setIsStyleModalOpen(true)}
              title="Cambiar Estilo de Pizarra"
              style={{
                  position: "absolute",
                  top: "30px",  
                  right: "10px", 
                  zIndex: 10, 
                  backgroundColor: "rgb(226,188,157)",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  color: "#000",
                  fontSize: "14px",
                  fontWeight: "bold",
              }}
          >
              Cambiar Estilo
          </button>

          {/* Modal para seleccionar el estilo de la pizarra */}
          <CanvasStyleModal
              isOpen={isStyleModalOpen}
              currentStyle={canvasStyle}
              onClose={() => setIsStyleModalOpen(false)}
              onChangeStyle={(newStyle) => {
                  setCanvasStyle(newStyle);
                  setIsStyleModalOpen(false);
              }}
          />
          <div id="toolbar">
            <Toolbar
             />
          </div>

          <div
            ref={graphOnlyRef} 
            style={{
              flex: 1,
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...getBackgroundStyle(),
            }}
          >
            <Graph
            
            key={firstRender.current ? JSON.stringify(nodes) : "graph-key"}
            graph={{ nodes, edges }}
            options={options}
            getNetwork={getNetwork}
            events={{
              doubleClick: (event) => {
                if (event.edges.length > 0) {
                  handleEdgeDoubleClick(event);
                } else {
                  handleDoubleClick(event);
                }
              },
              click: (event) => {
                if (event.nodes.length > 0) {
                  handleNodeClick(event);
                } else if (event.edges.length > 0) {
                  setSelectedEdge(event.edges[0]);
                  setSelectedNode(null);
                } else {
                  setSelectedEdge(null);
                  setSelectedNode(null);
                }
              },
              dragEnd: handleDragEnd
            }}
          />
{/* Nota de Ruta Crítica */}
{mostrarRutaCritica && (
  <div
    style={{
      position: "absolute",
      bottom: "30px", // Ajustado para que no toque el toolbar
      left: "50%",
      transform: "translateX(-40%)",
      background: "rgb(245, 140, 155)", // Color más similar a la ruta crítica
      color: "#3c1f1f", // Marrón oscuro para mejor contraste
      padding: "14px 32px",
      borderRadius: "16px", // Bordes suaves y estilizados
      fontSize: "16px",
      fontWeight: "bold",
      fontFamily: "'Poppins', sans-serif",
      fontStyle: "italic", // Ligera cursiva para hacerlo más amigable
      textAlign: "center",
      border: "2px solid rgba(255, 255, 255, 0.8)", // Borde más limpio
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.12)", // Sombra sutil
    }}
  >
    ✨ <b>¡Atención!</b> Esta es la Ruta Crítica, resaltada en este color ✨
  </div>
)}
                <ShapeAndColorModal
                  isOpen={isModalOpen}
                  nodeId={selectedNode}
                  currentLabel={nodes.find((n) => n.id === selectedNode)?.label}  
                  currentShape={nodes.find((n) => n.id === selectedNode)?.shape}
                  currentColor={nodes.find((n) => n.id === selectedNode)?.color?.background}
                  onClose={closeModal}
                  onChange={handleChangeNode}
              />
                            {selectedNode !== null && (
                              <div style={{ position: "absolute", bottom: "5px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px" }}>
                                <button
                                id="editNodo"
                  onClick={openModal}
                  title="Cambiar Forma y Color"
                  style={{
                      backgroundColor: "rgb(226,188,157)",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      cursor: "pointer",
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                  }}
              >
                 {nodes.find((n) => n.id === selectedNode)?.shape === "text"
                  ? "Editar Nota"
                  : "Editar Nodo"}
              </button>
                </div>
              )}

          {/* Botón de invertir dirección de la arista */}
          {selectedEdge !== null && (
            <button 
              id="invertirArista"
              onClick={() => reverseEdge(selectedEdge)}
              title="Invertir dirección de la arista"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgb(226,188,157)",
                border: "none",
                padding: "15px 30px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                color: "#000",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              Invertir dirección de la arista
            </button>
          )}
          {/* Botón para borrar todo */}
          <div>
          <button 
          id="borrarTodo"
          onClick={handleClearBoard}
          className="exclude"
          style={{
            position: "absolute",
            top: "430px",
            left: "38px",
            transform: "translateY(-50%)",
            backgroundImage: `url(${borrador})`,
            backgroundColor: "transparent",
            backgroundSize: "cover",
            width: "50px",
            height: "50px",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-50%) scale(1.1)";
            setIsHovered(true);
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(-50%) scale(1)";
            setIsHovered(false);
          }}
        >
          {isHovered && (
            <span
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#ffafcc",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                fontSize: "12px",
                whiteSpace: "nowrap"
              }}
            >
              Borrador de pizarra
            </span>
          )}
        </button>
          </div>
          {/* Bton tabla uwu */}
          <button
            id="matrizAdyacencia"
            onClick={() => showSwal()}
            style={{
              position: "absolute",
              top: "500px",
              left: "38px",
              transform: "translateY(-50%)",
              backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/7604/7604036.png)`,
              backgroundColor: "transparent",
              backgroundSize: "cover",
              width: "50px",
              height: "50px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-50%) scale(1.1)";
              setIsHovered(true);
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(-50%) scale(1)";
              setIsHovered(false);
            }}
          >
            {isHovered && (
              <span
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#a8e2ed",
                  color: "black",
                  padding: "5px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  whiteSpace: "nowrap"
                }}
              >
                Matriz de adyacencia
              </span>
            )}
          </button>
          {/* Botón de algoritmos */}
          <SpeedDialTooltipOpen actions={actions}/>
        
          

          

        </div>

        {/* Botón para exportar */}
        <div 
          id="acciones"
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            transition: "background-color 0.3s ease-in-out",
            }}
        >
          {/* Botón para exportar imagen */}
          <button
            onClick={exportAsImage}
            style={{
              backgroundColor: "rgb(226,188,157)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(255,182,193)")} 
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(226,188,157)")} 
          >
            Exportar Imagen
          </button>

          <button
            onClick={exportAsPDF}
            style={{
              backgroundColor: "rgb(226,188,157)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out", 
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(255,182,193)")} 
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(226,188,157)")} 
          >
            Exportar PDF
          </button>


          {/* Botón para exportar JSON */}
          <button
            onClick={exportGraphAsJSON}
            style={{
              backgroundColor: "rgb(226,188,157)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(255,182,193)")} 
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(226,188,157)")} 
          >
            Exportar JSON
          </button>
          

          {/* Botón para importar JSON */}
          <label
            style={{
              backgroundColor: "rgb(226,188,157)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Arial",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(255,182,193)")} 
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(226,188,157)")} 
          >
            Importar JSON
            <input
              type="file"
              accept=".json"
              onChange={importGraphFromJSON}
              style={{ display: "none" }} 
            />
          </label>
          

          {/* Botones que aparecen al hacer clic */}
      {showButtons && (
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          {/* Botón Minimizar */}
          <button
            onClick={runAsignacion}
            style={{
              backgroundColor: "#ffc8c3",
              border: "none",position: "absolute",
              top: "220px",
              left: "810px",
              transform: "translateY(-50%)",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Arial",
              transition: "background-color 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#fe939b")} 
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffc8c3")} 
          >
            <ExpandIcon /> Minimizar
          </button>

          {/* Botón Maximizar */}
          <button
          onClick={runMaxAsignacion}
            style={{
              backgroundColor: "#c6f4c6",
              border: "none",
              position: "absolute",
              top: "150px",
              left: "810px",
              transform: "translateY(-50%)",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Arial",
              transition: "background-color 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#a8f0a8")} 
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#c6f4c6")} 
          >
            <CollapseIcon /> Maximizar
          </button>
        </div>
      )}

      
          
      {/* <MatrizAsignacion
        nodes={nodes}
        edges={edges}
        highlightedCells={highlightedCells}  // Pasar el estado de celdas resaltadas al hijo
      /> */}
        </div>

        

      
    </div>
    
  );
};

export default GraphComponent;