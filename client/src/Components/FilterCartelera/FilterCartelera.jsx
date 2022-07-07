import React from "react";
import { useDispatch } from 'react-redux';
import { filterByType, filterByGenre } from "../Redux/actions";


export default function FilterCartelera () {
    
    const dispatch = useDispatch();
    // const allMovies = useSelector((state) => state.movies)

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
        <div>

          <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-primary">Primary</button>
            <div class="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="will-change: transform;">
                <a class="dropdown-item" href="#">Dropdown link</a>
                <a class="dropdown-item" href="#">Dropdown link</a>
              </div>
            </div>
          </div>

          <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-success">Success</button>
            <div class="btn-group" role="group">
              <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                <a class="dropdown-item" href="#">Dropdown link</a>
                <a class="dropdown-item" href="#">Dropdown link</a>
              </div>
            </div>
          </div>

          <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-info">Info</button>
            <div class="btn-group" role="group">
              <button id="btnGroupDrop3" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop3">
                <a class="dropdown-item" href="#">Dropdown link</a>
                <a class="dropdown-item" href="#">Dropdown link</a>
              </div>
            </div>
          </div>

          <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-danger">Danger</button>
            <div class="btn-group" role="group">
              <button id="btnGroupDrop4" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop4">
                <a class="dropdown-item" href="#">Dropdown link</a>
                <a class="dropdown-item" href="#">Dropdown link</a>
              </div>
            </div>
          </div>
        
            <select name="genre" onChange={(e) => handleSelectGenre(e)} >
                <option value="All">All</option>
                <option value='Horror'>Horror</option>
                <option value='Thriller'>Thriller</option>
                <option value='Sports'>Sports</option>
                <option value='Science-Fiction'>Science-Fiction</option>
                <option value='Suspense'>Suspense</option>
            </select>
            <select name="type" onChange={(e) => handleSelectType(e)} >
                <option value="All">All</option>
                <option value="2-D">2-D</option>
                <option value="3-D">3-D</option>
                <option value="4-D">4-D</option>
            </select>
        </div>
    )
}