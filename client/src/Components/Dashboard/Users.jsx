import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUser, deleteUser, updateUser } from "../../Redux/actions";
import Modal from "../reusable/Modal";


export default function Users(){
    const [active, setActive]= useState(false);
    const toggle = (email)=>{
    setActive(!active)
    {console.log(email)}
    
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
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(deleteUser({email:e.target.value}));
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
              <th scope="col">Borrar</th>
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
                    <button class="btn btn-outline-warning"><i class="bi bi-trash3" onClick={toggle}></i></button>
                  </td>
                  <Modal active={active} toggle={toggle}>
                
                 <label>seguro que deseas eliminar?</label>
                <button class="btn btn-outline-warning" onClick={()=>{console.log(u.email);dispatch(deleteUser({email:u.email}))}}>Eliminar</button>
            </Modal>
                  {/* <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                </div> */}
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