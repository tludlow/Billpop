//Load the json object into the application so that we can used the stored state.
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('billpop')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

// A function to save the state of the redux store, this happens once evert 500ms
// and is saved to localStorage so we can persist state through realods.
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('billpop', serializedState)
    } catch (err) {
        return undefined
    }
}
