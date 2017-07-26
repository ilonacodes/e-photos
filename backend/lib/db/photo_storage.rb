require_relative 'photo_model'

class PhotoStorage
  def all

    PhotoModel.all.map do |model|
      Photo.new(model.id, model.name, model.src, model.split_tags)
    end

  end

  def save(photo)

    photo_model = PhotoModel.create(
      name: photo.name,
      src: photo.src,
      tags: photo.tags.join(","),
    )

    photo.id = photo_model.id

    photo

  end

  def delete(id)
    PhotoModel.delete(id)
  end
end