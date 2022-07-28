import React, {useEffect, useRef, useState } from "react";
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];//eje x
const scores = [200, 900, 350, 300, 400, 600, 300, 450] //eje y 

const options = {
    responsive: true,
    fill:true,//relleno debajo de la curva
    animations:false,
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

export default function SegmentChartGradient(){
    const chartRef = useRef(null)
    const [chartData, setChartData] = useState({datasets:[]});
    

    useEffect(function(){
    const chart = chartRef.current;
    if(!chart){
    return ;
    }
    function CreateGradientColor(color){
        const ctx = chart.ctx
        const gradient = ctx.createLinearGradient(0,0,0,400);
        gradient.addColorStop(0,color);
        gradient.addColorStop(0.99, 'rgba(255,255,255,0.6)');
        gradient.addColorStop(1, 'rgba(255,255,255,0.6)');
        return gradient;
    }

    setChartData(
        {
            datasets:[
                {
                    label: "Grafico demo",
                    data: scores,
                    tension: 0.2,//curvatura en los puntos del grafico
                    // borderColor: 'yellow', //color de la linea
                    pointRadius: 5, // tamaño de los puntos en la curva
                    pointBackgroundColor: 'white', //color de relleno de los puntos
                    // backgroundColor: 'rgba(255, 255, 0, 0.6)',//color relleno debajo de la curva
                    segment:{
                        borderColor: function(context){
                            if(context.type==='segment'){//por si no se pasa parametro context
                                    return context.p1DataIndex % 2 === 0 ? 'rgba(255, 255, 0, 0.6)' : 'rgba(253, 253, 150, 0.445)';
                                }
                            },
                        backgroundColor: function(context){
                            if(context.type==='segment'){
                                return CreateGradientColor(context.p1DataIndex % 2 === 0 ? 'rgba(253, 253, 150, 0.445)' : 'rgba(255, 255, 0, 0.6)');
                            }
                            }
                        }
                    },
                ],
                labels
            }
        ,[])
    })
        
       
     
    return <Line data={chartData} options={options}/>
    
}