import React from "react";

export function ComprarModal() {
    return(
        // <h1>hahahahha</h1>
        <div>
        <button type="button" className="mt-5 btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal">Activar</button>
        <div className="modal fade bg-white" id="Modal" tabIndex='-1' aria-hidden='true' aria-aria-labelledby="modalTitle">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="modal-Title" >Prueba modal!!!</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quaerat praesentium tenetur odio excepturi aperiam autem commodi velit adipisci illum, veniam facilis. Minima fugit a sint molestiae nesciunt. Illo, voluptatem!</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}