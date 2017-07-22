import React from 'react'
import {Link} from "react-router";

export const Footer = () => {
    return <div className="footer-wrapper">
        <div className="pre-footer" />
        <div className="footer">
            <p>I want to provide new content</p>
            <Link to="/upload" className="footer-link">Upload Photos</Link>
        </div>
    </div>
}