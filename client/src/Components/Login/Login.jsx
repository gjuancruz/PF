import React, { useEffect } from "react";
import { useState } from "react";
import styles from './Login.module.css';
import { login } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import {useHistory} from 'react-router-dom'
import { recuperarPassword } from "../../Redux/actions";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()
    const refresh = useSelector(state => state.refresh)
    const [inputRecover, setInputRecover] = useState({
        email : '',
    })

    function handleChange(e) {
        setInputRecover({
          ...inputRecover,
          email: e.target.value,
        });
      }

    

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

    const handleRecuperacion = async (e) => {
        e.preventDefault()
        try {
            dispatch(recuperarPassword(inputRecover))
        } catch (error) {
            alert('Hubo problemas. Intente nuevamente.')
        }
    }

    useEffect(() => {
        
    }, [refresh])
    return (
        <div>
            <NavBar />
            <div className="container">
                <form className={styles.formLogin} onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email de Usuario</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email" required="true" autofocus="" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <label htmlFor="inputPassword" className="sr-only" >Contraseña</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Contraseña" required="true" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Recordarme
                        </label>
                    </div>
                    
                    <button className="btn btn-lg btn-warning btn-block mb-4" type="submit">Ingresar</button>
                    <a className="mt-5 mb-3 text-light" href='/register'>¿Aún no tienes una cuenta? <span className="text-warning"> Registrate</span></a>
                    {errors && 
                    <div>
                        <p className='text-danger'>{errors}</p>
                            <br />
                        <p className='text-warning'
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            Ingresa aquí si olvidaste tu contraseña.
                        </p>

                            {/* <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                Ingresa aquí si olvidaste tu contraseña
                            </button> */}


                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered ">
                                <div className="modal-content bg-dark ">
                                    <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalLabel">
                                        RECUPERAR CONTRASEÑA
                                    </h4>
                                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                    </div>
                                    <div className="modal-body">
                                    <div className="container-fluid">
                                        <div className="row">
                                        <div className="col-4">
                                            <h5>Ingresa tu dirección de correo electrónico: </h5>
                                        </div>
                                        <div className="col">
                                            <input
                                            type="email"
                                            value={inputRecover.email}
                                            placeholder="Ingrese su mail"
                                            name="email"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Ingresar formato mail"
                                            style={{ width: "100%" }}
                                            onChange={(e) => handleChange(e)}
                                            />
                                            
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={(e) => handleRecuperacion(e)}
                                        data-bs-dismiss="modal"
                                    >
                                        Enviar Código de recuperación
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>

                    </div>
                    }
                    <p className="mt-5 mb-3 text-muted">© Moon Cinema - 2022 </p>
                </form>

            </div>
        </div>
    );

}

export default Login;