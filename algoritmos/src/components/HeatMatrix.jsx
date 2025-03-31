
import withReactContent from 'sweetalert2-react-content'
import { HeatMapComponent, Inject, Legend, Tooltip, Adaptor, titlePositionX} from '@syncfusion/ej2-react-heatmap';
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import CanvasStyleModal from "./CanvasStyleModal";
import React, { useState } from "react";
const HeatMatrix = (text,asignacioValor, xAxisHunga, yAxisHunga,matrizData) => {
    console.log("Matriz de datos", matrizData);
    return (
    <div style={{ width: '90vw', maxWidth: '800px', height: '70vh' }}>
        <h2><i>Algoritmo de Asignación</i></h2>
        <div style={{ width: '100%', height: '100%' }}>
        <HeatMapComponent
            titleSettings={{
                text: `${text} : ${asignacioValor}`,
                textStyle: {
                size: '24px',
                fontWeight: '500',
                fontFamily: 'Segoe UI',
            },
            }}
            width="100%"
            height="100%"
            xAxis={xAxisHunga}
            yAxis={yAxisHunga}
            cellSettings={{
                border: {
                width: 1,
                radius: 4,
                color: 'white',
            },
            }}
            paletteSettings={{
                palette: [
                  { value: 0, color: 'rgb(227, 219, 219)' },
                  { value: 1, color: '#f7bfd8' },
                  { value: 5, color: '#f7bfd8' },
                  { value: 10, color: '#eb9ac0' },
                ],
                type: 'Gradient',
            }}
            dataSource={matrizData}
            >
            <Inject services={[Tooltip]} />
            </HeatMapComponent>
        </div>
    </div>
    
);
};
export default HeatMatrix;