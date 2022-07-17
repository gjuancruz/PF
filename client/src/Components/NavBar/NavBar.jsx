import React from 'react'
import '../NavBar/NavBar.css'
import { useDispatch } from "react-redux";
import { searchMovieName } from '../../Redux/actions';
// import img from "./img.jpg"


const NavBar = () =>{
    const [state, setState]= React.useState('')

    const handleChange = function(event){
      event.preventDefault()
      setState(event.target.value)
    }

  const dispatch = useDispatch()

  const handleSubmit = (event) =>{
    if(state === ""){
      event.preventDefault()
      setState('')
      return alert('Ingrese un título válido.')
    }
      event.preventDefault()
        dispatch(searchMovieName(state))
        window.scrollTo({ top: 500, behavior: 'smooth' })
        setState('')
  } 

  // temporal //
  const handleProx = (event) =>{
    event.preventDefault()
    window.scrollTo({ top: 1100, behavior: 'smooth' })
  }
  
    return(
      <div>
      <nav class="navbar navbar-expand-lg bg-dark text-light">
      <div class="container-fluid">
        <a class="navbar-brand text-light" href="/">Moon Cinema</a>
        {/* <a class="navbar-brand text-light" href="/">
          <img src={img} width="120px"></img>
        </a> */}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse nav-separation" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/" onClick={(event)=>handleProx(event)}>Próximos estrenos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/">Comida</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/">Promos</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Usuario
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/profile">Mi perfil</a></li>
                <li><a class="dropdown-item" href="#">Mis comentarios</a></li>
                <li><a class="dropdown-item" href="#">Membresía</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
              </ul>
            </li>
            
          </ul>
          <form class="d-inline-flex" role="search" onSubmit={(event)=>handleSubmit(event)}>
            <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" name='name' value={state} onChange={(event) => handleChange(event) } />
            <button class="btn btn-warning" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
    </div>
    )
}

export default NavBar