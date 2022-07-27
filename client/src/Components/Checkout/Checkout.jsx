import React, { useEffect, useState } from "react";
import "./Checkout.css";
import {
  addCandy,
  sumTotal,
  getCardHistory,
  postCandys,
  deleteCandys,
  getUsers,
  getOrderPrice,
  delTickets,
} from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function Checkout({
  NumTickets,
  title,
  sala,
  idioma,
  toogle,
  entradas,
  boletos,
  close,
  horario,
  showId,
}) {
  // const sidebar = document.querySelector("#sidebar");
  // const container = document.querySelector(".my-container");

  const [cafe, setCafe] = useState(0);
  const [refresco, setRefresco] = useState(0);
  const [hotdog, setHotdog] = useState(0);
  const [pay,setPay]=useState(false)

  // const [carrito,setCarrito] = useState(cart);

  const [TRADICIONAL, setTRADICIONAL] = useState({ id: 0, value: 0 });
  const [NACHOS, setNACHOS] = useState({ id: 0, value: 0 });
  const [GRANDE, setGRANDE] = useState({ id: 0, value: 0 });
  const [ICEE, setICEE] = useState({ id: 0, value: 0 });

  const stateCandy = useSelector((state) => state.candy);

  const storeCandy = useSelector((state) => state.storeCandy);

  const total = useSelector((state) => state.total);

  const cart = useSelector((state) => state.cart);

  const idUser = useSelector((state) => state.id);

  const movie = useSelector((state) => state.movieDetail);

  // const idUser = useSelector(state => state.id)

  const obtenerCantidad = (nombre) => {
    let idCandy;
    let quantityCandy;
    let productos = [];

    if (storeCandy.length) {
      idCandy = storeCandy.find((item) => item.name === nombre);
      quantityCandy = cart.length
        ? cart.find((item) => item.name === nombre)
        : 0;

      const state = {
        id: idCandy.id,
        value: quantityCandy ? quantityCandy.quantity : 0,
      };

      //eval(item.name.split(' ')[1])  eval(item.name.split(' ')[1]).value
      if (quantityCandy) {
        for (let i = 0; i < quantityCandy.quantity; i++) {
          productos.push(nombre);
        }
        dispatch(addCandy(productos));
      }
      console.log(
        "estoy dentro de obtenerCantidad de candys que vienen del back"
      );

      return state;
    } else {
      const defaultState = {
        id: 0,
        value: 0,
      };
      return defaultState;
    }
  };

  console.log("cart:", cart);

  // const [toggle,setToggle] = useState(true)
  const dispatch = useDispatch();

  const sumaTotal = () => {
    let sumaPrecios = 0;
    stateCandy.forEach((name) => {
      const nameCandy = storeCandy.find((item) => item.name === name);
      sumaPrecios = sumaPrecios + nameCandy.price;
    });
    console.log(sumaPrecios);
    dispatch(sumTotal(sumaPrecios));
  };

  //   useEffect(() => {
  //   //   sumaTotal();
  //   // },[stateCandy]
  //   if(idUser) dispatch(getOrderPrice({idUser: idUser}))
  // }, [dispatch])
  console.log("SOY USER IDDDDDDDDDDDDDD", typeof idUser);
  useEffect(() => {
    setTRADICIONAL(obtenerCantidad("COMBO TRADICIONAL"));
    setNACHOS(obtenerCantidad("COMBO NACHOS"));
    setGRANDE(obtenerCantidad("COMBO GRANDE"));
    setICEE(obtenerCantidad("COMBO ICEE"));
  }, [cart]);
  // useEffect(() => {
  //   dispatch(getCardHistory(idUser))
  // })

  const handleClick = (event) => {
    console.log(event.target.name, event.target.value);
    if (event.target.name === "cafe") setCafe(event.target.value);
    if (event.target.name === "refresco") setRefresco(event.target.value);
    if (event.target.name === "hotdog") setHotdog(event.target.value);

    if (event.target.name === "COMBO TRADICIONAL")
      setTRADICIONAL({ ...TRADICIONAL, value: event.target.value });
    if (event.target.name === "COMBO NACHOS")
      setNACHOS({ ...NACHOS, value: event.target.value });
    if (event.target.name === "COMBO GRANDE")
      setGRANDE({ ...GRANDE, value: event.target.value });
    if (event.target.name === "COMBO ICEE")
      setICEE({ ...ICEE, value: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(event.target.name);
    const productos = [];
    if (event.target.name === "COMBO TRADICIONAL") {
      for (let i = 0; i < TRADICIONAL.value; i++) {
        productos.push("COMBO TRADICIONAL");
      }
      dispatch(
        postCandys({
          index: TRADICIONAL.id,
          quantity: Number(TRADICIONAL.value),
          userId: idUser,
        })
      );
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      console.log(productos);
      return dispatch(addCandy(productos));
    }
    if (event.target.name === "COMBO NACHOS") {
      for (let i = 0; i < NACHOS.value; i++) {
        productos.push("COMBO NACHOS");
      }
      console.log(productos);
      dispatch(
        postCandys({
          index: NACHOS.id,
          quantity: Number(NACHOS.value),
          userId: idUser,
        })
      );
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }
    if (event.target.name === "COMBO GRANDE") {
      for (let i = 0; i < GRANDE.value; i++) {
        productos.push("COMBO GRANDE");
      }
      dispatch(
        postCandys({
          index: GRANDE.id,
          quantity: Number(GRANDE.value),
          userId: idUser,
        })
      );
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }
    if (event.target.name === "COMBO ICEE") {
      for (let i = 0; i < ICEE.value; i++) {
        productos.push("COMBO ICEE");
      }
      dispatch(
        postCandys({
          index: ICEE.id,
          quantity: Number(ICEE.value),
          userId: idUser,
        })
      );
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }
    if (event.target.name === "cafe") {
      for (let i = 0; i < cafe; i++) {
        productos.push("cafe");
      }
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }
    if (event.target.name === "refresco") {
      for (let i = 0; i < refresco; i++) {
        productos.push("refresco");
      }
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }
    if (event.target.name === "hotdog") {
      for (let i = 0; i < hotdog; i++) {
        productos.push("hotdog");
      }
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }

    if (event.target.name === "COMBO TRADICIONALdelete") {
      productos.filter((p) => p !== "COMBO TRADICIONAL");
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(deleteCandys({ index: TRADICIONAL.id, userId: idUser }));
    }

    if (event.target.name === "COMBO NACHOSdelete") {
      productos.filter((p) => p !== "COMBO NACHOS");
      dispatch(deleteCandys({ index: NACHOS.id, userId: idUser }));
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }

    if (event.target.name === "COMBO GRANDEdelete") {
      productos.filter((p) => p !== "COMBO GRANDE");
      dispatch(deleteCandys({ index: GRANDE.id, userId: idUser }));
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }

    if (event.target.name === "COMBO ICEEdelete") {
      productos.filter((p) => p !== "COMBO ICEE");
      dispatch(deleteCandys({ index: ICEE.id, userId: idUser }));
      setTimeout(() => {
        dispatch(getOrderPrice({ idUser: idUser }));
      }, 500);
      return dispatch(addCandy(productos));
    }
  };

  const delTicketsEvent = (e) => {
    e.preventDefault();
    // console.log(e);
    dispatch(delTickets({ userId: idUser, showId: showId })); //idUser
  };

  //   console.log(JSON.stringify(storeCandy[1].name));

  console.log("estado candy: " + JSON.stringify(stateCandy));
  return (
    // <nav class="navbar-checkout navbar-collapse collapse d-flex flex-column justify-content-start" id={toogle ? "sidebar-active" : null} >
    <div class="modal fade" id="staticBackdropcheck" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    
      {/* <div className="bton">
        {" "}
        <button className="closebutton" onClick={() => close(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div> */}
      <div class="modal-dialog">
      <div class="modal-content bg-dark">
      <div class="modal-header">
      <h3 class="modal-title" id="staticBackdropLabel">
        {title || "generic title"}
      </h3>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
      <iframe src={movie.Trailer} alt="" width="400px" height="300px" />
      <ul className="navbar-nav d-flex flex-column mt-5 w-100">
        <li className="nav-item w-100">
          {NumTickets || `Tickets: ${boletos} `}
          
        </li>
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-light pl-4">
            {horario ? `Fecha: Jueves ${horario}` : `Fecha: Jueves 0:00`}
          </a>
        </li>
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-white pl-4">
            {sala || " Sala: 99"}
          </a>
        </li>
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-white pl-4">
            {idioma || "Idioma: Español"}
          </a>
        </li>

        <hr />

        <div>
        <h5 class="modal-title" id="staticBackdropLabel121">
                    ¡Disfruta de tu funcion con estas promos!
                  </h5>
          <button
            type="button"
            class="btn btn-warning"
            data-bs-toggle="collapse" data-bs-target="#collapseExamplecandy" aria-expanded="false" aria-controls="collapseExample"
            
          >
            Dulceria
          </button>

          <div class="collapse" id="collapseExamplecandy">
                  
                 
                
                  
                    <div class="col-12">
                      {storeCandy.map((item) => (
                        <div>
                          <h4>{item.name}</h4>
                          <img src={item.picture} width={"120px"} />
                          <span style={{ paddingRight: "10px" }}>
                            Price: {item.price}
                          </span>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            style={{ width: "60px" }}
                            name={item.name}
                            onChange={handleClick}
                            value={eval(item.name.split(" ")[1]).value}
                          />
                          <button
                            type="button"
                            class="btn btn-outline-warning"
                            
                            onClick={handleSubmit}
                            name={item.name}
                          >
                            Agregar
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-warning"
                            onClick={handleSubmit}
                            name={item.name + "delete"}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* <div class="col">One of three columns</div>
                <div class="col">One of three columns</div> */}
                  
                </div>
                </div>
                
         

        <hr />

        <li className="nav-item w-100">
          <a href="#" className="nav-link text-white pl-4">
            <b>Total a pagar : ${total}</b>
          </a>
          <input
            type="button"
            className="deletticket"
            value="Borrar Tickets"
            
            onClick={(e) => delTicketsEvent(e)}
          ></input>
        </li>
      </ul>

      <hr />
      <div class="modal-footer">
      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropay" onClick={()=>setPay(!pay)}>Realizar Pago</button>
      </div>
    </div>
    </div>
    </div>
    </div>
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
