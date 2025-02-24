//funcion para calcular indices a
const calcularIndiceA = (nodes, edges) => {
  let a = {};

  nodes.forEach(node => (a[node.id] = 0));

  console.log("Calculando índice A...");

  edges.forEach(() => {
    edges.forEach(edge => {
      let nuevoValor = a[edge.from] + Number(edge.label);
      if (nuevoValor > a[edge.to]) {
        a[edge.to] = nuevoValor;
      }
    });
  });

  console.log("Índices A calculados:", a);
  return a;
};

// Funcion para calcular índices B
const calcularIndiceB = (nodes, edges, maxA) => {
  let b = {};
 
 nodes.forEach(node => (b[node.id] = maxA));

  console.log("Calculando índice B...");

  edges.forEach(() => {
    edges.forEach(edge => {
      let nuevoValor = b[edge.to] - Number(edge.label);
      if (nuevoValor < b[edge.from]) {
        b[edge.from] = nuevoValor;
      }
    });
  });

  console.log("Índices B calculados:", b);
  return b;
};

// Función principal que calcula la holgura
export const johnson = (nodes, edges) => {
  let a = calcularIndiceA(nodes, edges);
  let maxA = Math.max(...Object.values(a)); // Valor máximo en A
  let b = calcularIndiceB(nodes, edges, maxA);

  // Calcular holgura para cada arista
  let aristasHolgura = edges.map(edge => {
    let slack = b[edge.to] - a[edge.from] - Number(edge.label);
    let color = slack === 0 ? "green" : "black";
    let wigth = slack === 0 ? 1.5 : 0.5;
    return { ...edge, slack, color, wigth }; 
  });


  let nodosModificados = nodes.map(node => ({
    ...node,
    title: `a: ${a[node.id]}, b: ${b[node.id]}`
  }));

  console.log("Holguras de las aristas calculadas:", aristasHolgura);
  return { nodes: nodosModificados, edges: aristasHolgura, a, b };
};
