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

const Sorts = () => {
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
                SORTS{' '}
              </h2>
              <p>
                En computación y matemáticas un algoritmo de ordenamiento es un algoritmo que pone elementos de una lista o un vector en una secuencia dada por una relación de orden, es decir, el resultado de salida ha de ser una permutación —o reordenamiento— de la entrada que satisfaga la relación de orden dada.
                Las relaciones de orden más usadas son el orden numérico y el orden lexicográfico. Ordenamientos eficientes son importantes para optimizar el uso de otros algoritmos (como los de búsqueda y fusión) que requieren listas ordenadas para una ejecución rápida. También es útil para poner datos en forma canónica 
                y para generar resultados legibles por humanos.
                <br />

              </p>
            </div>
            
            <div className="it-about-3-btn-box p-relative">
              <Link className="ed-btn-theme theme-2" to="/nodos">
                IR A LA PAGINA DE SORTS
                <i>
                  <RightArrow />
                </i>
              </Link>
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
                <img src={titleImg} alt="" /> CLASIFICACIóN de los métodos de ordenamiento
                </span>
                <h2 className="it-section-title-3 pb-30">SELECTION SORT</h2>
                <p>
                Selection Sort es uno de los algoritmos de ordenación más simples. Este algoritmo 
                recibe su nombre de la forma en que itera a través del arreglo: Selecciona el elemento
                 más pequeño actual y lo cambia de lugar.
                <br />
                Así es como funciona:
                <br />
                <ol>
                    <li>Encuentra el elemento más pequeño en el arreglo y lo intercambia con el primer elemento.</li>
                    <li>Encuentra el segundo elemento más pequeño y lo intercambia con el segundo elemento del arreglo.</li>
                    <li>Encuentra el tercer elemento más pequeño y lo intercambia con el tercer elemento del arreglo.</li>
                    <li>Repite el proceso de encontrar el siguiente elemento más pequeño y cambiarlo a la posición correcta hasta que se ordene todo el arreglo.</li>
                </ol>
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
              <img src={titleImg} alt="" /> CLASIFICACIóN de los métodos de ordenamiento
                </span>
                <h2 className="it-section-title-3 pb-30">INSERTION SORT</h2>
              <p>
                La ordenación por inserción es un algoritmo de ordenación simple para una pequeña cantidad de elementos.
                <br />
                En la ordenación por inserción, compara el elemento key con los elementos anteriores. Si los elementos anteriores son mayores que el elemento key, mueve el elemento anterior a la siguiente posición.

                Comienza desde el índice 1 hasta el tamaño del arreglo de entrada.

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
                <img src={titleImg} alt="" /> CLASIFICACIóN de los métodos de ordenamiento
                </span>
                <h2 className="it-section-title-3 pb-30">SHELLSORT</h2>
                <p>
                El ordenamiento de Shell, a veces llamado “ordenamiento de incremento decreciente”, 
                mejora el ordenamiento por inserción al romper la lista original en varias sublistas 
                más pequeñas, cada una de las cuales se ordena mediante un ordenamiento por inserción. 
                La manera única en que se eligen estas sublistas es la clave del ordenamiento de Shell. 
                En lugar de dividir la lista en sublistas de ítems contiguos, el ordenamiento de Shell 
                usa un incremento i, a veces denominado brecha, para crear una sublista eligiendo todos 
                los ítems que están separados por i ítems.
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
              <img src={titleImg} alt="" /> CLASIFICACIóN de los métodos de ordenamiento
                </span>
                <h2 className="it-section-title-3 pb-30">MERGESORT</h2>
              <p>
              Merge Sort es un algoritmo Divide y vencerás. Divide el arreglo de entrada en dos mitades, 
              se llama a sí mismo para las dos mitades y luego fusiona las dos mitades ordenadas. La mayor 
              parte del algoritmo tiene dos matrices ordenadas, y tenemos que fusionarlas en un único arreglo 
              ordenado. Todo el proceso de ordenar un arreglo de N enteros se puede resumir en tres pasos:
                <br />
                <ul> 
                    <li>Divide el arreglo en dos mitades.</li>
                    <li>Ordena la mitad izquierda y la mitad derecha usando el mismo algoritmo recurrente.</li>
                    <li>Combina las mitades ordenadas.</li>
                </ul>
                <br />
                La mayor ventaja de usar Merge sort es que la complejidad del tiempo es solo n*log(n) para ordenar 
                un Array completo. Es mucho mejor que n ^ 2 tiempo de ejecución de ordenación de burbuja o ordenación de inserción.
              </p>
            </div>
          </div>
        </div>


        
      </div>
    </div>

    

    
  );
};
export default Sorts;
