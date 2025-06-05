import React, { useState, useEffect } from "react";
import { Layers, ArrowUpDown, ArrowLeft, Home, TreePine, Waypoints, BrainCircuit} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

import NodosPage from "../nodos/NodosPage";
import SortPage from "../sorts/SortPage";
import NorthPage from "../noroeste/NorthPage";
import TreePages from "../arboles/TreePages";
import CaminosPage from "../caminos/NodosPage";

// Create a proper component for the Home redirect
const HomeRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return <div>Redirigiendo al Home...</div>;
};

const EmptyComponent = () => <div></div>;


const FolderTabsLayout = () => {
  const navigate = useNavigate();
  const { tabId } = useParams();
  
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("grafos");

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: <Home />,
      bgColor: "#64B5F6",
      textColor: "#0D47A1",
      borderColor: "#64B5F6",
      navbarColor: "#64B5F6",
      gradientStart: "#64B5F6",
      gradientEnd: "#90CAF9",
      component: HomeRedirect, 
    },
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
      fontFamily: "'Inter', sans-serif",
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
      label: "Norwest",
      icon: <ArrowLeft />,
      bgColor: "#A5D6A7",
      textColor: "#2E7D32",
      borderColor: "#A5D6A7",
      navbarColor: "#A5D6A7",
      gradientStart: "#dbeafe",
      gradientEnd: "#93c5fd",
      component: NorthPage,
    },
    {
      id: "tree",
      label: "Trees",
      icon: <TreePine/>, 
      bgColor: "#FFCC80",       
      textColor: "#E65100",     
      borderColor: "#FFB74D",   
      navbarColor: "#FFCC80",   
      gradientStart: "#FFF3E0", 
      gradientEnd: "#FFB74D",   
      component: TreePages,
    },
    {
      id: "caminos",
      label: "Dijkstra y Kruskal",
      icon: <Waypoints/>, 
      bgColor: "rgb(216, 182, 255)",       
      textColor: "rgb(163, 87, 248)",     
      borderColor: "rgb(216, 182, 255)",   
      navbarColor: "rgb(216, 182, 255)",   
      gradientStart: "#FFF3E0", 
      gradientEnd: "#FFB74D",   
      component: CaminosPage,
    },
    {
      id: "fuzzy",
      label: "Fuzzy Logic",
      icon: <BrainCircuit />,
      bgColor: "#B2DFDB",
      textColor: "#00695C",
      borderColor: "#80CBC4",
      navbarColor: "#B2DFDB",
      gradientStart: "#E0F2F1",
      gradientEnd: "#80CBC4",
      component: EmptyComponent, // ← Aquí está el arreglo
      onClick: () => {
        fetch('http://localhost:3001/abrir-matlab')
          .then(res => res.text())
          .then(msg => {
            import('sweetalert2').then(Swal => {
              Swal.default.fire({
                icon: 'success',
                title: '¡MATLAB abierto!',
                text: msg,
                confirmButtonColor: '#00695C'
              });
            });
          })
          .catch(err => {
            import('sweetalert2').then(Swal => {
              Swal.default.fire({
                icon: 'error',
                title: 'Error al abrir MATLAB',
                text: 'No se pudo conectar con el backend',
                confirmButtonColor: '#d33'
              });
            });
          });
      }
    },
  ];

  // Actualizar la pestaña activa cuando cambia el parámetro de URL
  useEffect(() => {
    if (tabId && tabs.some(tab => tab.id === tabId)) {
      setActiveTab(tabId);
    }
  }, [tabId]);

  const handleTabChange = (id) => {
    const selectedTab = tabs.find(tab => tab.id === id);

    if (selectedTab?.onClick) {
      selectedTab.onClick();
    }
    if (id === "home") {
      // Si se pulsa la pestaña Home, navegar directamente al inicio
      navigate('/');
      return;
    }
    
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
      padding: "0px 20px",
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
              padding: "4px",
              borderRadius: "50%",
              background: 'transparent'
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