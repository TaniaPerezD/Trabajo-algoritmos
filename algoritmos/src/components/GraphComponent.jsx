import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";
import Swal from "sweetalert2";
import Toolbar from "./Toolbar";
import borrador from "../assets/img/icons/borrador.png";
import { Tooltip } from "react-tooltip";


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
  const nextNodeId = useRef(1);
  const nextEdgeId = useRef(1);
  const graphRef = useRef(null);

  const options = {
    layout: { hierarchical: false },
    physics: false,
    interaction: { dragNodes: true, multiselect: true },
    nodes: {
      shape: 'dot', 
      size: 15,    
    },
    edges: {
      smooth: { type: "curvedCW", roundness: 0.2 },
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      font: {
        align: "middle",
        size: 14,
        color: "#3c3c3c",
        face: "arial",
      },
      selfReference: {
        size: 15,        
        angle: Math.PI,  
      },
    },
  };
  

  // Función para generar un ID para los nodos
  const getUniqueNodeId = () => {
    let newId = nextNodeId.current++;
    while (nodes.some((node) => node.id === newId)) {
      newId = nextNodeId.current++;
    }
    return newId;
  };

  // Función para generar un ID único para las aristas
  const getUniqueEdgeId = () => {
    return nextEdgeId.current++;
  };

  const handleDoubleClick = (event) => {
    if (event.nodes.length > 0) return;
  
    const newId = getUniqueNodeId();
    const color = colorRandom();
  
    // Obtener las posiciones actuales de los nodos
    const updatedNodes = nodes.map(node => ({ ...node }));
  
    // Agregar el nuevo nodo sin alterar las posiciones de los demás
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
    
    const type = event.dataTransfer.getData("type");
    if (!type) return;
  
    const newId = getUniqueNodeId();
    const rect = graphRef.current.getBoundingClientRect();
    const color = colorRandom();
  
    // Mantener posiciones actuales de los nodos
    const updatedNodes = nodes.map(node => ({ ...node }));
  
    // Agregar el nuevo nodo sin alterar los otros
    const newNode = {
      id: newId,
      label: `Nodo ${newId}`,
      x: event.clientX - rect.left - 10,
      y: event.clientY - rect.top - 10,
      shape: "circle",
      color: { background: color, border: color },
    };
  
    setNodes([...updatedNodes, newNode]);
  };
  const handleDragEnd = (event) => {
    const { nodes: movedNodes } = event;
    if (!movedNodes.length) return;
  
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        movedNodes.includes(node.id)
          ? { ...node, x: event.pointer.canvas.x, y: event.pointer.canvas.y }
          : node
      )
    );
  };
  const allowDrop = (event) => event.preventDefault();

  const createEdge = (from, to) => {
    // Verificar si es un bucle
    if (from === to) {
      console.log('Creando bucle para el nodo:', from);
      //Para la arista de bucle
      const newEdge = {
        id: getUniqueEdgeId(),
        from,
        to,
        color: { color: "#3c3c3c" },
        smooth: {
          type: "curvedCW",  
          roundness: 0.5,    
        },
        arrows: {
          to: { enabled: true, scaleFactor: 1 }, 
        },
        selfReference: {
          size: 30,        
          angle: Math.PI,  
        },
      };
      //console.log('Bucle creado:', newEdge);
  
      setEdges((prevEdges) => [...prevEdges, newEdge]);
      return;
    }
  
    if (edges.some((edge) => edge.from === from && edge.to === to)) return; 
  
    const newEdge = {
      id: getUniqueEdgeId(),
      from,
      to,
      color: { color: "#3c3c3c" },
      label: "",
    };
  
    // Actualizar los edges con la nueva arista
    setEdges((prevEdges) => {
      const updatedEdges = [...prevEdges, newEdge];
      console.log('Updated edges:', updatedEdges); 
      return updatedEdges;
    });
  };
  
  
  
  

  const reverseEdge = (edgeId) => {
    setEdges((prevEdges) => {
      const newEdges = prevEdges.map((edge) =>
        edge.id === edgeId
          ? { ...edge, from: edge.to, to: edge.from }
          : edge
      );
      return newEdges;
    });
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

  // Funcion para editar el nombre del nodo
  const handleNodeDoubleClick = async (event) => {
    const nodeId = event.nodes[0];
    if (!nodeId) return;
  
    // Buscar el nodo actual para obtener su nombre
    const node = nodes.find((n) => n.id === nodeId);
    const currentLabel = node ? node.label : `Nodo ${nodeId}`;
  
    const { value: newLabel } = await Swal.fire({
      title: "Ingrese el nuevo nombre del nodo",
      input: "text",
      inputValue: currentLabel, // Usar el nombre actual del nodo
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#95bb59",
      customClass:{
        popup: 'swal-popup',
      },
      inputValidator: (value) => {
        if (!value) {
          return "El nombre del nodo no puede estar vacío.";
        }
      },
    });
  
    if (newLabel !== undefined) {
      setNodes((prevNodes) =>
        prevNodes.map((node) => (node.id === nodeId ? { ...node, label: newLabel } : node))
      );
    }
  };

  // Funcion para editar el peso de la arista
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
      confirmButtonColor: "#95bb59",
      customClass:{
        popup: 'swal-popup',
      },
      inputValidator: (value) => {
        if (!value || isNaN(value)) {
          return "Por favor ingrese un número válido.";
        }
      },
    });
  
    if (newWeight !== undefined) {
      setEdges((prevEdges) =>
        prevEdges.map((e) => (e.id === edgeId ? { ...e, label: newWeight } : e))
      );
    }
  };

  //Funcion para borrar la pizarra
  const handleClearBoard = () => {
    setNodes([]);
    setEdges([]);
  };


  const explicarFuncionamiento = () => {
    Swal.fire({
      title: "¿Cómo funciona?",
      html: `
        <p> 1. Haz doble click en la pizarra para agregar un nodo.</p>
        <p> 2. Arrastra un nodo para moverlo.</p>
        <p> 3. Selecciona un nodo y únelo con otro para agregar una arista.</p>
        <p> 4. Clickea un nodo o una arista para modificarlos.</p>
        <p> 5. Selecciona un nodo o una arista y eliminalos con la tecla del.</p>
      `,
      icon: "question",
      confirmButtonText: "¡Entendido!",
      confirmButtonColor: "#95bb59",
      customClass:{
        popup: 'swal-popup',
      },
    });
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const graphElement = graphRef.current;

    const handleKeyDown = (event) => {
      handleDelete(event);
    };

    if (graphElement) {
      graphElement.focus();
      graphElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (graphElement) {
        graphElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [selectedNode, selectedEdge]);
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
        position: "relative",
      }}
      onDrop={handleDrop}
      onDragOver={allowDrop}
      tabIndex="0"
    >
      <div>
        <Toolbar />
      </div>
      <Graph
        key={JSON.stringify(nodes)}
        graph={{ nodes, edges }}
        options={options}
        events={{
          doubleClick: (event) => {
            if (event.nodes.length > 0) {
              handleNodeDoubleClick(event);
            } else if (event.edges.length > 0) {
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
          dragEnd: handleDragEnd,
        }}
      />
      
      {/* Botón de invertir dirección de la arista */}
      {selectedEdge !== null && (
        <button 
          onClick={() => reverseEdge(selectedEdge)}
          title="Invertir dirección de la arista" 
          style={{
            position: "absolute",
            bottom: "10px", // Lo posiciona en la parte inferior del contenedor
            left: "50%", // Lo centra horizontalmente
            transform: "translateX(-50%)", // Ajuste para centrarlo bien
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
        transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out",
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
              whiteSpace: "nowrap",
            }}
          >
            Borrador de pizarra
          </span>
        )}
      </button>

        
      {/* Botón de ayuda */}
      <div
        style={{
          position: "absolute",
          top: "300px", 
          right: "15px", 
          backgroundImage: "url('https://i.postimg.cc/J7FzfQFq/vecteezy-pencils-and-pens-1204726.png')",
          backgroundSize: "cover",
          width: "100px", 
          height: "150px", 
          border: "none",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out",
        }}
        
        onClick={explicarFuncionamiento}
        title="¿Cómo funciona?"
      />
    </div>

    
  );

};

export default GraphComponent;
