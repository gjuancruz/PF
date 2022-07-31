import React, { useMemo } from "react";
import {Pie} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useSelector } from "react-redux";

const labels = ['Cars', 'Thor', 'Spiderman', 'Minions', 'Lightyear', 'Sonic'];//eje x
const scores = [200, 900, 350, 300, 400, 600] //eje y , ventas de una pelicula.

export const data = {
    labels: labels,
    datasets: [
      {
        label: 'Mas Vendidas',
        data: scores,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  export default function ChartPie() {
    const tickets = useSelector(state=>state.tickets)
    return <Pie data={data} />;
  }