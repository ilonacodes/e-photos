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
            photos: {}
        })
        const routerParams = {id: 3}

        shallow(<Preview store={store} params={routerParams}/>).dive()
        const actual = store.getActions()

        const expected = [actions.previewPhoto(photoContent[2])]
        expect(actual).toEqual(expected)
    })

})