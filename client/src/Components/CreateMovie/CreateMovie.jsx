import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './CreateMovie.module.css'
import { useState } from "react";


function validate(input){
    let errors={};
    let exp = /^[a-zA-Z ]+$/gm;
    if(!input.Title){
        errors.Title = "Se requiere un Nombre de película"
    }
    if(!input.plot){
        errors.plot = "Se requiere una Trama de película"
    }
    if(!input.Director){
        errors.Director = "Se requiere un Director de Película"
    }
    if(!input.Actors){
        errors.Actors = "Se requieren Actores en la Película"
    }
    if(!input.Runtime){
        errors.Runtime = "Se requiere una Duracion de Película"
    }

    return errors
}

const CreateMovie = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    

const [input, setInput] = useState({
    Title:"",
    plot:"",
    Language:[],
    Director:"",
    genre:[],
    Actors:"",
    Release:"",
    Rated:"",
    Type:[],
    Runtime:"",
    Poster:"",
})

const handleChange = (e) => {
    setInput({
        ...input,
        [e.target.id]: e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.id]: e.target.value
    }))
    console.log(input)
}


const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pelicula creada');
}

    return (
        <div>
            <div className="container my-5">
                <div className="mb-5 d-flex flex-column align-items-center justify-content-between ">
                    <Link to='/'>
                        <button type="button" className="btn btn-warning mb-4">Volver a Home</button>
                    </Link>
                    <h1>Crea tu película</h1>
                </div>
                <div class="form-group">
                    
                    <div class="mb-3">
                        <label for="Title" class="form-label">Nombre de la película: </label>
                        <input
                        type="text"
                        class="form-control"
                        id="Title"
                        placeholder=""
                        value={input.id}
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.Title && (<p>{errors.Title}</p>)}
                    </div>

                    <div class="mb-2">
                        <label for="plot" class="form-label">Trama: </label>
                        <textarea
                        class="form-control"
                        id="plot"
                        rows="3"
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.plot && (<p>{errors.plot} </p> ) }
                    </div>

                    <div className="row">
                        
                        <div class="col mb-2">
                            <label for="Language" class="form-label">Idioma: </label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="Language" 
                            placeholder="" 
                            />
                        </div>

                        <div class="col mb-2">
                            <label for="Director" class="form-label">Director: </label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="Director" 
                            placeholder="" 
                            onChange={(e) => handleChange(e)}
                            />
                            {errors.Director && (<p>{errors.Director} </p> ) }
                        </div>
                        <div class="col mb-2">
                            <label for="genre" class="form-label">Género: </label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="genre" 
                            placeholder="" 
                            />
                        </div>
                    </div>

                    <div class="mb-2">
                        <label for="Actors" class="form-label">Actores: </label>
                        <input 
                        type="text" 
                        class="form-control" 
                        id="Actors" 
                        placeholder=""
                        onChange={(e) => handleChange(e) }
                        />
                        {errors.Actors && (<p>{errors.Actors} </p>) }
                    </div>
                    <div className="row">
                        <div class="col mb-2">
                            <label for="Release" class="form-label">Fecha de Estreno: </label>
                            <input 
                            type="date" 
                            class="form-control" 
                            id="Release" 
                            placeholder="" 
                            />
                        </div>
                        <div class="col mb-2">
                            <label for="Rated" class="form-label">Clasificación: </label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="Rated" 
                            placeholder="" 
                            />
                        </div>
                        <div class="col mb-2">
                            <label for="Type" class="form-label">Tipo (2D-3D): </label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="Type" 
                            placeholder="" 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div class="col mb-2">
                            <label for="Runtime" class="form-label">Duración: </label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="Runtime" 
                            placeholder="" 
                            onChange={(e) => handleChange(e) }
                            />
                            {errors.Runtime && (<p>{errors.Runtime} </p>) }
                        </div>
                        <div class="col mb-2">
                            <label for="Poster" class="form-label">Cargar Póster</label>
                            <input 
                            class="form-control form-control-sm" 
                            id="Poster" 
                            type="file" 
                            />
                        </div>
                    </div>
                    <div class="mb-2 d-flex justify-content-center">
                        <button type="submit" class="btn btn-warning mb-3" onClick={(e) => handleSubmit(e)}>Crear Película</button>
                    </div>
            </div>
        </div>
    </div>
    );
}

export default CreateMovie;