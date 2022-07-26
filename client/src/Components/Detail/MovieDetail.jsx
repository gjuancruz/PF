import React,{ useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, getCandy } from "../../Redux/actions";
import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, verifyRole, getCandy, getDayShow,
  sumEntradas, getCardHistory } from "../../Redux/actions";
// import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, verifyRole,getDayShow } from "../../Redux/actions";
import '../Detail/MovieDetail.styles.css'
import Comment from "../Comment/Comment";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Checkout } from '../Checkout/Checkout'
import Stripe from './Stripe';

export default function MovieDetail(){
    const dispatch = useDispatch()
    const idMovie=useParams()
    const allCartelera = useSelector ((state) => state.carteleraFiltered)
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
    
    // console.log("es la premier",allCartelera)
    // console.log(movieDet)
    //boton checkout 
    // const idUser = useSelector(state => state.id)

    const [horario, setHorario] = useState({
      id: 0,
      schedule: "00:00"
    });

    const [toggle,setToggle] = useState(false)

    const storeCandy = useSelector(state => state.storeCandy)

    const entradas = useSelector(state => state.entradas)

    const idUser = useSelector(state => state.id)
    
    const cart = useSelector(state => state.cart);

    useEffect(()=>{
        !storeCandy.length && dispatch(getCandy())
        window.scrollTo({ top: 0, behavior: 'smooth' })
        dispatch(getUsers())
        dispatch(getMovieDetail(idMovie.id))
        dispatch(getShow(idMovie.id))
        dispatch(getBillboard())
        dispatch(getPremiere())
        dispatch(verifyRole())
        // idUser && dispatch(getCardHistory({idUser: idUser}))
    },[dispatch, refresh])

    useEffect(() => {
      !!idUser && dispatch(getCardHistory({idUser: idUser}))
    },[idUser])

   
    const selecthora = document.querySelector("#selectHora")
    const selectdia = document.querySelector("#selectDia")
    const showdays = shows.filter((e,i,v)=>v.findIndex(e2=>(e2.day===e.day))===i)
    console.log('this is line 46',days)
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
        console.log("entre a create options");
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
  
  console.log("fechas/horarios pelicula",shows);

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
    // console.log(toggle);

    const handleChange = (e) => {
      e.preventDefault()
      if(e.target.value !== "selectHora"){
        console.log("handleSelect:", e.target.name, e.target.value);
        const pelicula = shows.find( item => item.id === e.target.value)
        setHorario({
          id: e.target.value,
          schedule: pelicula.schedule
        })
      }
    }

    console.log(JSON.stringify(storeCandy));
    const [num, setNum] = useState(0);

    const sumar= () => {
    setNum(num + 1);
    }
    const restar= () => {
      setNum(num - 1);
    }
    const HoraPelicula = shows.find( item => item.id === showid)
    // console.log(HoraPelicula);

    // console.log("detail User  " + idUser)
    // console.log(cart);
   
    function handleClickVideo(e){
      // e.preventDefault()
      window.parent.location.reload()
    }

    console.log("Horario :",horario);
    console.log("userId:", idUser);
    console.log(showid);
    return(
        <div className="MovieDetail">
            <NavBar />
            <Stripe showid={horario.id} />


          {/* <iframe id="player" type="text/html" width="560" height="315" src="https://www.youtube.com/embed/ctcQ6b037k0?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; 
            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>   */}

          {num === 0 ? "": 
           checkbtn?
            <div className="Checkout-component">
                <Checkout title={movieDet.Title} toogle={toggle} entradas={entradas} hora={HoraPelicula} cart={cart} />
            </div>   : null 
           }
            <div className="contenedor" id={toggle && "checkout-active"}>
           {premieres.find(m=>m.id ===movieDet.id ) ? "" :
           <button
            className="botoncheck"
            disabled={num === 0}
            onClick={()=> setcheckbtn((e)=> !e)}
            > <p> Tickets {num === 0 ? "": num}</p>
            <svg className="iconocheck" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ticket-perforated" viewBox="0 0 16 16" >
  <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"/>
  <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z"/>
</svg>
           </button>}
                
                 
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
                <div className="divTrailer">
                
             
<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
<b>Ver trailer</b>
</button>



<div class="modal faded" id="staticBackdrop1" 
data-bs-backdrop="static" data-bs-keyboard="false" 
tabindex="-1" aria-labelledby="staticBackdropLabel" 
aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-dark">
      <div class="modal-header">
        
        <button class="btn-close"  data-bs-dismiss="modal" aria-label="Close" onClick={handleClickVideo} ></button>
      </div>
      <div class="modal-body">
      <div class="ratio ratio-4x3">
     
  <iframe src={movieVideo} title="YouTube video" allowfullscreen></iframe>
  
</div>
      </div>
    </div>
  </div>
</div>
                </div> 
               
                

                {premieres.find(m=>m.id ===movieDet.id )?  (<div className="estrenocontenedor"><b className="estrenopelicula" >Entradas disponibles a partir del {movieDet.Release}</b></div>):
                 <div className="select">
                 <div>
                 <select className="selectDia" name="Dia" id="selectDia" onChange={handleDayChange}>
                    <option value="">Seleccione Dia</option>
                    </select>
                    {/* {hourshown?( */}
                    <select className="selectHora"name="Horario" id="selectHora" onChange={handleChange}>
                      <option value="selectHora">Selecciona Hora</option>
                      {
                        shows.length && (shows.map( h => 
                          <option key={h.id} value={h.id} name={h.schedule}>{h.schedule}</option>
                        ))
                      }
                    </select>
{/* // ):<></>} */}
                    </div>
                    <div>
                
      {!currentUser[0]? 
      <div>
<button type="button" className="botoncomprar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
Comprar 
</button>
<div
        class="modal faded"
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
        <h5 class="modal-title" id="staticBackdropLabel">Inicia Sesion</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>Debes iniciar sesion para Comprar</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-warning" > <a href="/login" >Inicia Sesion</a></button>
      </div>
    </div>
  </div>
</div>
</div> :
      <button
        className="botoncomprar2"
        type="button"
        
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
       
        Comprar 
      </button>
}
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
                ¡Disfruta esta Pelicula!
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
                  <h3>{movieDet.Title}</h3>
                  <p>Selecciona la cantidad de Boletos</p>
                  <img
                    className="imgposter"
                    src={movieDet.Poster}
                    width={"150px"}
                  />
                  
                <button class="btn btn-warning" type="submit" disabled={num===0 || num < 1}onClick={restar}>-</button>
                    
                    <b className="num">{num}</b>
                    <button class="btn btn-warning" type="submit" onClick={sumar}>+</button>
                
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
                Cerrar
              </button>
              <button type="button" class="btn btn-warning" data-bs-dismiss="modal" 
                onClick={() => dispatch(sumEntradas({userId: idUser, seats: num, showId: horario.id}))}  //idUser, num, horario.id
              >
                Agregar al carrito
              </button>
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
                {movieDet.comments && movieDet.comments.length>0 ? movieDet.comments.map(e=>{
                    return(
                        <div class="card p-3">
                        <div class="d-flex justify-content-between align-items-center"/>
                        <div class="user d-flex flex-row align-items-center"/>
                        <span><small class="font-weight-bold text-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>  {e.user.username}:</small> <small class="font-weight-bold">{e.Text}</small></span>
                        </div>
                    )
                }): <div>NO HAY COMENTARIOS</div>}
                
            </div>}
            
        </div> 
        <Footer />
        </div>
    )
              
}
