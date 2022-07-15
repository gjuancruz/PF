import axios from "axios";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const GET_BILLBOARD = "GET_BILLBOARD";
export const SEARCH_MOVIES='SEARCH_MOVIES';
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_GENRE = "FILTER_GENRE";
export const GET_PREMIERE="GET_PREMIERE";
export const POST_MOVIE="POST_MOVIE";
export const GET_FEEDBACK="GET_FEEDBACK";
export const GET_COMMENTS="GET_COMMENTS";
export const DELETE_COMMENT="DELETE_COMMENT";

export function getBillboard() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/movies/billboard");
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

export function postMovie(payload){
 return async function(dispatch){
  console.log(payload)
  try {
    const json = await axios.post('http://localhost:3001/movies/createMovie', payload);
    console.log("prueba console.log");
    return json
} 
catch (error) {
    console.log(error)
  }
 } 
}

export function getComments(){
  return async function(dispatch){
    var json = await axios("http://localhost:3001/comments/");
    return dispatch ({
      type: GET_COMMENTS,
      payload: json.data
    })
  }
}

export function deleteComment(id){
  return async function(dispatch){
    console.log(id)
    var json = await axios.delete(`http://localhost:3001/comments/delete/${id}`);
    return dispatch ({
      type: DELETE_COMMENT,
      payload: json.data
    })
  }
}

export function getFeedback(){
  return async function(dispatch){
    try {
      const json = await axios.get('http://localhost:3001/feedback')
      return dispatch({
        type: GET_FEEDBACK,
        payload: json.data
      })
    } 
    catch (error) {
      console.log(error);
    }
  }
}

export function postFeedback([idUser, input]){
  return async function(){
    try {
      const json = await axios.post(`http://localhost:3001/feedback/add/${idUser}`, input)
      return json
    } 
    catch (error) {
      console.log(error)
    }
  }
}