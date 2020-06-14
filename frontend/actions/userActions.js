import { RSAA } from 'redux-api-middleware'
const domain = process.env.NEXT_PUBLIC_API_DOMAIN

export const changeUser = () => ({ type: 'CHANGE_USERNAME' })

export const logout = () => {
    return {
        [RSAA]: {
            endpoint: domain + '/user/logout',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            types: ['LOGOUT_REQUEST', 'LOGOUT_SUCCESS', 'LOGOUT_FAIL'],
            credentials: 'include',
        },
    }
}

export function login(email, password) {
    return {
        [RSAA]: {
            endpoint: domain + '/user/login',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password }),
            types: ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAIL'],
            credentials: 'include',
        },
    }
}

export function googleAuth(code) {
    return {
        [RSAA]: {
            endpoint: domain + '/user/googleauth',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ code }),
            types: ['GOOGLEAUTH_REQUEST', 'GOOGLEAUTH_SUCCESS', 'GOOGLEAUTH_FAIL'],
            credentials: 'include',
        },
    }
}
