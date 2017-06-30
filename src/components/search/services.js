import { photoContent } from '../../Gallery'

export const services = {
  searchService: null
}

export class SearchService {
  search(searchQuery) {
    const results = this.photoContent.filter(photo =>
      photo.name.includes(searchQuery)
    )

    return {
      then: fn => fn(results),
    }
  }
}
