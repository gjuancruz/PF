import React from "react";

export default function InfoSalesMovies({nameMovie, type}){
    return (
        <div
      class="modal fade"
      id="staticBackdropp"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detalles de ventas de {nameMovie} {type}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
<lable>Filtrar por dia: </lable>
<input type="date"></input>
<button>Ver todos</button><br/>
<label>Ordenar por: </label>
<select>
    <option disabled selected>Seleccionar</option>
    <option>Dias de mayores ventas</option>
    <option>Dias de menores ventas</option>
</select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}