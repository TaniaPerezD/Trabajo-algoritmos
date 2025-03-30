import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'animate.css/animate.min.css';
import { WOW } from 'wowjs';

import Preloader from '../components/Preloader';
import ScrollToTop from '../components/ScrollToTop';
import LoadTop from '../components/ScrollToTop/LoadTop';

import MainPage from '../pages/home';
import NodosPage from '../pages/nodos';
import About from '../pages/about';
import ScePage from '../pages/grafos';
import SortPage from '../pages/sorts';
import ArbolPage from '../pages/arboles';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  //preloader
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  //Initialize wow
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
        <Route path="/nodos" element={<NodosPage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/sce" element={<ScePage/>}/>
        <Route path="/sort" element={<SortPage/>}/>
        <Route path="/arbol" element={<ArbolPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
