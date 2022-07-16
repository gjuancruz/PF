import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUser, deleteUser, updateUser } from "../../Redux/actions";
import Modal from "../reusable/Modal";


export default function Users(){
  const [active, setActive]= useState(false);
const toggle = (username,email,role,id)=>{
    setActive(!active)
    {console.log(username,email,role,id)}
    setUser({username:username,email:email,role:role,id:id})
}
const [user,setUser]= useState({username:'',email:'',role:'', id:''});

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

  const dispatch = useDispatch();
  const usuarios = useSelector(state=>state.usuarios);

  const [input, setInput] = useState("")
  const [userDlt, setUserDlt] = useState({email:''})
  const handleChangeSearch = (e)=>{
    e.preventDefault();
    setInput(e.target.value)
  }
  const handleSubmitSearch = (e)=>{
    e.preventDefault();
    dispatch(searchUser(input))
  }
  const handleDelete = (e)=>{
    e.preventDefault();
    dispatch(deleteUser(userDlt));
    setUserDlt({email:""})
    dispatch(getUsers())
  }

  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])

    return(
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Usuarios</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <form onSubmit={(e)=>handleSubmitSearch(e)} class="btn-group me-2">
            <input type= "text" value={input} placeholder="Buscar usuario..." onChange={(e)=>handleChangeSearch(e)}></input>
            <button type="submit" class="btn btn-sm btn-outline-secondary">Buscar</button>
          </form>
          <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-plus-lg"></i>
            Agregar nuevo
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={()=>dispatch(getUsers())}>
            Ver todos
          </button>
        </div>
      </div>
      <div class="table-responsive">
          {console.log(usuarios)}
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios &&
              usuarios.map((u)=>
                (<tr key={u.email}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button class="btn btn-outline-warning"><i class="bi bi-pencil" onClick={()=>toggle(u.username,u.email,u.role,u.id)}></i></button>
                    <button class="btn btn-outline-warning"><i class="bi bi-trash3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:"pointer"}} onClick={()=>setUserDlt({email: u.email})}></i></button>
                  </td>
                  <Modal active={active} toggle={toggle}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <h3>Modificar Usuario</h3>
                <div>
                    <label>Usuario: </label>
                    <input type='text' name="username" value={user.username} onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Email: </label>
                    <input type='text' name="email" value={user.email} onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Rol: </label>
                    <input type='text' name="role" value={user.role} onChange={(e)=>handleChange(e)}></input>
                </div>
                <button class="btn btn-outline-warning" type="submit">Modificar</button>
                </form>
            </Modal>
                  <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content bg-dark ">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Borrar Usuario</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        ¿ Está seguro que desea borrar el usuario?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" value={u.email} onClick={(e)=>handleDelete(e)}>Borrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                </tr>
                )
              )
            }
          </tbody>
        </table>
       </div>
        </main>
        
      
    )
}