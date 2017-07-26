class PreviewService
  def preview(photo_id)
    photo_storage = PhotoStorage.new

    photo = photo_storage.get(photo_id)

    unless photo
      raise PhotoNotFoundException.new
    end

    photo

  end
end