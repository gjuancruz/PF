import React,{ useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import { useParams } from "react-router-dom";
import { getMovieDetail,postPaymentMethod,getShow,getUsers,getPremiere, getBillboard, verifyRole,getDayShow } from "../../Redux/actions";
import '../Detail/MovieDetail.styles.css'
import Comment from "../Comment/Comment";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";



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
    
    // console.log("es la premier",allCartelera)
    // console.log(movieDet)

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
        dispatch(getUsers())
        dispatch(getMovieDetail(idMovie.id))
        dispatch(getShow(idMovie.id))
        dispatch(getBillboard())
        dispatch(getPremiere())
        dispatch(verifyRole())
    },[dispatch, refresh])

    const selecthora = document.querySelector("#selectHora")
    const selectdia = document.querySelector("#selectDia")
    const showdays = shows.filter((e,i,v)=>v.findIndex(e2=>(e2.day===e.day))===i)
    console.log(days)
    for(const show of showdays){
      if(shows.length==0){
      }if(selectdia.lastChild.text!=shows[shows.length-1].day){
          var option = document.createElement("option")
          option.text = show.day
          option.value = show.day
          selectdia.add(option)
          }
      }

      const createOptions=()=>{
    if(selecthora!=null){
    for(const show of days){
    if(shows.length==0){
    }if(selecthora.lastChild.text!=shows[shows.length-1].schedule){
        var option = document.createElement("option")
        option.text = show.schedule
        option.value = show.id
        selecthora.add(option)
        }
    }
  }
      }
    const CheckoutForm = () =>{
        const dispatch = useDispatch()
        const stripe = useStripe()
    
        const elements = useElements()
        // const userIdCheck = window.localStorage.getItem('userId')
        // const currentUser = allUsers.filter(u =>u.id === userIdCheck)
        // console.log('este seria el showid que le esta llegando',showid)
        const handleStripe = async(e) =>{
            e.preventDefault()
            
            const {error,paymentMethod} = await stripe.createPaymentMethod({
                type:"card",
                card: elements.getElement(CardElement)
            })
            // console.log('soy el paymentMethod',paymentMethod)
            if(!error){
                dispatch(postPaymentMethod(paymentMethod.id,showid,'62fca05e-e382-4ed7-bf04-09ebb993ee56'))
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
    const handleHourChange=(e)=>{
        e.preventDefault()
        setShowid(e.target.value)
        setShown(true)
    }
    const handleDayChange=(e)=>{
      e.preventDefault()
      dispatch(getDayShow(e.target.value,idMovie.id))
      setHourShown(true)
      deleteOptions()
      createOptions()
    }

    const deleteOptions=()=>{
      var i, L = selecthora.options.length - 1;
   for(i = L; i >= 0; i--) {
      selecthora.remove(i);
   }
   const option = document.createElement("option")
   option.text="Seleccionar hora"
   option.value=""
   selecthora.add(option)
    }
    const [num, setNum] = useState(0);

    const sumar= () => {
    setNum(num + 1);
    }
    const restar= () => {
      setNum(num - 1);
  }
    return(
        <div>
            <NavBar />
            <div className="contenedor">
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
                 <select className="selectDia" name="Dia" id="selectDia" onChange={handleDayChange}>
                    <option value="">Seleccione Dia</option>
                    </select>
                    {hourshown?(
                    <select className="selectHora"name="Hora" id="selectHora" onChange={handleHourChange}>
                    <option value="">Selecciona Hora</option>
                    </select>
):<></>}
                    </div>
                    <div>
                
      {!currentUser[0]? 
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
</div> :<div>
      <button
        className="botoncomprar2"
        type="button"
        
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
       
        Comprar 
      </button>
      <CheckoutForm/>
      </div>
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
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
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

