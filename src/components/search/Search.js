import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {TopBar} from "../common/TopBar";
import {Logo} from "../common/Logo";
import {dispatchers} from "./dispatchers";

export const SearchInput = ({update}) => {
    return <input
        type="text"
        id="search-input"
        placeholder="Search for photos..."
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

export const SearchTags = ({search, tags}) => {
    return <div className="tags">
        {tags.map(tag =>
            <a href="#" onClick={() => search(tag)} key={tag}>{tag}</a>
        )}
    </div>
}


export const Description = ({}) => {
    return <div className="description"><i>The stock of HD-Photos. Find what you need.</i></div>
}

export const tags = ["science", "art", "books", "city", "hipster"];

export const SearchPageComponent = ({search, searchResults}) => {

    if (searchResults.length === 0) {

        return <div className="search-container">
            <Logo />
            <Description />
            <Search className="search" search={search}/>
            <SearchTags className="tags" search={search} tags={tags}/>
        </div>

    } else {

        return <div className="search-container-row">
            <TopBar search={search}/>
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
        search: dispatchers.search(dispatch)
    }),
)(SearchPageComponent)
