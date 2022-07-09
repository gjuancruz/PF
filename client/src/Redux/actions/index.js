import axios from "axios";

export const GET_MOVIE_DETAIL='GET_MOVIE_DETAIL';
export const GET_BILLBOARD='GET_BILLBOARD';
export const SEARCH_MOVIES='SEARCH_MOVIES';

export function getBillboard(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/movies/billboard",{
        });
        return dispatch({
            type:GET_BILLBOARD,
            payload: json.data
        })
    }
}

export function getMovieDetail(idMovie){
    return async function(dispatch){
    try{
        var res=await axios.get(`http://localhost:3001/movies/${idMovie}`)
        return dispatch({
            type: GET_MOVIE_DETAIL,
            payload: res.data
    })
} catch(error){
    console.log(error)
}
}
}

export function searchMovieName(title){
    return async function (dispatch) {
        try {
          var json = await axios.get(`http://localhost:3001/movies?name=${title}`)
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
