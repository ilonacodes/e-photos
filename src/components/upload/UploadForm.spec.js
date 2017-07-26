import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {push} from "react-router-redux";

import {UploadForm} from "./UploadForm";
import {actions} from "./actions";
import {MOCK_CREATED_PHOTO_ID, MOCK_FILE_ID, MockUploadService, services} from "./services";
import {initState} from "./reducers";

const mockStore = configureMockStore([thunk])

describe('UploadForm - behavior', () => {
    let uploadService

    beforeEach(() => {
        uploadService = new MockUploadService();
        services.uploadService = uploadService
    })

    it('uploads photo file', () => {
        const store = mockStore({
            upload: initState,
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        component.find("input[type='file']").simulate('change', {
            target: {
                files: ["file.png"]
            }
        })

        expect(uploadService.lastFileUploaded).toEqual("file.png")

        expect(store.getActions()).toEqual([
            actions.uploadPhotoFilePending(),
            actions.uploadPhotoFileSuccess(MOCK_FILE_ID),
        ])
    })

    it('has button disabled when there is no fileId available', () => {
        const store = mockStore({
            upload: {
                ...initState,
                fileId: null,
            },
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        const disabled = component.find('button').props().disabled

        expect(disabled).toBeTruthy()
    })

    it('has button enabled when there is fileId available', () => {
        const store = mockStore({
            upload: {
                ...initState,
                fileId: '42',
            },
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        const disabled = component.find('button').props().disabled

        expect(disabled).toBeFalsy()
    })

    it('shows uploading message instead of file input when upload is pending', () => {
        const store = mockStore({
            upload: {
                ...initState,
                uploadPending: true,
            },
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        const fileInput = component.find('input[type="file"]')

        expect(fileInput.exists()).toBeFalsy()

        const actual = component.find('.upload-file .uploading')

        expect(actual.text()).toEqual("Uploading...")

    })

    it('shows uploaded message instead of file input when upload is finished', () => {
        const store = mockStore({
            upload: {
                ...initState,
                uploadPending: false,
                fileId: '42',
            },
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        const fileInput = component.find('input[type="file"]')

        expect(fileInput.exists()).toBeFalsy()

        const actual = component.find('.upload-file .uploaded')

        expect(actual.text()).toEqual("Upload completed!")

    })

    it('creates photo', () => {
        const store = mockStore({
            upload: {
                ...initState,
                name: 'my photo',
                tags: 'selfie, photo, art',
                fileId: "42",
            }
        })
        const component = shallow(<UploadForm store={store}/>).dive()

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

    it("updates form for name field", () => {
        const store = mockStore({
            upload: {
                ...initState,
                name: "Road",
            }
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        component.find("input[name='name']").simulate("change", {
            target: {value: 'my photo'},
        })

        expect(store.getActions()).toEqual([
            actions.updateForm({name: "my photo"}),
        ])
    })

    it("updates form for tags field", () => {
        const store = mockStore({
            upload: {
                ...initState,
                tags: "hello, world",
            }
        })
        const component = shallow(<UploadForm store={store}/>).dive()

        component.find("input[name='tags']").simulate("change", {
            target: {value: "selfie, photo, art"},
        })

        expect(store.getActions()).toEqual([
            actions.updateForm({tags: "selfie, photo, art"}),
        ])
    })
})