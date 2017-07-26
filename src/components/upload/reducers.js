import {t} from "./actions";
import {LOCATION_CHANGE} from 'react-router-redux'

export const initState = {
    fileId: null,
    name: '',
    tags: '',
    uploadPending: false,
}

export const uploadReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case t.UPLOAD_PHOTO_FILE_SUCCESS:
            return {
                ...state,
                fileId: action.payload,
                uploadPending: false,
            }

        case t.UPDATE_FORM:
            return {
                ...state,
                ...action.payload,
            }

        case t.UPLOAD_PHOTO_FILE_PENDING:
            return {
                ...state,
                uploadPending: true,
            }

        case LOCATION_CHANGE:
            return initState

        default:
            return state
    }
}