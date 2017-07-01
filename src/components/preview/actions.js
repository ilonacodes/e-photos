import {services} from "./services"

export const t = {
    PREVIEW_PHOTO: "PREVIEW_PHOTO",
}

export const actions = {
    previewPhoto: payload => ({
        type: t.PREVIEW_PHOTO,
        payload,
    }),

    fetchPhotoPreview: payload => {
        return dispatch => {
            services.previewService.fetch(payload)
                .then(photo => {
                    dispatch(actions.previewPhoto(photo))
                })
        }
    }
}