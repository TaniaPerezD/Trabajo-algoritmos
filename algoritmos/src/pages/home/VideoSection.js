import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import videoBG from '../../assets/img/video/bg-4-1.jpg';
import shapeImg1 from '../../assets/img/video/ed-shape-1-1.png';
import shapeImg2 from '../../assets/img/video/ed-shape-1-2.png';
import shapeImg3 from '../../assets/img/video/shape-1-5.png';
import subTitleSVG from '../../assets/img/video/svg.svg';

const Video = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // URL del video de YouTube (reemplaza con la URL de tu video)
  const videoURL = "https://www.youtube.com/embed/KGrVhm0rDY4";

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="it-video-area it-video-style-4 it-video-bg ed-video-style-2 p-relative fix"
      style={{ backgroundImage: `url(${videoBG})` }}
    >
      <div className="it-video-shape-2 d-none d-lg-block">
        <img src={shapeImg1} alt="" />
      </div>
      <div className="it-video-shape-5 d-none d-lg-block">
        <img src={shapeImg3} alt="" />
      </div>
      <div className="it-video-shape-6 d-none d-lg-block">
        <img src={shapeImg2} alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-7 col-md-9 col-sm-9">
            <div className="it-video-content">
              <span className="it-section-subtitle-5 sky">
                <img src={subTitleSVG} alt="" />
                ¿ESTÁS LISTO PARA REVOLUCIONAR EL MUNDO EMPRESARIAL?
              </span>
              <h3 className="it-video-title">Conoce más sobre nuestra carrera en este video y prepárate para 
              convertir tus sueños en acciones concretas que impulsen el éxito empresarial.</h3>
              <p>
                Descubre cómo Ingeniería en Innovación Empresarial te prepara para 
                liderar el cambio,  <br />
                transformar ideas en grandes proyectos y convertirte en el profesional que 
                las empresas de hoy necesitan. <br />
              </p>
              
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-3 col-sm-3">
            <div className="it-video-play-wrap d-flex justify-content-center align-items-center">
              <div className="it-video-play text-center">
                <Link
                  className="popup-video play"
                  to="#"
                  onClick={openModal}
                >
                  <i className="fas fa-play"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Video */}
      {isOpen && (
        <div className="video-modal-overlay" 
             style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: 'rgba(0, 0, 0, 0.75)',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               zIndex: 9999
             }}>
          <div className="video-modal-content" 
               style={{
                 position: 'relative',
                 width: '80%',
                 maxWidth: '800px',
                 backgroundColor: '#000',
                 borderRadius: '8px',
                 overflow: 'hidden'
               }}>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 1
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="video-responsive" 
                 style={{
                   overflow: 'hidden',
                   paddingTop: '56.25%',
                   position: 'relative',
                   height: 0
                 }}>
              <iframe 
                width="100%" 
                height="100%" 
                src={videoURL}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;