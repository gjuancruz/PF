import axios from 'axios';

export function getBillboard(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/api/movies/billboard",{
        });
        return dispatch({
            type: "GET_BILLBOARD",
            payload: json.data.Search
        })
    }
}