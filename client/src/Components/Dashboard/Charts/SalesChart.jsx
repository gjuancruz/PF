import React, { useMemo } from "react";
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import SalesChartBarras from './SalesChartBarras'
import SegmentChart from "./SegmentChart";
import SegmentChartGradient from "./SegmentChartGradient";
import ChartPie from "./ChartPie";


const labels = [100, 200, 300, 400, 500, 600, 700, 800];//eje x (meses)
const scores = [200, 900, 350, 300, 400, 600, 300, 450] //eje y (numeros de ventas)

const options = {
    responsive: true,
    fill:true,//relleno debajo de la curva
    scales:{
        y:{
            min:0  //para que los valores del eje y empiecen en 0
        }
    },
    plugins:{
        legend:{
            display:false, //para que no aparezca el texto de label
        }
    }
}

export default function SalesChart(){
    const data = useMemo(function(){
        return {
            datasets:[
                {
                    label: "Grafico demo",
                    data: scores,
                    tension: 0.2,//curvatura en los puntos del grafico
                    borderColor: 'yellow', //color de la linea
                    pointRadius: 5, // tamaño de los puntos en la curva
                    pointBackgroundColor: 'white', //color de relleno de los puntos
                    backgroundColor: 'rgba(255, 255, 0, 0.6)'//color relleno debajo de la curva
                    
                },
            ],
            labels
        }
    },[])
    return <div>
        <Line data={data} options={options}/>
        <SalesChartBarras/>
        <SegmentChart/>
        <SegmentChartGradient/>
        <ChartPie/>
        </div>
    
}