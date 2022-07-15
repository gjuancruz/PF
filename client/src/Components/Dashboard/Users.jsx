import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";

export default function Users(){

  const dispatch = useDispatch();
  const usuarios = useSelector(state=>state.usuarios);
  //const cant_usuarios = usuarios.map((n,i)=>n=i);

  

  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])

    return(
        <div class="table-responsive">
          {console.log(usuarios)}
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Edit</th>
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
                  <td><button>edit</button><button>delete</button></td>
                </tr>)
              )
            }
          </tbody>
        </table>
      </div>
    )
}