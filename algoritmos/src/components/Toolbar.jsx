import React from "react";

const Toolbar = () => {
  return (
    <div style={{
        width: "100px", // Reducimos un poco el ancho
        background: "#f4f4f4",
        padding: "10px",
        borderRight: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centra completamente el círculo
        height: "50%", // Ajustar al tamaño del contenedor padre
        minHeight: "430px", // Evita que crezca en exceso
      }}
    >
      {/* Nodo circular */}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "2px solid black",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
        }}
        draggable
        onDragStart={(event) => event.dataTransfer.setData("type", "circle")}
      >
      </div>
    </div>
  );
};

export default Toolbar;