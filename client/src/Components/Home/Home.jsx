import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBillboard, getPremiere } from "../../Redux/actions";
import Carousel from "../Carousel/Carousel";
import FilterCartelera from "../FilterCartelera/FilterCartelera";
import Card from "../Card/Card";
import s from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home(){

const dispatch = useDispatch()
const allCartelera = useSelector ((state) => state.carteleraFiltered)
const premiere = useSelector((state) => state.premiere)

const [contador, setContador] = useState(0)
const [pelisActual, setPelisActual] = useState(1)
const [pelisPorPag, setPelisPorPag] = useState (4)
const ultimaPeli = pelisPorPag + pelisActual
const primeraPeli = ultimaPeli - pelisPorPag - 1
const carteleraActual = allCartelera.slice(primeraPeli, ultimaPeli - 1)


const [counterPremiere, setCounterPremiere] = useState(0)
const [currentPremiere, setCurrentPremiere] = useState(1)
const [premierePerPag, setPremierePerPag] = useState (4)
const lastPremiere = premierePerPag + currentPremiere
const FirstPremiere = lastPremiere - premierePerPag - 1
const premiereActual = premiere.slice(FirstPremiere, lastPremiere - 1)


useEffect(() =>{
    dispatch(getBillboard())
    dispatch(getPremiere())
},[])


function prevBillboard(){
    if (pelisActual>1)
    setPelisActual(pelisActual -1)
    setContador(contador -1)
}

function nextBillboard(){
    let lastPage = allCartelera.length - 3
    if(pelisActual < lastPage) setPelisActual(pelisActual +1)
    setContador(contador +1)
}


function prevPremiere(){
    if (currentPremiere>1)
    setCurrentPremiere(currentPremiere -1)
    setCounterPremiere(counterPremiere -1)
}

function nextPremiere(){
    let lastPremiere = premiere.length - 3
    if(currentPremiere < lastPremiere) setCurrentPremiere(currentPremiere +1)
    setCounterPremiere(counterPremiere +1)
}


return(
<div >
    <Carousel/>
    <FilterCartelera/>
    
<div className={s.contenedorcartelera} >
<h3 className={s.title}>EN CARTELERA</h3>
<div className={s.cartelera}>
<div className={s.contenedorpag}> {contador > 0 && <button className={s.pag} onClick={prevBillboard}>Anterior</button>} </div>

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

<div className={s.contenedorpag}>{contador < allCartelera.length -4 && <button className={s.pag} onClick={nextBillboard}>Siguiente</button>}</div>

</div>
</div>

<h3 className={s.title}>PRÓXIMOS ESTRENOS</h3>
<div className={s.cartelera}>
<div className={s.contenedorpag}> {counterPremiere > 0 && <button className={s.pag} onClick={prevPremiere}>Anterior</button>} </div>

{premiereActual?.map((c) => {
    return(
        <div className={s.card} >
            <Link to={"/movies/" + c.id}>
            <Card
            Poster={c.Poster}
            Title={c.Title}
            Release={c.Release}
            />
            </Link>
        </div>
    )
})}
 
<div className={s.contenedorpag}>{counterPremiere < premiere.length -4 && <button className={s.pag} onClick={nextPremiere}>Siguiente</button>}</div>

</div>

</div>
)
}
