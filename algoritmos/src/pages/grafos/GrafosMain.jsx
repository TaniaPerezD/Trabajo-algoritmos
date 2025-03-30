import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Grafos from './GrafosSection';
import Testimonial from '../about/TestimonialSection';


const AboutMain = () => {
  return (
    <main>
      <Breadcrumb title="GRAFOS" />
      <Grafos />
      <Testimonial />
      {/* <Testimonial /> */}

    </main>
  );
};
export default AboutMain;
