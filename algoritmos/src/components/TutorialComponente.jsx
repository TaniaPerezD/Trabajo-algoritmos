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
            element: '#Pizarra',
            popover: {
              title: 'Paso 1',
              description: 'Esta es tu pizarra para grafos, ¡puedes crear nodos y aristas personalizados!',
              position: 'right',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
              doneBtnText: 'Finalizar',
            },
          },
          {
            element: '#editNodo',
            popover: {
              title: 'Paso 4',
              description: 'Con este botón puedes cambiar el texto de un nodo, su forma y su color',
              position: 'bottom',
              nextBtnText: 'Continuar',
              prevBtnText: 'Regresar',
              doneBtnText: 'Terminar',
            },
          },
          {
            element: '#borrarTodo',
            popover: {
              title: 'Paso 4',
              description: 'Puedes borrar todos los nodos y aristas de la pizarra con este botón, ¡ten cuidado con perder tu progreso!',
              position: 'top',
              align: 'start',
              nextBtnText: 'Continuar',
              prevBtnText: 'Regresar',
              doneBtnText: 'Terminar',
            },
          },
          {
            element: '#matrizAdyacencia',
            popover: {
              title: 'Paso 4',
              description: 'Aquí puedes ver la matriz de adyacencia de tu grafo, ¡es muy útil para saber si dos nodos están conectados!',
              position: 'right',
              align: 'center',
              nextBtnText: 'Continuar',
              prevBtnText: 'Regresar',
              doneBtnText: 'Terminar',
            },
          },
          {
            element: '#acciones',
            popover: {
              title: 'Paso 4',
              description: 'Puedes exportar tu pizarra como imagen o pdf, también puedes guardarla como json para luego importarla',
              position: 'bottom',
              nextBtnText: 'Continuar',
              prevBtnText: 'Regresar',
              doneBtnText: 'Terminar',
            },
          },
          {
            element: '#cambiarPizarra',
            popover: {
              title: 'Paso 5',
              description: 'Si no te gusta el fondo de la pizarra, puedes cambiarlo con este botón, ¡hay muchos fondos para elegir!',
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
