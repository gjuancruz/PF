import React, { useMemo } from "react";
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

export default function SegmentChart(){
    const data = useMemo(function(){
        return {
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
                            console.log(context)
                            if(context.type==='segment'){//por si no se pasa parametro context
                                return context.p1DataIndex % 2 === 0 ? 'rgba(255, 255, 0, 0.6)' : 'rgba(253, 253, 150, 0.445)';
                            }
                        },
                        backgroundColor: function(context){
                            if(context.type==='segment'){
                                return context.p1DataIndex % 2 === 0 ? 'rgba(253, 253, 150, 0.445)' : 'rgba(255, 255, 0, 0.6)';
                            }
                        }
                    }
                },
            ],
            labels
        }
    },[])
    return <Line data={data} options={options}/>
    
}