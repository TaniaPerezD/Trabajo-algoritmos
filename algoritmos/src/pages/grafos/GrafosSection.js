import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../components/SVG';

import aboutImg1 from '../../assets/img/about/grafos5.png';
import aboutImg2 from '../../assets/img/about/grafos1.png';
import aboutImg3 from '../../assets/img/about/grafitoo.png';
import shapeImg1 from '../../assets/img/about/ed-shape-2-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-2-2.png';
import titleImg from '../../assets/img/about/title-home2.png';

const Grafos = () => {
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
                <img src={titleImg} alt=""></img> sobre grafos
              </span>
              <h2 className="it-section-title-3 pb-30">
                ¿ Qué es un grafo ?{' '}
              </h2>
              <p>
                En matemáticas y en ciencias de la computación, la teoría de grafos estudia las propiedades de los grafos.
                <br />
                Un grafo es un conjunto, no vacío, de objetos llamados vértices (o
                nodos) y una selección de pares de vértices, llamados aristas (edges en inglés)
                que pueden ser orientados o no. Típicamente, un grafo se representa
                mediante una serie de puntos (los vértices)
                conectados por líneas (las aristas).
                <br />
                
              </p>
            </div>
            <div className="it-about-3-mv-box">
              <div className="row">
                <div className="col-xl-6 col-md-6">
                  <div className="it-about-3-mv-item">
                    <span className="it-about-3-mv-title">GRAFOS DIRIGIDOS:</span>
                    <p>
                    En un grafo dirigido, las aristas tienen una dirección establecida. Por tanto, la relación entre dos nodos 
                    no es necesariamente simétrica. Si hay una arista de A a B, no necesariamente hay una arista de B a A. En 
                    este caso, la eliminación de una arista sólo afecta el nodo que la pierde.
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="it-about-3-mv-item">
                    <span className="it-about-3-mv-title">GRAFOS NO DIRIGIDOS:</span>
                    <p>
                    En un grafo no dirigido, las aristas que conectan dos nodos no tienen dirección. Es decir, la relación entre 
                    dos nodos es simétrica, lo que significa que si existe una arista de un nodo A al nodo B, también existe una 
                    arista de B a A. Por lo tanto, si una arista se elimina en un grafo no dirigido, ambos vértices pierden la conexión.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="it-about-3-btn-box p-relative">
              <Link className="ed-btn-theme theme-2" to="/nodos">
                IR A LA PAGINA DE GRAFOS
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
export default Grafos;
