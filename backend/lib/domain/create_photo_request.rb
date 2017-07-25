class CreatePhotoRequest
  attr_reader :name, :tags, :file_id

  def initialize(name, tags, file_id)
    @name = name
    @tags = tags
    @file_id = file_id
  end
end