import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import {actions} from "./actions";

export const SearchInput = ({update}) => {
    return <input
        type="search"
        id="search-input"
        onChange={e => update(e.target.value)}
    />
}

export const SearchButton = ({search}) => {
    return <button
        id="search-button"
        onClick={() => search()}>
        Search
    </button>
}

export const SearchResult = ({photo}) => {
    return <div className="search-result">
        <img src={photo.src}/>
    </div>
}

export const SearchResults = ({results}) => {
    return <div className="search-results">
        {results.map(photo =>
            <SearchResult key={photo.id} photo={photo}/>
        )}
    </div>
}

export const SearchComponent = ({search, searchResults}) => {

    let searchQuery

    return <div className="search-container">
        <Link to="/">Photos</Link>
        <SearchInput update={value => searchQuery = value}/>
        <SearchButton search={() => search(searchQuery)}/>
        <SearchResults results={searchResults}/>
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
