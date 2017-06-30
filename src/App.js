import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions } from './actions'

export const AppPresentation = ({counter, increaseCounter}) => {
  return <div>
    <Link to="/counter">Counter</Link>
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
