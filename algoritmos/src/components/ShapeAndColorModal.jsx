import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const shapeOptions = [
  { name: "circle", display: "⬤" },
  { name: "ellipse", display: "⬭" },
  { name: "box", display: "▢" },
  { name: "star", display: "★" },
  { name: "text", display: "T" },
];

const ShapeAndColorModal = ({ isOpen, nodeId, currentLabel, currentShape, currentColor, onClose, onChange }) => {
  const [nodeLabel, setNodeLabel] = useState(currentLabel || "Nodo");
  const [chosenShape, setChosenShape] = useState(currentShape || "circle");
  const [chosenColor, setChosenColor] = useState(currentColor || "#000000");

  useEffect(() => {
    if (isOpen) {
      setNodeLabel(currentLabel);
      setChosenShape(currentShape);
      setChosenColor(currentColor);
    }
  }, [isOpen, currentLabel, currentShape, currentColor]);

  const handleShapeChange = (shape) => setChosenShape(shape);
  const handleColorChange = (event) => setChosenColor(event.target.value);
  const handleLabelChange = (event) => setNodeLabel(event.target.value);

  const handleConfirm = () => {
    onChange(nodeId, nodeLabel, chosenShape, chosenColor);
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
          width: 420,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 3,
          textAlign: "center",
          overflow: "visible",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* Título Editable (Nombre del Nodo) */}
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { color: "#95bb59" },
          }}
          onClick={() => document.getElementById("editableLabel").focus()}
        >
          <TextField
            id="editableLabel"
            variant="standard"
            value={nodeLabel}
            onChange={handleLabelChange}
            sx={{
              textAlign: "center",
              input: {
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                borderBottom: "none",
              },
            }}
          />
        </Typography>

        {/* Etiqueta para el Nombre */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "-180px",
            backgroundColor: "#ffd54f",
            color: "#333",
            borderRadius: "10px",
            padding: "10px 20px",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transform: "rotate(0deg)",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "-15px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "0",
              height: "0",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderRight: "15px solid #ffd54f",
            },
          }}
        >
          ✏️ Edita el nombre
        </Box>

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
                borderRadius: "5px",
                "&:hover": {
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                },
              }}
            >
              {shape.display}
              {chosenShape === shape.name && (
                <span style={{ position: "absolute", bottom: 2, right: 2, fontSize: "14px", color: "green" }}>✔️</span>
              )}
            </Box>
          ))}
        </Box>

        {/* Etiqueta para Forma */}
        <Box
          sx={{
            position: "absolute",
            top: "90px",
            right: "-180px",
            backgroundColor: "#aed581",
            color: "#333",
            borderRadius: "10px",
            padding: "10px 20px",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transform: "rotate(0deg)",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "-15px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "0",
              height: "0",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderRight: "15px solid #aed581",
            },
          }}
        >
          🎨 Cambia la forma
        </Box>

        {/* Selección de Color */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center", mb: 3 }}>
          <input
            type="color"
            value={chosenColor}
            onChange={handleColorChange}
            style={{
              width: "50px",
              height: "50px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          />
          <TextField
            variant="outlined"
            sx={{ width: "120px" }}
            value={chosenColor}
            onChange={handleColorChange}
          />
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: chosenColor,
            }}
          />
        </Box>

        Etiqueta para Color
        <Box
          sx={{
            position: "absolute",
            top: "195px",
            right: "-180px",
            backgroundColor: "#64b5f6",
            color: "#fff",
            borderRadius: "10px",
            padding: "10px 20px",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transform: "rotate(0deg)",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "-15px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "0",
              height: "0",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderRight: "15px solid #64b5f6",
            },
          }}
        >
          🎨 Cambia un color
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button variant="contained" sx={{ backgroundColor: "#95bb59", color: "white" }} onClick={handleConfirm}>
            ACEPTAR
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#5e646b", color: "white" }} onClick={onClose}>
            CANCELAR
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShapeAndColorModal;