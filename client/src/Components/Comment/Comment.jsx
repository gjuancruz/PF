import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../Comment/Comment.css";
import { getUsers, postComment } from "../../Redux/actions";
import { useEffect } from "react";

const Comment = () => {
  const dispatch = useDispatch();
  const movieId = useParams();
  // console.log("este es el movieId", movieId)
  // console.log("este es el id de la movie", movieId.id)

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const allUsers = useSelector((state) => state.usuarios);
  const userIdCheck = window.localStorage.getItem("userId");
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
    e.preventDefault();
    console.log(input, movieId.id, currentUser[0]);
    dispatch(postComment(input, movieId.id, currentUser[0].id));
    alert("Comentario Creado");
  }

  //!currentUser[0] ? <button className="buttonLog"> <a href="/login">Inicia Sesion</a></button>:
  //<label className="nameuser">{currentUser[0].username}</label>

  return (
    <div>
      <div>
        {currentUser.length && (
          <div>
            {!currentUser[0] ? (
              <button className="buttonLog">
                {" "}
                <a href="/login">Inicia Sesion</a>
              </button>
            ) : (
              <div>
                <label className="nameuser">{currentUser[0].username}</label>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <div class="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Escribe un comentario
                      </label>
                      <input
                        class="form-control"
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
            )}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default Comment;
