<<<<<<< HEAD
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
=======
import { GET_MOVIE_DETAIL, GET_BILLBOARD } from "../actions"


const initialState = {
    cartelera: [],
    movieDetail:{}
 }
 
function rootReducer (state= initialState, action){
switch(action.type){
    case GET_BILLBOARD:
    return{
        ...state,
        cartelera: action.payload
    }
     
    case GET_MOVIE_DETAIL:
        return{
            ...state,
            movieDetail:action.payload
        }

    default: return state;
}
}

 export default rootReducer


 
>>>>>>> 72dfcd779b43d6c140dba005af6ff45f67294c7a
