import React from "react";

export default function Card ({Title, Poster}){
    return(
        <div>
            <h1>{Title}</h1>
            <img src={Poster} alt='img not found' width='230px' height='190px' />
        </div>
    )
}