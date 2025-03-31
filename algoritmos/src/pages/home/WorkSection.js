import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import SingleWork from '../../components/Work';
import { Link } from 'react-router-dom';

import workBG from '../../assets/img/work/work-bg.jpg';
import titleImg from '../../assets/img/category/title.svg';
import iconImg1 from '../../assets/img/work/arbol1.png';
import iconImg2 from '../../assets/img/work/arbol1.png';

const Work = () => {
  return (
    <div
      className="it-wrok-area it-wrok-bg pt-120 pb-90"
      style={{ backgroundImage: `url(${workBG})` }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <SectionTitle
              itemClass="it-course-title-box mb-60 text-center"
              subTitleClass="it-section-subtitle-5"
              subTitle="ARBOLES"
              titleClass="it-section-title-3"
              title="ARBOLES"
              titleImage={titleImg}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-4 col-md-6 mb-30 wow animate__fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".3s"
          >
            <SingleWork
              itemClass="it-work-item text-center"
              iconImage={iconImg1}
              title="PRE-ORDER"
              description="El recorrido inicia en la Raíz y luego se recorre en pre-orden cada unos de los sub-árboles de izquierda a derecha."
            />
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 mb-30 wow animate__fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <SingleWork
              itemClass="it-work-item active text-center"
              iconImage={iconImg2}
              title="IN-ORDER"
               description="Se recorre en in-orden el primer sub-árbol, luego se recorre la raíz y al final se recorre en in-orden los demas sub-árboles"
            />
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 mb-30 wow animate__fadeInUp"
            data-wow-duration=".9s"
            data-wow-delay=".7s"
          >
            <SingleWork
              itemClass="it-work-item text-center"
              iconImage={iconImg2}
              title="POST-ORDER"
              description="Se recorre el pos-orden cada uno de los sub-árboles y al final se recorre la raíz."
            />
          </div>
        </div>
        <div>

        </div>

        <div className="it-video-button d-flex justify-content-center align-items-center gap-4">
            <Link className="ed-btn-square theme" to="/arbolo">
              <span>Ver más sobre árboles</span>
            </Link>
            <Link className="ed-btn-square purple-3" to="/nodos">
              <span>Ir a la página de árboles</span>
            </Link>
          </div>
      </div>
    </div>
  );
};
export default Work;
