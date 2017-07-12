import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

import {actions} from "./actions";

export const SearchInput = ({update}) => {
    return <input
        type="text"
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

export const Search = ({search}) => {

    let searchQuery

    return <div className="search">
        <SearchInput update={value => searchQuery = value}/>
        <SearchButton search={() => search(searchQuery)}/>
    </div>
}

export const SearchTags = ({search}) => {
    return <div className="tags">
        <a href="#" onClick={() => search("science")}>science</a>
        <a href="#" onClick={() => search("art")}>art</a>
        <a href="#" onClick={() => search("books")}>books</a>
        <a href="#" onClick={() => search("city")}>city</a>
        <a href="#" onClick={() => search("hipster")}>hipster</a>
    </div>
}

export const Logo = ({}) => {
    return <div className="logo">
        <h1>E-PHOTOS</h1>
    </div>
}

export const Description = ({}) => {
    return <div className="description"><i>The stock of HD-Photos. Find what you need.</i></div>
}

export const SearchPageComponent = ({search, searchResults}) => {

    if (searchResults.length === 0) {

        return <div className="search-container">
            <Logo />
            <Description />
            <Search className="search" search={search}/>
            <SearchTags className="tags" search={search}/>
        </div>

    } else {

        return <div className="search-container-row">
            <div className="row">
                <Logo />
                <Search search={search}/>
            </div>
            <div className="search-results">
                <SearchResults results={searchResults}/>
            </div>
        </div>
    }
}

export const SearchPage = connect(
    ({searchResults}) => ({
        searchResults,
    }),

    dispatch => ({
        search: searchQuery => dispatch(actions.search(searchQuery))
    }),
)(SearchPageComponent)
