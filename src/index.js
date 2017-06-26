import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { App } from './App'
import { counter } from './reducer'

const store = createStore(combineReducers({
  counter,
}))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
