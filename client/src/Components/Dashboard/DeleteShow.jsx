import React from "react";

export default function DeleteShow({handleDltShow}){

    return(
        <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content bg-dark ">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Borrar Funcion</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        ¿ Estás seguro que deseas borrar la funcion?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={(e)=>handleDltShow(e)}>Borrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
    )
}