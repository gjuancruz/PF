import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFeedback, postFeedback } from "../../Redux/actions";
import Feedback from "../Feedback/Feedback";


export default function SideBar(){
const dispatch = useDispatch()
const feedback = useSelector((state) => state.feedback)
console.log(feedback)

useEffect(() => {
  dispatch(getFeedback())
},[dispatch])

function handleSubmit(e){
  e.preventDefault();
  // console.log(input);

}


    return (
      <div>
        <p>prueba feedback</p>
        {feedback?.map((f)=> { 
          return(
            <div>
        <Feedback
        Text={f.Text}
        />
        </div>
          )
      })}

      <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">Dashboard</span>
    </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link text-white">
          Peliculas
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Funciones de peliculas
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Balance de ventas
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Usuarios Registrados
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Administrar comentarios
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Feedback
        </a>
      </li>
    </ul>
    <hr/>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
        <strong>admin</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></hr></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>

  </div>
    )
}