import React, { useEffect }  from 'react'
import '../NavBar/NavBar.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, searchMovieName, verifyRole } from '../../Redux/actions';
import { getUsers } from "../../Redux/actions";
// import setContador from '../Home/Home.jsx'
import moonCinema from '../../Assets/moonCinema.svg'

const NavBar = () =>{
    const [state, setState]= React.useState('')
    const allUsers = useSelector ((state) => state.usuarios)
    const handleChange = function(event){
      event.preventDefault()
      setState(event.target.value)
    }

  const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getUsers());
        dispatch(verifyRole())
    },[dispatch])

  let userIdCheck = useSelector ((state) => state.id)
  const currentUser = allUsers.filter(u =>u.id === userIdCheck)
  let role = useSelector ((state) => state.role)
    
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
        {/* <a class="navbar-brand text-light" href="/">Moon Cinema</a> */}
        <a class="navbar-brand text-light" href="/">
          <img src={moonCinema} width="120px" alt=''></img>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="bi bi-list text-light"></i>
        </button>
        <div class="collapse navbar-collapse nav-separation" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/home" onClick={(event)=>handleProx(event)}>Próximos estrenos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/candy">Promos</a>
            </li>
            <li class="nav-item dropdown">
            {currentUser.length?
            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>  {currentUser[0].username}
            </a>
            :
            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Usuario
            </a>
            }
              
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                {userIdCheck? 
                <div>
                <li><a class="dropdown-item" href="/profile">Mi perfil</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" onClick={logout()} href='/home'>Cerrar sesión</a></li>
                </div>
                 : 
                <li><a class="dropdown-item" href="/login">Iniciar sesión</a></li>
                }                
              </ul>
              
            </li>
            {(role === 'admin')?
          <div>
             <li class="nav-item"><a class="nav-link text-warning" href="/admin">Panel de Admin</a></li>
          </div>
          : null}
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