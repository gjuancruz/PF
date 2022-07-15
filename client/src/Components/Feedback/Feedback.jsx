import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../Redux/actions";

export default function Feedback (){
    const dispatch = useDispatch()
    const feedback = useSelector((state) => state.feedback)
    console.log(feedback)

    useEffect(() => {
        dispatch(getFeedback())
      },[])
      
    return(

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h3">Feedback</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <input type= "text" placeholder="Buscar feedback..."></input>
            <button type="button" class="btn btn-sm btn-outline-secondary">Buscar</button>
          </div>
          </div>
        </div>

    <div>
        <h1>Titulo de feedback</h1>
        {feedback?.map((f)=> {
            return(
            <div>
                <br/>
                <h3>Feedback: {f.Text}</h3>
                <h4>User Id: {f.userId} </h4>
                <br/>
            </div>
            )
            })}
        </div>
        </main>

    )
}