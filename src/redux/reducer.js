import { POST_USER_CREATE } from './Actions/actionsTypes'

const initialState = {
  // platos : "platos"
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_CREATE:
      return{
        ...state,
      }
    default:
      return { ...state };
  }
}

export default rootReducer;