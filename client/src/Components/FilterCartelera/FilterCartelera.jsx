import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { filterByType, filterByGenre } from "../../Redux/actions/index";


export default function FilterCartelera () {
    
    const dispatch = useDispatch();

    const handleSelectGenre = (e) => {
        e.preventDefault();
        console.log('Filter by genre changed');
        dispatch(filterByGenre(e.target.value));
    }

    const handleSelectType = (e) => {
        e.preventDefault();
        console.log('Filter by Type changed');
        dispatch(filterByType(e.target.value))
    }

    

    
    return (
        <div className="d-flex justify-content-evenly">

          <select class="form-select form-select-lg mb-3" aria-label="Genre Select" >
            <option className="dropdown-item" value="All" onClick={(e) => handleSelectGenre(e)}>All</option>
            <option className="dropdown-item" value="Animation" onClick={(e) => handleSelectGenre(e)}>Animation</option>
            <option className="dropdown-item" value="Adventure" onClick={(e) => handleSelectGenre(e)}>Adventure</option>
            <option className="dropdown-item" value="Comedy" onClick={(e) => handleSelectGenre(e)}>Comedy</option>
            <option className="dropdown-item" value="Action" onClick={(e) => handleSelectGenre(e)}>Action</option>
            <option className="dropdown-item" value="Fantasy" onClick={(e) => handleSelectGenre(e)}>Fantasy</option>
            <option className="dropdown-item" value="Sci-Fi" onClick={(e) => handleSelectGenre(e)}>Sci-Fi</option>
            <option className="dropdown-item" value="Drama" onClick={(e) => handleSelectGenre(e)}>Drama</option>
          </select>

          <select class="form-select form-select-lg mb-3" aria-label="Type Select" >
            <option className="dropdown-item" value="All" onClick={(e) => handleSelectType(e)}>All</option>
            <option className="dropdown-item" value="2D" onClick={(e) => handleSelectType(e)}>2-D</option>
            <option className="dropdown-item" value="3D" onClick={(e) => handleSelectType(e)}>3-D</option>
            <option className="dropdown-item" value="4D" onClick={(e) => handleSelectType(e)}>4-D</option>
          </select>

          <select class="form-select form-select-lg mb-3 bg-dark text-white" aria-label=".form-select-lg example">
            <option selected="">Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" class="btn btn-primary">1</button>
          <button type="button" class="btn btn-primary">2</button>

          <div class="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <li><a class="dropdown-item" href="#">Dropdown link</a></li>
              <li><a class="dropdown-item" href="#">Dropdown link</a></li>
            </ul>
          </div>
        </div>

          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-primary">Select Genre</button>
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" style={{willChange: 'transform'}}>
                <select name="btnGroupDrop1" id="btnGroupDrop1">
                  <option className="dropdown-item" value="All" onClick={(e) => handleSelectGenre(e)}>All</option>
                  <option className="dropdown-item" value="Animation" onClick={(e) => handleSelectGenre(e)}>Animation</option>
                  <option className="dropdown-item" value="Adventure" onClick={(e) => handleSelectGenre(e)}>Adventure</option>
                  <option className="dropdown-item" value="Comedy" onClick={(e) => handleSelectGenre(e)}>Comedy</option>
                  <option className="dropdown-item" value="Action" onClick={(e) => handleSelectGenre(e)}>Action</option>
                  <option className="dropdown-item" value="Fantasy" onClick={(e) => handleSelectGenre(e)}>Fantasy</option>
                  <option className="dropdown-item" value="Sci-Fi" onClick={(e) => handleSelectGenre(e)}>Sci-Fi</option>
                  <option className="dropdown-item" value="Drama" onClick={(e) => handleSelectGenre(e)}>Drama</option>
                </select>
              </div>
            </div>
          </div>

          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-success">Select Type</button>
            <div className="btn-group" role="group">
              <button id="btnGroupDrop2" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                <option className="dropdown-item" value="All" onClick={(e) => handleSelectType(e)}>All</option>
                <option className="dropdown-item" value="2D" onClick={(e) => handleSelectType(e)}>2-D</option>
                <option className="dropdown-item" value="3D" onClick={(e) => handleSelectType(e)}>3-D</option>
                <option className="dropdown-item" value="4D" onClick={(e) => handleSelectType(e)}>4-D</option>
              </div>
            </div>
          </div>

        </div>
    )
}