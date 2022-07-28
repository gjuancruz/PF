import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFeedback, getUsers, verifyRole } from "../../Redux/actions";

export default function CreateFeedback(props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    Text: "",
  });

  useEffect(() =>{
    dispatch(getUsers());
    dispatch(verifyRole())
},[])

const allUsers = useSelector ((state) => state.usuarios)
let userIdCheck = useSelector ((state) => state.id)
    const currentUser = allUsers.filter(u =>u.id === userIdCheck)


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postFeedback([currentUser[0].id, input]));
    alert("Feedback creado");
  }

  return (
    <div>

      {
        userIdCheck? 
        <div className="mb-4">
  
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            DEJA TU PROPIO FEEDBACK !
          </button>
  
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content bg-dark ">
                <div className="modal-header">
                  <h4 className="modal-title" id="exampleModalLabel">
                    Dejar un feedback
                  </h4>
                  {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <h5>Tu feedback: </h5>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          value={input.Text}
                          name="Text"
                          style={{ width: "100%" }}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Enviar Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="mb-4">
  
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            DEJA TU PROPIO FEEDBACK !
          </button>
  
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content bg-dark ">
                <div className="modal-header">
                  <h4 className="modal-title" id="exampleModalLabel">
                    Debes iniciar sesion para dejar Feedback !
                  </h4>
                  {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col">
                        <button className="btn btn-warning"> <a href="/login">Inicia Sesion</a></button>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
  
      }
        
    </div>
   
  );
}