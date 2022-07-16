import React from "react";
import { useState } from "react";
import styles from './Register.module.css';
import { register } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useDispatch();


    const handleSubmit = async (e) =>{
        e.preventDefault()
        dispatch(register(email,password,username))
    }
    return (
        <div>
            <NavBar />
            <div className="container">
                <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                    <label for="inputEmail" className="sr-only">Email de Usuario</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required="" autofocus="" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <label for="inputUsername" className="sr-only" >Nombre de Usuario</label>
                    <input type="text" id="inputUsername" className="form-control mb-2" placeholder="Username" required="" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    <label for="inputPassword" className="sr-only" >Contraseña</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required="" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Recordarme
                        </label>
                    </div>
                    <button className="btn btn-lg btn-warning btn-block" type="submit">Ingresar</button>
                    <p className="mt-5 mb-3 text-muted">© Moon Cinema - 2022 </p>
                </form>
                </div>
                </div>
                )
    }
export default Register