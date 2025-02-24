import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import CanvasStyleModal from "./CanvasStyleModal";
import withReactContent from 'sweetalert2-react-content'
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor} from '@syncfusion/ej2-react-heatmap';
import { registerLicense } from '@syncfusion/ej2-base';

import Toolbar from "./Toolbar";
import jsPDF from "jspdf";
import ShapeAndColorModal from "./ShapeAndColorModal"; 
import borrador from "../assets/img/icons/borrador.png";

import TutorialComponente from "./TutorialComponente";
import Modal from './ModalInicio'; 

import { johnson } from "../algoritmos/jonhson/jonhsonCalculo";


registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF1cWGhKYVJ/WmFZfVtgdVdMY1lbR39PMyBoS35Rc0VhWHhecHdQQ2daWUdw');

//funcion para el color random inicial del nodo
function colorRandom() {
  const r = Math.floor(Math.random() * 106) + 150;
  const g = Math.floor(Math.random() * 106) + 150;
  const b = Math.floor(Math.random() * 106) + 150;
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  return hex;
}

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}


const GraphComponent = () => {
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

  const runJohnson = () => {
    console.log("Nodos antes de ejecutar Johnson:", nodes);
    console.log("Aristas antes de ejecutar Johnson:", edges);
  
    let result = johnson(nodes, edges);
    if (!result) {
      console.log("El grafo tiene ciclos negativos.");
      return;
    }
  
    let { nodes: updatedNodes, edges: updatedEdges } = result;
  
    // Actualizar el estado con los nuevos nodos y aristas
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  
    console.log("Nodos después de Johnson:", updatedNodes);
    console.log("Aristas después de Johnson:", updatedEdges);
  };
  

 
  


  const openModal = () => {
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
};
  const matrixSize = nodes.length;
const rowSums = Array(matrixSize).fill(0);
const colSums = Array(matrixSize).fill(0); 

const heatmapData = nodes.map((colNode) =>
  nodes.map((rowNode) => {
    // Buscar si hay una arista entre rowNode y colNode
    const edge = edges.find((e) => e.from === rowNode.id && e.to === colNode.id);
    return edge ? (edge.label === "" || Number(edge.label) === -1 ? 1 : Number(edge.label)) : 0;
  })
  .reverse()
);
  heatmapData.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      rowSums[rowIndex] += value; // Sumar fila
      colSums[colIndex] += value; // Sumar columna
    });
  });
  colSums.reverse();

  const yLabels = nodes.map((node, index) => `${node.label} Suma: (${colSums[index]})`);
  const xLabels = nodes.map((node, index) => `${node.label} Suma: (${rowSums[index]})`);
  yLabels.reverse();
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
              xAxis={{
                labels: xLabels,
                opposedPosition: true,
                textStyle: {
                  size: '15px',
                  fontWeight: '500',
                  fontFamily: 'Segoe UI',
                },
              }}
              yAxis={{
                labels: yLabels,
                textStyle: {
                  size: '15px',
                  fontWeight: '500',
                  fontFamily: 'Segoe UI',
                },
              }}
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
                  { value: 1, color: 'rgb(250, 193, 193)' },
                  { value: 5, color: 'rgb(237, 112, 135)' },
                  { value: 10, color: 'rgb(249, 78, 109)' },
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
    const file = event.target.files[0]; 
  
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
            customClass:{
              popup: 'swal-popup',
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
          customClass:{
            popup: 'swal-popup',
          },
        });
      }
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

  const getUniqueEdgeId = () => nextEdgeId.current++;

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
      title: htmlToElement(`
        <div>
          <h3><span class="tooltip-title">tiene que funcionar</span></h3>
          <p>prueba</p>
        </div>
      `),
      
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
            node.id === nodeId ? { ...node, label: newLabel, shape: newShape, color: { background: newColor } } : node
        )
    );
};

  const allowDrop = (event) => event.preventDefault();

  const createEdge = async (from, to) => {
    const newWeight = await handleEdgeWeight();
    if (from === to) {
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
    console.log("📋 Aplicando estilo:", canvasStyle);

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
                backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
                backgroundSize: "20px 20px"
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

  return (
    

    <div
    id="pizarra"        
    ref={graphRef}
            style={{    
                width: "1500px",
                height: "550px",
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
          <TutorialComponente />

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
                  Editar nodo
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
            top: "445px",
            left: "48px",
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
              top: "520px",
              left: "48px",
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
          {/* Botón de ayuda */}
        
          <button
            onClick={explicarFuncionamiento}
            style={{
              position: "absolute",
              top: "465px",
              right: "15px",
              transform: "translateY(-50%)",
              backgroundImage: `url(https://i.postimg.cc/J7FzfQFq/vecteezy-pencils-and-pens-1204726.png)`,
              backgroundColor: "transparent",
              backgroundSize: "cover",
              width: "100px",
              height: "150px",
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
                  backgroundColor: "#A8EDCB",
                  color: "black",
                  padding: "5px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  whiteSpace: "nowrap"
                }}
              >
                ¿Cómo funciona?
              </span>
            )}
          </button>

      {/* Modal para el tutorial */}
      <Modal 
        isOpen={isTutorialOpen} 
        onClose={() => setIsTutorialOpen(false)} 
        onStartTutorial={() => {
          setIsTutorialOpen(false);
          // Aquí podrías agregar la lógica para iniciar el tutorial con Drive.js
        }} 
      />
          

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

          {/* Botón para exportar JSON
          <button onClick={runJohnson}>Ejecutar Johnson</button> */}

          


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