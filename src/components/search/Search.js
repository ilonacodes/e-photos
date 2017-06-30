import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { actions } from './actions'

export const SearchComponent = ({search, searchResults}) => {

  let searchQuery

  return <div>
    <Link to="/">Photos</Link>
    <input
      type="search"
      id="search-input"
      onChange={e => searchQuery = e.target.value}
    />
    <button
      id="search-button"
      onClick={() => search(searchQuery)}>
      Search
    </button>
    {searchResults.map(photo =>
      <div className="search-result" key={photo.id}>
        <img src={photo.src} />
      </div>)
    }
  </div>
}

export const Search = connect(
  ({searchResults}) => ({
    searchResults,
  }),

  dispatch => ({
    search: searchQuery => dispatch(actions.search(searchQuery))
  }),
)(SearchComponent)
