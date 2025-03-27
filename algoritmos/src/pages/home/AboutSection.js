import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el Link de react-router-dom
import SectionTitle from '../../components/SectionTitle';

import shapeImg1 from '../../assets/img/about/about-3-shap-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-3-1.png';
import aboutImg1 from '../../assets/img/about/grafos1.png';
import aboutImg2 from '../../assets/img/about/grafos2.jpg';

const About = () => {
  const items = [
    {
      icon: 'flaticon-video-1',
      title: '¿Qué es un grafo matemático?',
      description: [
        'Un grafo es una estructura matemática que consiste en un conjunto de nodos (o vértices) y un conjunto de aristas (o enlaces) que conectan pares de nodos.',
        'Los grafos se utilizan para modelar relaciones entre objetos y son fundamentales en diversas áreas de la informática, como algoritmos, redes y teoría de grafos.',
      ]
    },
    {
      icon: 'flaticon-puzzle',
      title: 'Definiciones',
      description: [
        'Vertices: Los vértices son los puntos o nodos en un grafo. Representan entidades o elementos individuales.',
        'Aristas: Las aristas son las conexiones entre los vértices. Pueden ser dirigidas (con una dirección) o no dirigidas (sin dirección).',

      ]
    },
  ];

  return (
    <div
      id="it-about"
      className="it-about-3-area it-about-4-style p-relative grey-bg pt-120 pb-120"
    >
      <div className="ed-about-3-shape-2">
        <img src={shapeImg1} alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="ed-about-3-thumb-wrap p-relative">
              <div className="ed-about-3-shape-1 d-none d-md-block">
                <img src={shapeImg2} alt="" />
              </div>
              <div className="ed-about-3-thumb">
                <img src={aboutImg1} alt="" />
              </div>
              <div className="ed-about-3-thumb-sm">
                <img src={aboutImg2} alt="" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <SectionTitle
              itemClass="it-about-3-title-box"
              subTitleClass="it-section-subtitle-5 purple-2"
              subTitle="ACERCA DE GRAFOS"
              titleClass="it-section-title-3 pb-30"
              title="GRAFOS"
              titleImage=""
              description=" "
            />

            <div className="it-about-3-mv-box">
              <div className="row">
                {items.map((item, index) => (
                  <div key={index} className="col-xl-12">
                    <div className="it-about-4-list-wrap d-flex align-items-start">
                      <div className="it-about-4-list-icon">
                        <span>
                          <i className={item.icon}></i>
                        </span>
                      </div>
                      <div className="it-about-3-mv-item">
                        <span className="it-about-3-mv-title">
                          {item.title}
                        </span>
                        <div>
                          {item.description.map((item, index) =>
                            <p key={index}>• {item}</p>
                          ) 
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agregamos el botón que redirige a otra ruta */}
            <div className="it-about-3-btn">
              <Link to="/nodos" className="btn btn-primary">
                Ir a la página de grafos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
