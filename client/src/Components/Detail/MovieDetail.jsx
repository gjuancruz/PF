import React,{ useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, getCandy } from "../../Redux/actions";
import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, verifyRole, getCandy, getDayShow,
  sumEntradas, getCardHistory, getTicketsHistory} from "../../Redux/actions";
// import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, verifyRole,getDayShow } from "../../Redux/actions";
import '../Detail/MovieDetail.styles.css'
import Comment from "../Comment/Comment";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Checkout } from '../Checkout/Checkout'
import Stripe from './Stripe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MovieDetail(){
    const dispatch = useDispatch()
    const idMovie=useParams()
    const premieres = useSelector((state) => state.premiere)
    const movieDet=useSelector(state=>state.movieDetail)
    const allUsers = useSelector ((state) => state.usuarios)
    const days = useSelector(state=>state.day)
    const shows= useSelector(state=>state.show)
    const refresh= useSelector(state=>state.refresh)
    const [shown,setShown] = useState(false)
    const [hourshown,setHourShown] = useState(false)
    const [showid,setShowid] = useState("")
    const allUser = useSelector((state) => state.usuarios);
    let userIdCheck = useSelector ((state) => state.id)
    const currentUser = allUser.filter((u) => u.id === userIdCheck);
    const movieVideo=useSelector(state=>state.movieDetail.Trailer);
    const [checkbtn, setcheckbtn] = useState(false);
    
    //boton checkout 
    const idUser = useSelector(state => state.id)

    const tickets = useSelector(state => state.tickets)

    const [horario, setHorario] = useState({
      id: 0,
      schedule: "00:00",
      type:""
    });


    const [toggle,setToggle] = useState(false)

    const storeCandy = useSelector(state => state.storeCandy)

    const entradas = useSelector(state => state.entradas)
    
    const cart = useSelector(state => state.cart);

    const paymentState = useSelector(state=>state.payment)
    
    const [num, setNum] = useState(0);

    const sumar= () => {
    setNum(num + 1);
    }
    const restar= () => {
      setNum(num - 1);
    }

    useEffect(() => {
      idUser && dispatch(getTicketsHistory({idUser: idUser}))
    },[entradas])

    useEffect(() => {
      idUser && !tickets.length && dispatch(getTicketsHistory({idUser: idUser}))
    },[idUser])

    useEffect(() => {
      tickets.length && setNum(tickets[0].seats)
    },[tickets])

    useEffect(()=>{
        !storeCandy.length && dispatch(getCandy())
        window.scrollTo({ top: 0, behavior: 'smooth' })
        dispatch(getUsers())
        dispatch(getMovieDetail(idMovie.id))
        dispatch(getShow(idMovie.id))
        dispatch(getBillboard())
        dispatch(getPremiere())
        dispatch(verifyRole())
    },[dispatch, refresh])

    useEffect(() => {
      !!idUser && dispatch(getCardHistory({idUser: idUser}))
    },[idUser])

   
    const selecthora = document.querySelector("#selectHora")
    const selectdia = document.querySelector("#selectDia")
    const showdays = shows.filter((e,i,v)=>v.findIndex(e2=>(e2.day===e.day))===i)
    for(const show of showdays){
      if(shows.length==0){
      }if(selectdia.lastChild.text!=shows[shows.length-1].day){
          var option = document.createElement("option")
          option.text = show.day
          option.value = show.day
          selectdia.add(option)
          }
    }
    const createOptions = () => {
      if (selecthora != null) {
        for (const show of shows) {
          if (shows.length == 0) {
            return;
          } 
          if (selecthora.lastChild.text != shows[shows.length - 1].schedule) {
            var option = document.createElement("option");
            option.text = show.schedule;
            option.value = show.id;
            selecthora.add(option);
          }
        }
      }
    };

    
//renderizxar el form en un modal para hacer la parte de chechout
  

    const handleSubmit = (e)=>{
        setShown(current=>!current)
    }
    const handleHourChange=(e)=>{
        e.preventDefault()
        // setShowid(e.target.value)  ///modificado default value
        setShowid(e.target.value)
        setShown(true)
      // createOptions() //agregado manualmente

    }
    const handleDayChange=(e)=>{
      e.preventDefault()
      dispatch(getDayShow(e.target.value,idMovie.id))
      setHourShown(true)
      // deleteOptions()
      // createOptions()
    }

    // const deleteOptions=()=>{
    //   var i, L = selecthora.options.length - 1;
    //   for(i = L; i >= 0; i--) {
    //       selecthora.remove(i);
    //   }
    //   const option = document.createElement("option")
    //   option.text="Seleccionar hora"
    //   option.value=""
    //   selecthora.add(option)
    // }
    // const [type, setType]= useState({
    //   id:0,
    //   type:"",
    //   schedule: "00:00",
    // })
    // const handleSelectType=(e)=>{
    //   e.preventDefault()
    //   dispatch(selectByType(e.target.value))
    //   setType({
    //     id:e.target.value,
    //     type:e.target.value
    //   })
    // }

    const handleChange = (e) => {
      e.preventDefault()
      if(e.target.value !== "selectHora"){
        const pelicula = shows.find( item => item.id === e.target.value)
        setHorario({
          id: e.target.value,
          schedule: pelicula.schedule,
          type:pelicula.type
        })
      }
    }
    
    const HoraPelicula = shows.find( item => item.id === showid)
   
    function handleClickVideo(e){
      // e.preventDefault()
      window.parent.location.reload()
    }
    

    const customId = 1
    const notifySuccess = () => toast("Pago realizado con éxito", {toastId: customId});
    const notifyDecline = () => toast("Su tarjeta ha sido rechazada. Intente nuevamente", {toastId: customId});


    return(
        <div className="MovieDetail">
            <NavBar />
            {/* PAYMENT NOTIFICATION */}
            <div>
            {/* <button onClick={()=>notify()}>Notify !</button> */}
        
              {paymentState === 'Payment received' && 
                notifySuccess()
              }
              {(paymentState !== 'Payment received' && paymentState !== '' && paymentState !== undefined) && 
                notifyDecline()
              }
            </div>
            {/* PAYMENT NOTIFICATION */}

            <Stripe showid={horario.id} />


          {/* <iframe id="player" type="text/html" width="560" height="315" src="https://www.youtube.com/embed/ctcQ6b037k0?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; 
            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>   */}
          <button className="closebutton2" onClick={()=>setcheckbtn((e)=> !e)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
</svg></button>
          {num === 0 ? "": 
           checkbtn?
            <div className="Checkout-component">
                
                <Checkout title={movieDet.Title} toogle={toggle} entradas={entradas} hora={HoraPelicula} cart={cart}  close={setcheckbtn}
                  boletos={num} horario={horario.schedule} showId={tickets.length ? tickets[0].showId : 0} //showId={tickets[0].seats}
                />
            </div>   : null 
           }
            <div className="contenedor" id={toggle && "checkout-active"}>
          
                 
                {/* <button className="btn btn-primary my-4 text-white" id="menu-btn" onClick={() =>  setToggle(!toggle)}>
                    Toogle Sidebar
                </button> */}

                <h2 className="pg">{movieDet.Rated}</h2>
                <h2 className="title">{movieDet.Title}</h2>
                <img className='movieImg' src={movieDet.Poster} alt="" />
                <div className="texto">
                
                
                <p className="sinopsis"><b>Sinopsis: </b> {movieDet.Plot}</p>
                <p><b>Género: </b> {movieDet.Genre}</p>
                <p><b>Actores: </b> {movieDet.Actors}</p>
                <p><b>Director: </b> {movieDet.Director}</p>
                <p><b>Duración: </b> {movieDet.Runtime} min</p>
                <p><b>Idioma: </b> {movieDet.Language}</p>
                
                
                </div>
                
              
                

                {premieres.find(m=>m.id ===movieDet.id )?  (<div className="estrenocontenedor"><b className="estrenopelicula" >Entradas disponibles a partir del {movieDet.Release}</b></div>):
                 <div className="select">
                  <p className="contenedorp">
  
  <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
  <b>Elige el dia de la funcion para comprar</b>
  </button>
</p>
<div className="collapse" id="collapseExample1">
                 <div>
                 <select className="selectDia" name="Dia" id="selectDia" onChange={handleDayChange}>
                    <option value="">Seleccione Dia</option>
                    </select>
                    {hourshown?(
                    <select className="selectHora"name="Horario" id="selectHora" onChange={handleChange}>
                      <option value="selectHora">Selecciona Hora</option>
                      {
                        shows.length && (shows.map( h => 
                          <option key={h.id} value={h.id} name={h.schedule}>{h.schedule}</option>
                        ))
                      }
                      
                    </select>
 ):<></>} 
                    </div>
                    {horario.id !== 0 ?(
                    <select className="tipo" onChange={handleChange}>
                    <option value=''>Seleccione el formato</option>
                    <option value={horario.type}>{horario.type}</option>
                    </select>):""}

                   
                  </div>
                    <div>
                    {horario.id === 0 ? "":           
      !currentUser[0]?  
      <div>
        
<button type="button" className="botoncomprar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
Comprar 
</button>

<div
        className="modal faded"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
  <div className="modal-dialog">
  <div className="modal-content bg-dark">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Inicia Sesion</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <p>Debes iniciar sesion para Comprar</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-warning" > <a href="/login" >Inicia Sesion</a></button>
      </div>
    </div>
  </div>
</div>
</div> :
  <div className="contenedorcomprar">
      <button
        className="botoncomprar2"
        type="button"
        
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
      
        Comprar 
      </button>
      </div>
}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                ¡Disfruta esta Pelicula!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row align-items-start">
                <div className="col-12">
                  <h3>{movieDet.Title}</h3>
                  <p>Selecciona la cantidad de Boletos</p>
                  <img
                    className="imgposter"
                    src={movieDet.Poster}
                    width={"150px"}
                  />
                  
                <button className="btn btn-warning" type="submit" disabled={num===0 || num < 1}onClick={restar}>-</button>
                    
                    <b className="num">{num}</b>
                    <button className="btn btn-warning" type="submit" onClick={sumar}>+</button>
                
                </div>
                {/* <div className="col">One of three columns</div>
                <div className="col">One of three columns</div> */}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal12"
                onClick={() => dispatch(sumEntradas({userId: idUser, seats: num, showId: horario.id},setcheckbtn((e)=> !e)))}  //idUser, num, horario.id
                // onClick={()=> setPulsado(!pulsado)}
                // onClick={()=> setcheckbtn((e)=> !e)}
              >
                Ir al Carrito
              </button>
                {/* {pulsado ? 
                  (<Checkout></Checkout>) : ("")
                } */}
            </div>
          </div>
        </div>
      </div>

    </div>
                {   
                  shown &&   <div className="d-flex flex-column mb-3">
                    <Stripe showid={showid} />
                  </div>
                }
                {/* {   shown &&   <div className="d-flex flex-column mb-3">
                            <CheckoutForm/>
                    </div>
                } */}
                <Comment />
                {movieDet.comments && movieDet.comments.length>0 ? movieDet.comments.map((e,index)=>{
                    return(
                        <div className="card p-3" key={index}>
                        <div className="d-flex justify-content-between align-items-center"/>
                        <div className="user d-flex flex-row align-items-center"/>
                        <span><small className="font-weight-bold text-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>  {e.user.username}:</small> <small className="font-weight-bold">{e.Text}</small></span>
                        </div>
                    )
                }): <div>NO HAY COMENTARIOS</div>}
                
            </div>}
            
        </div> 
        <Footer />
        </div>
    )
              
}

