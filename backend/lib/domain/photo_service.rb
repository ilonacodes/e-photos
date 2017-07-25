class PhotoService
  def initialize(photo_storage)
    @photo_storage = photo_storage
  end

  def create(request)
    tags = request.tags.split(",").map {|t| t.strip}
    src = "http://localhost:4567/files/#{request.file_id}"

    photo = Photo.new(
        nil,
        request.name,
        src,
        tags
    )

    @photo_storage.save(photo)
  end
end