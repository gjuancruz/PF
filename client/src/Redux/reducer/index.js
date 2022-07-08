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

        default:
            return state
}
}
export default rootReducer






