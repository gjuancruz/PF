import axios from "axios";
export const GET_USERS = "GET_USERS";
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
export const POST_COMMENT="POST_COMMENT";
export const SEARCH_USER="SEARCH_USER";
export const DELETE_USER="DELETE_USER";
export const GET_SHOW="GET_SHOW";
export const POST_SHOW="POST_SHOW"
export const GET_ALL_SHOWS="GET_ALL_SHOWS"
export const AUTORIZADO = 'AUTORIZADO';
export const DELETE_SHOW="DELETE_SHOW"
export const DELETE_MOVIE="DELETE_MOVIE";
export const EDIT_MOVIE="EDIT_MOVIE";
export const ADD_CANDY="ADD_CANDY";
export const GET_CANDY="GET_CANDY";
export const TOTAL="TOTAL";
export const ENTRADAS="ENTRADAS";
export const VERIFY_ROLE='VERIFY_ROLE';
export const GET_CART="GET_CART";
export const POST_CANDYS="POST_CANDYS";
export const GET_DAY_SHOW="GET_DAY_SHOW"
export const TOTALMENTE='TOTALMENTE';
export const GET_TICKETS='GET_TICKETS';
export const DEL_TICKET="DEL_TICKET"

export function getBillboard() {
  return async function (dispatch) {
    var json = await axios.get("/movies/billboard", {
      headers : {
        Authorization : `Bearer ${window.localStorage.getItem('sw-token')}`
      }
    }
    );
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
    export function postPaymentMethod(ticket,show,idUser){
      // console.log(userId)
      return async function (dispatch){
        try{
          var json = await axios.post("http://localhost:3001/movies/checkout",{ticket,show,idUser})
          console.log('soy la action del payment method !!',json.data)
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
    var json = await axios.delete(`/movies/delete/${id}`);
    return dispatch ({
      type: DELETE_MOVIE,
      payload: json.data
    })
  }
}

export function editMovie(movie){
  return async function(dispatch){
     
    try {
       var json = await axios.put(`/movies/update/${movie.id}`, movie)
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

export function getDayShow(day,id){
  return async function(dispatch){
    try{
      const json = await axios.get(`http://localhost:3001/show/day?day=${day}&id=${id}`)
      return dispatch({
        type:GET_DAY_SHOW,
        payload:json.data
      })
    }catch(err){
      console.log(err)
    }
  }
}

export function deleteShow(movieId){
  return async function(dispatch){
    try{
      const json = await axios.delete('http://localhost:3001/show/one/'+movieId)
      // console.log(json.data)
      // console.log(json.data)
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

export function postShow(data){
  console.log("PostShow",{data})
  return async function(){
    try{
      const json = await axios.post('http://localhost:3001/show',{data})
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


////////RUTAS CRUD y search USUARIOS///////////
export function getUsers(){
  return async function(dispatch){
    var get_Usuarios = await axios.get("/admin");
    return dispatch ({type: GET_USERS, payload: get_Usuarios.data})
  }
}

export function searchUser(name){
  return async function (dispatch) {
      try {
        var search = await axios.get(`http://localhost:3001/admin/searchUser?username=${name}`)
        return dispatch({
          type: SEARCH_USER,
          payload: search.data
        })
      } catch (error) {
        dispatch({
          type: SEARCH_USER,
          payload: []
        })
      }
    }
}

export function deleteUser(email){
  return  function(dispatch){
    const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        };
  
    var userDelete = fetch("http://localhost:3001/admin/deleteUser",requestOptions)
    .then(data => data.json())
      .then(json => {
          dispatch({ type: DELETE_USER, payload: json})
      })
      .catch(err => console.log(err))
  }
}

export function createUser(user){
  return async function(dispatch){
      const data = await axios.post("http://localhost:3001/auth/register", user)
      return data;
  }
}

export function updateUser(data){
  
  return async function(dispatch){
    console.log(data)
    var updateDelete = await axios.put("http://localhost:3001/admin/updateUser",data);
    return updateDelete
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
      const json = await axios.post(`/comments/add/${movieId}?userId=${userId}`, Text)
      return dispatch({
        type: POST_COMMENT,
        payload:json.data
      })
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

export function addCandy(payload){
  return async function(dispatch){
    return dispatch({
      type: ADD_CANDY,
      payload: payload
    })
  }
}

export function getCandy(){
  return async function(dispatch){
    const candys = await axios.get('http://localhost:3001/candy')
    return dispatch({
      type: GET_CANDY,
      payload: candys.data
    })
  }
}

export function verifyRole(){
  return async function(dispatch){
    const data = await axios.get('http://localhost:3001/auth/verifyrole' , {
      headers : {
        Authorization : `Bearer ${window.localStorage.getItem('sw-token')}`
      }
    })
    return dispatch({
      type: VERIFY_ROLE,
      payload: {role: data.data.role,
                id: data.data.id}
    })
  }
}

export function sumTotal(payload){
  return async function(dispatch){
    return dispatch({
      type: TOTAL,
      payload: payload
    })
  }
}

export function sumEntradas(payload){
  return async function(dispatch){
    console.log("info SumEntradas: ", payload);
    const resp = await axios.post('/tickets/addTickets', payload)
    console.log("respuesta Tickets:",resp);
    return dispatch({
      type: ENTRADAS,
      payload: payload.seats
    })
  }
}

export function getCardHistory(idUser){
  return async function(dispatch){
    console.log("estoy en actions " + idUser);
    var getCart = await axios.post(`/cart`, idUser)
    return dispatch({
      type: GET_CART,
      payload: getCart.data
    })
  }
}

export function getTicketsHistory(idUser){
  return async function(dispatch){
    console.log("estoy en actions/getTicketsHistory ", idUser);
    let getTickets = await axios.post(`/cart/tickets`, idUser);
    console.log("estoy en actions/getTicketsHistory RESPUESTA", getTickets.data)
    return dispatch({
      type: GET_TICKETS,
      payload: getTickets.data
    })
  }
}

//Ruta post que almacena los candys con el usuario en especifico
export function postCandys(payload){

  return async function(dispatch){
    try {
      console.log("soy payload candy",payload)
      let candyPost = await axios.post('/candy/add', payload)
      return console.log("dispatch candyPost " + JSON.stringify(candyPost))
    } catch (error) {
      console.log(error)
    }
  }
}
///////RUTAS CANDY//////
// export function getCandy(){
//   return async function(dispatch){
//     var get_candy = await axios.get("http://localhost:3001/candy");
//     return dispatch ({type: GET_CANDY, payload: get_candy.data})
//   }
// }

export function deleteCandys(payload){
  return async function(dispatch){
    try {
      await axios.post('http://localhost:3001/candy/delete', payload)
    } catch (error) {
      console.log(error)
    }
  }
}

export function getOrderPrice(payload){
  return async function(dispatch){
    try {
      const userCart = await axios.post('http://localhost:3001/cart/userCart', payload)
      
      return dispatch({
        type: TOTALMENTE,
        payload: userCart.data.orderPrice
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function delTickets(payload){
  return async function(dispatch){
    try {
      console.log("estoy en actions/delTIckets ", payload);   
      const delTicket = await axios.post("http://localhost:3001/tickets/delete", payload)
      console.log("estoy en actions/delTickets RESPUESTA", delTicket.data)
      return dispatch({
        type: DEL_TICKET,
        payload: delTicket.data
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}