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
    
        default:
            break;
    }
}

export default rootReducer