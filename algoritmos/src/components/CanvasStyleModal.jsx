import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const styleOptions = [
    { name: "blanco", display: "Blanco", preview: "#ffffff" },
    { 
        name: "cuadricula", 
        display: "Cuadrícula", 
        preview: "repeating-linear-gradient(0deg, transparent, transparent 19px, black 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, black 20px)"
    },
    { 
        name: "puntos", 
        display: "Puntos", 
        preview: "radial-gradient(circle, black 1px, transparent 1px)"
    }
];

const CanvasStyleModal = ({ isOpen, currentStyle, onClose, onChangeStyle }) => {
    const [selectedStyle, setSelectedStyle] = useState(currentStyle);

    useEffect(() => {
        if (isOpen) {
            setSelectedStyle(currentStyle);
        }
    }, [isOpen, currentStyle]);

    const handleConfirm = () => {
        onChangeStyle(selectedStyle);
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
                    width: 380,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 3,
                    textAlign: "center"
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Cambiar Estilo de Pizarra
                </Typography>

                {/* Opciones de estilos con vista previa */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                    {styleOptions.map((style) => (
                        <Box
                            key={style.name}
                            sx={{
                                width: 80,
                                height: 80,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px",
                                cursor: "pointer",
                                position: "relative",
                                border: selectedStyle === style.name ? "3px solid green" : "2px solid black",
                                background: style.preview,
                                backgroundSize: style.name === "puntos" ? "10px 10px" : "20px 20px",
                            }}
                            onClick={() => setSelectedStyle(style.name)}
                        >
                            {/* Checkmark si está seleccionado */}
                            {selectedStyle === style.name && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 5,
                                        right: 5,
                                        fontSize: "18px",
                                        color: "green",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ✔️
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>

                {/* Botones de acción (posicionados correctamente) */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                    
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#95bb59",  // Verde claro para "Aceptar"
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
                            backgroundColor: "#5e646b",  // Gris oscuro para "Cancelar"
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

export default CanvasStyleModal;