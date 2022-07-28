import React from "react";
import { useState } from "react";
import styles from './Login.module.css';
import { login } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import {useHistory} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()


    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const { data } = await axios.post('/auth/login',
            {
                email,
                password
            }
        );
        if(data.token) {
            localStorage.setItem('sw-token', data.token)
          
            // history.push(goBack());
            history.push('/home')
        }  
        } catch (error){
            setErrors(error.response.data.error)
        }

    }
    return (
        <div>
            <NavBar />
            <div className="container">
                <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                    <label for="inputEmail" className="sr-only">Email de Usuario</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email" required="true" autofocus="" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <label for="inputPassword" className="sr-only" >Contraseña</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Contraseña" required="true" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Recordarme
                        </label>
                    </div>
                    
                    <button className="btn btn-lg btn-warning btn-block mb-4" type="submit">Ingresar</button>
                    <a className="mt-5 mb-3 text-light" href='/register'>¿Aún no tienes una cuenta? Regístrate</a>
                    {errors && <p className='text-danger'>{errors}</p>}
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
        </div>
    );

}

export default Login;