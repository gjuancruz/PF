import React from 'react'

const NavBar = () =>{

    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">
    <img src="https://images.vexels.com/media/users/3/220740/isolated/preview/21dd8b736fd55ca78afad1913daa86f5-icono-de-trazo-de-entradas-de-cine-clasico.png" width="30" height="30" alt=""/>
  </a>
  <a class="navbar-brand" href="#">Henry Cinema</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Mi perfil</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Próximos estrenos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Comida</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Promos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Membresías</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
        </div>
    )
}

export default NavBar