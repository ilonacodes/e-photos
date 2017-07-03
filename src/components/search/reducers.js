import {t} from "./actions"

export const searchReducer = (state = [], action = {}) => {

    switch (action.type) {
        case t.SEARCH_RESULTS:
            return action.payload

        default:
            return state
    }
}
