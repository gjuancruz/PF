import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../Redux/actions";

export function Feedback (){
    const dispatch = useDispatch()
    const feedback = useSelector((state) => state.feedback)

    useEffect(() => {
        dispatch(getFeedback())
      },[dispatch])
      
    return(
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">Feedback</h1>
       
        </div>

        <div className="table-responsive">
        <table className="table table-dark table-striped">
        <thead>
            <tr>
              <th scope="col">Feedback del usuario</th>
              <th scope="col">Nombre de usuario</th>
              <th scope="col">ID del usuario</th>
            </tr>
          </thead>


        <tbody>
        {feedback?.map((f)=> 
            (
              <tr key={f.userId} >
                <td>{f.Text}</td>
                <td>{f.user.username}</td>
                <td>{f.userId}</td>
                </tr>
            )
            )}
            </tbody>
        </table>
        </div>
        </main>

    )
}