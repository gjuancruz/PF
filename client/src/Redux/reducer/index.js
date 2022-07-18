import {
  GET_MOVIE_DETAIL,
  GET_BILLBOARD,
  POST_MOVIE,
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
  DELETE_MOVIE,
  EDIT_MOVIE
} from "../actions";

const initialState = {
  cartelera: [],
  carteleraFiltered: [],
  premiere: [],
  movieDetail: {},
  feedback:[],
  comments:[],
  refresh: false,
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
      const sortedPremieres = action.payload.sort(function (a, b) {
        if (a.Release > b.Release) {
          return 1;
        }
        if (a.Release < b.Release) {
          return -1;
        }
        return 0;
      });
      
      return {
        ...state,
        premiere: sortedPremieres,
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

    case POST_MOVIE:
        return{
          ...state,
          refresh: !state.refresh
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
          comments: state.comments.filter(e=> e.id !== action.payload.id)
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
      case DELETE_MOVIE:
          return{
            ...state,
            cartelera: state.cartelera.filter(e=> e.id !== action.payload.id),
            carteleraFiltered: state.carteleraFiltered.filter(e=> e.id !== action.payload.id),
            premiere: state.premiere.filter(e=> e.id !== action.payload.id)
          }
      case EDIT_MOVIE:
        return{
          ...state,
          refresh: !state.refresh
        }
      case "POST_COMMENT":
        return{
          ...state
        };
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
