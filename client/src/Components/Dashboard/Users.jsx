import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUser, deleteUser} from "../../Redux/actions";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";

export default function Users(){
  const [userDlt, setUserDlt] = useState({email:''})

  const dispatch = useDispatch();
  const usuarios = useSelector(state=>state.usuarios);

  const [input, setInput] = useState("")
 
  const handleChangeSearch = (e)=>{
    e.preventDefault();
    setInput(e.target.value)
  }
  const handleSubmitSearch = (e)=>{
    e.preventDefault()
    dispatch(searchUser(input))
  }
  const handleDltUser = (e)=>{
    dispatch(deleteUser(userDlt));
    setUserDlt({email:""})
  }

  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch,userDlt])

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
          <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdropp" style={{cursor:"pointer"}}><i class="bi bi-plus-lg" ></i>
            Agregar nuevo
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={()=>dispatch(getUsers())}>
            Ver todos
          </button>
        </div>
      </div>
      <div class="table-responsive">
          {/* {console.log(usuarios)} */}
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
                    <button class="btn btn-outline-warning"><i class="bi bi-trash3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:"pointer"}} onClick={() => setUserDlt({email:u.email})}></i></button>
                  </td>
                  <DeleteUser handleDltUser={handleDltUser}/>
                  <CreateUser/>
                 
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