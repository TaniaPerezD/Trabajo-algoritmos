import React, { useState } from "react";
import { Layers, ArrowUpDown, MoveDiagonal } from "lucide-react";
import NodosPage from "./NodosPage";
import { motion } from "framer-motion";

const FolderTabsLayout = () => {
  const [activeTab, setActiveTab] = useState("grafos");

  const tabStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    navbar: {
      display: "flex",
      alignItems: "flex-end",
      gap: "5px",
      padding: "10px",
      marginLeft: "20px",
    },
    tab: (isActive, bgColor, textColor, borderColor) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "14px 20px",
      borderRadius: "10px 10px 0 0",
      border: `2px solid ${borderColor}`,
      borderBottom: isActive ? "none" : `2px solid ${borderColor}`,
      background: isActive 
        ? bgColor // Activa: color pasado como argumento
        : "#ffffff", // Inactiva: blanco
      color: textColor,
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      fontSize: "14px",
      fontWeight: "bold",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      top: isActive ? "0px" : "5px",
      boxShadow: isActive 
        ? "3px -3px 8px rgba(0,0,0,0.15)" 
        : "inset 0px -2px 4px rgba(0,0,0,0.1)", // Sombra en la parte inferior
      transform: isActive ? "scale(1.02)" : "scale(1)", // Pequeño crecimiento al activar
    
      // Efecto de sombra en el texto para las letras
      textShadow: isActive 
        ? "2px 2px 4px rgba(0,0,0,0.2)" // Sombra suave en las letras activas
        : "none", // Sin sombra cuando está inactivo
    
      "::after": {
        content: '""',
        position: "absolute",
        top: "-2px",
        right: "-2px",
        width: "12px",
        height: "12px",
        backgroundColor: isActive ? "white" : bgColor,
        border: `2px solid ${borderColor}`,
        borderBottom: "none",
        borderLeft: "none",
        borderRadius: "2px",
        transform: "rotate(45deg)",
      },
    }),        
    mainContent: {
      flexGrow: 1,
      backgroundColor: "white",
      padding: "0px",
      borderRadius: "0 10px 10px 10px",
      boxShadow: "5px 5px 10px rgba(0,0,0,0.15)", // Sombra más fuerte
      margin: "0 0px 0px",
      border: "2px solid #ddd",
    },    
    icon: {
      width: "18px",
      height: "18px",
      padding: "6px",
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      boxShadow: "3px 3px 5px rgba(0,0,0,0.2), -3px -3px 5px rgba(255,255,255,0.5)",
    },
    
  };

  const tabs = [
    {
      id: "grafos",
      label: "Pizarra de Grafos",
      icon: <Layers style={tabStyles.icon} />,
      bgColor: "rgb(226,188,157)",
      textColor: "rgb(144, 95, 54)",
      borderColor: "rgb(226,188,157)",

    },
    {
      id: "sort",
      label: "Sort",
      icon: <ArrowUpDown style={tabStyles.icon} />, // Nuevo icono de ordenamiento
      bgColor: "#dbeafe",
      textColor: "#1e40af",
      borderColor: "#93c5fd",
    },
    {
      id: "noroeste",
      label: "Noroeste",
      icon: <MoveDiagonal style={tabStyles.icon} />, // Nuevo icono de dirección noroeste
      bgColor: "#e9d5ff",
      textColor: "#7c3aed",
      borderColor: "#c4b5fd",
    },
  ];

  const ActiveComponent = NodosPage;

  return (
    <div style={tabStyles.container}>
      {/* Barra de navegación con estilo de carpetas */}
      <div style={tabStyles.navbar}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={tabStyles.tab(
              activeTab === tab.id,
              tab.bgColor,
              tab.textColor,
              tab.borderColor
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      {/* Contenido Principal */}
      <div style={tabStyles.mainContent}>
      <motion.div 
          key={activeTab} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }} 
          transition={{ duration: 0.3 }}
        >
        <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default FolderTabsLayout;
