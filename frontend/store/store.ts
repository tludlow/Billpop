import { useMemo } from 'react'
import { createStore, applyMiddleware, , Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from '../reducers/indexReducer'
import { apiMiddleware } from 'redux-api-middleware'
import { StoreState } from './store-types'

let store: any

//The structure of the store with its default values included
const exampleInitialState = {
    user: {
        username: 'Testing',
        loggedIn: true,
        registrationInfo: null,
    },
    cookies: {
        acceptCookies: false,
    },
}

//JSON Object of the keys we want to store in the local storage, add additional ones to the whitelist
//Storage is localStorage of the user browser
const persistConfig = {
    key: 'billpop',
    storage,
    whitelist: ['user', 'cookies'], // place to select which state you want to persist
}

//A reducer which is stored locally for persisting state between closing the app and opening again
const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(initialState = exampleInitialState) {
    return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(apiMiddleware)))
}

export const initializeStore = (preloadedState: StoreState) => {
    let _store = store ?? makeStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: StoreState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
