const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: 'Thomas',
            }
        default:
            return state
    }
}

export default userReducer
