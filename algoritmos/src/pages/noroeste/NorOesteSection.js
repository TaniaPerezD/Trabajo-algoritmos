import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../components/SVG';

import aboutImg1 from '../../assets/img/about/grafos5.png';
import aboutImg2 from '../../assets/img/about/grafos1.png';
import aboutImg3 from '../../assets/img/about/noroeste.jpg';
import shapeImg1 from '../../assets/img/about/ed-shape-2-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-2-2.png';
import titleImg from '../../assets/img/about/title-home2.png';

const NorOeste = () => {
  return (
    <div id="it-about" className="it-about-3-area fix pt-120 pb-120 p-relative">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <div className="ed-about-2-left p-relative text-end">
              <div className="ed-about-2-left-box d-inline-flex align-items-end">
                <div className="ed-about-2-thumb-one pb-110 mr-20">
                  <img src={aboutImg1} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                  <img className="mb-20 inner-top-img" src={aboutImg2} alt="" />
                  <img src={aboutImg3} alt="" />
                </div>
              </div>
              <div className="ed-about-2-thumb-shape-1 d-none lg-block">
                <img src={shapeImg1} alt="" />
              </div>
              <div className="ed-about-2-thumb-shape-2 d-none d-xxl-block">
                <img src={shapeImg2} alt="" />
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 col-lg-6 wow animate__fadeInRight"
            data-wow-duration=".9s"
            data-wow-delay=".7s"
          >
            <div className="it-about-3-title-box">
              <span className="it-section-subtitle-3">
                <img src={titleImg} alt=""></img> sobre norwest
              </span>
              <h2 className="it-section-title-3 pb-30">
                ¿ De qué trata el método de la <span>Esquina Noroeste</span> ?{' '}
              </h2>
              <p>
              Este método, comienza por plantear, en forma de matriz, el problema que buscamos resolver. 
              Las filas representarán las fuentes y las columnas los destinos. luego el algoritmo debe de 
              iniciar en la celda, ruta o esquina Noroeste de la tabla, acontinuación se muestra cómo se 
              puede plantear este método para una empresa.
                <br />
                
              </p>
            </div>
            <div className="it-about-3-mv-box">
              <div className="row">
                <p>
                    <strong>Paso 1</strong><br />En la celda seleccionada como esquina Noroeste se debe asignar la máxima cantidad de unidades posibles, cantidad que se ve restringida ya sea por las restricciones de oferta o de demanda. En este mismo paso se procede a ajustar la oferta y demanda de la fila y columna afectada, restándole la cantidad asignada a la celda.<br />
                    <strong>Paso 2</strong><br />En este paso se procede a eliminar la fila o destino cuya oferta o demanda sea 0 después del «Paso 1», si dado el caso ambas son cero arbitrariamente se elige cuál eliminar y la restante se deja con demanda u oferta cero (0) según sea el caso.<br />
                    <strong>Paso 3</strong><br />Una vez en este paso existen dos posibilidades, la primera que quede un solo renglón o columna, si este es el caso se ha llegado al final el método, «detenerse».
                    La segunda es que quede más de un renglón o columna, si este es el caso iniciar nuevamente el «Paso 1».<br />
                </p>
              </div>
            </div>
            <div className="it-about-3-btn-box p-relative">
              <Link className="ed-btn-theme theme-2" to="/nodos">
                IR A LA PAGINA DE NORWEST
                <i>
                  <RightArrow />
                </i>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default NorOeste;
