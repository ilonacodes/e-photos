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
        <Link to={`/preview/${photo.id}`} className="search-result-link">
            <img src={photo.src}/>
        </Link>
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
        <div className="logo">
            <h1>E-PHOTOS</h1>
        </div>
        <div className="description"><i>The stock of HD-Photos. Find what you need.</i></div>
        <div className="search">
            <SearchInput update={value => searchQuery = value}/>
            <SearchButton search={() => search(searchQuery)}/>
        </div>
        <div className="tags">
            <a href="#">science</a>
            <a href="#">art</a>
            <a href="#">books</a>
            <a href="#">city</a>
            <a href="#">hipster</a>
        </div>
        <div className="search-results">
            <SearchResults results={searchResults}/>
        </div>
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
