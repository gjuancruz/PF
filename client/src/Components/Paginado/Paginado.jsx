import React from "react";

export default function Paginado ({paginadoPrev, paginadoNext, cartelera, pelisActual, PelisPorPag}){
const pelis = []

for (let i = 1; i <= Math.ceil(cartelera/PelisPorPag); i++){
    pelis.push(i)
}

return(
    <nav>
        <div>
            <div onClick={paginadoPrev}>Anterior</div>
            <div onClick={paginadoNext}>Siguiente</div>
        </div>
    </nav>
)
}