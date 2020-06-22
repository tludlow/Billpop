import { RSAA } from 'redux-api-middleware'
const domain = process.env.NEXT_PUBLIC_API_DOMAIN

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

export function register(registrationInfo) {
    return {
        [RSAA]: {
            endpoint: domain + '/user/register',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(registrationInfo),
            types: ['REGISTER_REQUEST', 'REGISTER_SUCCESS', 'REGISTER_FAIL'],
        },
    }
}

export function emailUsernameExist(email, username, password) {
    return {
        [RSAA]: {
            endpoint: domain + `/user/emailusernameexist?email=${email}&username=${username}`,
            method: 'POST',
            types: [
                'EMAILUSERNAMEEXIST_REQUEST',
                { type: 'EMAILUSERNAMEEXIST_SUCCESS', meta: { email, username, password } },
                'EMAILUSERNAMEEXIST_FAIL',
            ],
        },
    }
}

export function createRegistrationSms(phoneNumber) {
    return {
        [RSAA]: {
            endpoint: domain + `/user/createregistrationsmstest?phonenumber=${phoneNumber}`,
            method: 'POST',
            types: [
                'CREATEREGISTRATIONSMS_REQUEST',
                { type: 'CREATEREGISTRATIONSMS_SUCCESS', meta: { phoneNumber } },
                'CREATEREGISTRATIONSMS_FAIL',
            ],
        },
    }
}

export function verifyRegistrationSms(verificationCode, smsVerificationToken) {
    return {
        [RSAA]: {
            endpoint: domain + `/user/verifyregistrationsms?code=${verificationCode}`,
            method: 'POST',
            headers: { Authorization: `Bearer ${smsVerificationToken}` },
            types: ['VERIFYREGISTRATIONSMS_REQUEST', 'VERIFYREGISTRATIONSMS_SUCCESS', 'VERIFYREGISTRATIONSMS_FAIL'],
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
            endpoint: domain + `/user/googleauth?code=${code}`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            types: ['GOOGLEAUTH_REQUEST', 'GOOGLEAUTH_SUCCESS', 'GOOGLEAUTH_FAIL'],
            credentials: 'include',
        },
    }
}

export function facebookAuth(code) {
    return {
        [RSAA]: {
            endpoint: domain + `/user/facebookauth?code=${code}`,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            types: ['FACEBOOKAUTH_REQUEST', 'FACEBOOKAUTH_SUCCESS', 'FACEBOOKAUTH_FAIL'],
            credentials: 'include',
        },
    }
}
