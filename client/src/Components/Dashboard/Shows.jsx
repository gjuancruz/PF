import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShows,postShow,getAllShows,deleteShow} from "../../Redux/actions";
  import CreateShow from "./CreateShow";

export default function Shows(){

  const dispatch = useDispatch();
  const shows = useSelector(state=>state.shows);
  const [refresh,setRefresh] = useState(1)
  //const cant_usuarios = usuarios.map((n,i)=>n=i);

  const handleDelete=(e)=>{
    if(e.target.nodeName==="I"){
      const padre = e.target.parentElement.parentElement.parentElement
      console.log(padre.id)
      // setRefresh(Math.random())
      dispatch(deleteShow(padre.id))
    }else{
      const padre = e.target.parentElement.parentElement
      console.log(padre.id)
      // setRefresh(Math.random())
      dispatch(deleteShow(padre.id))
    }
  }

  useEffect(()=>{
    dispatch(getAllShows())
  },[dispatch])

    return(
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Funciones</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
        <button type="button" class="btn btn-sm btn-outline-secondary mx-5" data-bs-toggle="modal" data-bs-target="#form">Agregar Funcion</button>
        </div>
      </div>
      <div class="modal fade" id="form" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-xl">
                                    <div class="modal-content bg-dark text-white" >
                                        <div class="modal-header">
                                            <h5 class="modal-title " id="staticBackdropLabel">Crear Pelicula</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body border-3" >
                                            <CreateShow></CreateShow>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Volver</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
      <div class="table-responsive">
        <table class="table table-dark table-striped">
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
                    <button class="btn btn-outline-warning" onClick={handleDelete}><i class="bi bi-trash3"></i></button>
                  </td>
                </tr>)
              )
            }
          </tbody>
        </table>
       </div>
        </main>
        
      
    )
}