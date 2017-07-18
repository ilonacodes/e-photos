require "sinatra"
require "json"

require_relative "photos_fixture"

# db code
class PhotoStorage
  def all

    PHOTOS.map do |hash|
      Photo.new(hash[:id], hash[:name], hash[:src], hash[:tags])
    end

  end
end

# domain code
class Photo
  attr_reader :id, :name, :src, :tags

  def initialize(id, name, src, tags)
    @id = id
    @name = name
    @tags = tags
    @src = src
  end
end

# domain code
class SearchService
  def search(query)
    photo_storage = PhotoStorage.new
    photo_storage.all.select do |photo|
      photo.name.include?(query) ||
          photo.tags.include?(query)
    end
  end
end

# web/api code
class PhotoView
  def render(photo)
    {
        id: photo.id,
        name: photo.name,
        src: photo.src,
        tags: photo.tags
    }
  end
end

# web/api code
search_service = SearchService.new
photo_view = PhotoView.new

# web/api code
get "/search" do
  content_type :json

  query = params[:query]
  results = search_service.search(query)
  rendered_results = results.map {|photo| photo_view.render(photo)}
  {search_results: rendered_results}.to_json
end