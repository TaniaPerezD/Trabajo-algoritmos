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

import { dijkstraMin } from "../algoritmos/dijkstra/dijkstraMin";
import { dijkstraMax } from "../algoritmos/dijkstra/dijkstraMax";


//para el botón flotante, iconos, son cambiables (miu icons-material)
import SchoolIcon from '@mui/icons-material/School';
import CalculateIcon from '@mui/icons-material/Calculate';

import SpeedDialTooltipOpen from "./BotonCaminos";


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

  const runDijkstraMin = async () => {
    
    // Verificar que haya al menos 2 nodos
    const sinTextNodes = nodes.filter((node) => node.shape !== "text");
    if (sinTextNodes.length < 2) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Para ejecutar Dijkstra necesitas al menos 2 nodos en tu grafo.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    // Verificar que haya al menos una arista
    if (edges.length === 0) {
      Swal.fire({
        title: "¡Oh no!",
        text: "No hay aristas en tu grafo. Dijkstra necesita aristas para encontrar el camino más corto.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    // Verificar que todos los pesos (labels) sean numéricos
    if (edges.some((edge) => isNaN(Number(edge.label)))) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Todas las aristas deben tener valores numéricos como peso para el algoritmo de Dijkstra.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    // Solicitar nodo origen
    const { value: sourceNodeId, isConfirmed: sourceConfirmed } = await Swal.fire({
      title: "Selecciona el nodo origen",
      input: "select",
      inputOptions: sinTextNodes.reduce((options, node) => {
        options[node.id] = `${node.id}: ${node.label || node.id}`;
        return options;
      }, {}),
      inputPlaceholder: "Selecciona un nodo",
      showCancelButton: true,
      confirmButtonText: "Siguiente",
      confirmButtonColor: "#95bb59",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup",
      },
    });
  
    if (!sourceConfirmed || !sourceNodeId) return;
  
    // Solicitar nodo destino
    const { value: targetNodeId, isConfirmed: targetConfirmed } = await Swal.fire({
      title: "Selecciona el nodo destino",
      input: "select",
      inputOptions: sinTextNodes.reduce((options, node) => {
        options[node.id] = `${node.id}: ${node.label || node.id}`;
        return options;
      }, {}),
      inputPlaceholder: "Selecciona un nodo",
      showCancelButton: true,
      confirmButtonText: "Ejecutar",
      confirmButtonColor: "#95bb59",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup",
      },
    });
  
    if (!targetConfirmed || !targetNodeId) return;
  
    // Ejecutar el algoritmo de Dijkstra para minimizar
    let result = dijkstraMin(nodes, edges, sourceNodeId, targetNodeId);
    
    if (!result) {
      Swal.fire({
        title: "Error al ejecutar el algoritmo",
        text: "No se pudo ejecutar el algoritmo de Dijkstra.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    if (result.error) {
      Swal.fire({
        title: "No hay ruta",
        text: result.error,
        icon: "info",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    let { nodes: updatedNodes, edges: updatedEdges, nodosCriticos, distanciaTotal, camino } = result;
  
    // Formatear las aristas actualizadas
    updatedEdges = updatedEdges.map((edge) => ({
      ...edge,
      color: { color: edge.color },
      width: edge.width,
    }));
  
    // Actualizar el estado de nodos y aristas
    setNodes(updatedNodes);
    setEdges(updatedEdges);

    setMostrarRutaCritica(true);
  
    // Mostrar el resultado del camino más corto
    Swal.fire({
      title: "¡Camino más corto encontrado!",
      html: `
        <p>Distancia total: <strong>${distanciaTotal}</strong></p>
        <p>Ruta: <strong>${camino.join(" → ")}</strong></p>
      `,
      icon: "success",
      confirmButtonText: "Genial",
      confirmButtonColor: "#95bb59",
      customClass: {
        popup: "swal-popup",
      },
    });
  
    // Aplicar efecto de brillo a los nodos críticos (del camino)
    let nodosConBrillo = updatedNodes.map((node) => ({
      ...node,
      shadow: nodosCriticos.has(node.id) 
        ? { enabled: true, size: 70, color: "rgba(193, 112, 237, 0.9)" } // Brillo activado
        : { enabled: true, size: 10, color: "rgba(0, 0, 0, 0.3)" } // Sombra normal
    }));
  
    setNodes(nodosConBrillo);
  
    // Después de 5 segundos, apagar el brillo pero mantener los colores
    setTimeout(() => {
      let nodosFinales = updatedNodes.map((node) => ({
        ...node,
        shadow: { enabled: true, size: 10, color: "rgba(0, 0, 0, 0.3)" } // Mantiene solo la sombra normal
      }));
  
      setNodes(nodosFinales);
    }, 5000); // Se apaga después de 5 segundos
  };


  const runDijkstraMax = async () => {
    // Verificar que haya al menos 2 nodos
    const sinTextNodes = nodes.filter((node) => node.shape !== "text");
    if (sinTextNodes.length < 2) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Para ejecutar Dijkstra necesitas al menos 2 nodos en tu grafo.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    // Verificar que haya al menos una arista
    if (edges.length === 0) {
      Swal.fire({
        title: "¡Oh no!",
        text: "No hay aristas en tu grafo. Dijkstra necesita aristas para encontrar el camino de mayor valor.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    // Verificar que todos los pesos (labels) sean numéricos
    if (edges.some((edge) => isNaN(Number(edge.label)))) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Todas las aristas deben tener valores numéricos como peso para el algoritmo de Dijkstra.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    // Solicitar nodo origen
    const { value: sourceNodeId, isConfirmed: sourceConfirmed } = await Swal.fire({
      title: "Selecciona el nodo origen",
      input: "select",
      inputOptions: sinTextNodes.reduce((options, node) => {
        options[node.id] = `${node.id}: ${node.label || node.id}`;
        return options;
      }, {}),
      inputPlaceholder: "Selecciona un nodo",
      showCancelButton: true,
      confirmButtonText: "Siguiente",
      confirmButtonColor: "#95bb59",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup",
      },
    });
  
    if (!sourceConfirmed || !sourceNodeId) return;
  
    // Solicitar nodo destino
    const { value: targetNodeId, isConfirmed: targetConfirmed } = await Swal.fire({
      title: "Selecciona el nodo destino",
      input: "select",
      inputOptions: sinTextNodes.reduce((options, node) => {
        options[node.id] = `${node.id}: ${node.label || node.id}`;
        return options;
      }, {}),
      inputPlaceholder: "Selecciona un nodo",
      showCancelButton: true,
      confirmButtonText: "Ejecutar",
      confirmButtonColor: "#95bb59",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup",
      },
    });
  
    if (!targetConfirmed || !targetNodeId) return;
  
    // Ejecutar el algoritmo de Dijkstra para maximizar
    let result = dijkstraMax(nodes, edges, sourceNodeId, targetNodeId);
    
    if (!result) {
      Swal.fire({
        title: "Error al ejecutar el algoritmo",
        text: "No se pudo ejecutar el algoritmo de Dijkstra.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    if (result.error) {
      Swal.fire({
        title: "No hay ruta",
        text: result.error,
        icon: "info",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }
  
    let { nodes: updatedNodes, edges: updatedEdges, nodosCriticos, valorTotal, camino } = result;
  
    // Formatear las aristas actualizadas
    updatedEdges = updatedEdges.map((edge) => ({
      ...edge,
      color: { color: edge.color },
      width: edge.width,
    }));
  
    // Actualizar el estado de nodos y aristas
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  

    setMostrarRutaCritica(true); 
  
    // Mostrar el resultado del camino de mayor valor
    Swal.fire({
      title: "¡Camino de mayor valor encontrado!",
      html: `
        <p>Valor total: <strong>${valorTotal}</strong></p>
        <p>Ruta: <strong>${camino.join(" → ")}</strong></p>
      `,
      icon: "success",
      confirmButtonText: "Genial",
      confirmButtonColor: "#95bb59",
      customClass: {
        popup: "swal-popup",
      },
    });
  
    // Aplicar efecto de brillo a los nodos críticos (del camino)
    let nodosConBrillo = updatedNodes.map((node) => ({
      ...node,
      shadow: nodosCriticos.has(node.id) 
        ? { enabled: true, size: 70, color: "rgba(193, 112, 237, 0.9)" } // Brillo activado
        : { enabled: true, size: 10, color: "rgba(0, 0, 0, 0.3)" } // Sombra normal
    }));
  
    setNodes(nodosConBrillo);
  
    // Después de 5 segundos, apagar el brillo pero mantener los colores
    setTimeout(() => {
      let nodosFinales = updatedNodes.map((node) => ({
        ...node,
        shadow: { enabled: true, size: 10, color: "rgba(0, 0, 0, 0.3)" } // Mantiene solo la sombra normal
      }));
  
      setNodes(nodosFinales);
    }, 5000); // Se apaga después de 5 segundos
  };


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
    { icon: <CalculateIcon  sx={{ color: "rgb(216, 182, 255)"}} />, name: "Dijkstra Maximizar", action: runDijkstraMax },
    { icon: <CalculateIcon  sx={{ color: "rgb(216, 182, 255)"}} />, name: "Dijkstra Minizar", action: runDijkstraMin },

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
                background: "rgb(212, 140, 245)", // Color más similar a la ruta crítica
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
                ✨ <b>¡Atención!</b> Este es el camino  ✨
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
        
    
      
          
        </div>

        

      
    </div>
    
  );
};

export default GraphComponent;