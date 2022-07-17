import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShows,postShow,getAllShows } from "../../Redux/actions";

export default function Shows(){

  const dispatch = useDispatch();
  const shows = useSelector(state=>state.shows);
  const [roomId,setRoomId] = useState()
  //const cant_usuarios = usuarios.map((n,i)=>n=i);

  

  useEffect(()=>{
    dispatch(getAllShows())
  },[dispatch])

    return(
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Funciones</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <input type= "text" placeholder="Buscar usuario..."></input>
            <button type="button" class="btn btn-sm btn-outline-secondary">Buscar</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-plus-lg"></i>
            Agregar nueva
          </button>
        </div>
      </div>
      <div class="table-responsive">
          {console.log(shows)}
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {
              shows &&
              shows.map((s)=>
                (<tr key={s.id}>
                  <td>{s.schedule}</td>
                  <td>{s.movieId}</td>
                  <td>{s.roomId}</td>
                  <td>
                    <button class="btn btn-outline-warning"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-outline-warning"><i class="bi bi-trash3"></i></button>
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