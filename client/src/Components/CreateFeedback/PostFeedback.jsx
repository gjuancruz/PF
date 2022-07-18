import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFeedback, getUsers } from "../../Redux/actions";

export default function CreateFeedback(props) {
  const dispatch = useDispatch();
<<<<<<< HEAD
  // console.log(props);
  // var idUser = props.match.params.id;
  // console.log("Este es el user id:", idUser);
=======
>>>>>>> ca135f68cc4cb645c5f6b794adbc5b6af0427ba2
  const [input, setInput] = useState({
    Text: "",
  });

  useEffect(() =>{
    dispatch(getUsers())
},[])

const allUsers = useSelector ((state) => state.usuarios)
    const userIdCheck = window.localStorage.getItem('userId')
    const currentUser = allUsers.filter(u =>u.id === userIdCheck)
    console.log("este es currentUser",currentUser)


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postFeedback([currentUser[0].id, input]));
    alert("Feedback creado");
  }

  return (
<<<<<<< HEAD
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content bg-dark ">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">
                Dejar un feedback
              </h4>
              {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-4">
                    <h5>Tu feedback: </h5>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      value={input.Text}
                      name="Text"
                      style={{ width: "100%" }}
                      onChange={(e) => handleChange(e)}
                    />
=======
    <div>

      {
        userIdCheck? 
        <div className="mb-4">
  
          <button
            type="button"
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            DEJA TU PROPIO FEEDBACK !
          </button>
  
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered ">
              <div class="modal-content bg-dark ">
                <div class="modal-header">
                  <h4 class="modal-title" id="exampleModalLabel">
                    Dejar un feedback
                  </h4>
                  {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-4">
                        <h5>Tu feedback: </h5>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          value={input.Text}
                          name="Text"
                          style={{ width: "100%" }}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
>>>>>>> ca135f68cc4cb645c5f6b794adbc5b6af0427ba2
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
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
            class="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            DEJA TU PROPIO FEEDBACK !
          </button>
  
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered ">
              <div class="modal-content bg-dark ">
                <div class="modal-header">
                  <h4 class="modal-title" id="exampleModalLabel">
                    Debes iniciar sesion para dejar Feedback !
                  </h4>
                  {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col">
                        <button className="btn btn-warning"> <a href="/login">Inicia Sesion</a></button>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
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