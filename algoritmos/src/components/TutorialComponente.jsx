import React, { useEffect, useState } from "react";
import { driver } from "driver.js"; 
import "driver.js/dist/driver.css";
import Modal from './ModalInicio'; 

const TutorialComponente = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Estado para controlar el modal
  const [showTutorial, setShowTutorial] = useState(false); // Estado para controlar el tutorial

  useEffect(() => {
    if (showTutorial) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '#cambiarPizarra',
            popover: {
              title: 'Título 1',
              description: 'Descripción del primer elemento.',
              position: 'right',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
              doneBtnText: 'Finalizar',
            },
          },
          {
            element: '#editNodo',
            popover: {
              title: 'Título 2',
              description: 'Descripción del segundo elemento.',
              position: 'bottom',
              nextBtnText: 'Continuar',
              prevBtnText: 'Regresar',
              doneBtnText: 'Terminar',
            },
          },
        ],
      });

      driverObj.drive();
    }
  }, [showTutorial]); // Solo se ejecuta cuando showTutorial cambia

  const handleStartTutorial = () => {
    setShowTutorial(true);
    setIsModalOpen(false); // Cerrar el modal al iniciar el tutorial
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal si el usuario elige no ver el tutorial
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onStartTutorial={handleStartTutorial} />
    </div>
  );
};

export default TutorialComponente;
