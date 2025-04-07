import React, { useEffect, useState } from "react";
import { driver } from "driver.js"; 
import "driver.js/dist/driver.css";

const TutorialComponente = () => {
  
  useEffect(() => {
      const newDriver = driver({
        showProgress: true,
        doneBtnText: 'Finalizar',
        steps: [
          {
            element: '#import-export',
            popover: {
              title: 'Paso 1',
              description: 'Aquí podrás guardar tu ejercicio o importar uno que ya hayas guardado.',
              position: 'bottom',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
            },
          },
          {
            element: '#matriz',
            popover: {
              title: 'Paso 2',
              description: 'Aquí podrás poner las demandas, ofertas, destinos y orígenes de tu ejercicio, junto con los costos correspondientes.',
              position: 'bottom',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
            },
          },
          {
            element: '#acciones',
            popover: {
              title: 'Paso 3',
              description: 'Estos los botones para realizar las acciones en la matriz o una vez que tengas el ejecicio planteado, resolverlo.',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
            },
          },
          
          {
            element: '#solucion',
            popover: {
              title: 'Paso 4',
              description: 'En esta pantalla podrás ver la solución a tu ejercicio, junto con el costo total.',
              position: 'bottom',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },

          {
            element: '#iteraciones',
            popover: {
              title: 'Paso 5',
              description: 'Aquí podrás ver las iteraciones que se realizaron para llegar a la solución.',
              position: 'bottom',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            popover: {
              description: "<img src='https://i.gifer.com/nRm.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>¡Eso sería todo, disfruta aprendiendo grafos!</span>",
              prevBtnText: 'Regresar'
            },
          },

        ],
      });
      return () => {
        newDriver.destroy();
      }
    
  }, []);

  return null;
};

export default TutorialComponente;