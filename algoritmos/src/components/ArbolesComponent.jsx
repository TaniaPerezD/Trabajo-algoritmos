import '../styles/TreeStyles.css';
import React, { useState, useEffect, useRef } from "react";
import { Tree } from 'react-d3-tree';

// Algoritmo para insertar un nodo en un BST
const insertNode = (root, value) => {
    if (root === null) {
        return { name: value.toString(), attributes: {}, children: [] };
    }

    if (value < parseInt(root.name)) {
        if (!root.children[0]) {
            root.children.unshift({ name: value.toString(), attributes: {}, children: [] });
        } else {
            insertNode(root.children[0], value);
        }
    } else {
        if (!root.children[1]) {
            root.children.push({ name: value.toString(), attributes: {}, children: [] });
        } else {
            insertNode(root.children[1], value);
        }
    }
    return root;
};

// Algoritmos de recorrido con función de callback para animación
const inOrderTraversal = (node, result = [], callback = null) => {
    if (!node) return result;
    if (node.children[0]) inOrderTraversal(node.children[0], result, callback);
    result.push(parseInt(node.name));
    if (callback) callback(node.name, result.length - 1);
    if (node.children[1]) inOrderTraversal(node.children[1], result, callback);
    return result;
};

const preOrderTraversal = (node, result = [], callback = null) => {
    if (!node) return result;
    result.push(parseInt(node.name));
    if (callback) callback(node.name, result.length - 1);
    if (node.children[0]) preOrderTraversal(node.children[0], result, callback);
    if (node.children[1]) preOrderTraversal(node.children[1], result, callback);
    return result;
};

const postOrderTraversal = (node, result = [], callback = null) => {
    if (!node) return result;
    if (node.children[0]) postOrderTraversal(node.children[0], result, callback);
    if (node.children[1]) postOrderTraversal(node.children[1], result, callback);
    result.push(parseInt(node.name));
    if (callback) callback(node.name, result.length - 1);
    return result;
};

// Función para calcular la altura de un árbol
const calculateTreeHeight = (node) => {
    if (!node) return -1; // Un árbol vacío tiene altura -1
    
    let leftHeight = -1;
    let rightHeight = -1;
    
    if (node.children && node.children[0]) {
        leftHeight = calculateTreeHeight(node.children[0]);
    }
    
    if (node.children && node.children[1]) {
        rightHeight = calculateTreeHeight(node.children[1]);
    }
    
    return Math.max(leftHeight, rightHeight) + 1;
};

// Función para contar el número de nodos en un árbol
const countNodes = (node) => {
    if (!node) return 0;
    
    let count = 1; // Contar el nodo actual
    
    if (node.children && node.children[0]) {
        count += countNodes(node.children[0]);
    }
    
    if (node.children && node.children[1]) {
        count += countNodes(node.children[1]);
    }
    
    return count;
};

// Función para reconstruir árbol a partir de recorridos in-orden y pre-orden
const buildTreeFromInPre = (inOrder, preOrder) => {
    if (inOrder.length === 0 || preOrder.length === 0) return null;
    
    const rootValue = preOrder[0];
    const rootIndex = inOrder.indexOf(rootValue);
    
    const inOrderLeft = inOrder.slice(0, rootIndex);
    const inOrderRight = inOrder.slice(rootIndex + 1);
    
    const preOrderLeft = preOrder.slice(1, rootIndex + 1);
    const preOrderRight = preOrder.slice(rootIndex + 1);
    
    const root = { name: rootValue.toString(), attributes: {}, children: [] };
    
    const leftChild = buildTreeFromInPre(inOrderLeft, preOrderLeft);
    const rightChild = buildTreeFromInPre(inOrderRight, preOrderRight);
    
    if (leftChild) root.children.push(leftChild);
    if (rightChild) root.children.push(rightChild);
    
    return root;
};

// Función para reconstruir árbol a partir de recorridos in-orden y post-orden
const buildTreeFromInPost = (inOrder, postOrder) => {
    if (inOrder.length === 0 || postOrder.length === 0) return null;
    
    const rootValue = postOrder[postOrder.length - 1];
    const rootIndex = inOrder.indexOf(rootValue);
    
    const inOrderLeft = inOrder.slice(0, rootIndex);
    const inOrderRight = inOrder.slice(rootIndex + 1);
    
    const postOrderLeft = postOrder.slice(0, inOrderLeft.length);
    const postOrderRight = postOrder.slice(inOrderLeft.length, postOrder.length - 1);
    
    const root = { name: rootValue.toString(), attributes: {}, children: [] };
    
    const leftChild = buildTreeFromInPost(inOrderLeft, postOrderLeft);
    const rightChild = buildTreeFromInPost(inOrderRight, postOrderRight);
    
    if (leftChild) root.children.push(leftChild);
    if (rightChild) root.children.push(rightChild);
    
    return root;
};

// Función para generar un árbol aleatorio
const generateRandomTree = (nodeCount, minValue, maxValue) => {
    // Creamos un conjunto para evitar duplicados
    const usedValues = new Set();
    let tree = null;
    
    while (usedValues.size < nodeCount) {
        // Generar un número aleatorio entre minValue y maxValue
        const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        
        // Verificar si ya existe en el árbol
        if (!usedValues.has(randomValue)) {
            usedValues.add(randomValue);
            
            // Insertar en el árbol
            if (!tree) {
                tree = { name: randomValue.toString(), attributes: {}, children: [] };
            } else {
                insertNode(tree, randomValue);
            }
        }
    }
    
    return tree;
};

const BSTComponent = () => {
    const [tree, setTree] = useState(null);
    const [nodeValue, setNodeValue] = useState("");
    const [traversalType, setTraversalType] = useState("inOrder");
    const [traversalResult, setTraversalResult] = useState([]);
    const [activePanel, setActivePanel] = useState('build');
    
    // Para la reconstrucción
    const [inOrderInput, setInOrderInput] = useState("");
    const [preOrderInput, setPreOrderInput] = useState("");
    const [postOrderInput, setPostOrderInput] = useState("");
    const [reconstructionMethod, setReconstructionMethod] = useState("inPre");
    const [reconstructedTree, setReconstructedTree] = useState(null);
    
    // Para la animación de recorrido
    const [highlightedNodes, setHighlightedNodes] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(1000); // milisegundos entre pasos
    const animationTimeoutRef = useRef(null);

    // Para las métricas del árbol
    const [nodeCount, setNodeCount] = useState(0);
    const [treeHeight, setTreeHeight] = useState(-1);

    // Para el modo de inserción (manual o aleatorio)
    const [insertionMode, setInsertionMode] = useState('manual');
    
    // Para la generación aleatoria
    const [randomNodeCount, setRandomNodeCount] = useState(5);
    const [randomMinValue, setRandomMinValue] = useState(1);
    const [randomMaxValue, setRandomMaxValue] = useState(100);

    // Cargar el archivo JSON
    const fileInputRef = useRef(null);
    
    const treeContainerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (treeContainerRef.current) {
            setDimensions({
                width: treeContainerRef.current.offsetWidth,
                height: treeContainerRef.current.offsetHeight
            });
        }
    }, [tree, reconstructedTree, activePanel]);

    // Limpiar timeouts cuando el componente se desmonta
    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    // Actualizar dimensiones cuando la ventana cambia de tamaño
    useEffect(() => {
        const handleResize = () => {
            if (treeContainerRef.current) {
                setDimensions({
                    width: treeContainerRef.current.offsetWidth,
                    height: treeContainerRef.current.offsetHeight
                });
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Actualizar el conteo de nodos y la altura del árbol cuando cambia el árbol
    useEffect(() => {
        if (tree) {
            setNodeCount(countNodes(tree));
            setTreeHeight(calculateTreeHeight(tree));
        } else {
            setNodeCount(0);
            setTreeHeight(-1);
        }
    }, [tree]);

    const handleNodeInsert = () => {
        if (nodeValue.trim() === "") return;
        
        const value = parseInt(nodeValue);
        if (isNaN(value)) {
            alert("Por favor ingrese un número válido");
            return;
        }
        
        let newTree;
        if (!tree) {
            newTree = { name: value.toString(), attributes: {}, children: [] };
        } else {
            newTree = JSON.parse(JSON.stringify(tree)); // Deep copy
            insertNode(newTree, value);
        }
        
        setTree(newTree);
        setNodeValue("");
        updateTraversal(newTree, traversalType);
    };
    
    const handleRandomTreeGeneration = () => {
        // Validar la entrada
        if (randomNodeCount <= 0 || randomMinValue >= randomMaxValue) {
            alert("Por favor verifique los parámetros. El número de nodos debe ser mayor que 0 y el valor mínimo debe ser menor que el máximo.");
            return;
        }
        
        // Verificar si hay suficientes valores únicos posibles
        const possibleValues = randomMaxValue - randomMinValue + 1;
        if (possibleValues < randomNodeCount) {
            alert(`No es posible generar ${randomNodeCount} nodos únicos en el rango [${randomMinValue}, ${randomMaxValue}]. Por favor amplíe el rango o reduzca el número de nodos.`);
            return;
        }
        
        // Generar el árbol aleatorio
        const newTree = generateRandomTree(randomNodeCount, randomMinValue, randomMaxValue);
        setTree(newTree);
        updateTraversal(newTree, traversalType);
    };
    
    const handleTraversalChange = (type) => {
        setTraversalType(type);
        if (tree) {
            updateTraversal(tree, type);
        }
    };
    
    const updateTraversal = (currentTree, type) => {
        let result;
        switch (type) {
            case "inOrder":
                result = inOrderTraversal(currentTree);
                break;
            case "preOrder":
                result = preOrderTraversal(currentTree);
                break;
            case "postOrder":
                result = postOrderTraversal(currentTree);
                break;
            default:
                result = [];
        }
        setTraversalResult(result);
    };

    // Iniciar la animación del recorrido
    const startTraversalAnimation = () => {
        if (!tree || isAnimating) return;
        
        // Limpiar resaltados anteriores
        setHighlightedNodes({});
        setIsAnimating(true);
        
        // Obtener el orden correcto del recorrido
        const animationResults = [];
        const highlightCallback = (nodeName, index) => {
            animationResults.push({ nodeName, index });
        };
        
        let traversalFunction;
        switch (traversalType) {
            case "inOrder":
                traversalFunction = inOrderTraversal;
                break;
            case "preOrder":
                traversalFunction = preOrderTraversal;
                break;
            case "postOrder":
                traversalFunction = postOrderTraversal;
                break;
            default:
                traversalFunction = inOrderTraversal;
        }
        
        traversalFunction(tree, [], highlightCallback);
        
        // Crear una animación secuencial
        let step = 0;
        const animate = () => {
            if (step < animationResults.length) {
                const { nodeName, index } = animationResults[step];
                
                // Actualizar el estado para resaltar el nodo actual
                setHighlightedNodes(prev => ({
                    ...prev,
                    [nodeName]: index
                }));
                
                // Programar el siguiente paso
                step++;
                animationTimeoutRef.current = setTimeout(animate, animationSpeed);
            } else {
                // Finalizar la animación después de un tiempo
                animationTimeoutRef.current = setTimeout(() => {
                    setHighlightedNodes({});
                    setIsAnimating(false);
                }, animationSpeed);
            }
        };
        
        // Iniciar animación
        animate();
    };
    
    // Detener la animación actual
    const stopTraversalAnimation = () => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        setHighlightedNodes({});
        setIsAnimating(false);
    };
    
    const handleReconstruction = () => {
        try {
            let inOrderArr = inOrderInput.split(',').map(num => parseInt(num.trim()));
            let newTree = null;
            
            if (reconstructionMethod === "inPre") {
                let preOrderArr = preOrderInput.split(',').map(num => parseInt(num.trim()));
                newTree = buildTreeFromInPre(inOrderArr, preOrderArr);
            } else if (reconstructionMethod === "inPost") {
                let postOrderArr = postOrderInput.split(',').map(num => parseInt(num.trim()));
                newTree = buildTreeFromInPost(inOrderArr, postOrderArr);
            }
            
            setReconstructedTree(newTree);
        } catch (error) {
            alert("Error al reconstruir el árbol. Verifica los datos ingresados.");
            console.error(error);
        }
    };
    
    const resetTree = () => {
        stopTraversalAnimation();
        setTree(null);
        setTraversalResult([]);
    };
    
    const resetReconstructedTree = () => {
        setReconstructedTree(null);
        setInOrderInput("");
        setPreOrderInput("");
        setPostOrderInput("");
    };
    
    const switchPanel = (panel) => {
        stopTraversalAnimation();
        setActivePanel(panel);
    };

    // Funcionalidad para exportar árbol a JSON
    const exportTreeToJSON = () => {
        if (!tree) {
            alert("No hay árbol para exportar");
            return;
        }
        
        const treeData = tree;
        const treeJSON = JSON.stringify(treeData, null, 2);
        const blob = new Blob([treeJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arbol_bst.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    // Funcionalidad para exportar árbol reconstruido a JSON
    const exportReconstructedTreeToJSON = () => {
        if (!reconstructedTree) {
            alert("No hay árbol reconstruido para exportar");
            return;
        }
        
        const treeData = reconstructedTree;
        const treeJSON = JSON.stringify(treeData, null, 2);
        const blob = new Blob([treeJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arbol_reconstruido.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    // Funcionalidad para importar árbol desde JSON
    const importTreeFromJSON = () => {
        fileInputRef.current.click();
    };
    
    // Manejar la selección de archivo
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTree = JSON.parse(e.target.result);
                
                if (activePanel === 'build') {
                    setTree(importedTree);
                    updateTraversal(importedTree, traversalType);
                } else if (activePanel === 'reconstruct') {
                    setReconstructedTree(importedTree);
                }
                
            } catch (error) {
                alert("Error al importar el árbol. Verifique el formato del archivo JSON.");
                console.error(error);
            }
        };
        reader.readAsText(file);
        
        // Resetear el input para poder seleccionar el mismo archivo nuevamente
        event.target.value = null;
    };

    // Configuración personalizada para el componente Tree
    const customNodeStyles = {
        circle: {
        fill: '#FFD8A9',    // Naranja pastel claro
        stroke: '#FFAB76',  // Naranja pastel medio
        strokeWidth: 2
        },
        text: {
        fill: '#733C00',    // Marrón oscuro (para contraste)
        fontSize: 14,
        fontWeight: 'bold'
        },
        highlighted: {
        fill: '#FFB562',    // Naranja pastel más intenso
        stroke: '#E25E3E'   // Rojo-naranja
        }
    };
    
    // Colores para recorridos específicos
    const traversalColors = {
        inOrder: {
        fill: '#FFEADD',    // Naranja muy pastel
        stroke: '#F7C59F'   // Naranja-melocotón
        },
        preOrder: {
        fill: '#FFF6BD',    // Amarillo pastel
        stroke: '#F9B572'   // Naranja-amarillo
        },
        postOrder: {
        fill: '#FFCAC8',    // Rojo-rosa pastel
        stroke: '#FF9494'   // Rojo pastel
        }
    };
    
    return (
        <div className="school-theme">
            <div className="header-banner-amarillo">
                <h1 className="method-title-arbol"
                    style={{ fontFamily: "'Schoolbell', cursive" }}>Árboles Binarios de Búsqueda</h1>
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileSelect}
                accept=".json"
            />
            
            <div className="content-container">
                <div className="control-buttons">
                    <button 
                        className={`panel-button-amarillo ${activePanel === 'build' ? 'active' : ''}`} 
                        onClick={() => switchPanel('build')}
                    >
                        Construir Árbol
                    </button>
                    <button 
                        className={`panel-button-amarillo ${activePanel === 'reconstruct' ? 'active' : ''}`} 
                        onClick={() => switchPanel('reconstruct')}
                    >
                        Reconstruir Árbol
                    </button>
                </div>
                
                <div className="panels-container">
                    <div className={`panel ${activePanel === 'build' ? 'active' : 'hidden'}`}>
                        <h3 className="panel-title">Construir y Analizar BST</h3>
                        
                        {/* Botones para seleccionar modo de inserción */}
                        <div className="insertion-mode-selector">
                            <button 
                                className={`mode-button-amarillo ${insertionMode === 'manual' ? 'active' : ''}`}
                                onClick={() => setInsertionMode('manual')}
                            >
                                Manual
                            </button>
                            <button 
                                className={`mode-button-amarillo ${insertionMode === 'random' ? 'active' : ''}`}
                                onClick={() => setInsertionMode('random')}
                            >
                                Aleatorio
                            </button>
                        </div>
                        
                        <div className="two-column-layout">
                            <div className="tree-visualization-column" ref={treeContainerRef}>
                                {tree ? (
                                    <Tree
                                        data={tree}
                                        orientation="vertical"
                                        pathFunc="straight"
                                        translate={{ x: dimensions.width / 2, y: 50 }}
                                        nodeSize={{ x: 150, y: 80 }}
                                        separation={{ siblings: 2, nonSiblings: 2 }}
                                        renderCustomNodeElement={(rd3tProps) => {
                                            const nodeId = rd3tProps.nodeDatum.name;
                                            const isHighlighted = nodeId in highlightedNodes;
                                            const nodeColor = isHighlighted 
                                                ? traversalColors[traversalType]?.fill || customNodeStyles.highlighted.fill
                                                : customNodeStyles.circle.fill;
                                            const strokeColor = isHighlighted 
                                                ? traversalColors[traversalType]?.stroke || customNodeStyles.highlighted.stroke
                                                : customNodeStyles.circle.stroke;
                                                
                                            return (
                                                <g>
                                                    <circle 
                                                        r={isHighlighted ? 25 : 20} // Aumentar tamaño si está resaltado
                                                        cx={0} 
                                                        cy={0} 
                                                        fill={nodeColor}
                                                        stroke={strokeColor}
                                                        strokeWidth={customNodeStyles.circle.strokeWidth}
                                                    />
                                                    <text 
                                                        x={0} 
                                                        y={5} 
                                                        textAnchor="middle" 
                                                        fill={customNodeStyles.text.fill}
                                                        fontWeight={customNodeStyles.text.fontWeight}
                                                        fontSize={customNodeStyles.text.fontSize}
                                                    >
                                                        {nodeId}
                                                    </text>
                                                </g>
                                            );
                                        }}
                                    />
                                ) : (
                                    <div className="empty-tree-message">
                                        <p>Inserte nodos para visualizar el árbol</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="controls-column">
                                {/* Mostrar campos según el modo seleccionado */}
                                {insertionMode === 'manual' ? (
                                    <div className="input-group">
                                        <label>Insertar Nodo:</label>
                                        <input
                                            type="text"
                                            value={nodeValue}
                                            onChange={(e) => setNodeValue(e.target.value)}
                                            placeholder="Ingrese un número"
                                            className="node-input"
                                        />
                                        <div className="button-group">
                                            <button className="action-button-amarillo add" onClick={handleNodeInsert}>Insertar</button>
                                            <button className="action-button-amarillo remove" onClick={resetTree}>Reset</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="random-tree-controls">
                                        <div className="input-group">
                                        <br/>
                                            <label>Número de nodos:</label>
                                            <input 
                                                type="number" 
                                                value={randomNodeCount}
                                                onChange={(e) => setRandomNodeCount(parseInt(e.target.value) || 0)}
                                                min="1"
                                                max="100"
                                                className="number-input"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Valor mínimo:</label>
                                            <input 
                                                type="number" 
                                                value={randomMinValue}
                                                onChange={(e) => setRandomMinValue(parseInt(e.target.value) || 0)}
                                                className="number-input"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Valor máximo:</label>
                                            <input 
                                                type="number" 
                                                value={randomMaxValue}
                                                onChange={(e) => setRandomMaxValue(parseInt(e.target.value) || 1)}
                                                className="number-input"
                                            />
                                        </div>
                                        <div className="button-group">
                                            <button className="action-button-amarillo generate" onClick={handleRandomTreeGeneration}>Generar</button>
                                            <button className="action-button-amarillo remove" onClick={resetTree}>Reset</button>
                                        </div>
                                    </div>
                                )}

                                {/* Cards para mostrar número de nodos y altura */}
                                <div className="tree-metrics-cards">
                                    <div className="metric-card">
                                        <div className="metric-card-header">Número de Nodos</div>
                                        <div className="metric-card-value">{nodeCount}</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-card-header">Altura del Árbol</div>
                                        <div className="metric-card-value">{treeHeight}</div>
                                    </div>
                                </div>

                                {/* Botones de importar/exportar JSON */}
                                <div className="json-controls">
                                    <div className="button-group">
                                        <button 
                                            className="action-button-amarillo import" 
                                            onClick={importTreeFromJSON}
                                            title="Importar árbol desde archivo JSON"
                                        >
                                            <span role="img" aria-label="Import"></span> Importar
                                        </button>
                                        <button 
                                            className="action-button-amarillo export" 
                                            onClick={exportTreeToJSON}
                                            disabled={!tree}
                                            title="Exportar árbol actual a archivo JSON"
                                        >
                                            <span role="img" aria-label="Export"></span> Exportar
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="traversal-container">
                                    <h4>Seleccionar recorrido:</h4>
                                    <div className="radio-group">
                                        <label>
                                            <input
                                                type="radio"
                                                value="inOrder"
                                                checked={traversalType === "inOrder"}
                                                onChange={() => handleTraversalChange("inOrder")}
                                            />
                                            In-Orden
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="preOrder"
                                                checked={traversalType === "preOrder"}
                                                onChange={() => handleTraversalChange("preOrder")}
                                            />
                                            Pre-Orden
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="postOrder"
                                                checked={traversalType === "postOrder"}
                                                onChange={() => handleTraversalChange("postOrder")}
                                            />
                                            Post-Orden
                                        </label>
                                    </div>
                                    
                                    <div className="animation-controls">
                                        <h4>Animación del recorrido:</h4>
                                        <div className="button-group">
                                            <button 
                                                className="action-button-amarillo animate" 
                                                onClick={startTraversalAnimation}
                                                disabled={isAnimating || !tree}
                                            >
                                                {isAnimating ? "Animando..." : "Iniciar animación"}
                                            </button>
                                            <button 
                                                className="action-button-amarillo stop" 
                                                onClick={stopTraversalAnimation}
                                                disabled={!isAnimating}
                                            >
                                                Detener
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="result-display">
                                        <h4>Resultado del recorrido {traversalType}:</h4>
                                        <div className="traversal-result">
                                            {traversalResult.length > 0 ? traversalResult.join(', ') : "Aún no hay nodos en el árbol"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`panel ${activePanel === 'reconstruct' ? 'active' : 'hidden'}`}>
                        <h3 className="panel-title">Reconstruir Árbol</h3>
                        
                        <div className="two-column-layout">
                            <div className="tree-visualization-column" ref={treeContainerRef}>
                                {reconstructedTree ? (
                                    <Tree
                                        data={reconstructedTree}
                                        orientation="vertical"
                                        pathFunc="straight"
                                        translate={{ x: dimensions.width / 2, y: 50 }}
                                        nodeSize={{ x: 150, y: 80 }}
                                        separation={{ siblings: 2, nonSiblings: 2 }}
                                        renderCustomNodeElement={(rd3tProps) => {
                                            const nodeId = rd3tProps.nodeDatum.name;
                                            const isHighlighted = nodeId in highlightedNodes;
                                            // Usar la misma paleta de colores que en el árbol principal
                                            return (
                                                <g>
                                                    <circle 
                                                        r={20} 
                                                        cx={0} 
                                                        cy={0} 
                                                        fill={customNodeStyles.circle.fill}
                                                        stroke={customNodeStyles.circle.stroke}
                                                        strokeWidth={customNodeStyles.circle.strokeWidth}
                                                    />
                                                    <text 
                                                        x={0} 
                                                        y={5} 
                                                        textAnchor="middle" 
                                                        fill={customNodeStyles.text.fill}
                                                        fontWeight={customNodeStyles.text.fontWeight}
                                                        fontSize={customNodeStyles.text.fontSize}
                                                    >
                                                        {rd3tProps.nodeDatum.name}
                                                    </text>
                                                </g>
                                            );
                                        }}
                                    />
                                ) : (
                                    <div className="empty-tree-message">
                                        <p>Ingrese los recorridos para reconstruir el árbol</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="controls-column">
                                <div className="method-selection">
                                    <h4>Método de reconstrucción:</h4>
                                    <div className="radio-group">
                                        <label>
                                            <input
                                                type="radio"
                                                value="inPre"
                                                checked={reconstructionMethod === "inPre"}
                                                onChange={() => setReconstructionMethod("inPre")}
                                            />
                                            In-Orden + Pre-Orden
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="inPost"
                                                checked={reconstructionMethod === "inPost"}
                                                onChange={() => setReconstructionMethod("inPost")}
                                            />
                                            In-Orden + Post-Orden
                                        </label>
                                    </div>
                                </div>
                                {/* Botones de importar/exportar JSON para árbol reconstruido */}
                                <div className="json-controls">
                                    <div className="button-group">
                                        <button 
                                            className="action-button-amarillo import" 
                                            onClick={importTreeFromJSON}
                                            title="Importar árbol desde archivo JSON"
                                        >
                                            <span role="img" aria-label="Import"></span> Importar
                                        </button>
                                        <button 
                                            className="action-button-amarillo export" 
                                            onClick={exportReconstructedTreeToJSON}
                                            disabled={!reconstructedTree}
                                            title="Exportar árbol reconstruido a archivo JSON"
                                        >
                                            <span role="img" aria-label="Export"></span> Exportar
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="input-group">
                                    <label>In-Orden (obligatorio):</label>
                                    <input
                                        type="text"
                                        value={inOrderInput}
                                        onChange={(e) => setInOrderInput(e.target.value)}
                                        placeholder="Ej: 4, 2, 5, 1, 3"
                                        className="traversal-input"
                                    />
                                </div>
                                
                                {reconstructionMethod === "inPre" ? (
                                    <div className="input-group">
                                        <label>Pre-Orden:</label>
                                        <input
                                            type="text"
                                            value={preOrderInput}
                                            onChange={(e) => setPreOrderInput(e.target.value)}
                                            placeholder="Ej: 1, 2, 4, 5, 3"
                                            className="traversal-input"
                                        />
                                    </div>
                                ) : (
                                    <div className="input-group">
                                        <label>Post-Orden:</label>
                                        <input
                                            type="text"
                                            value={postOrderInput}
                                            onChange={(e) => setPostOrderInput(e.target.value)}
                                            placeholder="Ej: 4, 5, 2, 3, 1"
                                            className="traversal-input"
                                        />
                                    </div>
                                )}
                                
                                <div className="button-group">
                                    <button className="action-button-amarillo solve" onClick={handleReconstruction}>Reconstruir</button>
                                    <button className="action-button-amarillo remove" onClick={resetReconstructedTree}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="school-decorations">
                <div className="ruler"></div>
                <div className="pencil"></div>
                <div className="notebook-lines"></div>
            </div>
        </div>
    );
};

export default BSTComponent;