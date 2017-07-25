class PhotoStorage
  def all

    PHOTOS.map do |hash|
      Photo.new(hash[:id], hash[:name], hash[:src], hash[:tags])
    end

  end

  def save(photo)

    photo.id = PHOTOS.size + 1

    PHOTOS << {
        id: photo.id,
        name: photo.name,
        src: photo.src,
        tags: photo.tags
    }

    photo

  end

  def delete(id)
    PHOTOS.delete_if { |p| p[:id] == id }
  end
end