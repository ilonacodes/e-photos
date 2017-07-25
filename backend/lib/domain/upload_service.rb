class UploadService
  UUID_GENERATOR = UuidGenerator.new

  def initialize(file_storage)
    @file_storage = file_storage
  end

  def upload(file)
    file_id = UUID_GENERATOR.generate_uuid
    @file_storage.save(file_id, file)
  end
end