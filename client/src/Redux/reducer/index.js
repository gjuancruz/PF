 const initialState = {
    cartelera: []
 }
 
function rootReducer (state= initialState, action){
switch(action.type){
    case "GET_BILLBOARD":
    return{
        ...state,
        cartelera: action.payload
    }

    default: return state;
}
}

 export default rootReducer


 