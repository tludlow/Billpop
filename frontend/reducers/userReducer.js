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
        case 'EMAILUSERNAMEEXIST_SUCCESS':
            if (action.payload.error === '') {
                return {
                    ...state,
                    registrationInfo: {
                        ...state.registrationInfo,
                        email: action.meta.email,
                        username: action.meta.username,
                        password: action.meta.password,
                    },
                }
            }
            return { ...state }
        case 'CREATEREGISTRATIONSMS_SUCCESS':
            return {
                ...state,
                registrationInfo: {
                    ...state.registrationInfo,
                    phoneNumber: action.meta.phoneNumber,
                    smsVerifcationToken: action.payload.token,
                    //for testing only
                    verificationCode: action.payload.verificationCode,
                },
            }
        case 'VERIFYREGISTRATIONSMS_SUCCESS':
            return {
                ...state,
                registrationInfo: {
                    ...state.registrationInfo,
                    smsVerified: true,
                },
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                ...action.payload,
                loggedIn: true,
                registrationInfo: null,
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
