import axios from 'axios';

export function getCartelera(){
    return async function(dispatch){
        var json= await axios.get('https://www.omdbapi.com/?apikey=d1dcdf9c&s=cars',{});
        return dispatch({
            type: 'GET_CARTELERA',
            payload: json.data.Search
        })
    }
}