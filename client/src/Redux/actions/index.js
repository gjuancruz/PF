import axios from "axios";
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const GET_BILLBOARD = "GET_BILLBOARD";
export const SEARCH_MOVIES='SEARCH_MOVIES';
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_GENRE = "FILTER_GENRE";
export const GET_PREMIERE="GET_PREMIERE";
export const POST_PAYMENT_METHOD ="POST_PAYMENT_METHOD"

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
    export function postPaymentMethod(ticket){
      return async function (dispatch){
        try{
          var json = await axios.post("http://localhost:3001/movies/checkout",{ticket,amount:100,show:"13ef3e53-3495-4d56-b6eb-290c57011083"})
          console.log(json.data)
          return dispatch({
            type:POST_PAYMENT_METHOD,
            payload: json.data
          })
        }catch(error){
       
        }


      }
    }
