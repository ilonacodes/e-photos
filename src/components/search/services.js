import {photoContent} from "../../Gallery"
import {config} from "../../config";

export const services = {
    searchService: null,
}

export class MockSearchService {
    search(searchQuery) {
        const results = photoContent.filter(photo =>
            photo.name.includes(searchQuery) ||
            photo.tags.includes(searchQuery)
        )

        return {
            then: fn => fn(results),
        }
    }
}

export class SearchService {
    search(searchQuery) {
        return fetch(`${config.apiUrl}/search?query=${searchQuery}`, {
            method: "get",
        }).then(responseObj => responseObj.json())
            .then(response => response["search_results"])
    }
}
