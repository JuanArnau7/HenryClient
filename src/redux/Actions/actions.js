import { POST_USER_CREATE, POST_DISH_CREATE } from './actionsTypes'
import axios from 'axios'
export function postUserCreate(payload) {
    return async function(dispatch){
        try {
            const res = await axios.post(`http://localhost:3001/users`, payload)
            dispatch({ type: POST_USER_CREATE, payload : res.payload});
            return res
        } catch (error) {
            alert ("Connection to /Post Users Failed. ERROR:"+ error)
        }
    }
}
export const loginUserJWT = (data)=>{
    return async(dispatch) =>{
        try {
            const userJWT = await axios.post('http://localhost:3001/auth/login',data);
            console.log(userJWT.data.token)
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

export function postUserCreate(payload) {
	return async function (dispatch) {
		try {
			const res = await axios.post(`http://localhost:3001/users`, payload)
			dispatch({ type: POST_USER_CREATE, payload: res.payload });
			return res
		} catch (error) {
			alert("Connection to /Post Users Failed. ERROR:" + error)
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