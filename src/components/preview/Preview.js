import React from 'react'
import {connect} from 'react-redux'

import {actions} from './actions'

export const PreviewComponent = (props) => {

    props.loadPreview(props.id)

    return <div className="preview">

    </div>
}

export const Preview = connect(
    ({}, ownProps) => ({
        id: ownProps.params.id,
    }),

    dispatch => ({
        loadPreview:
            id => dispatch(actions.fetchPhotoPreview(id))
    }),
)(PreviewComponent)

