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