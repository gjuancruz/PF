import React, { useEffect, useState } from "react";
import "./Checkout.css";
import {addCandy} from '../../Redux/actions'
import { useDispatch, useSelector } from "react-redux";

export function Checkout({NumTickets, title, horario, sala, idioma, toogle}) {
    // const sidebar = document.querySelector("#sidebar");
    // const container = document.querySelector(".my-container");
  const [candy, setCandy] = useState([])

  const [combo1, setCombo1] = useState(0)
  const [cafe, setCafe] = useState(0)
  const [refresco, setRefresco] = useState(0)
  const [hotdog, setHotdog] = useState(0)
  
    // const [toggle,setToggle] = useState(true)
  const dispatch = useDispatch();  

  const stateCandy = useSelector(state => state.candy)
//   useEffect(() => {
//     dispatch(addCandy(candy))
//   },[])

  const handleClick = (event) => {
    console.log(event.target.name, event.target.value);
    if(event.target.name === "combo1") setCombo1(event.target.value);
    if(event.target.name === "cafe") setCafe(event.target.value);
    if(event.target.name === "refresco") setRefresco(event.target.value);
    if(event.target.name === "hotdog") setHotdog(event.target.value);
  }  

  const handleSubmit = (event) => {
    console.log(event.target.name);
    const productos = []
    if(event.target.name === "combo1"){
        for (let i = 0; i < combo1; i++) {
            productos.push("combo1")
        }
        console.log(productos);
        return dispatch(addCandy(productos))
    }
    if(event.target.name === "cafe"){
        for (let i = 0; i < cafe; i++) {
            productos.push("cafe")
        }
        console.log(productos);
        return dispatch(addCandy(productos))
    }
    if(event.target.name === "refresco"){
        for (let i = 0; i < refresco; i++) {
            productos.push("refresco")
        }
        console.log(productos);
        return dispatch(addCandy(productos))
    }
    if(event.target.name === "hotdog"){
        for (let i = 0; i < hotdog; i++) {
            productos.push("hotdog")
        }
        console.log(productos);
        return dispatch(addCandy(productos))
    }
  }
  console.log("estado candy: " + JSON.stringify(stateCandy));
  return (
      <nav class="navbar-checkout d-flex flex-column justify-content-start" id={toogle ? "sidebar-active" : null} >
          
        <h3 className="mt-4 ml-5 font-weight-bold text-white">{title || 'generic title'}</h3>

        <ul className="navbar-nav d-flex flex-column mt-5 w-100">
          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              {NumTickets || 'Tickets: 1 '}
            </a>
          </li>
          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              {horario || 'Fecha: Jueves 5:30pm'}
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

          <hr />

          {/* <li className="nav-item dropdown w-100">
            <a
              href="#"
              className="nav-link text-light pl-4 
                  dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
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
          </li> */}

        {/* <div>
            <button type="button" className="mt-5 btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal">Activar</button>
            <div className="modal fade bg-white" id="Modal" tabIndex='-1' aria-hidden='true' aria-aria-labelledby="modalTitle">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modal-Title" >Prueba modal!!!</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat praesentium tenetur odio excepturi aperiam autem commodi velit adipisci illum, veniam facilis. Minima fugit a sint molestiae nesciunt. Illo, voluptatem!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss='modal'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}

    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Dulceria
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                ¡Disfruta de tu funcion con estas promos!
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row align-items-start">
                <div class="col-12">
                  <h3>Combo familiar</h3>
                  <img
                    src="https://archivos-cms.cinecolombia.com/images/_aliases/poster_carousel/4/3/5/3/13534-15-esl-CO/PARA%20DOS.png"
                    width={"130px"}
                  />
                  <select name="select">
                    <option value="value1">Value 1</option>
                    <option value="value2">Value 2</option>
                    <option value="value3">Value 3</option>
                  </select>
                  <input type="number" min='0' max="100" style={{width: '60px'}} name="combo1" onChange={handleClick} 
                    value={combo1}
                  />
                  <button type="button" class="btn btn-secondary" onClick={handleSubmit} name="combo1" >
                    Agregar
                  </button>
                </div>
                {/* <div class="col">One of three columns</div>
                <div class="col">One of three columns</div> */}
              </div>
              
              <hr />

              <div class="row align-items-start">
                <div class="col-12">
                  <h3>Agregar productos</h3>
                  <div class="col-8">
                    <img
                        src="https://static.cinepolis.com/marcas/dulceria/imagenes/productos/8/2015525172827605.png"
                        width={"120px"}
                    />
                    <input type="number" min='0' max="100" style={{width: '60px', display:"inline"}} name="cafe"
                        onChange={handleClick} value={cafe}
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleSubmit} name="cafe"
                    >
                        Agregar
                    </button>
                  </div>

                  <div>
                    <img
                        src="https://static.cinepolis.com/marcas/dulceria/imagenes/productos/8/20176713015578.png"
                        width={"120px"}
                    />
                    <input type="number" min='0' max="100" style={{width: '60px'}} name="refresco"
                        onChange={handleClick} value={refresco}
                    />
                    <button type="button" class="btn btn-secondary" onClick={handleSubmit} name="refresco">
                        Agregar
                    </button>
                  </div>

                  <div>
                    <img
                        src="https://static.cinepolis.com/marcas/dulceria/imagenes/productos/8/201552517333172.png"
                        width={"120px"}
                    />
                    <input type="number" min='0' max="100" style={{width: '60px'}} onChange={handleClick} value={hotdog} 
                        name="hotdog"
                    />
                    <button type="button" class="btn btn-secondary" onClick={handleSubmit} name="hotdog">
                        Agregar
                    </button>
                  </div>

                </div>
                {/* <div class="col">One of three columns</div>
                <div class="col">One of three columns</div> */}
              </div>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

          <hr />

          <li className="nav-item w-100">
            <a href="#" className="nav-link text-light pl-4">
              Total: $350
            </a>
          </li>
        </ul>

        <hr />
        <button type="button" class="btn btn-primary">Realizar Pago</button>

      </nav>

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
