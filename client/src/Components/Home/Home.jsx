import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBillboard } from "../../Redux/actions";
import Card from "../Card/Card";
import s from "./Home.module.css"

export default function Home(){

const dispatch = useDispatch()
const allCartelera = useSelector ((state) => state.cartelera)

const [pelisActual, setPelisActual] = useState(1)
const [pelisPorPag, setPelisPorPag] = useState (4)
const ultimaPeli = pelisPorPag + pelisActual
const primeraPeli = ultimaPeli - pelisPorPag - 1
const carteleraActual = allCartelera.slice(primeraPeli, ultimaPeli - 1)

const [contador, setContador] = useState(0)

useEffect(() =>{
    dispatch(getBillboard())
},[dispatch])


function paginadoPrev(){
    if (pelisActual>1)
    setPelisActual(pelisActual -1)
    setContador(contador -1)
    console.log(contador)
}

function paginadoNext(){
    let lastPage = allCartelera.length - 3
    if(pelisActual < lastPage) setPelisActual(pelisActual +1)
    setContador(contador +1)
    console.log(contador)
}


return(
<div>
<h1>este es el home</h1>

<div className={s.cartelera}>

<button onClick={paginadoPrev}>Anterior</button>

    {carteleraActual?.map((c) => {
    return (
        <div>
            <Card
            Title={c.Title}
            Poster={c.Poster}
            />
        </div>
    )
})
}

<button onClick={paginadoNext}>Siguiente</button>


</div>
</div>
)
}
