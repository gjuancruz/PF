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
          <img src={moonCinema} width="120px" className='imgMooncinema'></img>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="bi bi-list text-light"></i>
        </button>
        <div className="collapse navbar-collapse nav-separation" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-light" aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/home" onClick={(event)=>handleProx(event)}>Próximos estrenos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/candy">Promos</a>
            </li>
            <li className="nav-item dropdown">
            {currentUser.length?
            <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {currentUser[0].username}
            </a>
            :
            <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Usuario
            </a>
            }
              
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {userIdCheck? 
                <div>
                <li><a className="dropdown-item" href="/profile">Mi perfil</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" onClick={logout()} href='/home'>Cerrar sesión</a></li>
                </div>
                 : 
                <li><a className="dropdown-item" href="/login">Iniciar sesión</a></li>
                }                
              </ul>
              
            </li>
            {(role === 'admin')?
          <div>
             <li className="nav-item"><a className="nav-link text-warning" href="/admin">Panel de Admin</a></li>
          </div>
          : null}
          </ul>
          

          <form className="d-inline-flex" role="search" onSubmit={(event)=>handleSubmit(event)}>
            <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search" name='name' value={state} onChange={(event) => handleChange(event) } />
            <button className="btn btn-warning" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
    </div>
    )
}

export default NavBar