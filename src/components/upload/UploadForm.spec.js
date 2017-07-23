import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {push} from "react-router-redux";

import {UploadForm} from "./UploadForm";
import {actions} from "./actions";
import {MOCK_CREATED_PHOTO_ID, MOCK_FILE_ID, MockUploadService, services} from "./services";

const mockStore = configureMockStore([thunk])

fdescribe('UploadForm - behavior', () => {
    let uploadService

    beforeEach(() => {
        uploadService = new MockUploadService();
        services.uploadService = uploadService
    })

    it('uploads photo file', () => {
        const store = mockStore({
            upload: {fileId: null}
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        component.find("input[type='file']").simulate('change', {
            target: {
                files: ["file.png"]
            }
        })

        expect(uploadService.lastFileUploaded).toEqual("file.png")

        expect(store.getActions()).toEqual([
            actions.uploadPhotoFileSuccess(MOCK_FILE_ID),
        ])
    })

    it('creates photo', () => {
        const store = mockStore({
            upload: {fileId: "42"}
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        component.find("input[name='name']").simulate("change", {
            target: {value: 'my photo'},
        })
        component.find("input[name='tags']").simulate("change", {
            target: {value: 'selfie, photo, art'},
        })
        component.find("button").simulate('click')

        expect(uploadService.photoCreated).toEqual({
            name: "my photo",
            tags: "selfie, photo, art",
            fileId: "42",
        })

        expect(store.getActions()).toEqual([
            actions.createPhotoSuccess(MOCK_CREATED_PHOTO_ID),
            push(`/preview/${MOCK_CREATED_PHOTO_ID}`)
        ])
    })
})