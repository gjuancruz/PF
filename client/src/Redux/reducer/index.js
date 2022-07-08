import { GET_MOVIE_DETAIL } from "../actions"


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
 export default rootReducer