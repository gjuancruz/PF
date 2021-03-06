import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllShows,deleteShow} from "../../Redux/actions";
  import CreateShow from "./CreateShow";
import DeleteShow from "./DeleteShow";

export default function Shows(){

  const dispatch = useDispatch();
  const shows = useSelector(state=>state.shows);
  const [showDlt,setShowDlt] = useState('')

  const handleDltShow=(e)=>{
    dispatch(deleteShow(showDlt))
    setShowDlt('')
  }

  useEffect(()=>{
   dispatch(getAllShows())
  },[showDlt])

    return(
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Funciones</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
        <button type="button" className="btn btn-sm btn-outline-secondary mx-5" data-bs-toggle="modal" data-bs-target="#form">Agregar Funcion</button>
        </div>
        <CreateShow/>
      </div>
      
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Horarios</th>
              <th scope="col">Dia</th>
              <th scope="col">Pelicula</th>
              <th scope="col">Sala</th>
              <th scope="col">Tipo</th>
              <th scope="col">Asientos</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {
              shows &&
              shows.map((s)=>
                (<tr key={s.id} id={s.id}>
                  <td>{s.schedule}</td>
                  <td>{s.day}</td>
                  <td>{s.movie.Title}</td>
                  <td>{s.roomId}</td>
                  <td>{s.type}</td>
                  <td>{s.seats}</td>
                  <td>
                  <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setShowDlt(s.id)}><i className="bi bi-trash3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:"pointer"}} onClick={() => setShowDlt(s.id)}></i></button>
                  </td>
                  <DeleteShow handleDltShow={handleDltShow}/>
                </tr>)
              )
            }
          </tbody>
        </table>
       </div>
        </main>
    )
}