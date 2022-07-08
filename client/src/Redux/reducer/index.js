import { FILTER_GENRE } from "../actions";
import { FILTER_TYPE } from "../actions";
import { GET_MOVIE_DETAIL, GET_BILLBOARD } from "../actions";

const initialState = {
  cartelera: [],
  movieDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BILLBOARD:
      return {
        ...state,
        cartelera: action.payload,
      };

    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case FILTER_TYPE:
      const movies = state.cartelera;
      const filteredByType =
        action.payload === "All"
          ? movies
          : movies.filter((movie) => movie.Type === action.payload);
      return {
        ...state,
        moviesFiltered: filteredByType,
      };
    case FILTER_GENRE:
      const moviesAll = state.cartelera;
      const filteredByGenre =
        action.payload === "All"
          ? moviesAll
          : moviesAll.filter((movie) => movie.Genre === action.payload);
      return {
        ...state,
        moviesFiltered: filteredByGenre,
      };
    default:
      return state;
  }
}
export default rootReducer;
