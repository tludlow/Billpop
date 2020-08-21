import { CombinedState } from 'redux'

interface userState {
    username: string;
    loggedIn: boolean;
    registrationInfo: null | string;
}

interface cookieState {
    acceptCookies: boolean;
}

export type StoreState = CombinedState<{ user: userState, cookies: cookieState }>
