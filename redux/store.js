import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import session from './session/reducer'
import products from './products/reducer'
import orders from './orders/reducer'
import _ from 'lodash'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  session,
  products,
  orders,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    // const nextState = {
    //   ...state, // use previous state
    //   ...action.payload, // apply delta from hydration
    // };
    const nextState = _.merge(action.payload, state)
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
