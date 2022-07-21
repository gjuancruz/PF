import React, { useState } from "react";
import "./Checkout.css";

export function Checkout({title, horario, sala, idioma}) {
    // const sidebar = document.querySelector("#sidebar");
    // const container = document.querySelector(".my-container");

    const [toggle,setToggle] = useState(true)
  return (
    <>
      <nav class="navbar-checkout navbar-expand d-flex flex-column align-items-center justify-content-start" id={toggle ? "sidebar-active" : null} >
          
        <h3 className="mt-4 font-weight-bold text-white">{title || 'generic title'}</h3>

        <ul className="navbar-nav d-flex flex-column mt-5 w-100">
          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              {horario || 'Jueves 5:30pm'}
            </a>
          </li>
          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              {sala || " Sala: 99"}
            </a>
          </li>
          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              {idioma || 'Idioma: Español'}
            </a>
          </li>
          <li className="nav-item dropdown w-100">
            <a
              href="#"
              className="nav-link text-light pl-4 
                  dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dulceria
            </a>
            <ul
              className="dropdown-menu w-100"
              aria-aria-labelledby="navbarDropdown"
            >
              <li>
                <a href="#" class="dropdown-item text-light pl-4 p-2">
                  Combo-1
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item text-light pl-4 p-2">
                  Combo-02
                </a>
              </li>
              <li>
                <a href="#" class="dropdown-item text-light pl-4 p-2">
                  Combo-03
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              Total: $350
            </a>
          </li>
        </ul>
      </nav>
      <section class="p-4 my-container" id={toggle ? "active-section" : null}>
        <button className="btn btn-primary my-4 text-white" id="menu-btn" onClick={() =>  setToggle(!toggle)}>
          Toogle Sidebar
        </button>
        {/* <h1>Boostrap 5 sidebar navigation</h1>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
          repellat alias eaque beatae ducimus, iste harum necessitatibus nobis,
          aut officiis quia, eveniet distinctio ab vero iure numquam voluptate
          fugiat laudantium.
        </p> */}
      </section>
    </>
  );
}
// <div class="container-fluid" >
//     <div class="row">
//         {/* Pruebasaaaaa */}
//         <nav class="col-md-6 col-lg-2 d-md-block bg-dark sidebar collapse">
//             <h1>Insertando datooooos</h1>
//         </nav>
//     </div>
// </div>
