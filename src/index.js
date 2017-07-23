import React from "react";
import {render} from "react-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {hashHistory, Route, Router} from "react-router";
import {routerMiddleware, routerReducer, syncHistoryWithStore} from "react-router-redux";
import thunk from "redux-thunk";

import {App} from "./App";
import {SearchPage} from "./components/search/Search";
import {searchReducer} from "./components/search/reducers";
import {counter} from "./reducer";
import {SearchService, services as searchServices} from "./components/search/services";
import {PreviewService, services as previewServices} from "./components/preview/services";
import {UploadService, services as uploadServices} from "./components/upload/services";
import {Preview} from "./components/preview/Preview";
import {previewReducer} from "./components/preview/reducers";
import {UploadForm} from "./components/upload/UploadForm";
import {uploadReducer} from "./components/upload/reducers";

searchServices.searchService = new SearchService()
previewServices.previewService = new PreviewService()
uploadServices.uploadService = new UploadService()

const store = createStore(
    combineReducers({
        counter,
        searchResults: searchReducer,
        photos: previewReducer,
        routing: routerReducer,
        upload: uploadReducer,
    }),
    applyMiddleware(thunk, routerMiddleware(hashHistory)),
);

const history = syncHistoryWithStore(hashHistory, store)

const Main =
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={SearchPage}/>
            <Route path='/preview/:id' component={Preview}/>
            <Route path='/counter' component={App}/>
            <Route path='/upload' component={UploadForm}/>
        </Router>
    </Provider>

render(Main, document.getElementById('app'));
