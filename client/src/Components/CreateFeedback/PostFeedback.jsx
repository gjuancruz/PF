import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { postFeedback } from "../../Redux/actions";

export default function CreateFeedback(props){
    const dispatch = useDispatch()
    console.log(props)
    var idUser = props.match.params.id
    console.log("Este es el user id:", idUser)
    const [input, setInput] = useState({
        Text:""
    })


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }


    function handleSubmit(e){
     e.preventDefault();
    console.log(input);
    dispatch(postFeedback([
        idUser,
        input
    ]))
    alert('Feedback creado');
}


    return(
        <form onSubmit={e=> handleSubmit(e)}>
            <div>
                <h1>Crear Feedback</h1>
            </div>
            <div>
                <label>Feedback: </label>
                <input
                type= 'text'
                value= {input.Text}
                name='Text'
                onChange={(e) => handleChange(e)}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    )

}