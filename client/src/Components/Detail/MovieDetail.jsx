import React,{ useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import { useParams } from "react-router-dom";
import { getMovieDetail,postPaymentMethod,getShow } from "../../Redux/actions";
import '../Detail/MovieDetail.styles.css'
import Comment from "../Comment/Comment";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";



export default function MovieDetail(){
    const dispatch = useDispatch()
    const idMovie=useParams()
    const movieDet=useSelector(state=>state.movieDetail)
    const shows= useSelector(state=>state.show)
    // console.log(movieDet)

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
        dispatch(getMovieDetail(idMovie.id))
        dispatch(getShow(idMovie.id))
    },[dispatch])

    const CheckoutForm = (e) =>{
        e.preventDefault()
        const dispatch = useDispatch()
        const stripe = useStripe()
    
        const elements = useElements()
    
        const handleStripe = async(e) =>{
            e.preventDefault()
            
            const {error,paymentMethod} = await stripe.createPaymentMethod({
                type:"card",
                card: elements.getElement(CardElement)
            })
            console.log(paymentMethod)
            if(!error){
                dispatch(postPaymentMethod(paymentMethod.id))
            }else console.log(error)
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    const selecthora = document.querySelector("#selectHora")
    // console.log(shows)
    for(const show of shows){
    if(shows.length==0){
    }if(selecthora.lastChild.text!=shows[shows.length-1].schedule){
        var option = document.createElement("option")
        option.text = show.schedule
        option.value = ""
        selecthora.add(option)
        }
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
                <a className="trailer" href="">Trailer</a>
                </div>
                <div className="form">
                <form onSubmit={handleSubmit}>
                <div className="select">
                    <select className="selectHora"name="Hora" id="selectHora">
                    <option value="">Selecciona Hora</option>
                    </select>
                    <select className="selectDia" name="Dia" id="">
                    <option value="">Hoy</option>
                    <option value="">Mañana</option>
                    <option value="">Proxima Fecha</option>
                    </select>
                </div>
                <div className="botont">
                <button className="botoncomprar">Comprar</button>
                </div>
                </form>
                </div>
                <Comment/>
            </div>
            <Footer />
        </div> 
    )
}

