import React, {useEffect, useState} from "react";
import {Feedback} from "./Feedback";
import Comments from "./Comments";
import Users from "./Users";
import Movies from "./Movies";
import Shows from "./Shows";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUsers, verifyRole } from "../../Redux/actions";
import Candy from "./Candy";
import SalesBalanceMovies from "./SalesBalanceMovies";


export default function MenuDashboard(){
  
  const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getUsers())
        dispatch(verifyRole())
    },[])

    const allUsers = useSelector ((state) => state.usuarios)
    const userIdCheck = window.localStorage.getItem('userId')
    const currentUser = allUsers.filter(u =>u.id === userIdCheck)
    let role = useSelector ((state) => state.role)
    const [component,setComponent] = useState("")

    const handleSideBar= ()=>{
        if (component=== 'usuarios') return (<Users/>)
        if (component === 'comentarios') return (<Comments/>)
        if (component === "feedback" ) return (<Feedback/>)
        if (component === 'movies') return (<Movies/>)
        if (component === 'funciones') return(<Shows/>)
        if (component === 'salesMovies') return(<SalesBalanceMovies/>)
        if (component === 'candy') return(<Candy/>)
    }

    return (
      <div>
      {(role === 'admin')?
        <div className="container-fluid" > 
        
        <div className="row">   
      <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
    
        <div className="position-sticky pt-3">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="h2">Dashboard</span>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="btn btn-outline-warning border-0 text-white" onClick={e=>setComponent("movies")}>
                Peliculas
              </a>
            </li>
            <li>
            <a href="#" className="btn btn-outline-warning border-0 text-white" onClick={e=>setComponent("funciones")}>
                Funciones de peliculas
              </a>
            </li>
            <li>
            <a href="#" className="btn btn-outline-warning border-0 text-white" onClick={e=>setComponent("salesMovies")}>
                Ventas de peliculas
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-outline-warning border-0 text-white"onClick={e=>setComponent("candy")}>
                Candy
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-outline-warning border-0 text-white" onClick={e=>setComponent("usuarios")}>
                Usuarios Registrados
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-outline-warning border-0 text-white" onClick={e=>setComponent("comentarios")}>
                Administrar comentarios
              </a>
            </li>
            <li>
             <a href="#" className="btn btn-outline-warning border-0 text-white" onClick={e=>setComponent("feedback")} > 
                Feedback
              </a>
            </li>
          </ul>
          <hr/>
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
            <strong>admin</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="/home">Home</a></li>
            <li><a className="dropdown-item" href="#">Perfil</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="/home" onClick={logout()}>Cerrar Sesion</a></li>
          </ul>
        </div>
        </div>
      </nav>
       {handleSideBar()}
        </div>
        </div>
         :
       null
       }
      </div>
    )
}