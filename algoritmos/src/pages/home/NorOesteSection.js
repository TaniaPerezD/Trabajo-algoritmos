import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el Link de react-router-dom
import SectionTitle from '../../components/SectionTitle';

import shapeImg1 from '../../assets/img/about/about-3-shap-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-3-1.png';
import aboutImg1 from '../../assets/img/about/grafito2.png';
import aboutImg2 from '../../assets/img/about/noroeste.jpg';

const NorOeste = () => {
  const items = [
    {
      icon: 'flaticon-video-1',
      title: '¿De qué trata el método de la Esquina Noroeste?',
      description: [
        'El método de la esquina noroeste es un procedimiento utilizado en problemas de transporte para encontrar una solución inicial factible. Se basa en llenar la tabla de distribución comenzando por la celda en la esquina superior izquierda ("noroeste") y asignando valores según la oferta y la demanda disponibles. Luego, se avanza hacia la derecha o hacia abajo hasta completar todas las asignaciones. Aunque no garantiza la solución óptima, proporciona un punto de partida para métodos de optimización más avanzados, como el método de distribución modificada (MODI).',
        
      ]
    },
    {
      icon: 'flaticon-puzzle',
      title: 'Beneficios',
      description: [
        'El método de la esquina noroeste es una técnica simple y eficiente para obtener una solución inicial factible en problemas de transporte, comenzando por asignar valores en la celda superior izquierda de la tabla y avanzando hacia la derecha o abajo. Aunque no garantiza la solución óptima, es fácil de implementar y proporciona un punto de partida rápido y sencillo para aplicar métodos de optimización posteriores, como el método MODI, permitiendo así mejorar la distribución y reducir los costos. Además, se puede aplicar a problemas de diferentes tamaños y configuraciones, minimizando los cálculos iniciales y ahorrando tiempo en problemas grandes.',
      ]
    },
  ];

  return (
    <div
      id="it-about"
      className="it-about-3-area it-about-4-style p-relative white-bg pt-120 pb-120"
    >
      <div className="ed-about-3-shape-2">
        <img src={shapeImg1} alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
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
              subTitle="ACERCA DE NORWEST"
              titleClass="it-section-title-3 pb-30"
              title="NORWEST"
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

            <div className="it-video-button d-flex justify-content-center align-items-center gap-4">
            <Link className="ed-btn-square theme" to="/norwest">
              <span>Ver más de norwest</span>
            </Link>
            <Link className="ed-btn-square purple-3" to="/nodos">
              <span>Ir a la página de Norwest</span>
            </Link>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NorOeste;