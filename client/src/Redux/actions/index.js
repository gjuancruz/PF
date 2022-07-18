import axios from "axios";
export const GET_USERS = "GET_USERS"
export const GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL";
export const GET_BILLBOARD = "GET_BILLBOARD";
export const SEARCH_MOVIES='SEARCH_MOVIES';
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_GENRE = "FILTER_GENRE";
export const GET_PREMIERE="GET_PREMIERE";
export const POST_PAYMENT_METHOD ="POST_PAYMENT_METHOD"
export const POST_MOVIE="POST_MOVIE";
export const GET_FEEDBACK="GET_FEEDBACK";
export const GET_COMMENTS="GET_COMMENTS";
export const DELETE_COMMENT="DELETE_COMMENT";
export const GET_SHOW="GET_SHOW";
export const POST_SHOW="POST_SHOW"
export const GET_ALL_SHOWS="GET_ALL_SHOWS"
export const AUTORIZADO = 'AUTORIZADO';
export const DELETE_SHOW="DELETE_SHOW"
export const DELETE_MOVIE="DELETE_MOVIE";
export const EDIT_MOVIE="EDIT_MOVIE";


export function getBillboard() {
  return async function (dispatch) {
    var json = await axios.get("/movies/billboard", {
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
    var json = await axios("/movies/Premieres");
    return dispatch ({
      type: GET_PREMIERE,
      payload: json.data
    })
  }
}

export function getMovieDetail(idMovie){
    return async function(dispatch){
        try{
            var res=await axios.get(`/movies/search/${idMovie}`)
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
            var json = await axios.get(`/movies/search?genre=${genre}`);
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
          var json = await axios.get(`/movies/search?name=${title}`)
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
    export function postPaymentMethod(ticket,show,userId){
      console.log(userId)
      return async function (dispatch){
        try{
          var json = await axios.post("http://localhost:3001/movies/checkout",{ticket,amount:100,show:show,userId})
          console.log(json.data)
          return dispatch({
            type:POST_PAYMENT_METHOD,
            payload: json.data
          })
        }catch(error){
       
        }


      }
    }

export function login (email,password) {
  return async function (dispatch) {
  const getLogin = await axios.get(`/auth/login`)
  const getToken = await getLogin.data;
  const getUser = await getLogin.data.user.id
  window.localStorage.setItem('token', getToken.token)
  window.localStorage.setItem('userId', getUser)

    return dispatch({
      
    })
  } 
}

export function autorizado () {
  return async function (dispatch) {
    const permiso = await axios.get("/auth/acceder", {
      headers : {
        Authorization : `Bearer ${window.localStorage.getItem('sw-token')}`
      }
    })  
    return dispatch({
      type: AUTORIZADO,
      payload: permiso.data.permitir
    })
  } 
}

// export function postMovie(payload) {
//   return async function (dispatch) {
//     const logged = await axios.get("http://localhost:3001/auth/verify", {
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem("sw-token")}`,
//       },
//     });
//     console.log("aca toi");
//     try {
//       await axios.post("http://localhost:3001/movies/createMovie", payload, {
//         headers: {
//           Authorization: `Bearer ${window.localStorage.getItem("sw-token")}`,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export function postMovie(payload){
  console.log("hola")
  return async function(dispatch){
    console.log(payload)
    try {
      const Authorization = {
        headers : {
          Authorization : `Bearer ${window.localStorage.getItem('sw-token')}`
        }
      }
      const json = await axios.post('/movies/createMovie', payload, Authorization);
      console.log("prueba console.log");
      return dispatch ({
        type: POST_MOVIE,
        payload: json.data
      })
    
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteMovie(id){
  return async function(dispatch){
    var json = await axios.delete(`http://localhost:3001/movies/delete/${id}`);
    return dispatch ({
      type: DELETE_MOVIE,
      payload: json.data
    })
  }
}

export function editMovie(movie){
  return async function(dispatch){
     
    try {
       var json = await axios.put(`http://localhost:3001/movies/update/${movie.id}`, movie)
        return dispatch ({
          type: EDIT_MOVIE,
          payload: json.data
        })

     } catch (error) {
       console.log(error)
   }
   }
}

export function getComments(){
  return async function(dispatch){
    var json = await axios("/comments/");
    return dispatch ({
      type: GET_COMMENTS,
      payload: json.data
    })
  }
}

export function deleteComment(id){
  return async function(dispatch){
    console.log(id)
    var json = await axios.delete(`/comments/delete/${id}`);
    return dispatch ({
      type: DELETE_COMMENT,
      payload: json.data
    })
  }
}

export function getShow(movieId){
  return async function(dispatch){
    try{
      const json = await axios.get('http://localhost:3001/show/one/'+movieId)
      // console.log(json.data)
      return dispatch({
        type: GET_SHOW,
        payload:json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

export function deleteShow(movieId){
  return async function(dispatch){
    try{
      const json = await axios.delete('http://localhost:3001/show/one/'+movieId)
      // console.log(json.data)
      console.log(json.data)
    }catch(error){
      console.log(error)
    }
  }
}

export function getAllShows(){
  return async function(dispatch){
    try{
      const json = await axios.get('http://localhost:3001/show/all')
      return dispatch({
        type: GET_ALL_SHOWS,
        payload:json.data
      })
    }catch(error){
      console.log(error)
    }
  }
}

export function postShow(schedule,movieId,roomId){
  return async function(){
    try{
      const json = await axios.post('http://localhost:3001/show',{schedule,movieId,roomId})
      console.log(json.data)
    }catch(error){
      console.log(error)
    }
  }
}

export function getFeedback(){
  return async function(dispatch){
    try {
      const json = await axios.get('/feedback')
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
      const json = await axios.post(`/feedback/add/${idUser}`, input)
      return json
    } 
    catch (error) {
      console.log(error)
    }
  }
}
////////RUTAS CRUD USUARIOS///////////

export function getUsers(){
  return async function(dispatch){
    var get_Usuarios = await axios.get("/admin");
    return dispatch ({type: GET_USERS, payload: get_Usuarios.data})
  }
}

// export function postMovie(payload){
//   const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//   };

//   return function (dispatch){
//       return fetch('http://localhost:3001/movies/createMovie', requestOptions)
//       .then(data => data.json())
//       .then(json => {
//           dispatch({ type: POST_MOVIE, payload: json})
//       })
//       .catch(err => console.log(err))
//   }
// }


export function postComment( Text, movieId, userId){
  // const idFinal = movieId.id
  return async function(dispatch){
    try {
      const json = await axios.post(`http://localhost:3001/comments/add/${movieId}?userId=${userId}`, Text)
      return json
    } 
    catch (error) {
      console.log(error)
    }
  }
}
export function logout(){
  return async function(){
    window.localStorage.removeItem('sw-token')
    window.localStorage.removeItem('userId')
  }
}

export function register(payload){
  return async function(){
      try {
          var json = await axios.post(`/auth/register`, payload)
          return json
      } catch (error) {
          console.log(error)
      }
  }
}
