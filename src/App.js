import React from 'react'
import { connect } from 'react-redux'
import { actions } from './actions'

export const AppPresentation = ({counter, increaseCounter}) => {
  return <div>
    <p>Hello React! {counter}</p>
    <button onClick={increaseCounter}>Increase</button>
  </div>
}

export const App = connect(

  (state) => ({
    counter: state.counter,
  }),

  (dispatch) => ({
    increaseCounter: () => dispatch(actions.increaseCounter())
  }),

)(AppPresentation)
