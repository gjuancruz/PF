import { GET_MOVIE_DETAIL } from "../actions"
<<<<<<< HEAD
=======

const initialState={
    movieDetail:{}
}
 
 const rootReducer = (state=initialState, action) =>{
    switch(action.type){
    case GET_MOVIE_DETAIL:
        return{
            ...state,
            movieDetail:action.payload
        }
        default:
            return state
}}
>>>>>>> e05234a8b1d85a4a59709c457341b6bc0bbd460f

const initialState={
    movieDetail:{}
}

const rootReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_MOVIE_DETAIL:
            return{
                ...state,
                movieDetail:action.payload
            }
            default:
                return state
    }
}

export default rootReducer