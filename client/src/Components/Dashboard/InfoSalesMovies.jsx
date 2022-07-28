import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicketsSalesDetails } from "../../Redux/actions";

export default function InfoSalesMovies({ allMovies, month}){

const dispatch = useDispatch();
const ticketsDetails = useSelector(state=>state.detailTickets)

const handleMovie = (movie)=>{
  const data = allMovies.find(e=>e.id === movie)
  return data.Title;
 }

 useEffect(()=>{
  dispatch(getTicketsSalesDetails(month))
 },[])

    return (
        <div
      className="modal fade"
      id="staticBackdropp"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
<<<<<<< HEAD
      <div class="modal-dialog">
        <div class="modal-content bg-dark ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detalles de ventas
=======
      <div className="modal-dialog">
        <div className="modal-content bg-dark ">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Detalles de ventas de {nameMovie} {type}
>>>>>>> a95b2408651889def146a92b85ecaac002bbe4ac
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
<<<<<<< HEAD
          <div class="modal-body">
<table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Entradas Vendidas</th>
              <th scope="col">Fecha</th>
              <th scope="col">T.Bruto</th>
              <th scope="col">T.Neto</th>
            </tr>
          </thead>
          <tbody>
            {console.log(ticketsDetails)}
            {
              ticketsDetails &&
              ticketsDetails.map((u,i)=>
                (<tr key={i}>
                  <td>{handleMovie(u.movie)}</td>
                  <td>{u.type}</td>
                  <td>{u.seats}</td>
                  <td>{u.date}</td>
                  <td>{u.totalPrice}</td>
                  <td>{u.totalPrice * 0.6}</td>
                </tr>
                )
              )
            }
          </tbody>
        </table>
=======
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
>>>>>>> a95b2408651889def146a92b85ecaac002bbe4ac
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