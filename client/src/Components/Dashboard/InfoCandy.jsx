import React from "react";

export default function InfoCandy({InfoCandy}){
    return (
        <div
      className="modal fade"
      id="staticBackdropp"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark ">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Detalles de ventas de: {InfoCandy}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
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