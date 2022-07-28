import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, register } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./Register.module.css";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [post, setPost] = useState({
    email: "",
    password: "",
    role: "user",
    username: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const usuarios = useSelector((state) => state.usuarios);
  const [errors, setErrors] = useState({
    Title: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrado = usuarios.find((existente) => existente.email === post.email);
    if (registrado) {
      setErrors({
        Title: " ",
      });
    } else {
      dispatch(register(post));
      history.push("/login");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <form className={styles.formRegister} onSubmit={(e) => handleSubmit(e)}>
          <h1 className="h3 mb-3 font-weight-normal">Regístrate</h1>
          <div>
            <label htmlFor="inputEmail" className="sr-only">
              Email de Usuario
            </label>
            <input
              type="email"
              name="email"
              id="inputEmail"
              className="form-control mb-2"
              placeholder="Correo electrónico"
              required="true"
              autofocus=""
              value={post.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <label htmlFor="inputUsername" className="sr-only">
            Nombre de usuario
          </label>
          <input
            type="username"
            name="username"
            id="inputUsername"
            className="form-control mb-2"
            placeholder="Nombre de usuario"
            required="true"
            autofocus=""
            value={post.username}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="inputPassword"
            className="form-control mb-2"
            placeholder="Contraseña"
            required="true"
            value={post.password}
            onChange={(e) => handleChange(e)}
          />
          <div>
            <button className="btn btn-lg btn-warning btn-block" type="submit">
              Registrarse
            </button>
            {errors.Title && <p>Error, intente nuevamente</p>}
          </div>
          <p className="mt-5 mb-3 text-muted">© Moon Cinema - 2022 </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
