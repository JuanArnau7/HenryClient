import {} from './actions'

const initialState = {
  // platos : "platos"
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_CREATE:
      return{
        ...state,
      }
      case LOGIN_USER_JWT:
        localStorage.setItem("token", action.payload);
        return{
          ...state
        }
    default:
      return { ...state };
  }
}

export default rootReducer;