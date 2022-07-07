import React from 'react';
import s from "./Card.module.css"

function Card ({Title, Poster, id}) {
    return(
        <div className={s.card} >
            <h1>{Title}</h1>
            <img src={Poster} alt='img not found' width='230px' height='190px'/>
        </div>
    )
}

export default Card
