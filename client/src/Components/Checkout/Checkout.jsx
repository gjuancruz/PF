import React, { useEffect, useState } from "react";
import "./Checkout.css";
import {
  sumTotal, 
  getCardHistory, 
  getUsers,
  getOrderPrice, 
  delTickets, 
  userCart} from '../../Redux/actions'

import { useDispatch, useSelector } from "react-redux";

import { Candy } from './Candy';  //Componente Candy Modal...

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
  dias,
  room,
  cart
}) {
  // const sidebar = document.querySelector("#sidebar");
  // const container = document.querySelector(".my-container");

  // const [granTotal, setGranTotal] = useState(0);

  const stateCandy = useSelector(state => state.candy);


  const total = useSelector((state) => state.total);


  const idUser = useSelector((state) => state.id);

  const movie = useSelector((state) => state.movieDetail);

  const userCarrito = useSelector(state => state.userCart)

  const actualizarPrecio = useSelector(state => state.actualizarPrecio);

  const ticketsHistory = useSelector(state => state.tickets)

  const [pay,setPay]=useState(false)

  // const idUser = useSelector(state => state.id)

  // function sumaCarrito(){
  //   let totalCandys = 0; 
  //   let totalTickets = 0;
  //   // if(userCarrito.length){
  //     totalTickets = userCarrito.tickets[0].length ? userCarrito.tickets[0].totalPrice : 0
  //     userCarrito.candy.forEach(item => {
  //       totalCandys = totalCandys + item.totalPrice
  //     })
  //   // }
  //   return totalCandys + totalTickets;
  // }

  
  const dispatch = useDispatch();

  useEffect(() => {
    idUser && dispatch(userCart({idUser:idUser}))
  },[actualizarPrecio,ticketsHistory,idUser])

  // useEffect(() => {
  //   console.log("entre a setGranTotal");
  //   userCarrito.tickets.length ? setGranTotal(sumaCarrito()) : setGranTotal(0)
  // },[userCarrito])

  // console.log("cart:", cart);

  // const [toggle,setToggle] = useState(true)

  // const sumaTotal = () => {
  //   let sumaPrecios = 0;
  //   stateCandy.forEach((name) => {
  //     const nameCandy = storeCandy.find((item) => item.name === name);
  //     sumaPrecios = sumaPrecios + nameCandy.price;
  //   });
  //   dispatch(sumTotal(sumaPrecios));
  // };

  //   useEffect(() => {
  //   //   sumaTotal();
  //   // },[stateCandy]
  //   if(idUser) dispatch(getOrderPrice({idUser: idUser}))
  // }, [dispatch])
  console.log("SOY USER IDDDDDDDDDDDDDD", typeof idUser);

  
  // useEffect(() => {
  //   dispatch(getCardHistory(idUser))
  // })

  // const delayTotalPrice = async() => {
  //   await setTimeout(5000);
  //   console.log("entre al delayTotalPrice");
  //   dispatch(userCart({idUser:idUser}));
  // }
  
  // const TotalCarrito = () => {
  //   return userTicket + userCandy;
  // }
  
  const [totalCart, setTotalCart] = useState(0)

  useEffect(() => {
    const userTicket = !!userCarrito.tickets ? userCarrito.tickets.reduce((prev, current) => prev + current.totalPrice, 0) : 0;
    const userCandy = !!userCarrito.candy ? userCarrito.candy.reduce((prev, current) => prev + current.totalPrice, 0) : 0;
    setTotalCart(userTicket + userCandy)
  },[userCarrito,cart])

  const delTicketsEvent = (e) => {
    e.preventDefault();
    dispatch(delTickets({ userId: idUser, showId: showId })); //idUser
  };

  console.log("CartCheckout",cart);
  console.log("userCarrito :", userCarrito);
  console.log("userCarritoTicket :", userCarrito.tickets);
  console.log("reducerTotal :", totalCart);
  // console.log("reducerCandy", userCarrito);
  return (
    // <nav className="navbar-checkout navbar-collapse collapse d-flex flex-column justify-content-start" id={toogle ? "sidebar-active" : null} >
    <nav
      className="navbar-checkout navbar-collapse collapse d-flex flex-column justify-content-center"
      id="Navcollapse"
    >
      <div className="bton">
        {" "}
        <button className="closebutton" onClick={() => close(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
      <h3 className="mt-4 ml-5 font-weight-bold text-white">
        {title || "generic title"}
      </h3>
      <iframe src={movie.Trailer} alt="" width="400px" height="300px" />
      <ul className="navbar-nav d-flex flex-column mt-5 w-100">
        <li className="nav-item w-100">
        {/* {NumTickets || `Tickets: ${userCarrito.tickets.length ? userCarrito.tickets[0].seats : 0} `} */}
         Tickets :{ ticketsHistory.length ? ticketsHistory.reduce((prev, current) => prev + current.seats, 0) : "nada" }
        {/* {NumTickets || `Tickets: ${entradas ? entradas : 0} `} */}
          {/* <input type="button" value="X" style={{backgroundColor: "red", padding:"0 5px"}} 
             onClick={(e) => delTicketsEvent(e)} ></input> */}
          
        </li>
       
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-light pl-4">
            {horario ? `Fecha: ${dias} ${horario}` : `Fecha: Jueves 0:00`}
          </a>
        </li>
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-white pl-4">
            {sala || `Sala :${room}`}
          </a>
        </li>
        <li className="nav-item w-100">
          <a href="#" className="nav-link text-white pl-4">
            {idioma || "Idioma: Español"}
          </a>
        </li>

        <hr />

        <div>
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop1"
          >
            Dulceria
          </button>
          <Candy />
          
        </div>

        <hr />

        <li className="nav-item w-100">
          <a href="#" className="nav-link text-white pl-4">
            <b>Total a pagar : {totalCart} </b>
          </a>
        </li>
        <li></li>
      </ul>

      <hr />
      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropay" onClick={()=>setPay(!pay)}>Realizar Pago</button>
    </nav>
  );
}
// <div className="container-fluid" >
//     <div className="row">
//         {/* Pruebasaaaaa */}
//         <nav className="col-md-6 col-lg-2 d-md-block bg-dark sidebar collapse">
//             <h1>Insertando datooooos</h1>
//         </nav>
//     </div>
// </div>