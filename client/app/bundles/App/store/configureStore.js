import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

export const configureClientStore = (railsProps) => {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    return createStore(
        rootReducer,
        railsProps,
        composeEnhancer(applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )))
}

export const configureServerStore = (railsProps) => (
    createStore(
        rootReducer,
        railsProps
    )
)
