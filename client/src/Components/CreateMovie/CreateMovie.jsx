import React from "react";
import { Link } from "react-router-dom";
import './CreateMovie.module.css'

const CreateMovie = () => {
    

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
                        <input type="text" class="form-control" id="Title" placeholder="" />
                    </div>
                    <div class="mb-2">
                        <label for="plot" class="form-label">Trama: </label>
                        <textarea class="form-control" id="plot" rows="3"></textarea>
                    </div>
                    <div className="row">
                        <div class="col mb-2">
                            <label for="Language" class="form-label">Idioma: </label>
                            <input type="text" class="form-control" id="Language" placeholder="" />
                        </div>
                        <div class="col mb-2">
                            <label for="Director" class="form-label">Director: </label>
                            <input type="text" class="form-control" id="Director" placeholder="" />
                        </div>
                        <div class="col mb-2">
                            <label for="genre" class="form-label">Género: </label>
                            <input type="text" class="form-control" id="genre" placeholder="" />
                        </div>
                    </div>
                    <div class="mb-2">
                        <label for="Actors" class="form-label">Actores: </label>
                        <input type="text" class="form-control" id="Actors" placeholder="" />
                    </div>
                    <div className="row">
                        <div class="col mb-2">
                            <label for="Release" class="form-label">Fecha de Estreno: </label>
                            <input type="date" class="form-control" id="Release" placeholder="" />
                        </div>
                        <div class="col mb-2">
                            <label for="Rated" class="form-label">Clasificación: </label>
                            <input type="text" class="form-control" id="Rated" placeholder="" />
                        </div>
                        <div class="col mb-2">
                            <label for="Type" class="form-label">Tipo (2D-3D): </label>
                            <input type="text" class="form-control" id="Type" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div class="col mb-2">
                            <label for="Runtime" class="form-label">Duración: </label>
                            <input type="text" class="form-control" id="Runtime" placeholder="" />
                        </div>
                        <div class="col mb-2">
                            <label for="Poster" class="form-label">Cargar Póster</label>
                            <input class="form-control form-control-sm" id="Poster" type="file" />
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