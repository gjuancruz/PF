import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, verifyRole, getComments } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./Profile.module.css";

const Perfil = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(verifyRole());
  }, []);
  const allUsers = useSelector((state) => state.usuarios);
  let userIdCheck = useSelector((state) => state.id);
  const currentUser = allUsers.filter((u) => u.id === userIdCheck);
  // console.log("este es el currentUser",currentUser)

  const comments = useSelector((state) => state.comments);
  const commentUser = comments.filter((u) => u.userId === currentUser[0].id);

  useEffect(() => {
    dispatch(getComments());
  }, []);

  return (
    <div>
      <NavBar />
      <div className={styles.headerDiv}>
        <i class="bi bi-person-circle" style={{ fontSize: "64px" }}></i>
        <h1 className="display-5 fw-bold ml-4">
          {currentUser.length && currentUser[0].username}
        </h1>
      </div>

      <div>
        <hr class="bg-warning" />
      </div>

      {currentUser.length ? (
        <div>
          <div className={styles.minheight}>
            <h4>Tu e-mail:</h4> <p>{currentUser[0].email}</p>
            <h4>Membresía:</h4>{" "}
            {currentUser[0].role === "user" ||
            currentUser[0].role === "admin" ? (
              <p>Actualmente no cuentas con ninguna membresía</p>
            ) : (
              <p>Miembro del club de cine</p>
            )}
            <h4>Tus comentarios:</h4>
            {commentUser.length ? (
              commentUser.map((c) => {
                return (
                  <div className="my-1">
                    <div class="container text-center">
                      <div class="row align-items-start">
                        <div class="col-7">
                          <h6>{c.movie.Title}:</h6>
                        </div>
                        <div class="col">
                          <p>"{c.Text}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No has comentado nada todavía</p>
            )}
            {(currentUser[0].role === "user" ||
              currentUser[0].role === "admin") && (
              <button type="submit" class="btn btn-outline-warning mb-4">
                Hazte miembro del club de cine
              </button>
            )}
          </div>
          <div>
            <hr class="bg-warning" />
          </div>

          <div className={styles.accionesDiv}>
            <i
              class="bi bi-wrench-adjustable-circle"
              style={{ fontSize: "64px" }}
            ></i>
            <h2 className={styles.miPerfil}>Acciones</h2>
          </div>
          <div className={styles.buttons}>
            <button type="submit" class="btn btn-warning">
              Cambiar contraseña
            </button>
            <button type="submit" class="btn btn-warning">
              Cambiar dirección e-mail
            </button>
            <button type="submit" class="btn btn-warning">
              Últimas operaciones
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button className="btn btn-warning d-flex justify-content-center">
            {" "}
            <a href="/login">Inicia Sesion</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default Perfil;
