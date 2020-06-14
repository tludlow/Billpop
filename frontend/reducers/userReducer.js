const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: 'Billy',
                loggedIn: true,
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                username: '',
                loggedIn: false,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload,
                loggedIn: true,
            }
        case 'GOOGLEAUTH_SUCCESS':
        case 'FACEBOOKAUTH_SUCCESS':
            if (action.payload.registered) {
                return {
                    ...state,
                    username: action.payload.username,
                    loggedIn: true,
                }
            }
            return {
                ...state,
                registrationInfo: action.payload,
            }
        default:
            return state
    }
}

export default userReducer
