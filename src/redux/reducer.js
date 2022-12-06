import {} from './Actions/actions'

const initialState = {
  // platos : "platos"
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
}

export default rootReducer;