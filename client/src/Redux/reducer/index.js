import {
  GET_MOVIE_DETAIL,
  GET_BILLBOARD,
  POST_MOVIE,
  SEARCH_MOVIES,
  FILTER_GENRE,
  FILTER_TYPE,
  GET_PREMIERE,
  GET_FEEDBACK,
  GET_COMMENTS,
  DELETE_COMMENT,
  POST_COMMENT,
  GET_USERS,
  SEARCH_USER,
  DELETE_USER,
  GET_SHOW,
  GET_ALL_SHOWS,
  AUTORIZADO,
  DELETE_MOVIE,
  EDIT_MOVIE,
  ADD_CANDY,
  GET_CANDY,
  VERIFY_ROLE,
  TOTAL,
  ENTRADAS,
  GET_CART,
  GET_DAY_SHOW,
  TOTALMENTE,
  POST_PAYMENT_METHOD,
  GET_TICKETS,
  DEL_TICKET,
  USER_CART,
  ACTUALIZAR_PRECIO_TOTAL
} from "../actions";

const initialState = {
  cartelera: [],
  carteleraFiltered: [],
  premiere: [],
  movieDetail: {},
  feedback:[],
  comments:[],
  refresh: false,
  copy_usuarios:[],
  usuarios:[],
  shows:[],
  show:[],
  candy:[],
  autorizado: '',
  candy:[],
  storeCandy:[],
  role: 'guest',
  total: 0,
  entradas: 0,
  id:'',
  cart: [],
  userCart: [],
  actualizarPrecio: "",
  payment:'',
  tickets:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_PRECIO_TOTAL:
      return{
        ...state,
        actualizarPrecio: action.payload
      }

    case USER_CART:
      return{
        ...state,
        userCart: action.payload
      }

    case DEL_TICKET:
      return{
        ...state,
        // tickets: [],
        actualizarPrecio: action.payload
      }

    case GET_TICKETS:
      return{
        ...state,
        tickets: action.payload
      }

    case GET_CART:
      return{
        ...state,
        cart: action.payload
      }

    case ENTRADAS:
      return{
        ...state,
        entradas: action.payload
      }

    case TOTALMENTE:
      return{
        ...state,
        total: action.payload
      }

    case ADD_CANDY:
      return{
        ...state,
        candy: state.candy.concat(action.payload)
        // candy: [...state.candy, action.payload]
      }

    case GET_CANDY:
      return{
        ...state,
        storeCandy: action.payload
      }

    case AUTORIZADO:
      return {
        ...state,
        autorizado: action.payload,
      }

    case GET_BILLBOARD:
      return {
        ...state,
        cartelera: action.payload,
        carteleraFiltered: action.payload,
      };
    case FILTER_TYPE:
      const carteleraToFilter = state.cartelera;
      console.log(carteleraToFilter);
      const filteredByType =
        action.payload === "All"
          ? carteleraToFilter
          : carteleraToFilter.filter(
              (movie) => movie.Type.trim() === action.payload
            );

      return {
        ...state,
        carteleraFiltered: filteredByType,
      };
    case FILTER_GENRE:
      return {
        ...state,
        carteleraFiltered: action.payload,
      };

    case GET_PREMIERE:
      const sortedPremieres = action.payload.sort(function (a, b) {
        if (a.Release > b.Release) {
          return 1;
        }
        if (a.Release < b.Release) {
          return -1;
        }
        return 0;
      });
      
      return {
        ...state,
        premiere: sortedPremieres,
      };

    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case SEARCH_MOVIES:
      return {
        ...state,
        carteleraFiltered: action.payload,
      };

    case POST_MOVIE:
        return{
          ...state,
          refresh: !state.refresh
      };
    
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
      };

    case "POST_FEEDBACK":
      return{
        ...state
      };
  
    case GET_COMMENTS:
        return{
          ...state,
          comments: action.payload
        }
    case DELETE_COMMENT:
        return{
          ...state,
          comments: state.comments.filter(e=> e.id !== action.payload.id)
        }
      case GET_ALL_SHOWS:
        return{
          ...state,
          shows:action.payload
        }
      case GET_DAY_SHOW:
        // console.log(action.payload)
        return{
          ...state,
          day:action.payload
        }
      case DELETE_MOVIE:
          return{
            ...state,
            cartelera: state.cartelera.filter(e=> e.id !== action.payload.id),
            carteleraFiltered: state.carteleraFiltered.filter(e=> e.id !== action.payload.id),
            premiere: state.premiere.filter(e=> e.id !== action.payload.id)
          }
      case EDIT_MOVIE:
        return{
          ...state,
          // refresh: !state.refresh
        }
      case GET_SHOW:
        // console.log(action.payload)
        return{
          ...state,
          show:action.payload
        }
      case SEARCH_USER:
        return {
          ...state,
          usuarios: action.payload
        }
      case DELETE_USER:
        return {
          ...state,
        }
    case GET_USERS:
      return {
        ...state,
        usuarios: action.payload,
      }
  
    case POST_COMMENT:
      console.log("sssssssssssssi")
      return{
        ...state,
        refresh: !state.refresh
      };
    case VERIFY_ROLE:
    return{
      ...state,
      role: action.payload.role,
      id: action.payload.id
    }
    case GET_CANDY:
      return{
        ...state,
        candy: action.payload
      }
    case POST_PAYMENT_METHOD:
      return{
        ...state,
        payment: action.payload
      }
    default:
      return state;
  }
}
export default rootReducer;