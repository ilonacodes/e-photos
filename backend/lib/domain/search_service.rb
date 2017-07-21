class SearchService
  def search(query)
    photo_storage = PhotoStorage.new
    all = photo_storage.all
    all.select do |photo|
      photo.name.include?(query) ||
          photo.tags.include?(query)
    end
  end
end