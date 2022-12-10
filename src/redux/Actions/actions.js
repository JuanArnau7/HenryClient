import { POST_USER_CREATE, LOGIN_USER_JWT } from './actionsTypes'
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