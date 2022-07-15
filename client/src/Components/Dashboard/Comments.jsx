import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBillboard, getComments, deleteComment } from "../../Redux/actions"



export default function Comments(){

    const dispatch = useDispatch()
    const allCartelera = useSelector((state) => state.carteleraFiltered)
    const comments = useSelector((state) => state.comments)

    useEffect(() =>{
        dispatch(getBillboard())
    },[])

    return(
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Comentarios</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <input type= "text" placeholder="Buscar usuario..."></input>
            <button type="button" class="btn btn-sm btn-outline-secondary">Buscar</button>
          </div>
        </div>
      </div>
      <div class="bg-dark p-5 m-5 text-white row">
            
            { allCartelera && allCartelera.map(e=>{
                return(
                <div class="card bg-dark mb-2">
                    <h5 class="card-header">{e.Title}</h5>
                    <div class="card-body row">
                        <div class="col-3">
                            <img src={e.Poster} width="auto" height="200"></img>
                        </div>
                        {/* <p class="card-text col-9">With supporting</p> */}
                        <div class="col-9 py-3" style={{height: 200, overflowY:"scroll"}}>
                        {e.comments && e.comments.length>0 ? e.comments.map(f=>{
                            return(
                                <>
                                <div class="row">  
                                    <i class="bi bi-person-circle px-3 col-1"></i>
                                    <span class="col-6">{f.Text}</span>
                                    <i class="bi bi-trash3-fill mx-3 col-2 " data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:"pointer"}}></i>
                                </div><br/>
    
                                
                                <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content bg-dark ">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Borrar Comentario</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ¿ Está seguro que desea borrar el comentario ?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal"   onClick={e=>(dispatch(deleteComment(f.id)))}>Borrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
    
                                </>
    
                            )})
                            : <span>No hay comentarios</span>
                            
                        }
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
        </main>





       
    )
}
