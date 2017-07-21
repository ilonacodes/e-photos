import {photoContent} from "../../Gallery"
import {config} from "../../config";

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
        return fetch(`${config.apiUrl}/preview/${id}`, {
            method: "get"
        }).then(responseObj => responseObj.json())
    }
}