
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBillboard, getPremiere } from "../../Redux/actions"
import ModifyMovie from "./ModifyMovie"
import createMovie from "../CreateMovie/CreateMovie"
import CreateMovie from "../CreateMovie/CreateMovie"

export default function Movies(){

    const cartelera = useSelector((state) => state.cartelera)
    const premiere = useSelector((state) => state.premiere)
    const allmovies = cartelera.concat(premiere)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getBillboard())
        dispatch(getPremiere())
    },[])

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
                        <img src={e.Poster} class="rounded " width="100" height="150" data-bs-toggle="modal" data-bs-target={`#${e.Title.slice(0,3)}`} alt="cars" style={{cursor:"pointer"}}></img>
                    
                        <div class="modal fade" id={e.Title.slice(0,3)} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-xl">
                                <div class="modal-content bg-dark text-white" >
                                    <div class="modal-header">
                                        <h5 class="modal-title " id="staticBackdropLabel">{e.Title}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body border-3" >
                                        <button type="button" class="btn btn-secondary ">Eliminar</button>
                                
                                        <ModifyMovie data={e}></ModifyMovie>
                            
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Volver</button>
                                        <button type="button" class="btn btn-primary">Guardar Cambios</button>
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