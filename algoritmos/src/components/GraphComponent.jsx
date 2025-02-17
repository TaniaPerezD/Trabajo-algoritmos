import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor } from '@syncfusion/ej2-react-heatmap';
import Toolbar from "./Toolbar";
import ShapeModal from "./ShapeModal";
import ColorModal from "./ColorModal"; 
import borrador from "../assets/img/icons/borrador.png";

function colorRandom() {
  const r = Math.floor(Math.random() * 106) + 150;
  const g = Math.floor(Math.random() * 106) + 150;
  const b = Math.floor(Math.random() * 106) + 150;
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  return hex;
}
  
const GraphComponent = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isShapeModalOpen, setIsShapeModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const nextNodeId = useRef(1);
  const nextEdgeId = useRef(1);
  // Usaremos graphNetwork para guardar la instancia de la red
  const graphNetwork = useRef(null);
  const graphRef = useRef(null);
  const openColorModal = () => {
  const selectedNodeColor = nodes.find((n) => n.id === selectedNode)?.color?.background;
  
    console.log("Color enviado al modal:", selectedNodeColor);
  
    setIsColorModalOpen(true);
  };
  
  const closeColorModal = () => {
    setIsColorModalOpen(false);
  };
  const openShapeModal = () => {
    setIsShapeModalOpen(true);
  };
  
  const closeShapeModal = () => {
    setIsShapeModalOpen(false);
  };
  const [setIsModalOpen] = useState(false);
  const matrixSize = nodes.length;
const rowSums = Array(matrixSize).fill(0);
const colSums = Array(matrixSize).fill(0); 
const heatmapData = nodes.map((rowNode) =>
  nodes.map((colNode) => {
    // Buscar si hay una arista entre rowNode y colNode
    const edge = edges.find((e) => e.from === rowNode.id && e.to === colNode.id);
    return edge ? Number(edge.label) : null; // Usar null si no hay peso
  })
);
  heatmapData.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      rowSums[rowIndex] += value; // Sumar fila
      colSums[colIndex] += value; // Sumar columna
    });
  });

  const xLabels = nodes.map((node, index) => `Node ${node.id} (${colSums[index]})`);
  const yLabels = nodes.map((node, index) => `Node ${node.id} (${rowSums[index]})`);
  const showSwal = () => {
    const MySwal = withReactContent(Swal);
    
    MySwal.fire({
      html: (
        <div> <h2><i>Conneciones</i></h2>

          <HeatMapComponent
            titleSettings={{
              text: 'Matriz de adyacencia',
              textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
              }
            }}
            xAxis={{
              labels: yLabels,
              opposedPosition: true,
              showSummary: true
            }}
            yAxis={{
              labels: xLabels,
              showSummary: true
            }}
            cellSettings={{
              border: {
                width: 1,
                radius: 4,
                color: 'white'
              },background: (value) => {
                if (value < 5) return 'rgb(250, 193, 193)'; // Rojo claro si el valor es menor a 10
                if (value < 10) return 'rgb(237, 112, 135)'; // Azul claro si el valor está entre 10 y 50
                return 'rgb(249, 78, 109)'; // Verde claro si el valor es mayor a 50
              }

            }}
            dataSource={heatmapData}
          >
            <Inject services={[Tooltip]} />
          </HeatMapComponent>
        </div>
      ),
      showCloseButton: true,
      showConfirmButton: false
    });
  }
  const options = {
    layout: { hierarchical: false },
    physics: false,
    interaction: { dragNodes: true, multiselect: true },
    nodes: {
      shape: "circle",
      size: 15,
    },
    edges: {
      smooth: { type: "curvedCW", roundness: 0.2 },
      arrows: { to: { enabled: true, scaleFactor: 1 } },
      font: {
        align: "middle",
        size: 14,
        color: "#3c3c3c",
        face: "arial"
      },
      selfReference: { size: 15, angle: Math.PI }
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

  // Al hacer doble clic en la pizarra (fuera de nodos), se crea un nodo con nombre predeterminado
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
      selfReferenceSize: 30
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
  const handleChangeShape = (nodeId, newShape) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, shape: newShape } : node
      )
    );
  };
  const handleChangeColor = (nodeId, newColor) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              color: {
                background: newColor, 
                border: newColor,
              },
            }
          : node
      )
    );
    setIsColorModalOpen(false);
  };

  const allowDrop = (event) => event.preventDefault();

  const createEdge = (from, to) => {
    if (from === to) {
      const newEdge = {
        id: getUniqueEdgeId(),
        from,
        to,
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
      label: ""
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

  // Función para editar el nombre del nodo al hacer clic derecho
  const handleNodeRightClick = async (params) => {
    // params contiene "nodes" y "event" (el nativo)
    params.event.preventDefault();
    const nodeId = params.nodes[0];
    if (!nodeId) return;
    const node = nodes.find((n) => n.id === nodeId);
    const currentLabel = node ? node.label : `Nodo ${nodeId}`;
    const { value: newLabel } = await Swal.fire({
      title: "Ingrese el nuevo nombre del nodo",
      input: "text",
      inputValue: currentLabel,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#95bb59",
      customClass: { popup: "swal-popup" },
      inputValidator: (value) => {
        if (!value) return "El nombre del nodo no puede estar vacío.";
      }
    });
    if (newLabel !== undefined) {
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === nodeId ? { ...n, label: newLabel } : n
        )
      );
    }
  };

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
        if (!value || isNaN(value)) {
          return "Por favor ingrese un número válido.";
        } else if (Number(value) <= 0) {
          return "El peso debe ser mayor que 0.";
        }
      },
    });
  
    if (newWeight !== undefined && newWeight !== edge.label) {
      console.log("Clicked Edge ID:",newWeight); // Depuración
      setEdges((prevEdges) =>
        prevEdges.map((e) =>
          e.id === edgeId ? { ...e, label: newWeight } : e
        )
      );
      console.log("Edges actualizado:", edges);
    }
  };

  const handleClearBoard = () => {
    setNodes([]);
    setEdges([]);
  };

  const explicarFuncionamiento = () => {
    Swal.fire({
      title: "¿Cómo funciona?",
      html: `
        <p>1. Haz doble click en la pizarra para agregar un nodo (con nombre predeterminado).</p>
        <p>2. Arrastra un nodo para moverlo.</p>
        <p>3. Selecciona un nodo y únelo con otro para crear una arista.</p>
        <p>4. Haz clic derecho sobre un nodo para editar su nombre.</p>
        <p>5. Haz clic en un nodo o arista para seleccionarlo.</p>
        <p>6. Presiona "Delete" o "Backspace" para borrar nodos o aristas.</p>
      `,
      icon: "question",
      confirmButtonText: "¡Entendido!",
      confirmButtonColor: "#8dbd4c",
      customClass: { popup: "swal-popup" }
    });
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
    // Agregamos listener para clic derecho (oncontext)
    network.on("oncontext", (params) => {
      if (params.nodes.length > 0) {
        handleNodeRightClick(params);
      }
    });
  };

  return (
    <div
    ref={graphRef}
      style={{
        width: "1200px",
        height: "450px",
        border: "15px solid rgb(226,188,157)",
        outline: "none",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        display: "flex",
        position: "relative"
      }}
      onDrop={handleDrop}
      onDragOver={allowDrop}
      tabIndex="0"
    >
      <div>
        <Toolbar />
      </div>
      <Graph
        key={firstRender.current ? JSON.stringify(nodes) : "graph-key"}
        graph={{ nodes, edges }}
        options={options}
        getNetwork={getNetwork}
        events={{
          contextmenu: (event) => {
            if (event.nodes.length > 0) {
              handleNodeRightClick(event);
            }
          },
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
            <ShapeModal
  isOpen={isShapeModalOpen}
  nodeId={selectedNode}
  currentShape={nodes.find((n) => n.id === selectedNode)?.shape}
  onClose={closeShapeModal}
  onChangeShape={handleChangeShape}
/>
<ColorModal
  isOpen={isColorModalOpen}
  nodeId={selectedNode}
  currentColor={nodes.find((n) => n.id === selectedNode)?.color?.background}
  onClose={closeColorModal}
  onChangeColor={handleChangeColor}
/>
{selectedNode !== null && (
  <div style={{ position: "absolute", bottom: "5px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "10px" }}>
    
    <button
      onClick={openShapeModal}
      title="Cambiar Forma"
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
      Cambiar Forma
    </button>

    <button
      onClick={openColorModal}
      title="Cambiar Color"
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
      Cambiar Color
    </button>
  </div>
)}

      {/* Botón de invertir dirección de la arista */}
      {selectedEdge !== null && (
        <button 
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
      <button
        onClick={handleClearBoard}
        style={{
          position: "absolute",
          top: "425px",
          left: "140px",
          transform: "translateY(-50%)",
          backgroundImage: `url(${borrador})`,
          backgroundColor: "transparent",
          backgroundSize: "cover",
          width: "110px",
          height: "110px",
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

      {/* Bton tabla uwu */}
      <button
        onClick={() => showSwal()}
        style={{
          position: "absolute",
          top: "300px",
          left: "140px",
          transform: "translateY(-50%)",
          backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/7604/7604036.png)`,
          backgroundColor: "transparent",
          backgroundSize: "cover",
          width: "95px",
          height: "95px",
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
      <div
        style={{
          position: "absolute",
          top: "300px",
          right: "15px",
          backgroundImage:
            "url('https://i.postimg.cc/J7FzfQFq/vecteezy-pencils-and-pens-1204726.png')",
          backgroundSize: "cover",
          width: "100px",
          height: "150px",
          border: "none",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out"
        }}
        onClick={explicarFuncionamiento}
        title="¿Cómo funciona?"
      />
    </div>
  );
};

export default GraphComponent;
