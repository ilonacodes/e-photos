import {t} from "./actions"

export const searchReducer = (state = [], action = {}) => {

    console.log(action)

    switch (action.type) {
        case t.SEARCH_RESULTS:
            return action.payload

        default:
            return state
    }
}
