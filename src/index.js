import React from "react";
import {render} from "react-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {hashHistory, Route, Router} from "react-router";
import {routerMiddleware, routerReducer, syncHistoryWithStore} from "react-router-redux";
import thunk from "redux-thunk";

import {App} from "./App";
import {Search} from "./components/search/Search";
import {searchReducer} from "./components/search/reducers";
import {counter} from "./reducer";
import {SearchService, services as searchServices} from "./components/search/services";
import {PreviewService, services as previewServices} from "./components/preview/services";

searchServices.searchService = new SearchService()
previewServices.previewService = new PreviewService()

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
            <Route path='/' component={Search}/>
            <Route path='/counter' component={App}/>
        </Router>
    </Provider>

render(Main, document.getElementById('app'));
