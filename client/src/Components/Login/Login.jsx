import React from "react";
import { useState } from "react";
import styles from './Login.module.css';
import { login } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const { data } = await axios.post('http://localhost:3001/auth/login',
            {
                email,
                password
            }
        );
        if(data.token) {
            localStorage.setItem('sw-token', data.token)
        };
        console.log(data);
    }
    return (
        <div className="container">
            <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
                <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                <label for="inputEmail" className="sr-only">Email de Usuario</label>
                <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required="" autofocus="" value={email} onChange={(event) => setEmail(event.target.value)}/>
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

            {/* <form className={styles.formLogin}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                </div>

                <div className="form-label-group mb-3">
                    <label for="inputEmail">Email</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Correo electrónico" required="" autofocus="" />
                </div>

                <div className="form-label-group mb-3">
                    <label for="inputPassword">Contraseña</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required="" />
                </div>

                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" /> Recordarme
                    </label>
                </div>
                <button className="btn btn-lg btn-warning btn-block" type="submit">Ingresar</button>
                <p className="mt-5 mb-3 text-muted text-center">© Moon Cinema - 2022</p>
                </form> */}

        </div>
    );

}

export default Login;