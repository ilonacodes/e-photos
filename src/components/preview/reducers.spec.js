import {actions} from "./actions"
import {previewReducer} from "./reducers";
import {photoContent} from "../../Gallery";

describe("Preview - reducer", () => {
    it("returns previous state when action is unsupported", () => {
        const state = {
            4: photoContent[3],
        }
        const action = {}

        const actual = previewReducer(state, action)

        expect(actual).toEqual(state)
    })

    it("adds new photo to state when action is photo preview", () => {
        const state = {
            4: photoContent[3],
        }
        const action = actions.previewPhotoLoaded(photoContent[5])

        const actual = previewReducer(state, action)

        const expected = {
            4: photoContent[3],
            6: photoContent[5],
        }
        expect(actual).toEqual(expected)

        expect(state[6]).toEqual(undefined)
    })
})

