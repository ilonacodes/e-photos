class PreviewService
  def preview(photo_id)
    photo_storage = PhotoStorage.new
    all = photo_storage.all
    results = all.select do |photo|
      photo.id == photo_id
    end

    if results.empty?
      raise PhotoNotFoundException.new
    end

    results[0]

  end
end