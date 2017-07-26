import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {push} from "react-router-redux";

import {SearchPage, SearchResult, tags} from "./Search";
import {actions} from "./actions";
import {MockSearchService, services} from "./services";
import {photoContent} from "../../Gallery";

const mockStore = configureMockStore([thunk])

describe('SearchPage - behavior', () => {
    beforeEach(() => {
        services.searchService = new MockSearchService(photoContent)
    })

    it('dispatches a search action when button is pressed', () => {
        const store = mockStore({
            searchResults: [],
        })
        const component = shallow(<SearchPage store={store}/>).dive()
        console.log(component.debug())
        console.log(component.html())
        const searchComponent = component.find('Search').dive()
        const inputComponent = searchComponent.find('SearchInput').dive()
        const buttonComponent = searchComponent.find('SearchButton').dive()

        inputComponent.find('input').simulate('change', {
            target: {
                value: 'girl'
            }
        })
        buttonComponent.find('button').simulate('click')
        const actual = store.getActions()

        const expected = [
            push('/'),
            actions.searchResults([photoContent[0], photoContent[4], photoContent[5]]),
        ]
        expect(actual).toEqual(expected)
    })

    it('dispatches a search action when button is pressed - by tags', () => {
        const store = mockStore({
            searchResults: [],
        })
        const component = shallow(<SearchPage store={store}/>).dive()
        const searchComponent = component.find('Search').dive()
        const inputComponent = searchComponent.find('SearchInput').dive()
        const buttonComponent = searchComponent.find('SearchButton').dive()

        inputComponent.find('input').simulate('change', {
            target: {
                value: 'trip'
            }
        })
        buttonComponent.find('button').simulate('click')
        const actual = store.getActions()

        const expected = [
            push('/'),
            actions.searchResults([photoContent[1], photoContent[7], photoContent[8], photoContent[9]])
        ]
        expect(actual).toEqual(expected)
    })

    it('renders tags', () => {
        const store = mockStore({
            searchResults: [],
        })

        const component = shallow(<SearchPage store={store}/>).dive()
        const tagsComponent = component.find('SearchTags').dive()

        const actual = tagsComponent.find('a').map(tag => tag.text())
        const expected = tags

        expect(actual).toEqual(expected)
    })

    it('dispatches search action by tag when tag is clicked', () => {
        const store = mockStore({
            searchResults: [],
        })

        const component = shallow(<SearchPage store={store}/>).dive()
        const tagsComponent = component.find('SearchTags').dive()

        tagsComponent.find('a').first().simulate('click')
        const actual = store.getActions()

        const expected = [
            push('/'),
            actions.searchResults([photoContent[2]]),
        ]
        expect(actual).toEqual(expected)
    })

    it('renders searchResults', () => {
        const store = mockStore({
            searchResults: [
                photoContent[0],
                photoContent[5],
            ]
        })

        const component = shallow(<SearchPage store={store}/>).dive()
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
