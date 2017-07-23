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
        return new MockUploadService().uploadPhotoFile(file)
    }

    createPhoto(photo) {
        return new MockUploadService().createPhoto(photo)
    }
}