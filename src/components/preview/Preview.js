import React from "react";
import {connect} from "react-redux";

import {actions} from "./actions";
import {SearchTags} from "../search/Search";
import {TopBar} from "../common/TopBar";

export const PreviewComponent = (props) => {

    if (!props.photo) {
        props.loadPreview(props.id)
        return <div>Loading..</div>
    }

    const search = () => null

    return <div className="preview">
        <div className="search-container-row">
            <TopBar search={search}/>
        </div>
        <div className="preview-content">
            <div className="preview-photo">
                <img src={props.photo.src}/>
            </div>
            <div className="preview-sidebar">
                <div className="related-searches">
                    <strong>Related Searches:</strong>
                    <SearchTags search={search} tags={props.photo.tags}/>
                </div>
                <div className="buy">
                    <button id="buy-button">Buy</button>
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
        loadPreview: id =>
            dispatch(actions.loadPhotoPreview(id))
    }),
)(PreviewComponent)

