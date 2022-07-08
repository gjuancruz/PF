import axios from "axios";

export const GET_MOVIE_DETAIL='GET_MOVIE_DETAIL';


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
