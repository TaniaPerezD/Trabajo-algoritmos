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

// Función principal que calcula la holgura y actualiza el grafo
export const johnson = (nodes, edges) => {
  let a = calcularIndiceA(nodes, edges);
  let maxA = Math.max(...Object.values(a)); 
  let b = calcularIndiceB(nodes, edges, maxA);

  // Calcular holgura para cada arista
  let aristasHolgura = edges.map(edge => {
    let slack = b[edge.to] - a[edge.from] - Number(edge.label);
    let color = slack === 0 ? "rgb(249, 78, 109)" : "black";
    let width = slack === 0 ? 2.5 : 0.5;

    return { 
      ...edge, 
      slack, 
      color, 
      width, 
      originalLabel: edge.label,  // Guardamos el peso original
      label: `${edge.label}\n h=${slack}` // Mostramos el peso y la holgura
    };
  });

  // Modificar los nodos para mostrar los índices A y B debajo
  let nodosModificados = nodes.map(node => ({
    ...node,
    label: `${node.label}\n ${a[node.id]} | ${b[node.id]}` // Mostrar los índices debajo del nodo
  }));

  return { nodes: nodosModificados, edges: aristasHolgura, a, b };
};