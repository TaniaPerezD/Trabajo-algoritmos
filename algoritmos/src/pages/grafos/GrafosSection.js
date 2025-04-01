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
              <Link className="ed-btn-theme theme-2" to="/tabs/grafos">
                IR A LA PAGINA DE GRAFOS
                <i>
                  <RightArrow />
                </i>
              </Link>
            </div>
          </div>
        </div>
        <div className="it-about-3-area bg-white pt-120 pb-120 w-100">
        <div className="row align-items-center mx-0">
            {/* Texto a la izquierda */}
            <div
            className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
            >
            <div className="it-about-3-title-box">
                <span className="it-section-subtitle-3">
                <img src={titleImg} alt="" /> Aplicaciones de grafos
                </span>
                <h2 className="it-section-title-3 pb-30">ALGORITMO JOHNSON</h2>
                <p>
                La regla de Johnson es un algoritmo heurístico utilizado para resolver situaciones de secuenciación de 
                procesos que operan dos o más órdenes (operaciones) que pasan a través de dos máquinas o centros de trabajo. 
                Su principal objetivo es minimizar el tiempo de procesamiento total del grupo de trabajos. Este algoritmo 
                consiste en la aplicación de cuatro sencillos pasos:
                <br />
                <ul>
                  <li>El primer paso consiste en listar todos los trabajos u operaciones junto con su tiempo de procesamiento por cada centro de trabajo o máquina.</li>
                  <li>El segundo paso consiste en seleccionar el tiempo de procesamiento más corto. Recuerde que como resultado de la aplicación del paso 1 obtenemos 
                  dos columnas de tiempos (tiempos del centro de trabajo 1 y 2); Sí el tiempo más corto se encuentra en la columna correspondiente al centro de trabajo 
                  (máquina) 1, este trabajo se programa primero, en caso contrario y de estar en la columna correspondiente al centro de trabajo 2, este trabajo se programa 
                  al final. Cualquier empate puede romperse de forma arbitraria.</li>
                  <li>Una vez se programa un trabajo, sea al inicio o sea al final, este se elimina de la lista inicial.</li>
                  <li>Se deben repetir los pasos 2 y 3 para los trabajos restantes, trabajando hacia el centro de la secuencia.</li>
                </ul>
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
        <div className="row align-items-center ">
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
                <img src={titleImg} alt=""></img> aplicaciones de grafos
              </span>
              <h2 className="it-section-title-3 pb-30">
                ALGORITMO DE ASIGNACION{' '}
              </h2>
              <p>
              El problema de asignación consiste en encontrar la forma de asignar ciertos recursos disponibles (máquinas o personas) para la realización de determinadas tareas al menor coste, 
              suponiendo que cada recurso se destina a una sola tarea, y que cada tarea es ejecutada por uno solo de los recursos. 
              Formalmente, el problema de la asignación consiste en encontrar un emparejamiento de peso óptimo en un grafo bipartito ponderado. El problema de asignación es un caso particular del problema 
              de transporte, en el que la oferta en cada origen y la demanda en cada destino son ambas de valor 1.
                <br />
                <h3 ><br />
                CARACTERISTICAS</h3>
                El problema de asignación presenta las siguientes características:<br />
                <ul>
                  <li>El Problema de Asignación debe estar equilibrado, es decir, que la relación entre las ofertas y las demandas sean igual a 1. Un elemento importante para el problema de asignación es 
                  la matriz de costos. Si el número de renglones o columnas no son iguales el problema está desbalanceado y se puede obtener una solución incorrecta. Para obtener una solución correcta la 
                  matriz debe ser cuadrada.</li>
                  <li>Si el número de agentes y tareas son iguales y el coste total de la asignación para todas las tareas es igual a la suma de los costes de cada agente (o la suma de los costes de cada 
                  tarea, que es lo mismo en este caso), entonces el problema es llamado problema de asignación lineal. Normalmente, cuando hablamos de problema de asignación sin ninguna matización adicional, 
                  nos referimos al problema de asignación lineal.</li>
                </ul>
                <strong>Oferta: </strong>Cantidad que representa la disponibilidad del artículo en la fuente/fábrica de donde proviene.<br />
                <strong>Demanda: </strong>Cantidad de artículos que necesita recibir el destino para cumplir sus necesidades. <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Grafos;
