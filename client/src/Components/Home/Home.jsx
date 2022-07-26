import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBillboard, getPremiere } from "../../Redux/actions";
import Carousel from "../Carousel/Carousel";
import FilterCartelera from "../FilterCartelera/FilterCartelera";
import Card from "../Card/Card";
import s from "./Home.module.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import config from '../Chatbot/config.js'
import MessageParser from '../Chatbot/MessageParser'
import ActionProvider from '../Chatbot/ActionProvider';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

export default function Home(){

const dispatch = useDispatch()
const allCartelera = useSelector ((state) => state.carteleraFiltered)
const premiere = useSelector((state) => state.premiere)
console.log("es la premier", premiere)
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

// Bot
const [showBot, toggleBot] = useState(false);

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

function handleVolverBtn(event){
    event.preventDefault()
    dispatch(getBillboard())
}
return(
<div >
    <NavBar />
    <Carousel/>
    <FilterCartelera/>
    
    
<div className={s.contenedorcartelera} >
<h3 className={s.title}>EN CARTELERA</h3>
<div className={s.cartelera}>
<div className={s.contenedorpag}> {contador > 0 && <i class="bi bi-chevron-left" style={{fontSize: "32px"}} onClick={prevBillboard}></i>} </div>
    {carteleraActual.length === 0 && <div>
        <h2>El título que estás buscando no se encuentra disponible en este momento. Prueba corrigiendo tu búsqueda o inténtalo de nuevo más tarde.</h2>
        <br/>
        <button class="btn btn-warning" onClick={(event)=>handleVolverBtn(event)}>Volver</button>
        </div>}
    
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

<div className={s.contenedorpag}>{contador < allCartelera.length -4 && <i class="bi bi-chevron-right" style={{fontSize: "32px"}} onClick={nextBillboard}></i>}</div>

</div>
</div>

<h3 className={s.title}>PRÓXIMOS ESTRENOS</h3>
<div className={s.cartelera}>
<div className={s.contenedorpag}> {counterPremiere > 0 && <i class="bi bi-chevron-left" style={{fontSize: "32px"}} onClick={prevPremiere}></i>} </div>

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
 
<div className={s.contenedorpag}>{counterPremiere < premiere.length -4 && <i class="bi bi-chevron-right" style={{fontSize: "32px"}} onClick={nextPremiere}></i>}</div>



{
showBot? 
        <div className={s.appChatbotContainer}>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    : null
}

    <button
        className={s.appChatbotButton}
        onClick={() => toggleBot((prev) => !prev)}
    >
        <div>Bot</div>
        <svg viewBox="0 0 640 512" className={s.appChatbotButtonIcon}>
        <path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path>
        </svg>
    </button>




</div>
    <Footer />
</div>
)
}