import {services} from "./services"

export const t = {
    PREVIEW_PHOTO_LOADED: "PREVIEW_PHOTO_LOADED",
}

export const actions = {
    previewPhotoLoaded: payload => ({
        type: t.PREVIEW_PHOTO_LOADED,
        payload,
    }),

    loadPhotoPreview: id => {
        return dispatch => {
            services.previewService.fetch(id)
                .then(photo => {
                    dispatch(actions.previewPhotoLoaded(photo))
                })
        }
    }
}