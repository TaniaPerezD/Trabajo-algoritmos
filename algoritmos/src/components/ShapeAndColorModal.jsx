import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const shapeOptions = [
  { name: "circle", display: "⬤" },
  { name: "ellipse", display: "⬭" },
  { name: "box", display: "▢" },
  { name: "star", display: "★" },
  { name: "text", display: "T" },
];

const ShapeAndColorModal = ({ isOpen, nodeId, currentShape, currentColor, onClose, onChange }) => {
    const [chosenShape, setChosenShape] = useState(currentShape || "circle");
    const [chosenColor, setChosenColor] = useState(currentColor || "#000000");

    useEffect(() => {
        if (isOpen) {
            setChosenShape(currentShape);
            setChosenColor(currentColor);
            console.log("🟢 Forma inicial:", currentShape);
            console.log("🎨 Color inicial:", currentColor);
        }
    }, [isOpen, currentShape, currentColor]);

    const handleShapeChange = (shape) => {
        setChosenShape(shape);
        console.log("🔄 Nueva forma seleccionada:", shape);
    };

    const handleColorChange = (event) => {
        setChosenColor(event.target.value);
        console.log("🔄 Nuevo color seleccionado:", event.target.value);
    };

    const handleConfirm = () => {
        console.log(`✅ Confirmado - Forma: ${chosenShape}, Color: ${chosenColor}`);
        onChange(nodeId, chosenShape, chosenColor);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 3,
                    textAlign: "center"
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Cambiar Forma y Color
                </Typography>

                {/* Selección de Forma */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
                    {shapeOptions.map((shape) => (
                        <Box
                            key={shape.name}
                            onClick={() => handleShapeChange(shape.name)}
                            sx={{
                                width: 50,
                                height: 50,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "30px",
                                border: chosenShape === shape.name ? "3px solid green" : "2px solid black",
                                cursor: "pointer",
                                position: "relative",
                            }}
                        >
                            {shape.display}
                            {chosenShape === shape.name && (
                                <span style={{ position: "absolute", bottom: 2, right: 2, fontSize: "14px", color: "green" }}>✔️</span>
                            )}
                        </Box>
                    ))}
                </Box>

                {/* Selección de Color */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center", mb: 3 }}>
                    {/* Selector de color (cuadrado a la izquierda) */}
                    <input
                        type="color"
                        value={chosenColor}
                        onChange={handleColorChange}
                        style={{
                            width: "50px",
                            height: "50px",
                            border: "none",
                            cursor: "pointer",
                            appearance: "none",
                            background: "none",
                            padding: "0",
                            borderRadius: "5px",
                        }}
                    />

                    {/* Input de código HEX */}
                    <TextField
                        variant="outlined"
                        sx={{ width: "120px" }}
                        value={chosenColor}
                        onChange={handleColorChange}
                    />

                    {/* Vista previa circular */}
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "2px solid black",
                            backgroundColor: chosenColor
                        }}
                    />
                </Box>

                {/* Botones Aceptar y Cancelar */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#95bb59",
                            color: "white",
                            "&:hover": { backgroundColor: "#7ea04b" }
                        }}
                        onClick={handleConfirm}
                    >
                        ACEPTAR
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#5e646b",
                            color: "white",
                            "&:hover": { backgroundColor: "#4b5157" }
                        }}
                        onClick={onClose}
                    >
                        CANCELAR
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ShapeAndColorModal;