class PhotoService
  def initialize(photo_storage)
    @config = CONFIG
    @photo_storage = photo_storage
  end

  def create(request)
    tags = request.tags.split(",").map {|t| t.strip}
    src = "#{@config.api_url}/files/#{request.file_id}"

    photo = Photo.new(
        nil,
        request.name,
        src,
        tags
    )

    @photo_storage.save(photo)
  end
end