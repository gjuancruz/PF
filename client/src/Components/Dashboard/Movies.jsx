
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBillboard, getPremiere, deleteMovie } from "../../Redux/actions"
import ModifyMovie from "./ModifyMovie"
import CreateMovie from "../CreateMovie/CreateMovie"
import { useState } from "react"

export default function Movies(){

    const cartelera = useSelector((state) => state.cartelera)
    const premiere = useSelector((state) => state.premiere)
    // const refresh = useSelector((state) => state.refresh)
    const allmovies = cartelera.concat(premiere)

    const dispatch = useDispatch()

    const [movieId,setMovieId] = useState("")

    useEffect(() =>{
        dispatch(getBillboard())
        dispatch(getPremiere())
    },[dispatch])


    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3">Peliculas</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            {/* modal agregar pelicula */}
                            <div className="col-md-auto pb-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary mx-5" data-bs-toggle="modal" data-bs-target="#form">Agregar Pelicula</button>

                            <div className="modal fade" id="form" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-xl">
                                    <div className="modal-content bg-dark text-white" >
                                        <div className="modal-header">
                                            <h5 className="modal-title " id="staticBackdropLabel">Crear Pelicula</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body border-3" >
                                            <CreateMovie></CreateMovie>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Volver</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-dark p-3 m-5 row">

                {/* // <!-- Button trigger modal --> */}
                { allmovies && allmovies.map(e=>{
                    return(
                        <div className="col-md-auto pb-2">
                        <img src={e.Poster} className="rounded " width="100" height="150" data-bs-toggle="modal" data-bs-target={`#${e.Title.slice(0,3)}`} alt="" style={{cursor:"pointer"}} onClick={() => {setMovieId(e.id)}}></img>
                    
                        <div className="modal fade" id={e.Title.slice(0,3)} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-xl">
                                <div className="modal-content bg-dark text-white" >
                                    <div className="modal-header">
                                        <h5 className="modal-title " id="staticBackdropLabel">{e.Title}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body border-3" >
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=> {dispatch(deleteMovie(movieId)); setMovieId("")}}>Eliminar</button>
                                
                                        <ModifyMovie data={e}></ModifyMovie>
                            
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>setMovieId("")}>Volver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                    )
                })                
                }
            </div>
        </main>
    )
}