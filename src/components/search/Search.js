import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { actions } from './actions'

export const SearchComponent = ({}) => {

  return <div>
    <Link to="/">Photos</Link>
    <input
      type="search"
      id="search-input"
    />
    <button
      id="search-button">
      Search
    </button>
  </div>
}

export const Search = connect(
  (state) => ({}),

  (dispatch) => ({}),
)(SearchComponent)
