import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../components/SVG';

import aboutImg1 from '../../assets/img/about/arbol1.jpg';
import aboutImg2 from '../../assets/img/about/arbol2.png';
import aboutImg3 from '../../assets/img/about/arbol3.png';
import shapeImg1 from '../../assets/img/about/ed-shape-2-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-2-2.png';
import titleImg from '../../assets/img/about/title-home2.png';

import aboutImg4 from '../../assets/img/about/preorden.png';
import aboutImg5 from '../../assets/img/about/inorden.png';
import aboutImg6 from '../../assets/img/about/postorden.png';

const Arboles = () => {
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
                <img src={titleImg} alt=""></img> sobre árboles
              </span>
              <h2 className="it-section-title-3 pb-30">
                TREE{' '}
              </h2>
              <p>
                <ul>
                  <li>Un árbol es una estructura de datos enlazada que organiza elementos en <strong>forma jerárquica.</strong> Es decir, hay una relación padre/hijos. </li>
                  <li>Cada nodo puede tener más de un hijo, pero <strong>un solo padre.</strong> </li>
                  <li>Existe un nodo que no tiene padre denominado raiz. </li>
                  <li>Los nodos que no tienen hijos se denominan hojas</li>
                  <li>Un árbol es de orden N (o N-ario) cuando la máxima cantidad de hijos que puede tener un nodo es N.</li>
                  <li>La profundidad de un árbol es la distancia (saltos entre nodos) desde la raiz hasta la hoja más lejana. </li>
                </ul>

              </p>

              <h4 >
                DEFINICIONES IMPORTANTES{' '}
              </h4>
              <p>
                <ul>
                  <li><strong>NODOS: </strong>Se le llama Nodo a cada elemento que contiene un Árbol.</li>
                  <li><strong>NODO RAIZ: </strong>Se refiere al primer nodo de un Árbol, Solo un nodo del Árbol puede ser la Raíz.</li>
                  <li><strong>NODO PADRE: </strong>Se utiliza este termino para llamar a todos aquellos nodos que tiene al menos un hijo.</li>
                  <li><strong>NODO HIJO: </strong>Los hijos son todos aquellos nodos que tiene un padre.</li>
                  <li><strong>NODO HERMANO: </strong>Los nodos hermanos son aquellos nodos que comparte a un mismo padre en común dentro de la estructura.</li>
                  <li><strong>NODO HOJA: </strong>Son todos aquellos nodos que no tienen hijos, los cuales siempre se encuentran en los extremos de la estructura.</li>
                </ul>

              </p>
            </div>
            
            <div className="it-about-3-btn-box p-relative">
              <Link className="ed-btn-theme theme-2" to="/tabs/grafos">
                IR A LA PAGINA DE TREE
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
                <img src={titleImg} alt="" /> recorridos en árboles
                </span>
                <h2 className="it-section-title-3 pb-30">PRE-ORDER</h2>
                <p>
                El recorrido preorden, también conocido como recorrido en profundidad, visita primero el nodo raíz, luego el subárbol izquierdo y finalmente el subárbol derecho. 
                Este método se utiliza a menudo para copiar o clonar un árbol, o para árboles de sintaxis abstracta (AST) utilizados en compiladores, ya que refleja el orden 
                real de las operaciones en expresiones aritméticas. Para realizar un recorrido preorden, se empieza por la raíz, se visita el subárbol izquierdo y luego se avanza 
                hacia el subárbol derecho. Este proceso se repite para cada subárbol hasta que todos los nodos han sido visitados.
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
                    <img src={aboutImg3} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                    <img className="mb-20 inner-top-img" src={aboutImg4} alt="" />
                    <img src={aboutImg2} alt="" />
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
                  <img src={aboutImg3} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                  <img className="mb-20 inner-top-img" src={aboutImg5} alt="" />
                  <img src={aboutImg2} alt="" />
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
              <img src={titleImg} alt="" /> recorridos en árboles
                </span>
                <h2 className="it-section-title-3 pb-30">IN-ORDER</h2>
              <p>
              El recorrido inorden, también conocido como recorrido simétrico, sigue un orden específico 
              para visitar los nodos: primero visita el subárbol izquierdo, luego el nodo raíz y finalmente 
              el subárbol derecho. Este método es particularmente útil para los árboles de búsqueda binaria 
              (BST) porque devuelve los valores en orden ascendente. Al realizar un recorrido inorden, se empieza 
              por el nodo más a la izquierda, se visita la raíz y luego se avanza hacia el subárbol derecho. Este 
              proceso se repite para cada subárbol hasta que todos los nodos han sido visitados.
              </p>
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
                <img src={titleImg} alt="" /> recorridos en árboles
                </span>
                <h2 className="it-section-title-3 pb-30">POST-ORDER</h2>
                <p>
                El recorrido postorden visita primero el subárbol izquierdo, luego el subárbol derecho y finalmente 
                el nodo raíz. Este método se utiliza a menudo para eliminar árboles y resolver ciertos tipos de problemas 
                como la evaluación de expresiones postfix. Para realizar un recorrido postorden, se empieza por el subárbol 
                izquierdo, se avanza hacia el subárbol derecho y luego se visita la raíz. Este proceso se repite para cada 
                subárbol hasta que todos los nodos han sido visitados.
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
                    <img src={aboutImg3} alt="" />
                </div>
                <div className="ed-about-2-thumb-two text-start">
                    <img className="mb-20 inner-top-img" src={aboutImg6} alt="" />
                    <img src={aboutImg1} alt="" />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div> 
      </div>
    </div>

    

    
  );
};
export default Arboles;
