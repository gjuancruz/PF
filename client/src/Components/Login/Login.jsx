import React from "react";
import styles from './Login.module.css';

const Login = () => {

    return (
        <div className="container">
            {/* <form className={styles.formLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                <label for="inputEmail" className="sr-only">Email de Usuario</label>
                <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required="" autofocus="" />
                <label for="inputPassword" className="sr-only">Contraseña</label>
                <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password" required="" />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Recordarme
                    </label>
                </div>
                <button className="btn btn-lg btn-warning btn-block" type="submit">Ingresar</button>
                <p className="mt-5 mb-3 text-muted">© Moon Cinema - 2022 </p>
            </form> */}

            <form className={styles.formLogin}>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                </div>

                <div className="form-label-group mb-3">
                    <label for="inputEmail">Email</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="a@a.com" required="" autofocus="" />
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
                </form>

        </div>
    );

}

export default Login;