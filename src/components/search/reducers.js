import {t} from "./actions"
import {LOCATION_CHANGE} from 'react-router-redux'

export const searchReducer = (state = [], action = {}) => {
    switch (action.type) {
        case t.SEARCH_RESULTS:
            return action.payload

        case LOCATION_CHANGE:
            return []

        default:
            return state
    }
}
