import {services} from "./services";
import { push } from 'react-router-redux';

export const t = {
    SEARCH_RESULTS: "SEARCH_RESULTS",
}

export const actions = {
    searchResults: payload => ({
        type: t.SEARCH_RESULTS,
        payload,
    }),

    search: payload => {
        return dispatch => {
            services.searchService.search(payload)
                .then(results => {
                    dispatch(push('/'))
                    dispatch(actions.searchResults(results))
                })
        }
    }
}
