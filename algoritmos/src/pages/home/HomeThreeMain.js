import React from 'react';
import About from './AboutSection';
import Banner from './HomeThreeBanner';
import Category from './CategorySection';
import Video from './VideoSection';
import Work from './WorkSection';
import Course from './CourseSection';
import FunFact from './FunFactSection';

const HomeMain = () => {
  return (
    <main>
      <Banner />
      
      <div id="oportunidades">
        <About />
      </div>
      <div id="areas-de-estudio-y-modalidades-de-graduacion">
        <Category />
      </div>

      <div id="conoce-mas">
        <Video />
      </div>
      <div id="conoce-mas">
        <Work />
      </div>

      <div id="conoce-mas">
        <Course />
      </div>

  </main>
  );
};
export default HomeMain;
