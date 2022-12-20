import { LOGIN_USER_JWT, POST_USER_CREATE, DETAILS_DISH, GET_ALL_DISHES, POST_DISH_CREATE, GET_LENGTH_CART, FILTER, GET_USER_BY_ID, DELETE_USER, UPDATE_USER, LOGOUT } from './Actions/actionsTypes'


const initialState = {
	allDishes: [],
	detailDish: {},
	filterDishes: [],
	elementsCart: 0,
	userProfile: {}
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_DISHES:
			return {
				...state,
				allDishes: action.payload.data
			}
		case DETAILS_DISH:
			return {
				...state,
				detailDish: state.allDishes.find(dish => dish._id === action.payload.id)
			}
		case POST_USER_CREATE:
			return {
				...state,
			}
		case POST_DISH_CREATE:
			return {
				...state, allDishes: [...state.allDishes, action.payload]
			}
		case LOGIN_USER_JWT:
			return {
				...state
			}
		case FILTER:
			return {
				...state, filterDishes: [...action.payload]
			}
		case GET_LENGTH_CART:
			return {
				...state,
				elementsCart: action.payload
			}
		case GET_USER_BY_ID:
			return {
				...state,
				userProfile: action.payload
			}
		case DELETE_USER:
			return {
				...state,
				userProfile: {}
			}
		case UPDATE_USER:
			return {
				...state,
				userProfile: action.payload
			}
		case LOGOUT:
			return {
				...state,
				userProfile: {}
			}
		default:
			return { ...state };
	}
}

export default rootReducer;