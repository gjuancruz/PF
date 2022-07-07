import { FILTER_GENRE } from "../actions"; 
import { FILTER_TYPE } from "../actions";
import { data } from "../../Assets/apilocal";

const initialState = {
    allMovies : data.Search,
    moviesFiltered: [],
}

const rootReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case FILTER_TYPE:
            const movies = state.allMovies
            const filteredByType = action.payload === 'All'
            ?
            movies:
            movies.filter( (movie) => movie.Type === action.payload )
            return {
                ...state,
                moviesFiltered: filteredByType
            }
        case FILTER_GENRE:
            const moviesAll = state.allMovies
            const filteredByGenre = action.payload === 'All'
            ?
            moviesAll:
            moviesAll.filter( (movie) => movie.Genre === action.payload )
            return {
                ...state,
                moviesFiltered : filteredByGenre
            } 
    
        default:
            return state
    }
}

export default rootReducer