/*
//////info de productos//////
{
producto: Coca Cola 1,5L,
precio: 300,
imagen: "link"
},
{
producto: Pochoclos,
precio: 600,
imagen: "link"
},
{
producto: Nachos,
precio: 500,
imagen: "link"
},
{
producto: Pancho,
precio: 300,
imagen: "link"
},

///////// info de ventas de cada producto del candy/////////
{
    nombreProd:
    cantidad vendidos:
    fecha:
}

///////// productos totales vendidos por mes de cada uno////////
{
    nombreProd:
    cantidad:
    montoTotal:
    mes:
}

/////// ventas totales de todos los productos en el mes ///////
{
    mes:
    monto:
}
*/ 
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCandy } from "../../Redux/actions";
import CreateCandy from "./CreateCandy";
import InfoCandy from "./InfoCandy";

export default function Candy(){
    const dispatch = useDispatch()
    const candy = useSelector(state=>state.candy);
    const [candyInfo, setCandyInfo] = useState('')
    
    const [input, setInput] = useState("")
    const handleChangeSearch = (e)=>{
        e.preventDefault();
        setInput(e.target.value)
      }
    const handleSubmitSearch = (e)=>{
        e.preventDefault()
        // dispatch(searchCandy(input))
      }

    useEffect(()=>{
        dispatch(getCandy())
    },[dispatch])

    return(
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Candy</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <form onSubmit={(e)=>handleSubmitSearch(e)} class="btn-group me-2">
            <input type= "text" value={input} placeholder="Buscar producto..." onChange={(e)=>handleChangeSearch(e)}></input>
            <button type="submit" class="btn btn-sm btn-outline-secondary">Buscar</button>
            <label>Ordenar por: </label>
            <select>
                <option selected disabled>Seleccionar</option>
                <option>Mas Vendidas</option>
                <option>Menos Vendidas</option>
            </select>
          </form>
          <button type="button" class="btn btn-sm btn-outline-secondary" onClick={()=>dispatch(getCandy())}>
            Ver todos
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdroppp" style={{cursor:"pointer"}}><i class="bi bi-plus-lg" ></i>
            Agregar nuevo
          </button>
          <CreateCandy/>
        </div>
      </div>
      <div class="table-responsive">
          {/* {console.log(candy)} */}
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {
              candy &&
              candy.map((p,i)=>
                (<tr key={i}>
                  <td>
                    {/* <img src={p.picture} class="img-fluid"alt={p.name}/> */}
                    <div  class="ratio ratio-1x1">
                        <img src={p.picture}/>
                    </div>
                  </td>
                  <td>{p.name}</td>
                  <td>$ {p.price}</td>
                  <td>
                    <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropp" style={{cursor:"pointer"}} onClick={()=>setCandyInfo(p.name)}><i class="bi bi-info-circle"></i></button>
                  </td>
                  <InfoCandy nameCandy={candyInfo}/>
                </tr>
                )
              )
            }
          </tbody>
        </table>
        {/* <div class='d-flex row'>
            <div class='col-4'>
            <h1 class="h3">Peliculas mas vendidas</h1>
            <ChartPie/>
            </div>
            <div class='col-6'>
            <h1 class="h3">Ventas mensuales totales</h1>
            <SegmentChart/>
            </div>
            
        </div> */}
       </div>
        </main>
    )
}

