import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCartelera } from "../../Redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import s from "./Home.module.css"

export default function Home(){

const dispatch = useDispatch()
const allCartelera = useSelector ((state) => state.cartelera)

const [pelisActual, setPelisActual] = useState(1)
const [pelisPorPag, setPelisPorPag] = useState (4)
const ultimaPeli = pelisPorPag + pelisActual                   //  5 / 6 / 7          // 4 / 8 / 12
const primeraPeli = ultimaPeli - pelisPorPag - 1         //  1 / 2 / 3          // 0 / 4 / 8
const carteleraActual = allCartelera.slice(primeraPeli, ultimaPeli - 1)


//tengo mi estado local de pelisActual que en principio es 1 porque este indica la pagina 1 
//tengo mi estado local de pelisPorPag que en principio es 4 porque este indica la cantidad de peliculas a mostrar en principio
// ultimaPeli
// primeraPeli
// creo carteleraActual y le indico que sera igual a allCartelera que es mi estado con todas las peliculas, pero con un slice 




useEffect(() =>{
    dispatch(getCartelera())
},[dispatch] )


function paginadoPrev(){
    if (pelisActual>1)
    // setPelisPorPag(pelisPorPag -1)
    setPelisActual(pelisActual -1)
}

function paginadoNext(){
    // let lastPage = Math.ceil(allCartelera.length / pelisPorPag)
    let lastPage = allCartelera.length - 3
    if(pelisActual < lastPage) setPelisActual(pelisActual +1)
    // setPelisActual(primeraPeli+1)
}


return(
<div>
<h1>este es el home</h1>
    <div className={s.cartelera} >
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

<Paginado
pelisPorPag={pelisPorPag}
allCartelera={allCartelera.length}
paginadoPrev={paginadoPrev}
paginadoNext={paginadoNext}
pelisActual={pelisActual}

/>

</div>

</div>
)
}