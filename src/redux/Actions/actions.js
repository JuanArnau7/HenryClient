import { POST_USER_CREATE, LOGIN_USER_JWT, DETAILS_DISH, GET_ALL_DISHES, POST_DISH_CREATE, GET_USER_WITH_JWT, FILTER, GET_LENGTH_CART, GET_USER_BY_ID, DELETE_USER, UPDATE_USER, LOGOUT, POST_REVIEWS, CREATE_ORDER, GET_USER_ORDERS, GET_NAME_DISHES, GET_FOOD_REVIEWS, GET_USERS, GET_ALL_TAGS, LOGIN_WITH_GITHUB } from './actionsTypes'
import axios from 'axios'
const URL_SERVER = process.env.REACT_APP_URL_SERVER || "http://localhost:3001/";

export function postUserCreate(payload) {
	return async function (dispatch) {
		try {
			const res = await axios.post(`${URL_SERVER}users`, payload)
			localStorage.setItem("token", res.data)
			return dispatch({
				type: POST_USER_CREATE,
				payload: res
			});
		} catch (error) {
			console.log("Error Redux action on post user create", error.response)
			return error.response
		}
	}
}

export const loginUserJWT = (data) => {
	return async (dispatch) => {
		try {
			const userJWT = await axios.post(`${URL_SERVER}auth/login`, data);
			console.log(userJWT)
			localStorage.setItem("token", userJWT.data)
			return dispatch({
				type: LOGIN_USER_JWT,
				payload: userJWT.data
			})
		} catch (error) {
			console.log("Error Redux on login local", error.response)
			return error.response
		}
	}
}

export const getAllDishes = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${URL_SERVER}foods`);
			return dispatch({
				type: GET_ALL_DISHES,
				payload: response
			})
		} catch (error) {
			console.log("Error Redux actions on get all dishes", error.message);
			return error
		}
	}
}
export const getFoodsReviews = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${URL_SERVER}reviews`);
			return dispatch({
				type: GET_FOOD_REVIEWS,
				payload: response.data
			})
		} catch (error) {
			console.log("Error Redux actions on get all dishes", error.message);
			return error
		}
	}
}
export const getUsers = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${URL_SERVER}users`);
			return dispatch({
				type: GET_USERS,
				payload: response.data
			})
		} catch (error) {
			console.log("Error Redux actions on get all dishes", error.message);
			return error
		}
	}
}

export const getNameDishes = (name) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${URL_SERVER}foods?name=` + name);
			return dispatch({
				type: GET_NAME_DISHES,
				payload: response.data
			})
		} catch (error) {
			console.log("Error Redux actions on get all dishes", error.message);
			return error
		}
	}
}

export const getFilterDishes = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${URL_SERVER}foods`);
			return dispatch({
				type: FILTER,
				payload: response.data
			})
		} catch (error) {
			console.log("Error Redux actions on get all dishes", error.message);
			return error
		}
	}
}

export const detailsDish = (id) => {
	return async (dispatch) => {
		try {
			return dispatch({
				type: DETAILS_DISH,
				payload: id
			})
		} catch (error) {
			console.log("Error Redux actions on get details dish", error.message);
			return error
		}
	}
}

export function postDishCreate(payload) {
	return async function (dispatch) {
		try {
			const res = await axios.post(`${URL_SERVER}foods`, payload)
			dispatch({ type: POST_DISH_CREATE, payload: res.payload });
			return res
		} catch (error) {
			alert("Connection to /Post Dishes Failed. ERROR:" + error)
		}
	}
}

export const filtrar = (arr) => {
	return async dispatch => {
		return dispatch({ type: FILTER, payload: arr })
	}
}

export const validarUserJWT = (token) => {
	return async (dispatch) => {

		try {
			const user = await axios.post(`${URL_SERVER}auth`, token)
			return dispatch({
				type: GET_USER_WITH_JWT,
				payload: user.data.data
			})
			//console.log(user.data.data)
		} catch (error) {
			console.log(error)
		}
	}
}

export const getUserById = (id) => {
	return async dispatch => {
		try {
			const user = await axios.get(`${URL_SERVER}auth/getUserById/${id}`)
			return dispatch({
				type: GET_USER_BY_ID,
				payload: user.data
			})
		} catch (error) {
			console.log("Error Redux action on get profile user by id", error)
		}
	}
}

export const getLengthCart = () => {
	return async dispatch => {
		const lengthCart = await JSON.parse(localStorage.getItem("dishes"));
		return dispatch({
			type: GET_LENGTH_CART,
			payload: lengthCart.length
		})

	}
}

export const deleteUser = (id) => {
	return async dispatch => {
		try {
			const deleteUser = await axios.delete(`${URL_SERVER}users/${id}`)
			localStorage.removeItem("token")
			return dispatch({
				type: DELETE_USER,
				payload: deleteUser.data
			})
		} catch (error) {
			console.log("Error Redux action delete user", error);
			return error
		}
	}
}

export const updateUser = (id, data) => {
	return async dispatch => {
		try {
			const response = await axios.patch(`${URL_SERVER}users/updateUser/${id}`, data)
			dispatch({
				type: UPDATE_USER,
				payload: response.data
			})
			return response
		} catch (error) {
			console.log("Error Redux action on update user", error.response);
			return error.response
		}
	}
}

export const logOut = () => {
	return async dispatch => {
		dispatch({
			type: LOGOUT,
		})
	}
}

export function postReviewDish(payload) {
	return async function (dispatch) {
		try {
			const res = await axios.post(`${URL_SERVER}reviews`, payload)
			console.log(res)
			localStorage.setItem("token", res.data)
			return dispatch({
				type: POST_REVIEWS,
				payload: res
			});
		} catch (error) {
			console.log("Error Redux action on post review", error.response)
		}
	}
}

export const createOrder = (userid, order, typeOrder, table, address) => {
	return async dispatch => {
		try {
			await axios.post(`${URL_SERVER}orders/`, {
				userid, order, typeOrder, table, address
			})
			return dispatch({
				type: CREATE_ORDER
			})
		} catch (error) {
			console.log("Error on redux actions on create order", error);
			return error.response
		}
	}
}

export const getUserOrders = (id) => {
	return async dispatch => {
		try {
			const response = await axios(`${URL_SERVER}orders/${id}`)
			return dispatch({
				type: GET_USER_ORDERS,
				payload: response.data
			})
		} catch (error) {
			console.log("Error redux actions on get user's orders", error);
			return error.response
		}
	}
}
// /foods?country=MEXICAN&food=DRINKS&fit=LOW%20IN%20FAT
export const getAllTags = () => {
	return async dispatch => {
		try {
			const response = await axios(`${URL_SERVER}tags`)
			return dispatch({
				type: GET_ALL_TAGS,
				payload: response.data
			})
		} catch (error) {
			console.log("Error redux actions on get tags's", error);
			return error.response
		}
	}
}

export const loginWithGitHub = (email) => {
	return async dispatch =>{
		try {
			const response = await axios.post(`${URL_SERVER}auth/gitHub`, {email})
			localStorage.setItem("token", response.data)
			dispatch({
				type: LOGIN_WITH_GITHUB
			})
			return response
		} catch (error) {
			console.log("Error redux actions on login using github", error.response);
			return error
		}
	}
}
