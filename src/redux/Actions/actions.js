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