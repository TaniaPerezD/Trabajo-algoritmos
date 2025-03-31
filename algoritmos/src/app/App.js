import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'animate.css/animate.min.css';
import { WOW } from 'wowjs';

import Preloader from '../components/Preloader';
import ScrollToTop from '../components/ScrollToTop';
import LoadTop from '../components/ScrollToTop/LoadTop';

import MainPage from '../pages/home';
import About from '../pages/about';
import FolderTabsLayout from '../pages/algoritmos/AlgoritmosPage'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Preloader
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Initialize wow
  useEffect(() => {
    new WOW({ live: false, animateClass: 'animate__animated' }).init();
  }, [location]);

  return (
    <div className="App">
      {isLoading && <Preloader />}
      <ScrollToTop />
      <LoadTop />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/about-us" element={<About />} />
        
        {/* Ruta para el componente de pestañas con parámetro */}
        <Route path="/tabs/:tabId" element={<FolderTabsLayout />} />
        
        {/* Redirecciones de las rutas antiguas a las nuevas pestañas */}
        <Route path="/nodos" element={<Navigate to="/tabs/grafos" replace />} />
        <Route path="/sce" element={<Navigate to="/tabs/grafos" replace />} />
        <Route path="/sort" element={<Navigate to="/tabs/sort" replace />} />
        <Route path="/arbol" element={<Navigate to="/tabs/grafos" replace />} />
        <Route path="/norwest" element={<Navigate to="/tabs/north" replace />} />
        
        {/* Ruta por defecto para las pestañas */}
        <Route path="/tabs" element={<Navigate to="/tabs/grafos" replace />} />
      </Routes>
    </div>
  );
}

export default App;