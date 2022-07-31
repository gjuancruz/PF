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
      <div clasName="modal-dialog">
        <div clasName="modal-content bg-dark ">
          <div clasName="modal-header">
            <h5 clasName="modal-title" id="exampleModalLabel">
              Detalles de ventas
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div clasName="modal-body">
<table clasName="table table-dark table-striped">
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