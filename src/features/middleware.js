export const logger = store => next => action => {
    // because Thunk function returns a function, we need something that passes the dispatch and getState functions just like the Thunk.
    if (typeof action === 'function') {
        action(store.dispatch, store.getState)
    } else {
        console.log('dispatch', store.getState())
        next(action)
        console.log('after dispatch', store.getState())
    }
}

// a function that logs the state before and after an action is done.