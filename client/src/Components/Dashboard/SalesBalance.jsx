import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUser, deleteUser} from "../../Redux/actions";
import ChartPie from "./Charts/ChartPie";
import SegmentChart from "./Charts/SegmentChart";
import DeleteUser from "./DeleteUser";

export default function SalesBalance(){
  const [userDlt, setUserDlt] = useState({email:''})

  const dispatch = useDispatch();
  const dataMovies = [
{ name:'Cars',
  type:'2D',
  quantitySales: 2580,
  total_gross: 1290000,
  total_net: 774000},
  { name:'Cars',
  type:'3D',
  quantitySales: 3600,
  total_gross: 2880000,
  total_net: 1728000},
  { name:'Thor',
  type:'2D',
  quantitySales: 3000,
  total_gross: 1800000,
  total_net: 1080000},
  { name:'Thor',
  type:'3D',
  quantitySales: 4500,
  total_gross: 3600000,
  total_net: 2160000},
  { name:'Minions',
  type:'2D',
  quantitySales: 3000,
  total_gross: 1800000,
  total_net: 1080000},
  { name:'Minions',
  type:'3D',
  quantitySales: 4500,
  total_gross: 3600000,
  total_net: 2160000},
  { name:'Spiderman',
  type:'2D',
  quantitySales: 3000,
  total_gross: 1800000,
  total_net: 1080000},
  { name:'Spiderman',
  type:'3D',
  quantitySales: 4500,
  total_gross: 3600000,
  total_net: 2160000},
  { name:'Sonic',
  type:'2D',
  quantitySales: 3000,
  total_gross: 1800000,
  total_net: 1080000},
  { name:'Sonic',
  type:'3D',
  quantitySales: 4500,
  total_gross: 3600000,
  total_net: 2160000},
]

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
        <h1 class="h3">Ventas de Peliculas</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <form onSubmit={(e)=>handleSubmitSearch(e)} class="btn-group me-2">
            <input type= "text" value={input} placeholder="Buscar usuario..." onChange={(e)=>handleChangeSearch(e)}></input>
            <button type="submit" class="btn btn-sm btn-outline-secondary">Buscar</button>
            <label>Ordenar por: </label>
            <select>
                <option selected disabled>Seleccionar</option>
                <option>Mas Vendidas</option>
                <option>Menos Vendidas</option>
                <option>2D</option>
                <option>3D</option>
            </select>
          </form>
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={()=>dispatch(getUsers())}>
            Ver todos
          </button>
        </div>
      </div>
      <div class="table-responsive">
          {console.log(dataMovies)}
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Entradas Vendidas</th>
              <th scope="col">T.Bruto</th>
              <th scope="col">T.Neto</th>
            </tr>
          </thead>
          <tbody>
            {
              dataMovies &&
              dataMovies.map((u)=>
                (<tr key={u.name}>
                  <td>{u.name}</td>
                  <td>{u.type}</td>
                  <td>{u.quantitySales}</td>
                  <td>{u.total_gross}</td>
                  <td>{u.total_net}</td>
                  <td>
                    <button class="btn btn-outline-warning"><i class="bi bi-info-circle" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:"pointer"}} onClick={() => null}></i></button>
                  </td>
                  <DeleteUser handleDltUser={handleDltUser}/>
                </tr>
                )
              )
            }
          </tbody>
        </table>
        <div class='d-flex row'>
            <div class='col-4'>
            <h1 class="h3">Peliculas mas vendidas</h1>
            <ChartPie/>
            </div>
            <div class='col-6'>
            <h1 class="h3">Ventas mensuales totales</h1>
            <SegmentChart/>
            </div>
            
        </div>
       </div>
        </main>
        
      
    )
}