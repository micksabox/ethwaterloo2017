const initialState = {
  data: null,
  role: null,
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  if( action.type === 'SET_ROLE')
  {
    return Object.assign({}, state, {
      role: action.payload
    })
  }

  return state
}

export default userReducer
