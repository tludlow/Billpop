import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers/indexReducer'
import { apiMiddleware } from 'redux-api-middleware'

let store

const exampleInitialState = {
    user: {
        username: 'Tommy',
        loggedIn: true,
        registrationInfo: null,
    },
    cookies: {
        acceptCookies: false,
    },
}

const persistConfig = {
    key: 'billpop',
    storage,
    whitelist: ['user', 'cookies'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(initialState = exampleInitialState) {
    return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(apiMiddleware)))
}

export const initializeStore = (preloadedState) => {
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

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
