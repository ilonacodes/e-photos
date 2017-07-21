class PhotoStorage
  def all

    PHOTOS.map do |hash|
      Photo.new(hash[:id], hash[:name], hash[:src], hash[:tags])
    end

  end
end