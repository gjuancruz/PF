import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../Comment/Comment.css";
import { postComment } from "../../Redux/actions";

const Comment = () => {
  const dispatch = useDispatch();
  const movieId = useParams();
  console.log(movieId)

  const [input, setInput] = useState({
    email:"",
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
    console.log(input);
    dispatch(postComment([
        // userId,
        input,
        movieId.id
    ]));
    alert("Comentario Creado");
  }


  return (
    <form  onSubmit={e => handleSubmit(e)}>
    <div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Ingrese su Nombre
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          name="email"
          placeholder=""
          value= {input.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div class="mb-4">
        <label for="exampleFormControlTextarea1" class="form-label">
          Escribe un comentario
        </label>
        <input
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          name="Text"
          type="text"
          value= {input.Text}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <button type="submit" className="comentar">Comentar</button>
      {/* <div className="writecomment"> */}
        {/* <div class="card p-3">
          <div class="d-flex justify-content-between align-items-center" />

          <div class="user d-flex flex-row align-items-center" />

          <span>
            <small class="font-weight-bold text-primary">Juan Galaz: </small>{" "}
            <small class="font-weight-bold">Me gusto la pelicula!</small>
          </span>
        </div>
      </div>
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center" />

        <div class="user d-flex flex-row align-items-center" />

        <span>
          <small class="font-weight-bold text-primary">Axel Castillo </small>{" "}
          <small class="font-weight-bold">
            spoiler: Excelente PF! felicitaciones{" "}
          </small>
        </span>
      </div>

      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center" />

        <div class="user d-flex flex-row align-items-center" />

        <span>
          <small class="font-weight-bold text-primary">Lautaro Ocampo</small>{" "}
          <small class="font-weight-bold">Muy buena</small>
        </span>
      </div> */}
    </div>
    </form>
  );
};

export default Comment;
