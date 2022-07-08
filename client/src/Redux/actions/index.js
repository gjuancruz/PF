import axios from 'axios';
export const GET_MOVIE_DETAIL='GET_MOVIE_DETAIL';
export const GET_BILLBOARD='GET_BILLBOARD';
const Apikey='8de7320'

export function getBillboard(){
    return async function(dispatch){
        var json = await axios.get("https://www.omdbapi.com/?apikey=508ad5e2&s=cars",{
        });
        return dispatch({
            type:GET_BILLBOARD,
            payload: json.data.Search
        })
    }
}

export function getMovieDetail(idMovie){
    return  function(dispatch){
            fetch(`https://www.omdbapi.com/?apikey=${Apikey}&i=${idMovie}`)
            .then(response=>response.json())
            .then(res=>{
                dispatch({
                    type:GET_MOVIE_DETAIL,
                    payload:res
                })
            })
    }
}