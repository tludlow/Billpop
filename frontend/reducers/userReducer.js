const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: 'Billy',
                loggedIn: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                username: '',
                loggedIn: false,
            }
        default:
            return state
    }
}

export default userReducer
