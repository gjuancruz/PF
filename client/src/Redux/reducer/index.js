const initialState ={
    cartelera: []
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'GET_CARTELERA':
            return{
                ...state,
                cartelera: action.payload
            }
            
            default: return state;
    }
}



 export default rootReducer