import axios from "axios";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const GET_BILLBOARD = "GET_BILLBOARD";
export const SEARCH_MOVIES='SEARCH_MOVIES';
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_GENRE = "FILTER_GENRE";
export const GET_PREMIERE="GET_PREMIERE";

export function getBillboard() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/movies/billboard", {
      headers : {
        Authorization : `Bearer ${window.localStorage.getItem('sw-token')}`
      }
    });
    return dispatch({
      type: GET_BILLBOARD,
      payload: json.data,
    });
  };
}

export function getPremiere(){
  return async function(dispatch){
    var json = await axios("http://localhost:3001/movies/Premieres");
    return dispatch ({
      type: GET_PREMIERE,
      payload: json.data
    })
  }
}

export function getMovieDetail(idMovie){
    return async function(dispatch){
        try{
            var res=await axios.get(`http://localhost:3001/movies/search/${idMovie}`)
            return dispatch({
                type: GET_MOVIE_DETAIL,
                payload: res.data
        })
        } catch(error){
            console.log(error)
        }
    }
}

export function filterByType(payload) {
    return {
      type: FILTER_TYPE,
      payload,
    };
}
// export function filterByGenre(payload) {
//   return {
//     type: FILTER_GENRE,
//     payload,
//   };
// }

export function filterGenre(genre) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/movies/search?genre=${genre}`);
            return dispatch({
                type: FILTER_GENRE,
                payload: json.data,
            });
        } catch (error) {
            console.log(error);
        }
            
        }
    }

export function searchMovieName(title){
    return async function (dispatch) {
        try {
          var json = await axios.get(`http://localhost:3001/movies/search?name=${title}`)
          return dispatch({
            type: SEARCH_MOVIES,
            payload: json.data
          })
        } catch (error) {
          dispatch({
            type: SEARCH_MOVIES,
            payload: []
          })
        }
      }
}

export function login (email,password) {
  return async function (dispatch) {
  const getLogin = await axios.get(`http://localhost:3001/auth/login`)
  const getToken = await getLogin.data;

  window.localStorage.setItem('token', getToken.token)
    return dispatch({
      
    })
  } 
}
