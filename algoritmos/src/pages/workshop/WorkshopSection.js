import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../components/SVG';

import aboutImg1 from '../../assets/img/about/sort2.png';
import aboutImg2 from '../../assets/img/about/sort3.png';
import aboutImg3 from '../../assets/img/about/sort1.png';
import shapeImg1 from '../../assets/img/about/ed-shape-2-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-2-2.png';
import titleImg from '../../assets/img/about/title-home2.png';

import aboutImg4 from '../../assets/img/about/selesort2.png';
import aboutImg5 from '../../assets/img/about/selesort3.png';
import aboutImg6 from '../../assets/img/about/selectionsort1.png';
import aboutImg7 from '../../assets/img/about/insersort2.png';
import aboutImg8 from '../../assets/img/about/inssersort0.jpg';
import aboutImg9 from '../../assets/img/about/insersort1.png';

const Workshop = () => {
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
                <img src={titleImg} alt=""></img> sobre sorts
              </span>
              <h2 className="it-section-title-3 pb-30">
                TITULO{' '}
              </h2>
              <p>
              Propuesta de Mejora para la Gestión de Ambulancias y Respuesta a Emergencias en La Paz- Bolivia, 
              mediante Algoritmos de Optimización de Rutas   
                <br />

              </p>
            </div>
        
          </div>
        </div>

        <div className="it-about-3-area grey-bg pt-120 pb-120 w-100">
        <div className="row align-items-center mx-0">
            {/* Texto a la izquierda */}
            <div
            className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
            >
            <div className="it-about-3-title-box">
                <span className="it-section-subtitle-3">
                <img src={titleImg} alt="" /> INTRODUCCION
                </span>
                <h2 className="it-section-title-3 pb-30">INTRODUCCION</h2>
                <p>
                En Bolivia, los sistemas de atención de emergencias enfrentan diversos desafíos, entre ellos la demora en la llegada de ambulancias, la asignación ineficiente de recursos y la falta de criterios 
                dinámicos para seleccionar el hospital más adecuado según la situación del paciente. Estas deficiencias pueden marcar la diferencia entre la vida y la muerte en situaciones críticas. 
                <br />
                El presente proyecto propone el desarrollo de una solución tecnológica basada en algoritmos de optimización de rutas, como el algoritmo de Dijkstra, y métodos de asignación de recursos, como el modelo 
                de asignación tipo Northwest Corner o el método húngaro, con el fin de mejorar la eficiencia del sistema de ambulancias. Se pretende reducir los tiempos de respuesta y traslado, asignar ambulancias 
                disponibles de forma óptima, y determinar automáticamente el hospital más conveniente de acuerdo con la capacidad de atención de los centros de salud abiertos a emergencias.
                <br />
                </p>
            </div>
            </div>

            {/* Imágenes a la derecha */}
            <div
            className="col-xl-6 col-lg-6 wow animate__fadeInRight"
            data-wow-duration=".9s"
            data-wow-delay=".7s"
            >
            <div className="ed-about-2-left p-relative text-end">
                <div className="ed-about-2-left-box d-inline-flex align-items-end">
                <div className="ed-about-2-thumb-one pb-110 mr-20">
                    <img src={aboutImg4} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                    <img className="mb-20 inner-top-img" src={aboutImg5} alt="" />
                    <img src={aboutImg6} alt="" />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <div className="row align-items-center">
          <div
            className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <div className="ed-about-2-left p-relative text-end">
              <div className="ed-about-2-left-box d-inline-flex align-items-end">
                <div className="ed-about-2-thumb-one pb-110 mr-20">
                  <img src={aboutImg7} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                  <img className="mb-20 inner-top-img" src={aboutImg8} alt="" />
                  <img src={aboutImg9} alt="" />
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
              <img src={titleImg} alt="" /> PROYECTO
                </span>
                <h2 className="it-section-title-3 pb-30">PROBLEMA</h2>
              <p>
              El sistema de emergencias médicas en la ciudad de La Paz presenta serias deficiencias en la asignación de ambulancias y en la planificación de rutas, 
              lo que genera demoras significativas en la atención y traslado de pacientes. Esta ineficiencia operativa se traduce en tiempos de espera elevados, 
              afectando la capacidad de respuesta en situaciones críticas y comprometiendo la calidad del servicio de salud. La falta de un sistema inteligente que 
              optimice el uso de los recursos disponibles y la selección de rutas adecuadas limita gravemente la efectividad del sistema de emergencias.
              </p>
            </div>
          </div>
        </div>

        <div className="it-about-3-area grey-bg pt-120 pb-120 w-100">
        <div className="row align-items-center mx-0">
            {/* Texto a la izquierda */}
            <div
            className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
            >
            <div className="it-about-3-title-box">
                <span className="it-section-subtitle-3">
                <img src={titleImg} alt="" /> PROYECTO
                </span>
                <h2 className="it-section-title-3 pb-30">OBJETIVO GENERAL</h2>
                <p>
                Proponer una solución tecnológica basada en algoritmos de optimización de rutas y asignación de recursos para mejorar la eficiencia del sistema de ambulancias y emergencias en La Paz-Bolivia, con el fin de reducir los tiempos de espera y traslado de los pacientes. 
                </p>
            </div>
            </div>

            {/* Imágenes a la derecha */}
            <div
            className="col-xl-6 col-lg-6 wow animate__fadeInRight"
            data-wow-duration=".9s"
            data-wow-delay=".7s"
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
            </div>
            </div>
        </div>
        </div>

        <div className="row align-items-center">
          <div
            className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <div className="ed-about-2-left p-relative text-end">
              <div className="ed-about-2-left-box d-inline-flex align-items-end">
                <div className="ed-about-2-thumb-one pb-110 mr-20">
                  <img src={aboutImg7} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                  <img className="mb-20 inner-top-img" src={aboutImg8} alt="" />
                  <img src={aboutImg9} alt="" />
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
              <img src={titleImg} alt="" /> PROYECTO
                </span>
                <h2 className="it-section-title-3 pb-30">OBJETIVOS ESPECIFICOS</h2>
              <ol>
                <li>Diseñar un sistema de gestión de ambulancias que integre datos sobre disponibilidad de vehículos, y capacidad hospitalaria. </li>
                <li>Implementar el algoritmo de Dijkstra para calcular las rutas más cortas y rápidas entre el lugar de emergencia y los hospitales disponibles. </li>
                <li>Aplicar un modelo de asignación (como el método Northwest Corner o el método húngaro) para optimizar la distribución de ambulancias según la demanda y la disponibilidad geográfica. </li>
                <li>Validar el sistema propuesto mediante simulaciones o pruebas piloto en entornos urbanos seleccionados de Bolivia.</li>
                <li>Analizar los resultados obtenidos en términos de mejora en tiempos de respuesta y eficiencia operativa del sistema. </li>
              </ol>
            </div>
          </div>
        </div>

        
        
      </div>
    </div>

    

    

    
  );
};
export default Workshop;
