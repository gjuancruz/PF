import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsSales, getBillboard, searchMoviesSales} from "../../Redux/actions";
import ChartPie from "./Charts/ChartPie";
import SegmentChart from "./Charts/SegmentChart";
import InfoSalesMovies from "./InfoSalesMovies";

export default function SalesBalanceMovies(){
  const [movieInfo, setMovieInfo] = useState({name:'',type:''})
  const tickets = useSelector(state=>state.infoTickets)
  const allMovies=useSelector(state=>state.cartelera)

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
    dispatch(searchMoviesSales(input))
  }
  const handleInfo = (name,type)=>{
    // dispatch(deleteUser(userDlt));
    setMovieInfo({name,type})
  }
  const handleMovie = (movie)=>{
   const data = allMovies.find(e=>e.id === movie)
   return data.Title;
  }

  useEffect(()=>{
    dispatch(getTicketsSales())
    dispatch(getBillboard())
  },[dispatch])

    return(
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Ventas de Peliculas</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <form onSubmit={(e)=>handleSubmitSearch(e)} class="btn-group me-2">
            <input type= "text" value={input} placeholder="Buscar pelicula..." onChange={(e)=>handleChangeSearch(e)}></input>
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
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={()=>dispatch(getTicketsSales())}>
            Ver todos
          </button>
        </div>
      </div>
      {console.log(tickets)}
      {console.log(allMovies)}
      <div class='row'>
        <div class='col-4 card text-center mx-4'>
            <div class='card-header'>
            <h4>Peliculas mas vendidas</h4>
            </div>
            <div class='card-body'>
            <ChartPie/>
            </div>
            <div class='card-footer text-muted'>
            Top 6 mas vendidas
            </div>
        </div>

        <div class='col-7 card text-center'>
            <div class='card-header'>
            <h4>Ventas mensuales</h4>
            </div>
            <div class='card-body'>
            <SegmentChart/>
            </div>
            <div class='card-footer text-muted'>
            Total de ventas de los ultimos meses
            </div>
        </div>
        </div><br/>

      <div class="table-responsive">
          {/* {console.log(dataMovies)} */}
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Entradas Vendidas</th>
              <th scope="col">Mes</th>
              <th scope="col">T.Bruto</th>
              <th scope="col">T.Neto</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {
              tickets.length &&
              tickets.map((u,i)=>
                (<tr key={i}>
                  <td>{handleMovie(u.movie)}</td>
                  <td>{u.type}</td>
                  <td>{u.seats}</td>
                  <td>{u.date}</td>
                  <td>{u.totalPrice}</td>
                  <td>{u.totalPrice * 0.6}</td>
                  <td>
                    <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropp" style={{cursor:"pointer"}} onClick={(e)=>handleInfo(u.name,u.type)}><i class="bi bi-info-circle"></i></button>
                  </td>
                  <InfoSalesMovies nameMovie={movieInfo.name} type={movieInfo.type}/>
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