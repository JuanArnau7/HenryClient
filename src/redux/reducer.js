import { LOGIN_USER_JWT, POST_USER_CREATE, DETAILS_DISH, GET_ALL_DISHES, POST_DISH_CREATE, GET_LENGTH_CART, FILTER, GET_USER_BY_ID, DELETE_USER, UPDATE_USER, LOGOUT, POST_REVIEWS, CREATE_ORDER, GET_USER_ORDERS, GET_NAME_DISHES, GET_FOOD_REVIEWS, GET_USERS, GET_ALL_TAGS, IMG_UPDATE_USER,GET_All_ORDERS  } from './Actions/actionsTypes'


const initialState = {
	allDishes: [],
	detailDish: {},
	filterDishes: [],
	elementsCart: 0,
	userProfile: {},
	isLogged: false,
	reviewsDishes:[],
	userOrders: [],
	allOrders: [],
	allUsers : [],
	allTags : [],
	userToken: null 
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_DISHES:
			return {
				...state,
				allDishes: action.payload.data
			}
		case GET_USERS:
			return {
				...state,
				allUsers: action.payload
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
		case GET_FOOD_REVIEWS:
			return {
				...state, reviewsDishes: action.payload
			}
		case POST_REVIEWS:
			return {
				...state, reviewsDishes: [...state.reviewsDishes, action.payload]
			}
		case LOGIN_USER_JWT:
			return {
				...state, userToken: action.payload
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
		case CREATE_ORDER:
			return {
				...state
			}
		case GET_USER_ORDERS:
			return {
				...state,
				userOrders: action.payload
			}
		case GET_All_ORDERS:
			return {
				...state,
				allOrders: action.payload
			}
		case GET_ALL_TAGS:
			return {
				...state,
				allTags: action.payload
			}
			case IMG_UPDATE_USER:
				return {
					...state
				}
		default:
			return { ...state };
	}
}

export default rootReducer;