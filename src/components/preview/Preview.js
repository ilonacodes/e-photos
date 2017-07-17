import React from "react";
import {connect} from "react-redux";

import {actions} from "./actions";
import {actions as searchActions} from "../search/actions";
import {SearchTags} from "../search/Search";
import {TopBar} from "../common/TopBar";
import {signUpLink} from "../common/SignUp";

export const PreviewComponent = (props) => {

    if (!props.photo) {
        props.loadPreview(props.id)
        return <div>Loading..</div>
    }

    return <div className="preview">
        <div className="search-container-row">
            <TopBar search={props.search}/>
        </div>
        <div className="preview-content">
            <div className="preview-photo">
                <img src={props.photo.src}/>
            </div>
            <div className="preview-sidebar">
                <div className="related-searches">
                    <strong>Related Searches:</strong>
                    <SearchTags search={props.search} tags={props.photo.tags}/>
                </div>
                <div className="buy">
                    <a href={signUpLink}>
                        <button id="buy-button">Buy</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
}

export const Preview = connect(
    (state, ownProps) => {

        const id = parseInt(ownProps.params.id)

        return ({
            id,
            photo: state.photos[id]
        })
    },

    dispatch => ({
        loadPreview: id => {
            dispatch(actions.loadPhotoPreview(id))
        },

        search: searchQuery => {
            dispatch(searchActions.search(searchQuery))
        }
    }),
)(PreviewComponent)

