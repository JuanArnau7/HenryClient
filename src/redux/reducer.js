
import { LOGIN_USER_JWT, POST_USER_CREATE,  DETAILS_DISH, GET_ALL_DISHES, GET_USER_WITH_JWT } from './Actions/actionsTypes'


const initialState = {
  // platos : "platos"
	allDishes: [],
	detailDish: {},
  userLog: {},
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
      case LOGIN_USER_JWT:
        localStorage.setItem("token", action.payload);
        return{
          ...state
        }
      case GET_USER_WITH_JWT:
        return{
          ...state,
          userLog: action.payload
        }

    default:
      return { ...state };
  }
}

export default rootReducer;