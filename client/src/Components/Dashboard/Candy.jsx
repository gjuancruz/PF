
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCandy, searchCandy } from "../../Redux/actions";
import CreateCandy from "./CreateCandy";
import InfoCandy from "./InfoCandy";

export default function Candy(){
    const dispatch = useDispatch()
    const candy = useSelector(state=>state.storeCandy);
    const [candyInfo, setCandyInfo] = useState('')
    
    const [input, setInput] = useState("")
    const handleChangeSearch = (e)=>{
        e.preventDefault();
        setInput(e.target.value)
      }
    const handleSubmitSearch = (e)=>{
        e.preventDefault()
        dispatch(searchCandy(input))
      }

    useEffect(()=>{
        dispatch(getCandy())
    },[dispatch])

    return(
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Candy</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <form onSubmit={(e)=>handleSubmitSearch(e)} className="btn-group me-2">
            <input type= "text" value={input} placeholder="Buscar producto..." onChange={(e)=>handleChangeSearch(e)}></input>
            <button type="submit" className="btn btn-sm btn-outline-secondary">Buscar</button>
            <label>Ordenar por: </label>
            <select>
                <option selected disabled>Seleccionar</option>
                <option>Mas Vendidas</option>
                <option>Menos Vendidas</option>
            </select>
          </form>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>dispatch(getCandy())}>
            Ver todos
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdroppp" style={{cursor:"pointer"}}><i className="bi bi-plus-lg" ></i>
            Agregar nuevo
          </button>
          <CreateCandy/>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
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
                    <div  className="ratio ratio-1x1">
                        <img src={p.picture}/>
                    </div>
                  </td>
                  <td>{p.name}</td>
                  <td>$ {p.price}</td>
                  <td>
                    <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropp" style={{cursor:"pointer"}} onClick={()=>setCandyInfo(p.name)}><i className="bi bi-info-circle"></i></button>
                  </td>
                  <InfoCandy nameCandy={candyInfo}/>
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

