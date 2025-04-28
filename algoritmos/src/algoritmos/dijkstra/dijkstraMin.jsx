export const dijkstraMin = (nodes, edges, sourceNodeId, targetNodeId) => {
    // Filtrar nodos de texto
    const sinTextNodes = nodes.filter((node) => node.shape !== "text");
    
    console.log("Ejecutando algoritmo de Dijkstra (minimizar)...");
    console.log(`Origen: ${sourceNodeId}, Destino: ${targetNodeId}`);
    
    // Convertir IDs a strings
    const sourceId = String(sourceNodeId);
    const targetId = String(targetNodeId);
    
    // Verificar que los nodos de origen y destino existan
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
      
      // Agregar arista al grafo 
      grafo[String(edge.from)].push({ nodo: String(edge.to), peso });
    });
    
    // Inicializar distancias con infinito
    let distancias = {};
    let predecesores = {};
    let visitados = new Set();
    
    sinTextNodes.forEach(node => {
      const id = String(node.id);
      distancias[id] = id === sourceId ? 0 : Infinity;
      predecesores[id] = null;
    });
    
    console.log("Distancias iniciales:", distancias);
    
    // Cola de prioridad simple usando un array
    let colaPrioridad = [...sinTextNodes.map(node => String(node.id))];
    
    // Función para obtener el nodo no visitado con menor distancia
    const obtenerNodoMinimaDistancia = () => {
      let minDistancia = Infinity;
      let minNodo = null;
      
      colaPrioridad.forEach(nodoId => {
        if (!visitados.has(nodoId) && distancias[nodoId] < minDistancia) {
          minDistancia = distancias[nodoId];
          minNodo = nodoId;
        }
      });
      
      return minNodo;
    };
    
    // Algoritmo de Dijkstra
    while (colaPrioridad.length > visitados.size) {
      const actual = obtenerNodoMinimaDistancia();
      
      // Si no hay más nodos accesibles o llegamos al destino
      if (actual === null) break;
      
      // No terminamos al llegar al destino para garantizar el camino más corto absoluto
      visitados.add(actual);
      
      // Recorrer vecinos del nodo actual
      if (grafo[actual]) {  // Verificar que el nodo actual tenga una lista de vecinos
        grafo[actual].forEach(vecino => {
          if (!visitados.has(vecino.nodo)) {
            const distanciaPorActual = distancias[actual] + vecino.peso;
            
            if (distanciaPorActual < distancias[vecino.nodo]) {
              distancias[vecino.nodo] = distanciaPorActual;
              predecesores[vecino.nodo] = actual;
            }
          }
        });
      }
    }
    
    console.log("Distancias finales:", distancias);
    console.log("Predecesores:", predecesores);
    
    // Reconstruir el camino desde el destino al origen
    let caminoNodos = [];
    let caminoAristas = [];
    let nodoActual = targetId;
    
    // Verificar si hay camino al destino
    if (distancias[targetId] === Infinity) {
      console.error("No existe camino del origen al destino");
      return { error: "No existe camino del origen al destino" };
    }
    
    // Reconstruir el camino
    while (nodoActual !== null) {
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
    
    
    let nodosCriticos = new Set(caminoNodos);
    
    let nodosModificados = nodes.map(node => {
      if (node.shape === "text") return node; 
      
      const nodeId = String(node.id);
      const esCritico = nodosCriticos.has(nodeId);
      const esOrigen = nodeId === sourceId;
      const esDestino = nodeId === targetId;
      
      let colorFondo;
      if (esOrigen) {
        colorFondo = "rgb(255, 81, 113)"; 
      } else if (esDestino) {
        colorFondo = "rgb(252, 76, 109)"; 
      } else if (esCritico) {
        colorFondo = "rgb(237, 112, 135)"; 
      } else {
        colorFondo = "rgb(233, 196, 203)"; 
      }
      
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
              color: "rgba(237, 112, 135, 0.9)"
            }
          : {
              enabled: true,
              size: 10,
              color: "rgba(0, 0, 0, 0.3)"
            },
        label: `${node.label}\n${distancias[nodeId] === Infinity ? "∞" : distancias[nodeId]}`
      };
    });
    
    // Modificar las aristas para resaltar el camino más corto
    let aristasModificadas = edges.map(edge => {
      // Verificar si esta arista está en el camino
      const aristaEnCamino = caminoAristas.some(a => 
        a.id === edge.id
      );
      
      return {
        ...edge,
        color: aristaEnCamino ? "c25964" : "black",
        width: aristaEnCamino ? 2.5 : 0.5,
        label: edge.label
      };
    });
    
    return {
      nodes: nodosModificados,
      edges: aristasModificadas,
      camino: caminoNodos,
      distanciaTotal: distancias[targetId],
      nodosCriticos
    };
  };