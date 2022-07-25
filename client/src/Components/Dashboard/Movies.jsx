
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBillboard, getPremiere, deleteMovie } from "../../Redux/actions"
import ModifyMovie from "./ModifyMovie"
import CreateMovie from "../CreateMovie/CreateMovie"
import { useState } from "react"

export default function Movies(){

    const cartelera = useSelector((state) => state.cartelera)
    const premiere = useSelector((state) => state.premiere)
    const refresh = useSelector((state) => state.refresh)
    const allmovies = cartelera.concat(premiere)

    const dispatch = useDispatch()

    const [movieId,setMovieId] = useState("")

    useEffect(() =>{
        dispatch(getBillboard())
        dispatch(getPremiere())
    },[refresh])


    return (
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h3">Peliculas</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            {/* modal agregar pelicula */}
                            <div class="col-md-auto pb-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary mx-5" data-bs-toggle="modal" data-bs-target="#form">Agregar Pelicula</button>

                            <div class="modal fade" id="form" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-xl">
                                    <div class="modal-content bg-dark text-white" >
                                        <div class="modal-header">
                                            <h5 class="modal-title " id="staticBackdropLabel">Crear Pelicula</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body border-3" >
                                            <CreateMovie></CreateMovie>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Volver</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-dark p-3 m-5 row">

                {/* // <!-- Button trigger modal --> */}
                { allmovies && allmovies.map(e=>{
                    return(
                        <div class="col-md-auto pb-2">
                        <img src={e.Poster} class="rounded" width="100" height="150" data-bs-toggle="modal" data-bs-target={`#${e.Title.slice(0,3)}`} alt="" style={{cursor:"pointer"}} onClick={() => {setMovieId(e.id)}}></img>
                    
                        <div class="modal fade" id={e.Title.slice(0,3)} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-xl">
                                <div class="modal-content bg-dark text-white" >
                                    <div class="modal-header">
                                        <h5 class="modal-title " id="staticBackdropLabel">{e.Title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body border-3" >
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={e=> {dispatch(deleteMovie(movieId)); setMovieId("")}}>Eliminar</button>
                                
                                        <ModifyMovie data={e}></ModifyMovie>
                            
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={()=>setMovieId("")}>Volver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>


                        // <div class="col-md-auto pb-2">
                        // <img src={e.Poster} class="rounded " width="100" height="150" data-bs-toggle="modal" data-bs-target={`#${e.Title.slice(0,3)}`} alt="cars" style={{cursor:"pointer"}} onClick={() => {setMovieId(e.id)}}></img>
                    
                        // <div class="modal fade" id={e.Title.slice(0,3)} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        //     <div class="modal-dialog modal-dialog-centered modal-xl">
                        //         <div class="modal-content bg-dark text-white" >
                        //             <div class="modal-header">
                        //                 <h5 class="modal-title " id="staticBackdropLabel">{e.Title}</h5>
                        //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        //             </div>
                        //             <div class="modal-body border-3" >
                                        

                        //                     <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e=> {dispatch(deleteMovie(movieId)); setMovieId("")}}>Eliminar</button>

                        //                     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        //                     <div class="modal-dialog">
                        //                         <div class="modal-content bg-dark text-white" >
                        //                         <div class="modal-header">
                        //                             <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        //                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        //                         </div>
                        //                         <div class="modal-body">
                        //                             ...
                        //                         </div>
                        //                         <div class="modal-footer">
                        //                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        //                             <button type="button" class="btn btn-primary">Save changes</button>
                        //                         </div>
                        //                         </div>
                        //                     </div>
                        //                     </div>

                                
                        //                 <ModifyMovie data={e}></ModifyMovie>
                            
                        //             </div>
                        //             <div class="modal-footer">
                        //                 <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Volver</button>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                        // </div>
                    )
                })                
                }
            </div>
        </main>
    )
}