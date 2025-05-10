import React from "react";

const Toolbar = () => {
  return (
    <div
      style={{
        width: "125px",
        background: "#f4f4f4",
        padding: "10px",
        borderRight: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "50%",
        minHeight: "530px", 
        gap: "30px", 
      }}
    >
      {/* Nodo circular */}
      <div
        style={{
          marginTop: "25px",
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
        onDragStart={(event) => event.dataTransfer.setData("shape", "circle")}
      ></div>

      {/* Nodo elipse */}
      <div
        style={{
          width: "60px",
          height: "40px",
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
        onDragStart={(event) => event.dataTransfer.setData("shape", "ellipse")}
      ></div>

      {/* Nodo Box */}
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "2px solid black",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
        }}
        draggable
        onDragStart={(event) => event.dataTransfer.setData("shape", "box")}
      ></div>

      {/* Nodo estrella */}
      <div
        style={{
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
        }}
        draggable
        onDragStart={(event) => event.dataTransfer.setData("shape", "star")}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9" />
        </svg>
      </div>

      {/* Nodo texto */}
      <div 
        id="texto"
        style={{
          width: "50px",
          height: "30px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
          fontSize: "50px",

        }}
        draggable
        onDragStart={(event) => event.dataTransfer.setData("shape", "text")}
      >
        T
      </div>
    </div>

    
  );
};

export default Toolbar;