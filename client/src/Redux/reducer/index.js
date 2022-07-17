import {
  GET_MOVIE_DETAIL,
  GET_BILLBOARD,
  SEARCH_MOVIES,
  FILTER_GENRE,
  FILTER_TYPE,
  GET_PREMIERE,
  GET_FEEDBACK,
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_USERS,
  GET_SHOW,
  GET_ALL_SHOWS,
  AUTORIZADO,
} from "../actions";

const initialState = {
  cartelera: [],
  carteleraFiltered: [],
  premiere: [],
  movieDetail: {},
  feedback:[],
  comments:[],
  usuarios:[],
  shows:[],
  show:[],
  autorizado: '',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case AUTORIZADO:
      return {
        ...state,
        autorizado: action.payload,
      }

    case GET_BILLBOARD:
      return {
        ...state,
        cartelera: action.payload,
        carteleraFiltered: action.payload,
      };
    case FILTER_TYPE:
      const carteleraToFilter = state.cartelera;
      console.log(carteleraToFilter);
      const filteredByType =
        action.payload === "All"
          ? carteleraToFilter
          : carteleraToFilter.filter(
              (movie) => movie.Type.trim() === action.payload
            );

      return {
        ...state,
        carteleraFiltered: filteredByType,
      };
    case FILTER_GENRE:
      return {
        ...state,
        carteleraFiltered: action.payload,
      };

    case GET_PREMIERE:
      return {
        ...state,
        premiere: action.payload,
      };

    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case SEARCH_MOVIES:
      return {
        ...state,
        carteleraFiltered: action.payload,
      };

    case "POST_MOVIE":
        return{
          ...state
      };
    
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
      };

    case "POST_FEEDBACK":
      return{
        ...state
      };
  
    case GET_COMMENTS:
        return{
          ...state,
          comments: action.payload
        }
    case DELETE_COMMENT:
        return{
          ...state,
        }
      case GET_USERS:
        return {
          ...state,
          usuarios: action.payload
        }
      case GET_ALL_SHOWS:
        return{
          ...state,
          shows:action.payload
        }
      case GET_SHOW:
        console.log(action.payload)
        return{
          ...state,
          show:action.payload
        }
    default:
      return state;
  }
}
export default rootReducer;
