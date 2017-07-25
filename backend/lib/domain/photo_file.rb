class PhotoFile
  attr_reader :id, :path
  def initialize(id, path)
    @id = id
    @path = path
  end
end
