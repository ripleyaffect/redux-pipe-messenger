import { applyMiddleware, compose, createStore } from 'redux'

import { reduxPipe } from 'app/middlewares'
import { app } from 'app/reducers'

// Add dev tools in development
const addDevTools = (
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
const composeEnhancers = addDevTools ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose;

export default () => {
  return createStore(
    app,
    {},
    composeEnhancers(
      applyMiddleware(
        reduxPipe({ url: '/' })
      )
    )
  )
}