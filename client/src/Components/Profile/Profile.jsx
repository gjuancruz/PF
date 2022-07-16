import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from './Profile.module.css'

const Perfil = () =>{
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getUsers())
    },[])
    const allUsers = useSelector ((state) => state.usuarios)
    const userIdCheck = window.localStorage.getItem('userId')
    const currentUser = allUsers.filter(u =>u.id === userIdCheck)
    console.log(currentUser)
    return(
        <div>
            <NavBar/>

        <div className={styles.headerDiv}>
        <i class="bi bi-person-circle" style={{fontSize: "64px"}}></i>
        <h1 className={styles.miPerfil}>Mi perfil</h1>
        </div>

        <div><hr class='bg-warning'/></div>

        <div>
            <h3>{currentUser[0].username}</h3>
            <h4>Tu e-mail:</h4> <p>{currentUser[0].email}</p>
            <h4>Membresía:</h4> {currentUser[0].role === 'user' || currentUser[0].role === 'admin' ? <p>Actualmente no cuentas con ninguna membresía</p> : <p>Miembro del club de cine</p>}
            { currentUser[0].role === 'user' || currentUser[0].role === 'admin' && <button type="submit" class="btn btn-outline-warning mb-4">Hazte miembro del club de cine</button>}
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