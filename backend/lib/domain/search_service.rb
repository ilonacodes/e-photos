class SearchService
  def search(query)
    photo_storage = PhotoStorage.new
    photo_storage.search_by_name_or_tag(query)
  end
end