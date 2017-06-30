import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import { App } from './App'
import { Search } from './components/search/Search'
import { searchReducer } from './components/search/reducers'
import { counter } from './reducer'
import { services as searchServices, SearchService } from './components/search/services'

searchServices.searchService = new SearchService()

const store = createStore(
  combineReducers({
    counter,
    searchResults: searchReducer,
    routing: routerReducer,
  }),
  applyMiddleware(thunk, routerMiddleware(hashHistory)),
);

const history = syncHistoryWithStore(hashHistory, store)

const Main =
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Search} />
      <Route path='/counter' component={App} />
    </Router>
  </Provider>

render(Main, document.getElementById('app'));
