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
            element: '#pizarra',
            popover: {
              title: 'Paso 1',
              description: 'Haz doble clic en la pizarra para crear tus primeros nodos',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
            },
          },
          {
            element: '#pizarra',
            popover: {
              title: 'Paso 2',
              description: 'Haz clic sobre el nodo origen y luego sobre el nodo destino para crear una arista.',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
            },
          },
          {
            element: '#pizarra',
            popover: {
              title: 'Paso 3',
              description: '¡Selecciona un nodo para poder editarlo!',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Anterior',
            },
          },
          
          {
            element: '#editNodo',
            popover: {
              title: 'Paso 4',
              description: 'Puedes editar un nodo con este botón.',
              position: 'bottom',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#pizarra',
            popover: {
              title: 'Paso 5',
              description: 'Selecciona una arista',
              position: 'bottom',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#invertirArista',
            popover: {
              title: 'Paso 6',
              description: 'Puedes invertir la dirección de una arista con este botón.',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#toolbar',
            popover: {
              title: 'Paso 7',
              description: 'Aquí encontrarás todas las herramientas disponibles para trabajar en la pizarra, para arrastrar nodos de diferentes formas',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#texto',
            popover: {
              title: 'Paso 8',
              description: 'Al arrastrar esta herramienta podrás agregar una notita a tu grafo.',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#borrarTodo',
            popover: {
              title: 'Paso 9',
              description: 'Puedes borrar todos los nodos y aristas de la pizarra con este botón, ¡ten cuidado para no perder tu progreso!.',
              side: "rigth", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#matrizAdyacencia',
            popover: {
              title: 'Paso 10',
              description: 'Aquí podrás visualizar la matriz de adyacencia de tu grafo.',

              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#algoritmos',
            popover: {
              title: 'Paso 11',
              description: 'Aquí encontrarás todos los algoritmos disponibles para aplicar a tu grafo.',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
            
          },
          {
            element: '#acciones',
            popover: {
              title: 'Paso 12',
              description: 'Podrás guardar tu grafo en imagen, pdf o json, esta última opción te ayuda a importarlo después',
              side: "left", align: 'start',
              nextBtnText: 'Siguiente',
              prevBtnText: 'Regresar',
            },
          },
          {
            element: '#cambiarPizarra',
            popover: {
              title: 'Paso 13',
              description: 'Si no te gusta el fondo de la pizarra, puedes cambiarlo con este botón.',
              side: "left", align: 'start',
              align: 'start',
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
      newDriver.drive();

      return () => {
        newDriver.destroy();
      }
    
  }, []);

  return null;
};

export default TutorialComponente;
