export const dijkstraMax = (nodes, edges, sourceNodeId, targetNodeId) => {
  // Filtrar nodos de texto
  const sinTextNodes = nodes.filter((node) => node.shape !== "text");
  
  console.log("Ejecutando algoritmo de Dijkstra (maximizar)...");
  console.log(`Origen: ${sourceNodeId}, Destino: ${targetNodeId}`);

  const sourceId = String(sourceNodeId);
  const targetId = String(targetNodeId);
  
  if (!sinTextNodes.some(node => String(node.id) === sourceId) || 
      !sinTextNodes.some(node => String(node.id) === targetId)) {
    console.error("Nodo origen o destino no encontrado");
    return null;
  }
  
  // Crear mapa de adyacencia
  let grafo = {};
  sinTextNodes.forEach(node => {
    grafo[String(node.id)] = [];
  });
  
  // Llenar el grafo con las aristas
  edges.forEach(edge => {
    // Convertir el label a número para usarlo como peso
    const peso = Number(edge.label);
    if (isNaN(peso)) {
      console.error(`Arista ${edge.from}->${edge.to} tiene un peso no numérico: ${edge.label}`);
      return;
    }
    
    // Añadir la arista al grafo
    grafo[String(edge.from)].push({ nodo: String(edge.to), peso });
  });
  
  // Inicializar ganancias y predecesores
  let ganancias = {};
  let predecesores = {};
  let procesados = new Set();
  
  sinTextNodes.forEach(node => {
    const id = String(node.id);
    ganancias[id] = id === sourceId ? 0 : -Infinity;
    predecesores[id] = null;
  });
  
  console.log("Ganancias iniciales:", ganancias);
  
  // Implementación correcta con cola de prioridad para maximización
  // Usamos un bucle que selecciona el nodo con mayor ganancia actual
  while (procesados.size < sinTextNodes.length) {
    // Encontrar el nodo no procesado con mayor ganancia
    let nodoActual = null;
    let maxGanancia = -Infinity;
    
    Object.keys(ganancias).forEach(nodo => {
      if (!procesados.has(nodo) && ganancias[nodo] > maxGanancia) {
        maxGanancia = ganancias[nodo];
        nodoActual = nodo;
      }
    });
    
    // Si no se puede avanzar más, terminar
    if (nodoActual === null || maxGanancia === -Infinity) {
      break;
    }
    
    // Marcar como procesado
    procesados.add(nodoActual);
    
    // Actualizar las ganancias de los nodos adyacentes
    if (grafo[nodoActual]) {
      grafo[nodoActual].forEach(vecino => {
        const nuevaGanancia = ganancias[nodoActual] + vecino.peso;
        
        if (nuevaGanancia > ganancias[vecino.nodo]) {
          ganancias[vecino.nodo] = nuevaGanancia;
          predecesores[vecino.nodo] = nodoActual;
        }
      });
    }
  }
  
  console.log("Ganancias finales:", ganancias);
  console.log("Predecesores:", predecesores);
  
  // Verificar si hay camino al destino
  if (ganancias[targetId] === -Infinity) {
    console.error("No existe camino del origen al destino");
    return { error: "No existe camino del origen al destino" };
  }
  
  // Reconstruir el camino desde el destino al origen
  let caminoNodos = [];
  let caminoAristas = [];
  let nodoActual = targetId;
  
  // Detectar posibles ciclos en la reconstrucción del camino
  let visitadosEnCamino = new Set();
  
  // Reconstruir el camino
  while (nodoActual !== null) {
    // Detectar ciclos
    if (visitadosEnCamino.has(nodoActual)) {
      console.error("Se detectó un ciclo al reconstruir el camino");
      return { error: "Se detectó un ciclo al reconstruir el camino" };
    }
    
    visitadosEnCamino.add(nodoActual);
    caminoNodos.unshift(nodoActual);
    
    if (predecesores[nodoActual] !== null) {
      // Encontrar la arista entre el predecesor y el nodo actual
      const aristaEnCamino = edges.find(edge => 
        String(edge.from) === predecesores[nodoActual] && String(edge.to) === nodoActual
      );
      
      if (aristaEnCamino) {
        caminoAristas.unshift(aristaEnCamino);
      } else {
        console.warn(`No se encontró arista de ${predecesores[nodoActual]} a ${nodoActual}`);
      }
    }
    
    nodoActual = predecesores[nodoActual];
  }
  
  console.log("Camino de máxima ganancia encontrado:", caminoNodos);
  console.log("Ganancia total:", ganancias[targetId]);
  
  // Crear conjunto de nodos críticos (los del camino)
  let nodosCriticos = new Set(caminoNodos);
  
  // Modificar los nodos para resaltar los del camino máximo
  let nodosModificados = nodes.map(node => {
    if (node.shape === "text") return node; // No modificar nodos de tipo "text"
    
    const nodeId = String(node.id);
    const esCritico = nodosCriticos.has(nodeId);
    const esOrigen = nodeId === sourceId;
    const esDestino = nodeId === targetId;
    
    let colorFondo;
    if (esOrigen) {
      colorFondo = "rgb(180, 81, 255)"; 
    } else if (esDestino) {
      colorFondo = "rgb(223, 76, 252)"; 
    } else if (esCritico) {
      colorFondo = "rgb(204, 112, 237)"; 
    } else {
      colorFondo = "rgb(224, 196, 233)"; 
    }
    
    // Para los nodos no alcanzables, mostrar -∞
    const valorGanancia = ganancias[nodeId] === -Infinity ? "-∞" : ganancias[nodeId];
    
    return {
      ...node,
      color: {
        background: colorFondo,
        border: colorFondo
      },
      shadow: esCritico 
        ? {
            enabled: true,
            size: 70,
            color: "rgba(214, 112, 237, 0.9)"
          }
        : {
            enabled: true,
            size: 10,
            color: "rgba(0, 0, 0, 0.3)"
          },
      label: `${node.label}\n${valorGanancia}`
    };
  });
  
  // Modificar las aristas para resaltar el camino máximo
  let aristasModificadas = edges.map(edge => {
    // Verificar si esta arista está en el camino
    const aristaEnCamino = caminoAristas.some(a => 
      a.id === edge.id
    );
    
    return {
      ...edge,
      color: aristaEnCamino ? "rgba(193, 112, 237, 0.9)" : "black", // Color púrpura para aristas del camino
      width: aristaEnCamino ? 2.5 : 0.5,
      label: edge.label
    };
  });
  
  return {
    nodes: nodosModificados,
    edges: aristasModificadas,
    camino: caminoNodos,
    valorTotal: ganancias[targetId],
    nodosCriticos
  };
};