import React, {useState} from "react";
import { updateUser } from "../Redux/actions";
import { useDispatch } from "react-redux";
import styles from './ChangePassword.module.css';
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

export default function ChangePassword(){

const [user,setUser]= useState({username:'',email:'',role:'', password:''});
const dispatch = useDispatch();

const handleChange = (e)=>{
e.preventDefault();
setUser({
    ...user,
    [e.target.name]: e.target.value
})
}
const handleSubmit = (e)=>{
e.preventDefault();
dispatch(updateUser(user))
setUser({password:'',email:'',role:''})
}

    return(
        <div>
            <NavBar/>
                    <form className={styles.formLogin} onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label>Ingresa tu nueva contraseña</label>
                        <input className="form-control mb-2" type='password' name="password" placeholder="Contraseña..." value={user.password} onChange={(e)=>handleChange(e)}></input>
                    </div>
                    {/* <div>
                        <label>Email</label>
                        <input type='text' name="email" value={user.email}></input>
                    </div>
                    <div>
                        <label>Rol</label>
                        <input type='text' name="role" value={user.role}></input>
                    </div> */}
                    <button type="submit" className="btn btn-lg btn-warning btn-block mb-4">Actualizar</button>
                    </form>

        </div>
    )
}