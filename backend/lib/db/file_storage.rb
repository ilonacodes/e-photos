class FileStorage
  def save(id, file)
    photo_file = PhotoFile.new(id, path(id))
    FileUtils.cp(file.path, photo_file.path)
    photo_file
  end

  def get(id)
    PhotoFile.new(id, path(id))
  end

  def path(id)
    File.expand_path("./uploads/#{id}")
  end
end
