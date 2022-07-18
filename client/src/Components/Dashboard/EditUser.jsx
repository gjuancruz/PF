import React, {useState} from "react";
import Modal from '../reusable/Modal';
import { updateUser } from "../../Redux/actions";
import { useDispatch } from "react-redux";

export default function EditUser(toggle,active,username,email,role){

const [user,setUser]= useState({username:username,email:email,role:role});
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
setUser({username:'',email:'',role:''})
}

    return(
        
            <Modal active={active} toggle={toggle}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Usuario</label>
                    <input type='text' name="username" value={user.username} onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type='text' name="email" value={user.email}></input>
                </div>
                <div>
                    <label>Rol</label>
                    <input type='text' name="role" value={user.role}></input>
                </div>
                <button type="submit">Actualizar</button>
                </form>
            </Modal>
        
    )
}