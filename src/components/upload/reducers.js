import {t} from "./actions";

export const uploadReducer = (state = {fileId: null}, action = {}) => {

    switch (action.type) {
        case t.CREATE_PHOTO_SUCCESS:
            return {fileId: action.payload}

        default:
            return state
    }
}