// import axios from 'axios';

export const FILTER_TYPE = 'FILTER_TYPE';
export const FILTER_GENRE = 'FILTER_GENRE';
export const GET_MOVIE_DETAIL='GET_MOVIE_DETAIL';
const Apikey='8de7320'


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

export function filterByType (payload) {
    return {
        type: FILTER_TYPE,
        payload
    }
}

export function filterByGenre ( payload ) {
    return {
        type: FILTER_GENRE,
        payload
    }
}