import React from "react";
import { useDispatch } from 'react-redux';
import { filterByType } from "../Redux/actions";


export default function FilterCartelera () {
    
    const dispatch = useDispatch();
    // const allMovies = useSelector((state) => state.movies)

    const handleSelectType = (e) => {
        e.preventDefault();
        console.log('Filter by type changed');
        dispatch(filterByType(e.target.value));
    }

    
    return (
        <div>
            <select name="type" onChange={(e) => handleSelectType(e)} >
                <option value="All">All</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
                <option value="Sport">Sport</option>
                <option value="movie">movie</option>
            </select>
        </div>
    )
}