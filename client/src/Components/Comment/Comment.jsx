import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../Comment/Comment.css";
import { getUsers, postComment, verifyRole } from "../../Redux/actions";
import { useEffect } from "react";

const Comment = () => {
  const dispatch = useDispatch();
  const movieId = useParams();
  // console.log("este es el movieId", movieId)
  // console.log("este es el id de la movie", movieId.id)

  useEffect(() => {
    dispatch(getUsers());
    dispatch(verifyRole())
  }, []);

  const allUsers = useSelector((state) => state.usuarios);
  let userIdCheck = useSelector ((state) => state.id)
  const currentUser = allUsers.filter((u) => u.id === userIdCheck);
  // console.log("este es mi id",currentUser)
  

  const [input, setInput] = useState({
    // email:"",
    Text: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  function handleSubmit(e) {
    if(!input.Text) {
      e.preventDefault() 
      return alert("Escriba un comentario")
    }
    // console.log(input,movieId.id,currentUser[0]);
    dispatch(postComment(input, movieId.id, currentUser[0].id));
  

    alert("Comentario Creado");
    setInput({ Text: "" });
  }

  return (
    <div className="contenedoruser">
      {!currentUser[0] ? (
        <button className="buttonLog">
          {" "}
          <a href="/login">Inicia sesión para comentar</a>
        </button>
      ) : (
        <div>
          <div>
            <label className="nameuser"></label>
          </div>

          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="mb-4 mt-5">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  {currentUser[0].username} escribe un comentario
                  </label>
                  <input
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="Text"
                    type="text"
                    value={input.Text}
                    onChange={(e) => handleChange(e)}
                  ></input>

                </div>

                <button type="submit" className="comentar">
                  Comentar 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
