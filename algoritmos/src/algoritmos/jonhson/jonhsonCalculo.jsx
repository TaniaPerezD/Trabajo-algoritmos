// Función para calcular índices A
const calcularIndiceA = (nodes, edges) => {

 //nodos sin notitas
  const sinTextNodes = nodes.filter((node) => node.shape !== "text");
  let a = {};

  // Inicializar A con 0
  sinTextNodes.forEach(node => (a[node.id] = 0));

  console.log("Calculando índice A...");

  // Hacer una copia de edges para evitar modificar la original
  let edgesCopy = JSON.parse(JSON.stringify(edges));

  edgesCopy.forEach(() => {
    edgesCopy.forEach(edge => {
      let nuevoValor = a[edge.from] + Number(edge.label);
      if (nuevoValor > a[edge.to]) {
        a[edge.to] = nuevoValor;
      }
    });
  });

  console.log("Índices A calculados:", a);
  return a;
};

// Función para calcular índices B
const calcularIndiceB = (nodes, edges, maxA) => {
  /// variable global para tener los nodos sin contar las notitas
  const sinTextNodes = nodes.filter((node) => node.shape !== "text");
  let b = {};

  // Inicializar B con el valor máximo de A
  sinTextNodes.forEach(node => (b[node.id] = maxA));

  console.log("Calculando índice B...");

  // Hacer una copia de edges para evitar modificar la original
  let edgesCopy = JSON.parse(JSON.stringify(edges));

  edgesCopy.forEach(() => {
    edgesCopy.forEach(edge => {
      let nuevoValor = b[edge.to] - Number(edge.label);
      if (nuevoValor < b[edge.from]) {
        b[edge.from] = nuevoValor;
      }
    });
  });

  console.log("Índices B calculados:", b);
  return b;
};

export const johnson = (nodes, edges) => {
  let a = calcularIndiceA(nodes, edges);
  let maxA = Math.max(...Object.values(a)); 
  let b = calcularIndiceB(nodes, edges, maxA);

  // Calcular holgura para cada arista
  let aristasHolgura = edges.map(edge => {
    let slack = b[edge.to] - a[edge.from] - Number(edge.label);
    let isCritical = slack === 0;
    let color = isCritical ? "c25964" : "black"; // Rojo para la ruta crítica
    let width = isCritical ? 2.5 : 0.5;

    return { 
      ...edge, 
      slack, 
      color, 
      width, 
      label: `${edge.label}\n\n h=${slack}` 
    };
  });

  // Identificar los nodos que están en la ruta crítica
  let nodosCriticos = new Set();
  aristasHolgura.forEach(edge => {
    if (edge.slack === 0) {
      nodosCriticos.add(edge.from);
      nodosCriticos.add(edge.to);
    }
  });

  // Modificar los nodos para agregar una sombra más brillante y una pequeña sombra normal para todos
  let nodosModificados = nodes.map(node => {
    if (node.shape === "text") return node; // No modificar nodos de tipo "text"

    return {
      ...node,
      color: nodosCriticos.has(node.id) 
        ? { 
            background: "rgb(237, 112, 135)", 
            border: "rgb(237, 112, 135)"
          }  
        : { 
          background: "rgb(233, 196, 203)", 
          border: "rgb(233, 196, 203)"
        }, // Mantiene el color original de los nodos no críticos
      shadow: nodosCriticos.has(node.id) 
        ? {
            enabled: true,
            size: 70, // Tamaño de la sombra para más brillo
            color: "rgba(237, 112, 135, 0.9)" // Color fuerte y brillante
          }
        : {
            enabled: true,
            size: 10, // Sombra pequeña para todos los nodos
            color: "rgba(0, 0, 0, 0.3)"
          },
      label: `${node.label}\n ${a[node.id] || "0"} | ${b[node.id] || "0"}`
    };
  });

  return { nodes: nodosModificados, edges: aristasHolgura, a, b, nodosCriticos };
};