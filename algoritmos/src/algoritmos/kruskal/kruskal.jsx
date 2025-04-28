// Función para implementar el algoritmo Kruskal
export const kruskal = (nodes, edges) => {
    // Variable global para tener los nodos sin contar las notitas
    const sinTextNodes = nodes.filter((node) => node.shape !== "text");
    
    console.log("Ejecutando algoritmo de Kruskal...");
    
    // Ordenar las aristas por peso (valor del label) en orden ascendente
    let aristasSortedByWeight = JSON.parse(JSON.stringify(edges)).sort((a, b) => 
      Number(a.label) - Number(b.label)
    );
    
    // Conjunto para rastrear a qué componente pertenece cada nodo
    let componenteDeNodo = {};
    sinTextNodes.forEach(node => {
      componenteDeNodo[node.id] = node.id; // Inicialmente, cada nodo es su propio componente
    });
    
    // Función para encontrar el componente raíz de un nodo
    const encontrarComponente = (nodoId) => {
      if (componenteDeNodo[nodoId] !== nodoId) {
        componenteDeNodo[nodoId] = encontrarComponente(componenteDeNodo[nodoId]);
      }
      return componenteDeNodo[nodoId];
    };
    
    // Función para unir dos componentes
    const unirComponentes = (nodoId1, nodoId2) => {
      let raiz1 = encontrarComponente(nodoId1);
      let raiz2 = encontrarComponente(nodoId2);
      
      if (raiz1 !== raiz2) {
        componenteDeNodo[raiz2] = raiz1;
        return true; // Se realizó la unión
      }
      return false; // Ya estaban en el mismo componente
    };
    
    // Aristas seleccionadas para el árbol de expansión mínima (MST)
    let aristasSeleccionadas = [];
    let pesoTotal = 0;
    
    // Aplicar Kruskal
    for (let i = 0; i < aristasSortedByWeight.length; i++) {
      let arista = aristasSortedByWeight[i];
      
      // Si agregar esta arista no forma un ciclo, la añadimos al MST
      if (unirComponentes(arista.from, arista.to)) {
        aristasSeleccionadas.push(arista);
        pesoTotal += Number(arista.label);
      }
    }
    
    console.log("Árbol de expansión mínima encontrado, peso total:", pesoTotal);
    
    // Conjunto para rastrear nodos que están en el MST
    let nodosCriticos = new Set();
    
    // Marcar todas las aristas y actualizar conjuntos de nodos críticos
    let aristasModificadas = edges.map(edge => {
      // Verificar si esta arista está en el MST
      let isInMST = aristasSeleccionadas.some(e => 
        e.from === edge.from && e.to === edge.to || 
        e.from === edge.to && e.to === edge.from
      );
      
      if (isInMST) {
        nodosCriticos.add(edge.from);
        nodosCriticos.add(edge.to);
      }
      
      return {
        ...edge,
        color: isInMST ? "c25964" : "black", // Rojo para aristas del MST
        width: isInMST ? 2.5 : 0.5,
        label: edge.label
      };
    });
    
    // Modificar los nodos para resaltar los que son parte del MST
    let nodosModificados = nodes.map(node => {
      if (node.shape === "text") return node; // No modificar nodos de tipo "text"
      
      return {
        ...node,
        color: nodosCriticos.has(node.id) 
          ? { 
              background: "rgb(188, 134, 250)", 
              border: "rgb(188, 134, 250)"
            }  
          : { 
              background: "rgb(225, 196, 233)", 
              border: "rgb(225, 196, 233)"
            },
        shadow: nodosCriticos.has(node.id) 
          ? {
              enabled: true,
              size: 70, // Tamaño de la sombra para más brillo
              color: "rgba(197, 112, 237, 0.9)" // Color fuerte y brillante
            }
          : {
              enabled: true,
              size: 10, // Sombra pequeña para todos los nodos
              color: "rgba(0, 0, 0, 0.3)"
            },
        label: node.label // Mantener la etiqueta original
      };
    });
    
    return {
      nodes: nodosModificados,
      edges: aristasModificadas,
      mstEdges: aristasSeleccionadas,
      pesoTotal,
      nodosCriticos
    };
  };