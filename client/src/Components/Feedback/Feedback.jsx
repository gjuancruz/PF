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

    )
}