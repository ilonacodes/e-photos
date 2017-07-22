import React from "react";

export const UploadForm = () => {
    return <div className="upload-container">
        <div className="title">
            <h2>Upload Photo</h2>
        </div>
        <div className="input-form">
            <label>Photo name</label>
            <input type="text"/>
        </div>
        <div className="input-form">
            <label>Tags (separated by comma)</label>
            <input type="text"/>
        </div>
        <div className="upload-file">
            <input type="file"/>
        </div>
        <div className="upload-button">
            <button>Upload</button>
        </div>

    </div>
}