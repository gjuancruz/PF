import React from "react";
import { useDispatch } from 'react-redux';
import { filterByType, filterByGenre } from "../../Redux/actions/index";


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

          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-primary">Select Genre</button>
            <div className="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop1" style={{'willChange': 'transform'}}>
                <option className="dropdown-item" value="All" onClick={(e) => handleSelectGenre(e)}>All</option>
                <option className="dropdown-item" value="Horror" onClick={(e) => handleSelectGenre(e)}>Horror</option>
                <option className="dropdown-item" value="Thriller" onClick={(e) => handleSelectGenre(e)}>Thriller</option>
                <option className="dropdown-item" value="Sports" onClick={(e) => handleSelectGenre(e)}>Sports</option>
                <option className="dropdown-item" value="Science-Fiction" onClick={(e) => handleSelectGenre(e)}>Science-Fiction</option>
                <option className="dropdown-item" value="Suspense" onClick={(e) => handleSelectGenre(e)}>Suspense</option>
              </div>
            </div>
          </div>

          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-success">Select Type</button>
            <div className="btn-group" role="group">
              <button id="btnGroupDrop2" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop2">
                <option className="dropdown-item" value="All" onClick={(e) => handleSelectType(e)}>All</option>
                <option className="dropdown-item" value="2-D" onClick={(e) => handleSelectType(e)}>2-D</option>
                <option className="dropdown-item" value="3-D" onClick={(e) => handleSelectType(e)}>3-D</option>
                <option className="dropdown-item" value="4-D" onClick={(e) => handleSelectType(e)}>4-D</option>
              </div>
            </div>
          </div>
        </div>
    )
}