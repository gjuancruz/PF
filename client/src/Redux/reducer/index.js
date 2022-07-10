import { GET_MOVIE_DETAIL, GET_BILLBOARD, SEARCH_MOVIES, GET_PREMIERE} from "../actions"

const initialState = {
    cartelera: [],
    premiere:[],
    movieDetail:{}
}
function rootReducer (state= initialState, action){
switch(action.type){
    case GET_BILLBOARD:
    return{
        ...state,
        cartelera: action.payload
    }

    case GET_PREMIERE:
        return{
            ...state,
            premiere: action.payload
        }

    case GET_MOVIE_DETAIL:
        return{
            ...state,
            movieDetail:action.payload
        }

        case SEARCH_MOVIES:
            return{
                ...state,
                cartelera: action.payload
            }
        default:
            return state

}
}
export default rootReducer






