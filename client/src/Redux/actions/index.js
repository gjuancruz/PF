import axios from "axios";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_GENRE = "FILTER_GENRE";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const GET_BILLBOARD = "GET_BILLBOARD";

export function getBillboard() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/movies/billboard", {});
    return dispatch({
      type: GET_BILLBOARD,
      payload: json.data,
    });
  };
}

export function getMovieDetail(idMovie) {
  return async function (dispatch) {
    try {
      var res = await axios.get(`http://localhost:3001/movies/${idMovie}`);
      return dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_TYPE,
    payload,
  };
}

export function filterByGenre(payload) {
  return {
    type: FILTER_GENRE,
    payload,
  };
}
