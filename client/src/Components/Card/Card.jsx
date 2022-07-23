import React from "react";
import s from '../Card/Card.module.css';

export default function Card ({Title, Poster, Release}){
    console.log("soy",Release)
    return(
        <div className={s.general} >
            <div className={s.card}>
            <img src={Poster} className={s.image} alt='img not found' width='100%' height='390px' />
            <div className={s.contenedortitle} ><h3 className={s.title} >{Title}</h3></div>
            {Release && <h3 className={s.info} >Estreno: {Release}</h3>}
            
            </div>
        </div>
    )
}