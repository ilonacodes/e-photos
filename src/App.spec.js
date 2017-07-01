import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";

import {App} from "./App";
import {actions} from "./actions";

const mockStore = configureMockStore([])

describe("Init test", () => {
    it('renders Hello React! 1', () => {
        const store = mockStore({
            counter: 1,
        })
        const component = shallow(<App store={store}/>).dive()

        const actual = component.find('p').text()

        const expected = "Hello React! 1"
        expect(actual).toEqual(expected)
    })

    it('renders Hello React! 2', () => {
        const store = mockStore({
            counter: 2,
        })
        const component = shallow(<App store={store}/>).dive()

        const actual = component.find('p').text()

        const expected = "Hello React! 2"
        expect(actual).toEqual(expected)
    })

    it('renders Hello React! 2', () => {
        const store = mockStore({
            counter: 42,
        })
        const component = shallow(<App store={store}/>).dive()

        component.find('button').simulate('click')
        const actual = store.getActions()

        const expected = [actions.increaseCounter()]
        expect(actual).toEqual(expected)
    })
})
