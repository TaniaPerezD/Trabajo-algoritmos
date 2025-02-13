import React, { useState, useRef, useEffect } from "react";
import Graph from "react-graph-vis";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor } from '@syncfusion/ej2-react-heatmap';

const GraphComponent = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const nextNodeId = useRef(1);
  const nextEdgeId = useRef(1);
  const graphRef = useRef(null);
  const [setIsModalOpen] = useState(false);
  const heatmapData = nodes.map((rowNode) => 
    nodes.map((colNode) => {
      // Buscar si hay una arista entre rowNode y colNode
      const edge = edges.find((e) => e.from === rowNode.id && e.to === colNode.id);
      return edge ? edge.weight : 0;  // Usar el peso si existe, 0 si no
    })
  );
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
              labels: nodes.map(node => `Node ${node.id}`)
            }}
            yAxis={{
              labels: nodes.map(node => `Node ${node.id}`)
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
      color: { background: "#FF1493", border: "#FF1493" },
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
      <button onClick={() => setIsModalOpen(true)}>Abrir Modal</button>
      <button onClick={showSwal}>Mostrat matriz de adyacencia</button>
      <div>
      {selectedEdge && (
        <>
          <button onClick={() => reverseEdge(selectedEdge)}>Invertir dirección</button>
          
          {/* Nuevo botón para abrir el modal */}
          
        </>
      )}
        

        <p>Click on another node to create an edge</p>
      </div>
    </div>
  );
};

export default GraphComponent;
