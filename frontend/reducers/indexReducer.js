import { combineReducers } from 'redux'

import userReducer from './userReducer'
import cookieReducer from './cookieReducer'

const reducers = {
    user: userReducer,
    cookies: cookieReducer,
}

export default combineReducers(reducers)
