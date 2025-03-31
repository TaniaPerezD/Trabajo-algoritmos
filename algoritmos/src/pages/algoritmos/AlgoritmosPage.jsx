import React, { useState, useEffect } from "react";
import { Layers, ArrowUpDown, MoveDiagonal, Code, Aperture, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

import NodosPage from "../nodos/NodosPage";
import SortPage from "../sorts/SortPage";
import NorthPage from "../noroeste/NorthPage";

const FolderTabsLayout = () => {
  const tabs = [
    {
      id: "grafos",
      label: "Pizarra de Grafos",
      icon: <Layers />,
      bgColor: "rgb(226,188,157)",
      textColor: "rgb(144, 95, 54)",
      borderColor: "rgb(226,188,157)",
      navbarColor: "rgb(226,188,157)",
      gradientStart: "rgb(226,188,157)",
      gradientEnd: "rgb(246,208,177)",
      component: NodosPage,
    },
    {
      id: "sort",
      label: "Sort",
      icon: <ArrowUpDown />,
      bgColor: "#f8b1c5",
      textColor: "rgb(195, 71, 106)",
      borderColor: "#f8b1c5",
      navbarColor: "rgb(248, 177, 197)",
      gradientStart: "#dbeafe",
      gradientEnd: "#93c5fd",
      component: SortPage,
    },{
      id: "north",
      label: "Northwest",
      icon: <ArrowLeft />,
      bgColor: "#A5D6A7",
      textColor: "#2E7D32",
      borderColor: "#A5D6A7",
      navbarColor: "#A5D6A7",
      gradientStart: "#dbeafe",
      gradientEnd: "#93c5fd",
      component: NorthPage,
    },
  ];

  // Obtener el parámetro de la URL
  const { tabId } = useParams();
  const navigate = useNavigate();
  
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("grafos");

  // Actualizar la pestaña activa cuando cambia el parámetro de URL
  useEffect(() => {
    if (tabId && tabs.some(tab => tab.id === tabId)) {
      setActiveTab(tabId);
    }
  }, [tabId]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    navigate(`/tabs/${id}`);
  };

  const currentActiveTab = tabs.find(tab => tab.id === activeTab) || tabs[0];

  const tabStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      fontFamily: "'Inter', sans-serif",
    },
    navbar: {
      display: "flex",
      alignItems: "flex-end",
      gap: "10px",
      padding: "5px 20px",
      backgroundColor: currentActiveTab.navbarColor,
      position: "relative",
      zIndex: 10,
    },
    tabExtension: {
      position: "absolute",
      left: 0,
      right: 0,
      height: "20px",
      bottom: "-20px",
      backgroundColor: currentActiveTab.bgColor,
      zIndex: 5,
    },
    tab: (isActive, bgColor, textColor, borderColor) => ({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 20px",
      borderRadius: "12px 12px 0 0",
      border: `2px solid ${borderColor}`,
      borderBottom: isActive ? "none" : `2px solid ${borderColor}`,
      background: isActive 
        ? `linear-gradient(145deg, ${bgColor}, ${borderColor})` 
        : `rgba(255, 255, 255, 0.6)`,
      color: isActive ? textColor : `${textColor}80`,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "14px",
      fontWeight: "600",
      position: "relative",
      top: isActive ? "0px" : "4px", 
      boxShadow: isActive 
        ? "0 8px 20px rgba(0, 0, 0, 0.15)" 
        : "0 2px 4px rgba(0, 0, 0, 0.1)", 
      transform: isActive ? "scale(1.05)" : "scale(1)", 
      textShadow: isActive ? "1px 1px 2px rgba(0,0,0,0.1)" : "none", 
      zIndex: isActive ? 15 : 1,
    }),
    mainContent: {
      flexGrow: 1,
      backgroundColor: currentActiveTab.bgColor,
      borderRadius: "0 15px 15px 15px",
      margin: "0 0px 0px",
      overflow: "hidden",
    },
  };

  const ActiveComponent = currentActiveTab.component;

  return (
    <div style={tabStyles.container}>
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
            onClick={() => handleTabChange(tab.id)}
          >
            <div style={{
              width: "24px",
              height: "24px",
              padding: "4px",
              borderRadius: "50%",
              background: activeTab === tab.id 
                ? 'rgba(255,255,255,0.2)' 
                : 'transparent'
            }}>
              {React.cloneElement(tab.icon, {
                color: activeTab === tab.id ? 'white' : tab.textColor,
                strokeWidth: activeTab === tab.id ? 2.5 : 2,
              })}
            </div>
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      <div style={tabStyles.mainContent}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FolderTabsLayout;