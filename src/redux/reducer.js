
import { LOGIN_USER_JWT, POST_USER_CREATE,  DETAILS_DISH, GET_ALL_DISHES, POST_DISH_CREATE, FILTER, GET_NAME_DISHES} from './Actions/actionsTypes'


const initialState = {
	allDishes: [],
	detailDish: {},
  filterDishes: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
		case GET_ALL_DISHES:
			return{
				...state,
				allDishes: action.payload.data
			}
		case DETAILS_DISH:
			return{
				...state,
				detailDish: state.allDishes.find(dish => dish._id === action.payload.id)
			}
    case POST_USER_CREATE:
      
      return{
        ...state,
      }
    case POST_DISH_CREATE:
      return{
        ...state, allDishes: [...state.allDishes, action.payload ]
      }
    case LOGIN_USER_JWT:
      localStorage.setItem("token", action.payload);
      return{
        ...state
      }
    case FILTER:
      return {
          ...state, filterDishes: [...action.payload]
      }
    case GET_NAME_DISHES: 
      return {
        ...state,
        filterDishes: action.payload
    }
    default:
      return { ...state };
  }
}

export default rootReducer;