import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {Search, SearchResult} from "./Search";
import {actions} from "./actions";
import {MockSearchService, services} from "./services";
import {photoContent} from "../../Gallery";

const mockStore = configureMockStore([thunk])

describe('Search - behavior', () => {
    beforeEach(() => {
        services.searchService = new MockSearchService(photoContent)
    })

    it('dispatches a search action when button is pressed', () => {
        const store = mockStore({
            searchResults: [],
        })
        const component = shallow(<Search store={store}/>).dive()
        const inputComponent = component.find('SearchInput').dive()
        const buttonComponent = component.find('SearchButton').dive()

        inputComponent.find('input').simulate('change', {
            target: {
                value: 'girl'
            }
        })
        buttonComponent.find('button').simulate('click')
        const actual = store.getActions()

        const expected = [actions.searchResults([photoContent[0], photoContent[5]])]
        expect(actual).toEqual(expected)
    })

    it('dispatches a search action when button is pressed - by tags', () => {
        const store = mockStore({
            searchResults: [],
        })
        const component = shallow(<Search store={store}/>).dive()
        const inputComponent = component.find('SearchInput').dive()
        const buttonComponent = component.find('SearchButton').dive()

        inputComponent.find('input').simulate('change', {
            target: {
                value: 'trip'
            }
        })
        buttonComponent.find('button').simulate('click')
        const actual = store.getActions()

        const expected = [actions.searchResults([photoContent[1], photoContent[7], photoContent[8]])]
        expect(actual).toEqual(expected)
    })

    it('renders searchResults', () => {
        const store = mockStore({
            searchResults: [
                photoContent[0],
                photoContent[5],
            ]
        })

        const component = shallow(<Search store={store}/>).dive()
        const resultsComponent = component.find('SearchResults').dive()

        const actual = resultsComponent
            .find('SearchResult')
            .map(photo => photo.prop('photo').src)

        const expected = [
            photoContent[0].src,
            photoContent[5].src,
        ]

        expect(actual).toEqual(expected)
    })
})

describe('SearchResult', () => {
    it('renders a photo', () => {
        const photo = photoContent[2]

        const component = shallow(<SearchResult photo={photo}/>)

        const actual = component.find('img').prop('src')

        const expected = photo.src

        expect(actual).toEqual(expected)
    })
})
