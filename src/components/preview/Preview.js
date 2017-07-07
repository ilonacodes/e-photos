import React from "react";
import {connect} from "react-redux";

import {actions} from "./actions";

export const PreviewComponent = (props) => {

    if (!props.photo) {
        props.loadPreview(props.id)
        return <div>Loading..</div>
    }

    return <div className="preview">
        <img src={props.photo.src}/>
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

