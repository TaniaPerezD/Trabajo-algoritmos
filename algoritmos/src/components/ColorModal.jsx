import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ColorModal = ({ isOpen, nodeId, currentColor, onClose, onChangeColor }) => {
  const [chosenColor, setChosenColor] = useState(currentColor);

  console.log("Color actual al abrir el modal:", chosenColor);

  useEffect(() => {
    if (!isOpen) return;

    setChosenColor(currentColor);

    const openSwal = () => {
      Swal.fire({
        title: "Seleccionar Color",
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
            
            <!-- Contenedor de selección de color -->
            <div style="display: flex; align-items: center; gap: 15px;">
              <input 
                type="color" 
                id="colorPicker"
                value="${chosenColor}" 
                style="width: 50px; height: 50px; border: none; cursor: pointer;"
              />
              <input 
                type="text" 
                id="colorInput"
                value="${chosenColor}" 
                style="width: 100px; height: 30px; text-align: center; border: 2px solid black;"
              />
              <div 
                id="colorPreview"
                style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid black; background: ${chosenColor};"
              ></div>
            </div>

          </div>
        `,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#95bb59",
        customClass: { popup: "swal-popup" },
        didOpen: () => {
          const colorPicker = document.getElementById("colorPicker");
          const colorInput = document.getElementById("colorInput");
          const colorPreview = document.getElementById("colorPreview");

          const updateColor = (newColor) => {
            setChosenColor(newColor);
            console.log("Nuevo color seleccionado:", newColor);

            // ✅ Actualizar los elementos de la UI sin cerrar el modal
            colorPreview.style.background = newColor;
            colorPicker.value = newColor;
            colorInput.value = newColor;
          };

          // ✅ Manejo del input de color en tiempo real
          colorPicker.addEventListener("input", (event) => {
            updateColor(event.target.value);
            onChangeColor(nodeId, event.target.value); 
          });

          colorInput.addEventListener("input", (event) => {
            if (/^#[0-9A-F]{6}$/i.test(event.target.value)) {
              updateColor(event.target.value);
              onChangeColor(nodeId, event.target.value);
            }
          });
        },
        preConfirm: () => chosenColor,
      }).then((result) => {
        if (result.isConfirmed) {
          onChangeColor(nodeId, chosenColor); // ✅ Se pasa el color correcto al nodo
        }
        onClose();
      });
    };

    openSwal();
  }, [isOpen, currentColor]); // ✅ Se asegura de que chosenColor siempre se actualice al abrir el modal

  return null;
};

export default ColorModal;