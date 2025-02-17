import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const shapeOptions = [
  { name: "circle", display: "⬤" },
  { name: "ellipse", display: "⬭" },
  { name: "box", display: "▢" },
  { name: "star", display: "★" },
  { name: "text", display: "T" },
];

const ShapeModal = ({ isOpen, nodeId, currentShape, onClose, onChangeShape }) => {
  const [chosenShape, setChosenShape] = useState(currentShape || "circle");

  useEffect(() => {
    if (!isOpen) return; // No ejecutar si el modal está cerrado

    const openSwal = () => {
      Swal.fire({
        title: "Cambiar Forma del Nodo",
        html: `
          <div id="shape-container" style="display: flex; gap: 15px; justify-content: center; align-items: center;">
            ${shapeOptions
              .map(
                (shape) => `
                <div 
                  class="shape-option"
                  data-shape="${shape.name}"
                  style="
                    width: 50px; 
                    height: 50px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 30px;
                    border: 2px solid black;
                    cursor: pointer;
                    position: relative;
                  "
                >
                  ${shape.display}
                  <span class="check-mark" style="
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    font-size: 14px;
                    color: green;
                    display: ${shape.name === chosenShape ? "block" : "none"};
                  ">✔️</span>
                </div>
              `
              )
              .join("")}
          </div>
        `,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#95bb59",
        customClass: {
          popup: "swal-popup",
        },
        didOpen: () => {
          document.querySelectorAll(".shape-option").forEach((element) => {
            element.addEventListener("click", () => {
              const selectedShape = element.getAttribute("data-shape");

              // Actualizar el ✔️ en todas las opciones
              document.querySelectorAll(".check-mark").forEach((check) => {
                check.style.display = "none";
              });

              // Mostrar el ✔️ en la opción seleccionada
              element.querySelector(".check-mark").style.display = "block";

              // Actualizar estado del shape seleccionado
              setChosenShape(selectedShape);

              // Forzar la actualización del modal
              Swal.update({
                html: document.getElementById("shape-container").outerHTML,
              });
            });
          });
        },
        preConfirm: () => {
          return chosenShape;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          onChangeShape(nodeId, chosenShape);
        }
        onClose(); // Cerrar el modal al finalizar
      });
    };

    openSwal();
  }, [isOpen, chosenShape]); // ✅ Se actualiza cada vez que cambia `isOpen` o `chosenShape`

  return null; // No renderiza nada en el DOM
};

export default ShapeModal;