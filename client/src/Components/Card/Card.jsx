import React from "react";
import s from '../Card/Card.module.css';

export default function Card ({Title, Poster}){
    return(
        <div >
            <div className={s.card}>
            <img src={Poster} alt='img not found' width='100%' height='350px' />
            <div className={s.contenedortitle} ><h3 class={s.title} >{Title}</h3></div>
            </div>
        </div>
    )
}