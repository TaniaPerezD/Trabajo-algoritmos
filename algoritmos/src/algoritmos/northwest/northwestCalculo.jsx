/**
 * Implementa el método de la esquina noroeste para encontrar una solución básica factible inicial.
 * @param {Array} supply - Lista con las cantidades disponibles en cada origen
 * @param {Array} demand - Lista con las cantidades requeridas en cada destino
 * @returns {Array} Lista de tuplas [[i, j], v] donde [i, j] son las coordenadas de la celda y v es el valor asignado
 */

let iteracion=0;
function northWestCorner(supply, demand) {
  const supplyCopy = [...supply];
  const demandCopy = [...demand];
  let i = 0;
  let j = 0;
  const bfs = [];
  
  while (bfs.length < supply.length + demand.length - 1) {
      const s = supplyCopy[i];
      const d = demandCopy[j];
      const v = Math.min(s, d);
      
      supplyCopy[i] -= v;
      demandCopy[j] -= v;
      bfs.push([[i, j], v]);
      
      if (supplyCopy[i] === 0 && i < supply.length - 1) {
          i += 1;
      } else if (demandCopy[j] === 0 && j < demand.length - 1) {
          j += 1;
      }
  }
  
  return bfs;
}

/**
* Balancea el problema de transporte si la oferta total no es igual a la demanda total.
* @param {Array} supply - Lista con las cantidades disponibles
* @param {Array} demand - Lista con las cantidades requeridas
* @param {Array} costs - Matriz de costos
* @returns {Array} Tupla con supply balanceado, demand balanceado y costs balanceados
*/
function getBalancedTP(supply, demand, costs) {
  const totalSupply = supply.reduce((a, b) => a + b, 0);
  const totalDemand = demand.reduce((a, b) => a + b, 0);
  
  const supplyBalanced = [...supply];
  const demandBalanced = [...demand];
  const costsBalanced = costs.map(row => [...row]);
  
  if (totalSupply < totalDemand) {
      // Añadir un origen ficticio
      supplyBalanced.push(totalDemand - totalSupply);
      // Añadir fila de costos
      const dummyCosts = Array(costs[0].length).fill(0);
      costsBalanced.push(dummyCosts);
  } else if (totalSupply > totalDemand) {
      // Añadir un destino ficticio
      demandBalanced.push(totalSupply - totalDemand);
      // Añadir columna de costos
      for (let i = 0; i < costsBalanced.length; i++) {
          costsBalanced[i].push(0);
      }
  }
  
  return [supplyBalanced, demandBalanced, costsBalanced];
}

/**
* Calcula los valores de u y v para cada origen y destino.
* @param {Array} bfs - Lista de variables básicas
* @param {Array} costs - Matriz de costos
* @returns {Array} Listas de valores u y v
*/
function getUsAndVs(bfs, costs) {
  const us = Array(costs.length).fill(null);
  const vs = Array(costs[0].length).fill(null);
  us[0] = 0; // Punto de partida para el cálculo
  
  const bfsCopy = [...bfs];
  while (bfsCopy.length > 0) {
      for (let index = 0; index < bfsCopy.length; index++) {
          const [[i, j], _] = bfsCopy[index];
          
          if (us[i] === null && vs[j] === null) {
              continue;
          }
          
          const cost = costs[i][j];
          if (us[i] === null) {
              us[i] = cost - vs[j];
          } else {
              vs[j] = cost - us[i];
          }
          
          bfsCopy.splice(index, 1);
          break;
      }
  }
  
  return [us, vs];
}

/**
* Calcula los costos reducidos para las variables no básicas.
* @param {Array} bfs - Lista de variables básicas
* @param {Array} costs - Matriz de costos
* @param {Array} us - Lista de valores u
* @param {Array} vs - Lista de valores v
* @param {boolean} maximize - Booleano indicando si es un problema de maximización
* @returns {Array} Lista de costos reducidos para variables no básicas
*/
function getWs(bfs, costs, us, vs, maximize = false) {
  const ws = [];
  
  for (let i = 0; i < costs.length; i++) {
      for (let j = 0; j < costs[i].length; j++) {
          // Verifica si la celda (i,j) es una variable no básica
          const nonBasic = bfs.every(([[bi, bj], _]) => bi !== i || bj !== j);
          
          if (nonBasic) {
              const cost = costs[i][j];
              let reducedCost;
              
              if (maximize) {
                  // Para maximización: (ui + vj) - cij
                  reducedCost = (us[i] + vs[j]) - cost;
              } else {
                  // Para minimización: cij - (ui + vj)
                  reducedCost = cost - (us[i] + vs[j]);
              }
              
              ws.push([[i, j], reducedCost]);
          }
      }
  }
  
  return ws;
}

/**
* Determina si la solución actual puede mejorarse.
* @param {Array} ws - Lista de costos reducidos
* @param {boolean} maximize - Booleano indicando si es un problema de maximización
* @returns {boolean} Booleano indicando si la solución puede mejorarse
*/
function canBeImproved(ws, maximize = false) {
  return ws.some(([_, v]) => v < 0);
}

/**
* Determina la variable que debe entrar a la base.
* @param {Array} ws - Lista de costos reducidos
* @param {boolean} maximize - Booleano indicando si es un problema de maximización
* @returns {Array} Posición de la variable que debe entrar
*/
function getEnteringVariablePosition(ws, maximize = false) {
  const wsCopy = [...ws];
  wsCopy.sort((a, b) => a[1] - b[1]); // Ordenar por costo reducido (menor primero)
  return wsCopy[0][0]; // Devuelve la posición con el menor costo reducido
}

/**
* Encuentra los posibles nodos siguientes en un ciclo.
* @param {Array} loop - Lista de nodos que forman el ciclo actual
* @param {Array} notVisited - Lista de nodos no visitados
* @returns {Array} Lista de posibles nodos siguientes
*/
function getPossibleNextNodes(loop, notVisited) {
  const lastNode = loop[loop.length - 1];
  const nodesInRow = notVisited.filter(n => n[0] === lastNode[0]);
  const nodesInColumn = notVisited.filter(n => n[1] === lastNode[1]);
  
  if (loop.length < 2) {
      return [...nodesInRow, ...nodesInColumn];
  } else {
      const prevNode = loop[loop.length - 2];
      const rowMove = prevNode[0] === lastNode[0];
      return rowMove ? nodesInColumn : nodesInRow;
  }
}

/**
* Encuentra un ciclo entre las variables básicas y la variable de entrada.
* @param {Array} bvPositions - Posiciones de las variables básicas
* @param {Array} evPosition - Posición de la variable de entrada
* @returns {Array} Lista de nodos que forman el ciclo
*/
function getLoop(bvPositions, evPosition) {
  function inner(loop) {
      if (loop.length > 3) {
          const canBeClosed = getPossibleNextNodes(loop, [evPosition]).length === 1;
          if (canBeClosed) {
              return loop;
          }
      }
      
      // Obtener nodos no visitados (diferencia de conjuntos)
      const notVisited = bvPositions.filter(pos => 
          !loop.some(node => node[0] === pos[0] && node[1] === pos[1])
      );
      
      const possibleNextNodes = getPossibleNextNodes(loop, notVisited);
      for (const nextNode of possibleNextNodes) {
          const newLoop = inner([...loop, nextNode]);
          if (newLoop) {
              return newLoop;
          }
      }
      
      return null;
  }
  
  return inner([evPosition]);
}

/**
* Realiza el pivoteo sobre un ciclo para obtener una nueva solución básica factible.
* @param {Array} bfs - Lista de variables básicas actuales
* @param {Array} loop - Ciclo para realizar el pivoteo
* @returns {Array} Nueva lista de variables básicas
*/
function loopPivoting(bfs, loop) {
  // Celdas pares y impares del ciclo
  const evenCells = [];
  const oddCells = [];
  
  for (let i = 0; i < loop.length; i++) {
      if (i % 2 === 0) {
          evenCells.push(loop[i]);
      } else {
          oddCells.push(loop[i]);
      }
  }
  
  // Encuentra la variable que sale (la de menor valor en las celdas impares)
  const leavingValues = oddCells.map(pos => {
      const value = bfs.find(([[bi, bj], _]) => bi === pos[0] && bj === pos[1])[1];
      return [pos, value];
  });
  
  leavingValues.sort((a, b) => a[1] - b[1]);
  const [leavingPosition, leavingValue] = leavingValues[0];
  
  // Crea la nueva solución
  const newBfs = [];
  
  for (const [[i, j], v] of bfs) {
      // Omitir la variable de salida
      if (i === leavingPosition[0] && j === leavingPosition[1]) {
          continue;
      }
      
      let newValue = v;
      
      // Ajustar valores en el ciclo
      if (evenCells.some(pos => pos[0] === i && pos[1] === j)) {
          newValue += leavingValue;
      } else if (oddCells.some(pos => pos[0] === i && pos[1] === j)) {
          newValue -= leavingValue;
      }
      
      newBfs.push([[i, j], newValue]);
  }
  
  // Añadir la variable de entrada
  newBfs.push([loop[0], leavingValue]);
  
  return newBfs;
}

/**
* Implementa el método Simplex de transporte.
* @param {Array} supply - Lista con las cantidades disponibles
* @param {Array} demand - Lista con las cantidades requeridas
* @param {Array} costs - Matriz de costos
* @param {boolean} maximize - Booleano indicando si es un problema de maximización
* @returns {Array} Matriz con la solución óptima
*/
function transportationSimplexMethod(supply, demand, costs, maximize = false) {
  // Balanceamos el problema
  const [balancedSupply, balancedDemand, balancedCosts] = getBalancedTP(supply, demand, costs);
  
  // Solución inicial usando el método de la esquina noroeste
  let bfs = northWestCorner(balancedSupply, balancedDemand);
  
  // Proceso iterativo del método Simplex
  function MatrixIteracion(inputArray, rows, cols) {
    // Crear una matriz de ceros
    const resultMatrix = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Llenar la matriz con los valores correspondientes
    inputArray.forEach(([position, value]) => {
        const [row, col] = position;
        resultMatrix[row][col] = value;
    });
    return resultMatrix;
  }
  function inner(currentBfs) {
      const [us, vs] = getUsAndVs(currentBfs, balancedCosts);
      const ws = getWs(currentBfs, balancedCosts, us, vs, maximize);
      console.log("Iteracion actual:"+iteracion);
      iteracion++;
      console.log(MatrixIteracion(currentBfs, balancedCosts.length, balancedCosts[0].length));
      if (canBeImproved(ws, maximize)) {
          const evPosition = getEnteringVariablePosition(ws, maximize);
          const bvPositions = currentBfs.map(([[i, j], _]) => [i, j]);
          const loop = getLoop(bvPositions, evPosition);
          return inner(loopPivoting(currentBfs, loop));
      }
      
      return currentBfs;
  }
  
  // Obtener las variables básicas de la solución óptima
  const basicVariables = inner(bfs);
  
  // Construir la matriz de solución
  const solution = Array(costs.length).fill().map(() => Array(costs[0].length).fill(0));
  
  for (const [[i, j], v] of basicVariables) {
      if (i < costs.length && j < costs[0].length) { // Ignorar filas/columnas ficticias
          solution[i][j] = v;
      }
  }
  
  return solution;
}

/**
* Calcula el costo total o beneficio total de la solución.
* @param {Array} costs - Matriz de costos original
* @param {Array} solution - Matriz con la solución
* @param {boolean} maximize - Booleano indicando si es un problema de maximización
* @returns {number} Costo total o beneficio total de la solución
*/
function getTotalCost(costs, solution, maximize = false) {
  let total = 0;
  
  for (let i = 0; i < costs.length; i++) {
      for (let j = 0; j < costs[i].length; j++) {
          total += costs[i][j] * solution[i][j];
      }
  }
  
  return total;
}

/**
* Función principal para resolver problemas de transporte.
* @param {Array} supply - Lista con las cantidades disponibles
* @param {Array} demand - Lista con las cantidades requeridas
* @param {Array} costs - Matriz de costos
* @param {boolean} maximize - Booleano indicando si es un problema de maximización
* @returns {Array} Tupla con la matriz de solución y el costo total
*/
export function solveTransportationProblem(supply, demand, costs, maximize = false) {
  const solution = transportationSimplexMethod(supply, demand, costs, maximize);
  const totalCost = getTotalCost(costs, solution, maximize);
  
  const resultType = maximize ? "Beneficio total" : "Costo total";
  console.log("\nSolución óptima:");
  console.log(solution);
  console.log(`${resultType}: ${totalCost}`);
  
  return [solution, totalCost];
}

// Ejemplo de uso:

const supply = [20, 30, 10];
const demand = [5, 20, 25, 10];
const costs = [
    [2, 2, 5, 4],
    [6, 1, 2, 6],
    [7, 3, 4, 2]
];
/*
// Problema de minimización
const [solution, cost] = solveTransportationProblem(supply, demand, costs, false);

// Problema de maximización
const [solutionMax, profit] = solveTransportationProblem(supply, demand, costs, true);
*/