import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShows,postShow,getAllShows,deleteShow} from "../../Redux/actions";

export default function Shows(){

  const dispatch = useDispatch();
  const shows = useSelector(state=>state.shows);
  const [roomId,setRoomId] = useState()
  //const cant_usuarios = usuarios.map((n,i)=>n=i);

  const handleDelete=(e)=>{
    if(e.target.nodeName==="I"){
      const padre = e.target.parentElement.parentElement.parentElement
      console.log(padre.id)
      dispatch(deleteShow(padre.id))
      e.reload()
    }else{
      const padre = e.target.parentElement.parentElement
      console.log(padre.id)
      dispatch(deleteShow(padre.id))
      e.reload()
    }
  }

  const handleSubmit=(e)=>{
    dispatch(postShow("12:00","46a0aa5e-9ee5-4de5-a4ab-a71e09b175e8",1))
    e.reload()
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
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleSubmit}><i class="bi bi-plus-lg"></i>
            Agregar nueva
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Horarios</th>
              <th scope="col">Pelicula</th>
              <th scope="col">Sala</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {
              shows &&
              shows.map((s)=>
                (<tr key={s.id} id={s.id}>
                  <td>{s.schedule}</td>
                  <td>{s.movie.Title}</td>
                  <td>{s.roomId}</td>
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