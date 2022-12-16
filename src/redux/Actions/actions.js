import { POST_USER_CREATE, LOGIN_USER_JWT, DETAILS_DISH, GET_ALL_DISHES, POST_DISH_CREATE, GET_USER_WITH_JWT, FILTER, GET_LENGTH_CART } from './actionsTypes'
import axios from 'axios'
const URL = process.env.REACT_APP_URL || "http://localhost:3001/";

export function postUserCreate(payload) {
    return async function(dispatch){
        try {
            const res = await axios.post(`http://localhost:3001/users`, payload)
            dispatch({ type: POST_USER_CREATE, payload : res.payload});
            // console.log(res)
            return res
        } catch (error) {
            // alert ("Connection to /Post Users Failed. ERROR:"+ error)
            // console.log(error)
            console.log("HOLAAA", error.response)
            return error.response
        }
    }
}

export const loginUserJWT = (data)=>{
    return async(dispatch) =>{
        try {
            const userJWT = await axios.post('http://localhost:3001/auth/login',data);
           // console.log(userJWT.data.token)
            return dispatch({
                type: LOGIN_USER_JWT,
                payload: userJWT.data.token
            })
        } catch (error) {
          console.log(error.response.data.errors)
        }
    }
}

export const getAllDishes = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${URL}foods`);
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

export const getNameDishes = (name) => {
    return async (dispatch) => {
		try {
			const response = await axios.get(`${URL}foods?name=` + name);
            // console.log("response", response)
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
			const response = await axios.get(`${URL}foods`);
            // console.log("response", response)
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
    return async function(dispatch){
        try {
            const res = await axios.post(`http://localhost:3001/foods`, payload)
            dispatch({ type: POST_DISH_CREATE, payload : res.payload});
            return res
        } catch (error) {
            alert ("Connection to /Post Dishes Failed. ERROR:"+ error)
        }
    }
}

export const filtrar = (arr)  => {
    return async dispatch => {
        return dispatch({ type: FILTER, payload: arr })
    }
}

export const validarUserJWT = (token)=>{
    return async(dispatch)=>{

        try {
            const user = await axios.post('http://localhost:3001/auth', token)
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

export const getLengthCart = () =>{
	return async dispatch =>{
		const lengthCart = await JSON.parse(localStorage.getItem("dishes"));
		return dispatch({
			type: GET_LENGTH_CART,
			payload: lengthCart.length
		})

	}
}
