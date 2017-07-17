import {actions} from "./actions";

export const dispatchers = {
    search: dispatch => searchQuery => {
        dispatch(actions.search(searchQuery))
    }
}
