import React from "react";

export default function DeleteShow({handleDltShow}){

    return(
        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content bg-dark ">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Borrar Funcion</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ¿ Estás seguro que deseas borrar la funcion?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={(e)=>handleDltShow(e)}>Borrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
    )
}