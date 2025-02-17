import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const ColorModal = ({ isOpen, nodeId, currentColor, onClose, onChangeColor }) => {
    const [chosenColor, setChosenColor] = useState("#000000");

    useEffect(() => {
        if (isOpen && currentColor) {
            setChosenColor(currentColor);
            console.log("🎨 Color inicial al abrir el modal:", currentColor);
        }
    }, [isOpen, currentColor]);

    const handleColorChange = (event) => {
        setChosenColor(event.target.value);
        console.log("🎨 Nuevo color seleccionado:", event.target.value);
    };

    const handleConfirm = () => {
        console.log(`✅ Color confirmado: ${chosenColor}`);
        onChangeColor(nodeId, chosenColor);
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
                    width: 350,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 3,
                    textAlign: "center"
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Seleccionar Color
                </Typography>
                
                {/* Contenedor de la selección de color */}
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

export default ColorModal;