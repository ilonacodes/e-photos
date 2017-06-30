import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { Search } from './Search'
import { actions } from './actions'
import { services, MockSearchService } from './services'
import { photoContent } from '../../Gallery'

const mockStore = configureMockStore([thunk])

describe('Search - behavior', () => {
  beforeEach(() => {
    services.searchService = new MockSearchService(photoContent)
  })

  it('dispatches a search action when button is pressed', () => {
    const store = mockStore({
      searchResults: [],
    })
    const component = shallow(<Search store={store} />).dive()

    component.find('input').simulate('change', {
      target: {
        value: 'girl'
      }
    })
    component.find('button').simulate('click')
    const actual = store.getActions()

    const expected = [actions.searchResults([photoContent[0], photoContent[5]])]
    expect(actual).toEqual(expected)
  })

  it('renders searchResults', () => {
    const store = mockStore({
      searchResults: [
        photoContent[0],
        photoContent[5],
      ]
    })

    const component = shallow(<Search store={store} />).dive()

    const actual = component
      .find('.search-result img')
      .map(photo => photo.prop('src'))

    const expected = [
      photoContent[0].src,
      photoContent[5].src,
    ]

    expect(actual).toEqual(expected)
  })
})
