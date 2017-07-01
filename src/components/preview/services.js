import {photoContent} from "../../Gallery"

export const services = {
    previewService: null,
}

export class MockPreviewService {
    fetch(id) {
        const photo = photoContent.filter(photo =>
            photo.id === id
        )[0]

        return {
            then: fn => fn(photo),
        }
    }
}

export class PreviewService {
    fetch(id) {
        return new MockPreviewService().fetch(id)
    }
}