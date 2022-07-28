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
  SEARCH_CANDY,
  GET_TICKETS_DETAIL,
  GET_TICKETS_HISTORY,
  SEARCH_MOVIES_SALES,
  VERIFY_ROLE,
  TOTAL,
  ENTRADAS,
  GET_CART,
  GET_DAY_SHOW,
  REFRESH,
  TOTALMENTE,
  POST_PAYMENT_METHOD,
  GET_TICKETS,
  DEL_TICKET,
  USER_CART,
  ACTUALIZAR_PRECIO_TOTAL,
  ORDER_MORE_SALED
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
  infoTickets:[],
  copy_infoTickets:[],
  detailTickets:[],
  candy:[],
  autorizado: '',
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
        tickets: [],
        actualizarPrecio: action.payload
      }

    case GET_TICKETS_HISTORY:
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
    
    case SEARCH_CANDY:
      return{
        ...state,
        storeCandy: action.payload
      }

    case GET_TICKETS:
      return {
        ...state,
        infoTickets: action.payload,
        copy_infoTickets: action.payload
      }
    case GET_TICKETS_DETAIL:
      return {
        ...state,
        detailTickets: action.payload
      }
    case ORDER_MORE_SALED:
      //const days = {01:234,02:3423,03:1561};
    const days = {};
    const allMovies = state.detailTickets;
    allMovies.forEach(e => {
    if(days.hasOwnProperty(e.date.slice(4,7))){
      days[e.date.slice(4,7)] += e.totalPrice
    }
    else{
      days[e.date.slice(4,7)] = e.totalPrice
    }});

    const daysformatArray = Object.entries(days)
    const orderDaysMoreSales = action.payload === 'min' ?
        daysformatArray.sort((a,b)=>{
            if(Number(a[1]) < Number(b[1]))return -1
            if(Number(a[1]) > Number(b[1]))return 1
            return 0
        }) :
        daysformatArray.sort((a,b)=>{
            if(Number(a[1])  < Number(b[1]))return 1
            if(Number(a[1])  > Number(b[1]))return -1
            return 0
        })
      console.log(days)
      console.log(daysformatArray)
      // const asdasd = orderDaysMoreSales.forEach(e=>allMovies.filter(p=>p.date.slice(4,7)==e[1]));
      // console.log(asdasd)
      return {
        ...state,
        detailTickets: orderDaysMoreSales
      }
    case SEARCH_MOVIES_SALES:
      const searchSale = state.copy_infoTickets.filter(e=>e.movie.toLowerCase().include(action.payload.toLowerCase()))
      return {
        ...state,
        infoTickets: searchSale,
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
    case REFRESH:
      return {
        ...state,
        refresh: !state.refresh
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