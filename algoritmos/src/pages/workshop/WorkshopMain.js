import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Workshop from './WorkshopSection';


const WorkshopMain = () => {
  return (
    <main>
      <Breadcrumb title="workshop" />
      <Workshop />
    </main>
  );
};
export default WorkshopMain;
