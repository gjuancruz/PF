import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBillboard, getComments, deleteComment } from "../../Redux/actions"



export default function Comments(){

    const [commentDel,setComentDel] = useState("")
    const dispatch = useDispatch()
    const allCartelera = useSelector((state) => state.cartelera)
    const commen = useSelector((state) => state.comments)


    const getUserName = (id)=>{
        console.log(id)
        getComments()
        let comment = commen.find(e=> e.id === id.id)
        console.log(comment)
        return comment.user.username
    }

    useEffect(() =>{
        dispatch(getBillboard())
    },[commen])
    useEffect(() =>{
        dispatch(getComments())
    },[])
    

    let a = {}
    
    return(
<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Comentarios</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          
        </div>
      </div>
      <div className="bg-dark p-5 m-5 text-white row">
            
            { allCartelera && allCartelera.map(e=>{
                return(
                <div className="card bg-dark mb-2">
                    <h5 className="card-header">{e.Title}</h5>
                    <div className="card-body row">
                        <div className="col-3">
                            <img src={e.Poster} width="auto" height="200"></img>
                        </div>
                        {/* <p className="card-text col-9">With supporting</p> */}
                        <div className="col-9 py-3" style={{height: 200, overflowY:"scroll"}}>
                        {e.comments && e.comments.length>0 ? e.comments.map(f=>{
                            return(
                                <>
                                <div className="row">  
                                    <i className="bi bi-person-circle px-3 col-1"></i>
                                    <span className="col-3">{f.user.username}</span>
                                    <span className="col-6">{f.Text}</span>
                                    <i className="bi bi-trash3-fill mx-3 col-1 " data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:"pointer"}} onClick={e => setComentDel(f.id)}></i>
                                </div><br/>
    
                                <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content bg-dark ">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Borrar Comentario</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ¿ Estás seguro que deseas borrar el comentario ?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={e=>{(dispatch(deleteComment(commentDel)));setComentDel("a")}}>Borrar</button>
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
