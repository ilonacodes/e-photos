import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {Preview} from "./Preview";
import {actions} from "./actions";
import {MockPreviewService, services} from "./services";
import {photoContent} from "../../Gallery";

const mockStore = configureMockStore([thunk])

describe('Preview - behavior', () => {
    beforeEach(() => {
        services.previewService = new MockPreviewService(photoContent)
    })

    it("dispatches a preview action when did not fetch yet", () => {
        const store = mockStore({
            photos: {
                4: photoContent[3]
            }
        })
        const routerParams = {id: "3"}

        shallow(<Preview store={store} params={routerParams}/>).dive()
        const actual = store.getActions()

        const expected = [actions.previewPhotoLoaded(photoContent[2])]
        expect(actual).toEqual(expected)
    })

    it("does not dispatch a preview action when already fetched", () => {
        const store = mockStore({
            photos: {
                4: photoContent[3],
                3: photoContent[2]
            }
        })
        const routerParams = {id: "3"}

        shallow(<Preview store={store} params={routerParams}/>).dive()
        const actual = store.getActions()

        const expected = []
        expect(actual).toEqual(expected)
    })

    it("renders a photo preview when a photo preview has already fetched", () => {
        const store = mockStore({
            photos: {
                4: photoContent[3],
                3: photoContent[2]
            }
        })

        const routerParams = {id: "3"}

        const component = shallow(<Preview store={store} params={routerParams}/>).dive()

        const actual = component.find('img').prop('src')

        const expected = photoContent[2].src
        expect(actual).toEqual(expected)
    })
})