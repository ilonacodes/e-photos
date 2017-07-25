import React from "react";
import {connect} from "react-redux";
import {actions} from "./actions";

export const UploadFormComponent = ({uploadFile, fileId, createPhoto, name, tags, updateForm}) => {
    const upload = e => uploadFile(e.target.files[0])
    const create = () => createPhoto({
        name,
        tags,
        fileId,
    })

    return <div className="upload-container">
        <div className="title">
            <h1>Upload Photo</h1>
        </div>
        <form>
            <div className="input-form">
                <label>Photo name</label>
                <input type="text" name="name"
                        onChange={e => updateForm({name: e.target.value})}/>
            </div>
            <div className="input-form">
                <label>Tags (separated by comma)</label>
                <input type="text" name="tags"
                       onChange={e => updateForm({tags: e.target.value})}/>
            </div>
            <div className="upload-file">
                <input type="file"
                        onChange={upload}/>
            </div>
        </form>
        <div className="upload-button">
            <button onClick={create}>Upload</button>
        </div>
    </div>
}

export const UploadForm = connect(
    (state) => ({
        fileId: state.upload.fileId,
        name: state.upload.name,
        tags: state.upload.tags,
    }),

    (dispatch) => ({
        uploadFile: file => {
            dispatch(actions.uploadPhotoFile(file))
        },

        createPhoto: photo => {
            dispatch(actions.createPhoto(photo))
        },

        updateForm: payload => {
            dispatch(actions.updateForm(payload))
        }
    })
)(UploadFormComponent)