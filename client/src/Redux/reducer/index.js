import {
  GET_MOVIE_DETAIL,
  GET_BILLBOARD,
  SEARCH_MOVIES,
  FILTER_GENRE,
  FILTER_TYPE,
  GET_PREMIERE,
} from "../actions";

const initialState = {
  cartelera: [],
  carteleraFiltered: [],
  premiere: [],
  movieDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
        }

    default:
      return state;
  }
}
export default rootReducer;
