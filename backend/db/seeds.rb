require_relative "../lib/photos_fixture"
require_relative "../lib/db/photo_model"

PHOTOS.each do |hash|
  PhotoModel.create(
    id: hash[:id],
    name: hash[:name],
    src: hash[:src],
    tags: hash[:tags].join(","),
  )
end