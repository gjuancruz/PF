import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBillboard } from "../../Redux/actions";
import Carousel from "../Carousel/Carousel";
import Card from "../Card/Card";
import s from "./Home.module.css"
import { Link } from "react-router-dom";

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
    <Carousel/>
    <h3>EN CARTELERA</h3>
<div className={s.cartelera}>
<div className={s.contenedorpag}> {contador > 0 && <button className={s.pag} onClick={paginadoPrev}>Anterior</button>} </div>


    {carteleraActual?.map((c) => {
    return (
        <div className={s.card}>
           <Link to={"/movies/" + c.id}>
            <Card
            Poster={c.Poster}
            Title={c.Title}
            />
            </Link>
        </div>
    )
})
}

<div className={s.contenedorpag}>{contador < allCartelera.length -4 && <button className={s.pag} onClick={paginadoNext}>Siguiente</button>}</div>


</div>
</div>
)
}
