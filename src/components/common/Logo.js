import React from 'react'
import {connect} from "react-redux";
import {push} from "react-router-redux";

export const LogoComponent = ({goToRoot}) => {
    return <div className="logo">
        <h1 onClick={goToRoot}>E-PHOTOS</h1>
    </div>
}

export const Logo = connect(
    (state) => ({}),

    (dispatch) => ({
        goToRoot: () => dispatch(push('/'))
    })
)(LogoComponent)