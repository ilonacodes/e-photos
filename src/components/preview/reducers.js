import {t} from "./actions";

export const previewReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case t.PREVIEW_PHOTO_LOADED:
            const photo = action.payload;
            const id = photo.id
            const newPhoto = {[id]: photo}
            return {
                ...state,
                ...newPhoto,
            }

        default:
            return state
    }
}