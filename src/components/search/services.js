import {photoContent} from "../../Gallery";

export const services = {
    searchService: null
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
        const results = photoContent.filter(photo =>
            photo.name.includes(searchQuery) ||
            photo.tags.includes(searchQuery)
        )

        return {
            then: fn => fn(results),
        }
    }
}
