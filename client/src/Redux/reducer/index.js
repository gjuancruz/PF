import { FILTER_GENRE } from "../actions";
import { FILTER_TYPE } from "../actions";
import { GET_MOVIE_DETAIL, GET_BILLBOARD } from "../actions";

const initialState = {
  cartelera: [],
  carteleraFiltered: [],
  movieDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BILLBOARD:
      return {
        ...state,
        cartelera: action.payload,
        carteleraFiltered: action.payload
      };

    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case FILTER_TYPE:
      const carteleraToFilter = state.cartelera;
      console.log(carteleraToFilter);
      const filteredByType = action.payload === "All"
        ? carteleraToFilter
        : carteleraToFilter.filter(
            (movie) => movie.Type.trim() === action.payload
            );

      return {
        ...state,
        carteleraFiltered: filteredByType
      };
    case FILTER_GENRE:
      const moviesAll = state.cartelera;
      const filteredByGenre =
        action.payload === "All"
          ? moviesAll
          : moviesAll.filter((movie) => movie.Genre.includes(action.payload));
      return {
        ...state,
        carteleraFiltered: filteredByGenre,
      };
    default:
      return state;
  }
}
export default rootReducer;
