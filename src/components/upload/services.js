import {config} from "../../config";
export const services = {
    uploadService: null,
}

export const MOCK_FILE_ID = "mock-file-id"
export const MOCK_CREATED_PHOTO_ID = "7"

export class MockUploadService {
    uploadPhotoFile(file) {
        this.lastFileUploaded = file
        return {
            then: fn => fn(MOCK_FILE_ID),
        }
    }

    createPhoto(photo) {
        this.photoCreated = photo
        return {
            then: fn => fn(MOCK_CREATED_PHOTO_ID)
        }
    }
}

export class UploadService {
    uploadPhotoFile(file) {
        const data = new FormData()
        data.append('file', file)

        return fetch(`${config.apiUrl}/files`, {
            method: "post",
            body: data
        }).then(responseObj => responseObj.json())
            .then(response => response["file_id"])
    }


    createPhoto(photo) {
        return new MockUploadService().createPhoto(photo)
    }
}