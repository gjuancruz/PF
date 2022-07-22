import React,{ useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import { useParams } from "react-router-dom";

import { getMovieDetail,postPaymentMethod,getShow,getUsers } from "../../Redux/actions";
import '../Detail/MovieDetail.styles.css'
import Comment from "../Comment/Comment";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Checkout } from '../Checkout/Checkout'



export default function MovieDetail(){
    const dispatch = useDispatch()
    const idMovie=useParams()
    const movieDet=useSelector(state=>state.movieDetail)
    const allUsers = useSelector ((state) => state.usuarios)
    const shows= useSelector(state=>state.show)
    const refresh= useSelector(state=>state.refresh)
    const [shown,setShown] = useState(false)
    const [showid,setShowid] = useState("")
    // console.log(movieDet)
    //boton checkout 
    const [toggle,setToggle] = useState(false)

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
        dispatch(getUsers())
        dispatch(getMovieDetail(idMovie.id))
        dispatch(getShow(idMovie.id))
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
                <a className="trailer" href={movieDet.Trailer}>Trailer</a>
                </div>                
                <div className="select">
                    <select className="selectHora"name="Hora" id="selectHora" onChange={handleChange}>
                    <option value="">Selecciona Hora</option>
                    </select>
                    <select className="selectDia" name="Dia" id="">
                    <option value="">Hoy</option>
                    <option value="">Mañana</option>
                    <option value="">Proxima Fecha</option>
                    </select>
                </div>
                <div className="botont">
                <button className="botoncomprar" onClick={handleSubmit}>Comprar</button>
                
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
                
            </div>
            <Footer />
        </div> 
      
    )
}

