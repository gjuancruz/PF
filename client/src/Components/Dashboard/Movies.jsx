
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBillboard } from "../../Redux/actions"

export default function Movies(){

    const allCartelera = useSelector((state) => state.carteleraFiltered)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getBillboard())
    },[])

    return (
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Peliculas</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary mx-5">Agregar Pelicula</button>
            <input type= "text" placeholder="Buscar Pelicula..."></input>
            <button type="button" class="btn btn-sm btn-outline-secondary">Buscar</button>
          </div>
        </div>
      </div>
        <div class="bg-dark p-3 m-5 row">

        {/* // <!-- Button trigger modal --> */}
        { allCartelera && allCartelera.map(e=>{
            return(
                <div class="col-md-auto pb-2">
                <img src={e.Poster} class="rounded " width="100" height="150" data-bs-toggle="modal" data-bs-target={`#${e.Title.slice(0,3)}`} alt="cars"></img>
            
            <div class="modal fade" id={e.Title.slice(0,3)} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white" >
                <div class="modal-header">
                    <h5 class="modal-title " id="staticBackdropLabel">{e.Title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body border-3" >
                    <button type="button" class="btn btn-secondary mx-2">Editar</button>
                    <button type="button" class="btn btn-secondary">Eliminar</button>
    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Volver</button>
                    <button type="button" class="btn btn-primary">Guardar</button>
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