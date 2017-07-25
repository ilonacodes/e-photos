import {t} from "./actions";

export const initState = {
    fileId: null,
    name: '',
    tags: '',
}

export const uploadReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case t.UPLOAD_PHOTO_FILE_SUCCESS:
            return {
                ...state,
                fileId: action.payload,
            }

        case t.UPDATE_FORM:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}