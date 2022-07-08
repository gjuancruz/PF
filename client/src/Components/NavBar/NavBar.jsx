import React from 'react'
import '../NavBar/NavBar.css'

const NavBar = () =>{

    return(
      <div>
      <nav class="navbar navbar-expand-lg bg-dark text-light">
      <div class="container-fluid">
        <a class="navbar-brand text-light" href="/">Henry Cinema</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-light" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="/">Próximos estrenos</a>
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
                <li><a class="dropdown-item" href="#">Mi perfil</a></li>
                <li><a class="dropdown-item" href="#">Mis comentarios</a></li>
                <li><a class="dropdown-item" href="#">Membresía</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
              </ul>
            </li>
            
          </ul>
          <form class="d-inline-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search"/>
            <button class="btn btn-warning" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    </div>
    )
}

export default NavBar