import '../styles/TreeStyles.css';
import React, { useState, useEffect, useRef } from "react";
import { Switch } from "@mui/material";
import { Tree, TreeNode } from 'react-d3-tree';

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

// Algoritmos de recorrido
const inOrderTraversal = (node, result = []) => {
    if (!node) return result;
    if (node.children[0]) inOrderTraversal(node.children[0], result);
    result.push(parseInt(node.name));
    if (node.children[1]) inOrderTraversal(node.children[1], result);
    return result;
};

const preOrderTraversal = (node, result = []) => {
    if (!node) return result;
    result.push(parseInt(node.name));
    if (node.children[0]) preOrderTraversal(node.children[0], result);
    if (node.children[1]) preOrderTraversal(node.children[1], result);
    return result;
};

const postOrderTraversal = (node, result = []) => {
    if (!node) return result;
    if (node.children[0]) postOrderTraversal(node.children[0], result);
    if (node.children[1]) postOrderTraversal(node.children[1], result);
    result.push(parseInt(node.name));
    return result;
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
        setActivePanel(panel);
    };

    // Configuración personalizada para el componente Tree
    const customNodeStyles = {
        circle: {
            fill: '#51B84B',
            stroke: '#1A9414',
            strokeWidth: 2
        },
        text: {
            fill: 'black',
            fontSize: 14,
            fontWeight: 'bold'
        }
    };

    return (
        <div className="school-theme">
            <div className="header-banner-amarillo">
                <h1 className="method-title-arbol"
                    style={{ fontFamily: "'Schoolbell', cursive" }}>Árboles Binarios de Búsqueda</h1>
            </div>
            
            <div className="content-container">
                <div className="control-buttons">
                    <button 
                        className={`panel-button ${activePanel === 'build' ? 'active' : ''}`} 
                        onClick={() => switchPanel('build')}
                    >
                        Construir Árbol
                    </button>
                    <button 
                        className={`panel-button ${activePanel === 'reconstruct' ? 'active' : ''}`} 
                        onClick={() => switchPanel('reconstruct')}
                    >
                        Reconstruir Árbol
                    </button>
                </div>
                
                <div className="panels-container">
                    <div className={`panel ${activePanel === 'build' ? 'active' : 'hidden'}`}>
                        <h3 className="panel-title">Construir y Analizar BST</h3>
                        
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
                                        renderCustomNodeElement={(rd3tProps) => (
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
                                        )}
                                    />
                                ) : (
                                    <div className="empty-tree-message">
                                        <p>Inserte nodos para visualizar el árbol</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="controls-column">
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
                                        <button className="action-button add" onClick={handleNodeInsert}>Insertar</button>
                                        <button className="action-button remove" onClick={resetTree}>Reset</button>
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
                                        renderCustomNodeElement={(rd3tProps) => (
                                            <g>
                                                <circle 
                                                    r={20} 
                                                    cx={0} 
                                                    cy={0} 
                                                    fill="#B7DFB5"
                                                    stroke="#1A9414"
                                                    strokeWidth={2}
                                                />
                                                <text 
                                                    x={0} 
                                                    y={5} 
                                                    textAnchor="middle" 
                                                    fill="black"
                                                    fontWeight="bold"
                                                    fontSize={14}
                                                >
                                                    {rd3tProps.nodeDatum.name}
                                                </text>
                                            </g>
                                        )}
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
                                    <button className="action-button solve" onClick={handleReconstruction}>Reconstruir</button>
                                    <button className="action-button remove" onClick={resetReconstructedTree}>Reset</button>
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