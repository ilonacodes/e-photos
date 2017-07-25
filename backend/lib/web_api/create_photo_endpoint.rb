photo_storage = PhotoStorage.new
photo_service = PhotoService.new(photo_storage)

post "/photos" do
  cors
  content_type :json

  status CREATED

  payload = JSON.parse(request.body.read)

  create_request = CreatePhotoRequest.new(
    payload["name"],
    payload["tags"],
    payload["file_id"]
  )

  photo = photo_service.create(create_request)

  PhotoView.new.render(photo).to_json
end