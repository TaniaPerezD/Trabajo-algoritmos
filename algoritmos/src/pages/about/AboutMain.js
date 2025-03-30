import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import About from './AboutSection';
import Course from './CourseSection';


const AboutMain = () => {
  return (
    <main>
      <Breadcrumb title="about us" />
      <About />
      {/* <Testimonial /> */}
      <Course />
    </main>
  );
};
export default AboutMain;
