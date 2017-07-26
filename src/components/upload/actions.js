import {push} from "react-router-redux";

import {services} from "./services";

export const t = {
    UPLOAD_PHOTO_FILE: "UPLOAD_PHOTO_FILE",
    UPLOAD_PHOTO_FILE_PENDING: "UPLOAD_PHOTO_FILE_PENDING",
    UPLOAD_PHOTO_FILE_SUCCESS: "UPLOAD_PHOTO_FILE_SUCCESS",
    CREATE_PHOTO: "CREATE_PHOTO",
    CREATE_PHOTO_SUCCESS: "CREATE_PHOTO_SUCCESS",
    UPDATE_FORM: "UPDATE_FORM",
}

export const actions = {
    uploadPhotoFile: payload => {
        return dispatch => {
            dispatch(actions.uploadPhotoFilePending())

            services.uploadService.uploadPhotoFile(payload)
                .then(fileId => {
                    dispatch(actions.uploadPhotoFileSuccess(fileId))
                })
        }
    },

    uploadPhotoFilePending: () => ({
        type: t.UPLOAD_PHOTO_FILE_PENDING,
    }),

    uploadPhotoFileSuccess: payload => ({
        type: t.UPLOAD_PHOTO_FILE_SUCCESS,
        payload,
    }),

    createPhoto: payload => {
        return dispatch => {
            services.uploadService.createPhoto(payload)
                .then(id => {
                    dispatch(actions.createPhotoSuccess(id))
                    dispatch(push(`/preview/${id}`))
                })
        }
    },

    createPhotoSuccess: payload => ({
        type: t.CREATE_PHOTO_SUCCESS,
        payload,
    }),

    updateForm: payload => ({
        type: t.UPDATE_FORM,
        payload,
    })
}

