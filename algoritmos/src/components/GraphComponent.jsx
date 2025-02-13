import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";

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
        size: 12, 
        color: "#FF1493", 
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
    const newNode = {
      id: newId,
      label: `Nodo ${newId}`,
      x: event.pointer.canvas.x,
      y: event.pointer.canvas.y,
      color: { background: "#FF69B4", border: "#FF1493" },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const createEdge = (from, to) => {
    if (from !== to && !edges.some((edge) => edge.from === from && edge.to === to)) {
      const newEdge = {
        id: getUniqueEdgeId(),
        from,
        to,
        color: { color: "#FF1493" },
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
  const handleNodeDoubleClick = (event) => {
    const nodeId = event.nodes[0];
    if (!nodeId) return;

    const newLabel = prompt("Ingrese el nuevo nombre del nodo:", `Nodo ${nodeId}`);
    if (newLabel) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === nodeId ? { ...node, label: newLabel } : node
        )
      );
    }
  };

  // Funcion para editar el peso de la arista
  const handleEdgeDoubleClick = (event) => {
    const edgeId = event.edges[0];
    const edge = edges.find((e) => e.id === edgeId);

    if (!edge) return;

    let newWeight = prompt("Ingrese el peso de la arista (solo números):", edge.label);

    // Validación que solo permite ingresar números
    if (newWeight !== null && !isNaN(newWeight)) {
      setEdges((prevEdges) =>
        prevEdges.map((e) =>
          e.id === edgeId ? { ...e, label: newWeight } : e
        )
      );
    } else {
      alert("Por favor ingrese un número válido.");
    }
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
      style={{ width: "800px", height: "600px", border: "1px solid black", outline: "none" }}
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
          <button onClick={() => reverseEdge(selectedEdge)}>Invertir dirección</button>
        )}
      </div>
    </div>
  );
};

export default GraphComponent;
