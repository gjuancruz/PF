import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from './Profile.module.css'

const Perfil = () =>{

    return(
        <div>
            <NavBar/>

        <div className={styles.headerDiv}>
        <i class="bi bi-person-circle" style={{fontSize: "64px"}}></i>
        <h1 className={styles.miPerfil}>Mi perfil</h1>
        </div>

        <div><hr class='bg-warning'/></div>

        <div>
            <h3>Indio Grasiento</h3>
            <h4>Tu e-mail:</h4>
            <h4>Membresía:</h4>
            <button type="submit" class="btn btn-outline-warning mb-4">Hazte miembro de la membresía membral membrana</button>
        </div>

        <div><hr class='bg-warning'/></div>
        
        <div className={styles.accionesDiv}>
        <i class="bi bi-wrench-adjustable-circle" style={{fontSize: "64px"}}></i>
            <h2 className={styles.miPerfil}>Acciones</h2>
        </div>
        <div className={styles.buttons}>
        <button type="submit" class="btn btn-warning">Cambiar contraseña</button>
        <button type="submit" class="btn btn-warning">Cambiar dirección e-mail</button>
        <button type="submit" class="btn btn-warning">Últimas operaciones</button>
        </div>
        </div>
    )
}

export default Perfil