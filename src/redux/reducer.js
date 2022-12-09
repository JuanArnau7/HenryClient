import { DETAILS_DISH, GET_ALL_DISHES, POST_USER_CREATE } from './Actions/actionsTypes';

const initialState = {
  // platos : "platos"
	allDishes: [],
	detailDish: {}
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
    default:
      return { ...state };
  }
}

export default rootReducer;