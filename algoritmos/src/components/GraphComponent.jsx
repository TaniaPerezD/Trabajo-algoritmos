import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";
import Swal from "sweetalert2";

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
    physics: {
      enabled: true,
      stabilization: { iterations: 200 },
      solver: "barnesHut", 
      forceAtlas2Based: {
        gravitationalConstant: -10,
        centralGravity: 0.01,
      },
    },
    interaction: { dragNodes: true, multiselect: true },
    edges: {
      smooth: { type: "continuous" },
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      font: {
        align: "middle",
        size: 14, 
        color: "#3c3c3c", 
        face: "arial", 
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
    // Estilizar los nodos

    const color = colorRandom();
    const newNode = {
      id: newId,
      label: `Nodo ${newId}`,
      x: event.pointer.canvas.x,
      y: event.pointer.canvas.y,
      color: { background: color, border: color },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const createEdge = (from, to) => {
    if (from !== to && !edges.some((edge) => edge.from === from && edge.to === to)) {
      const newEdge = {
        id: getUniqueEdgeId(),
        from,
        to,
        color: { color: "#3c3c3c" },
        label: "", 
      };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }
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
    if (event.key === "Delete") {
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
      style={{ width: "1200px", height: "450px", border: "15px solid rgb(226,188,157)", outline: "none", backgroundColor: "#f5f5f5", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}
      tabIndex="0" 
    >
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
              handleEdgeClick(event);
            }
          },
        }}
      />
     <div>
        {selectedEdge && (
          <button 
            onClick={() => reverseEdge(selectedEdge)}
            title="Invertir dirección de la arista" 
            style={{
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
      </div>

      <div
        style={{
          position: "absolute",
          top: "300px", 
          right: "15px", 
          backgroundImage: "url('https://i.postimg.cc/J7FzfQFq/vecteezy-pencils-and-pens-1204726.png')", // Ruta de tu imagen
          backgroundSize: "cover",
          width: "100px", 
          height: "150px", 
          border: "none",
          cursor: "pointer",
          
        }}
        onClick={explicarFuncionamiento}
        title="¿Cómo funciona?"
      />
    </div>

  );
};

export default GraphComponent;
