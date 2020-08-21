const cookieReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ACCEPT_COOKIE_POLICY':
            return {
                ...state,
                acceptCookies: true,
            }
        default:
            return state
    }
}

export default cookieReducer
