// Función para calcular índices A
const calcularIndiceA = (nodes, edges) => {
  let a = {};

  // Inicializar A con 0
  nodes.forEach(node => (a[node.id] = 0));

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
  let b = {};

  // Inicializar B con el valor máximo de A
  nodes.forEach(node => (b[node.id] = maxA));

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

 // Modificar los nodos para cambiar su color si están en la ruta crítica
 let nodosModificados = nodes.map(node => ({
  ...node,
  color: nodosCriticos.has(node.id) 
    ? { background: "#c8f2b9", border: "#c8f2b9" }  // Nodos en la ruta crítica
    : node.color, // Mantiene el color original de los nodos no críticos
  label: `${node.label}\n ${a[node.id]} | ${b[node.id]}`
}));;

  return { nodes: nodosModificados, edges: aristasHolgura, a, b };
};