import React,{ useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import { useParams } from "react-router-dom";

// import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, getCandy } from "../../Redux/actions";
import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, verifyRole, getCandy } from "../../Redux/actions";
import '../Detail/MovieDetail.styles.css'
import Comment from "../Comment/Comment";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Checkout } from '../Checkout/Checkout'



export default function MovieDetail(){
    const dispatch = useDispatch()
    const idMovie=useParams()
    const allCartelera = useSelector ((state) => state.carteleraFiltered)
    const premieres = useSelector((state) => state.premiere)
    const movieDet=useSelector(state=>state.movieDetail)
    const allUsers = useSelector ((state) => state.usuarios)
    const shows= useSelector(state=>state.show)
    const refresh= useSelector(state=>state.refresh)
    const [shown,setShown] = useState(false)
    const [showid,setShowid] = useState("")
    const allUser = useSelector((state) => state.usuarios);
    let userIdCheck = useSelector ((state) => state.id)
    const currentUser = allUser.filter((u) => u.id === userIdCheck);
    
    // console.log("es la premier",allCartelera)
    // console.log(movieDet)
    //boton checkout 
    const [toggle,setToggle] = useState(false)

    const storeCandy = useSelector(state => state.storeCandy)

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

    const selecthora = document.querySelector("#selectHora")
    console.log(shows)
    for(const show of shows){
    if(shows.length==0){
    }if(selecthora.lastChild.text!=shows[shows.length-1].schedule){
        var option = document.createElement("option")
        option.text = show.schedule
        option.value = show.id
        selecthora.add(option)
        }
    }

    const CheckoutForm = () =>{
        const dispatch = useDispatch()
        const stripe = useStripe()
    
        const elements = useElements()
        const userIdCheck = window.localStorage.getItem('userId')
        const currentUser = allUsers.filter(u =>u.id === userIdCheck)
        console.log(showid)
        const handleStripe = async(e) =>{
            e.preventDefault()
            
            const {error,paymentMethod} = await stripe.createPaymentMethod({
                type:"card",
                card: elements.getElement(CardElement)
            })
            console.log(paymentMethod)
            if(!error){
                dispatch(postPaymentMethod(paymentMethod.id,showid,currentUser[0].id))
            }else console.log(error)
        }
        return<form onSubmit={handleStripe}>
            <CardElement className="form-control"/>
            <button>Realizar pago</button>
        </form>
    }
    const handleSubmit = (e)=>{
        setShown(current=>!current)
    }
    const handleChange=(e)=>{
        e.preventDefault()
        setShowid(e.target.value)
    }
    console.log(toggle);

    console.log(JSON.stringify(storeCandy));
    const [num, setNum] = useState(0);

    const sumar= () => {
    setNum(num + 1);
    }
    const restar= () => {
      setNum(num - 1);
  }
    return(
        <div className="MovieDetail">
            <NavBar />
            <div className="Checkout-component">
                <Checkout title={movieDet.Title} toogle={toggle} />
            </div>
            <div className="contenedor" id={toggle && "checkout-active"}>
                <button className="btn btn-primary my-4 text-white" id="menu-btn" onClick={() =>  setToggle(!toggle)}>
                    Toogle Sidebar
                </button>

                <h2 className="pg">{movieDet.Rated}</h2>
                <h2 className="title">{movieDet.Title}</h2>
                <img className='movieImg' src={movieDet.Poster} alt="" />
                <div className="texto">
                
                
                <p><b>Sinopsis: </b> {movieDet.Plot}</p>
                <p><b>Género: </b> {movieDet.Genre}</p>
                <p><b>Actores: </b> {movieDet.Actors}</p>
                <p><b>Director: </b> {movieDet.Director}</p>
                <p><b>Duración: </b> {movieDet.Runtime} min</p>
                <p><b>Idioma: </b> {movieDet.Language}</p>
                
                </div>
                <div className="divTrailer">
                <a className="trailer" href={movieDet.Trailer}>Ver Trailer</a>
                </div>     
                {premieres.find(m=>m.id ===movieDet.id )?  (<b className="estrenopelicula">Entradas disponibles a partir del {movieDet.Release}</b>):
                 <div className="select">
                 <div>
                    <select className="selectHora"name="Hora" id="selectHora" onChange={handleChange}>
                    <option value="">Selecciona Hora</option>
                    </select>
                    <select className="selectDia" name="Dia" id="">
                    <option value="">Hoy</option>
                    <option value="">Mañana</option>
                    <option value="">Proxima Fecha</option>
                    </select>
                    </div> 
                    <div>
                
      {!currentUser[0] ? 
      <div>
<button type="button" className="botoncomprar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
Comprar 
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
              <button type="button" class="btn btn-warning" >
                Ir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
                {   shown &&   <div className="d-flex flex-column mb-3">
                            <CheckoutForm/>
                    </div>
                }
                <Comment />
                {movieDet.comments && movieDet.comments.length>0 ? movieDet.comments.map(e=>{
                    return(
                        <div class="card p-3">
                        <div class="d-flex justify-content-between align-items-center"/>
                        <div class="user d-flex flex-row align-items-center"/>
                        <span><small class="font-weight-bold text-primary">@{e.user.username}:</small> <small class="font-weight-bold">{e.Text}</small></span>
                        </div>
                    )
                }): <div>NO HAY COMENTARIOS</div>}
                
            </div>}
            
        </div> 
        <Footer />
        </div>
    )
              
}

